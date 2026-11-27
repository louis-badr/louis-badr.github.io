// Publishes a Marp deck on the site at /slides/<slug>/.
// - Exports the deck to public/slides/<slug>/index.html. Marp runs in the deck folder, so it reads the deck's .marprc.yml.
// - Copies only the files that the HTML uses into public/slides/<slug>/, and removes the old ones.
// - Removes the speaker notes.
// - Converts the pictures to WebP: stills at LONG_EDGE px, animations at ANIM_EDGE px and 30 fps.
// - Re-encodes a picture only when its original is newer than the published copy.
// The originals in the deck folder do not change.
// Usage: npm run slides -- <path/to/deck.md> <slug>
import sharp from "sharp";
import { execFileSync } from "node:child_process";
import { copyFile, mkdir, readFile, readdir, rm, rmdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { encodeAnimation } from "./animated-webp.mjs";

const LONG_EDGE = Number(process.env.LONG_EDGE ?? 1920);
const ANIM_EDGE = Number(process.env.ANIM_EDGE ?? 800);
const RASTER = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp"]);
const SHARP = { limitInputPixels: false, failOn: "none" };

const [deckArg, slug] = process.argv.slice(2);
if (!deckArg || !slug || !/^[a-z0-9-]+$/.test(slug)) {
  console.error("Usage: npm run slides -- <path/to/deck.md> <slug>   (slug: a-z, 0-9, -)");
  process.exit(1);
}
const deck = path.resolve(deckArg);
const deckDir = path.dirname(deck);
const outDir = path.resolve("public/slides", slug);
const outHtml = path.join(outDir, "index.html");

await mkdir(outDir, { recursive: true });
execFileSync("marp", ["--no-stdin", path.basename(deck), "-o", outHtml], { cwd: deckDir, stdio: "inherit" });
let html = await readFile(outHtml, "utf8");

// A <video> with data-youtube="ID?start=S&end=E" plays a local clip in the deck.
// On the site, it becomes a YouTube embed, so the local clip is not published.
html = html.replace(/<video\b[^>]*\bdata-youtube="([^"]+)"[^>]*>\s*<\/video>/g, (all, yt) => {
  const [id, query = ""] = yt.replaceAll("&amp;", "&").split("?");
  const params = new URLSearchParams(query);
  for (const [k, v] of Object.entries({ autoplay: "1", mute: "1", controls: "0", rel: "0", playsinline: "1" })) params.set(k, v);
  const src = `https://www.youtube-nocookie.com/embed/${id}?${params.toString().replaceAll("&", "&amp;")}`;
  return `<iframe src="${src}" allow="autoplay; encrypted-media" referrerpolicy="strict-origin-when-cross-origin" title="${id}"></iframe>`;
});

// The speaker notes (HTML comments in the deck) are for the presenter only: they are not published.
html = html.replace(/<div class="bespoke-marp-note"[^>]*>[\s\S]*?<\/div>/g, "");

// Relative references in src="", href="" and url(). Marp writes quotes in style attributes as &quot;.
const REF = /((?:src|href)=")([^"]+)(")|(url\((?:&quot;|["'])?)([^"')&]+)((?:&quot;|["'])?\))/g;
const isLocal = (ref) => !/^(?:[a-z][a-z0-9+.-]*:|#|\/)/i.test(ref);
const toFile = (ref) => decodeURI(ref.replaceAll("&amp;", "&").split(/[?#]/)[0]);

const refs = new Set();
for (const m of html.matchAll(REF)) {
  const ref = m[2] ?? m[5];
  if (isLocal(ref)) refs.add(toFile(ref));
}

// Exact-case check: macOS ignores case, GitHub Pages does not.
async function existsExact(file) {
  try {
    return (await readdir(path.dirname(file))).includes(path.basename(file));
  } catch {
    return false;
  }
}

// Published name of each file: pictures become .webp, other files keep their name.
const published = new Map();
const taken = new Set();
for (const ref of refs) {
  const ext = path.extname(ref).toLowerCase();
  let out = RASTER.has(ext) ? ref.slice(0, -ext.length) + ".webp" : ref;
  if (taken.has(out)) out = ref + ".webp";
  taken.add(out);
  published.set(ref, out);
}

async function isFresh(src, out) {
  try {
    return (await stat(out)).mtimeMs >= (await stat(src)).mtimeMs;
  } catch {
    return false;
  }
}

const missing = [];
for (const [ref, outRef] of published) {
  const src = path.join(deckDir, ref);
  const out = path.join(outDir, outRef);
  if (!(await existsExact(src))) {
    missing.push(ref);
    published.set(ref, ref); // keep the original path in the HTML
    continue;
  }
  if (await isFresh(src, out)) continue;
  await mkdir(path.dirname(out), { recursive: true });
  const ext = path.extname(ref).toLowerCase();
  if (!RASTER.has(ext)) {
    await copyFile(src, out);
    continue;
  }
  try {
    const { pages = 1 } = await sharp(src, SHARP).metadata();
    if (pages > 1) {
      await encodeAnimation(src, out, { longEdge: ANIM_EDGE });
    } else {
      await sharp(src, SHARP)
        .rotate()
        .resize({ width: LONG_EDGE, height: LONG_EDGE, fit: "inside", withoutEnlargement: true })
        .webp({ quality: ext === ".png" ? 85 : 80 })
        .toFile(out);
    }
    console.log(`${ref} -> ${outRef}`);
  } catch (err) {
    // Sharp cannot read some damaged files: publish the original as it is.
    await rm(out, { force: true });
    published.set(ref, ref);
    await copyFile(src, path.join(outDir, ref));
    console.warn(`${ref}: not converted (${err.message}), copied as it is`);
  }
}

// Point the HTML to the published names.
html = html.replace(REF, (all, a1, r1, z1, a2, r2, z2) => {
  const ref = r1 ?? r2;
  if (!isLocal(ref)) return all;
  const outRef = published.get(toFile(ref));
  if (!outRef || outRef === toFile(ref)) return all;
  return (a1 ?? a2) + encodeURI(outRef) + (z1 ?? z2);
});
await writeFile(outHtml, html);

// Remove the files that the deck does not use any more.
const keep = new Set([outHtml, ...[...published.values()].map((r) => path.join(outDir, r))]);
let total = 0;
async function prune(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await prune(p);
      if ((await readdir(p)).length === 0) await rmdir(p);
    } else if (!keep.has(p)) {
      await rm(p);
      console.log(`removed ${path.relative(outDir, p)}`);
    } else {
      total += (await stat(p)).size;
    }
  }
}
await prune(outDir);

for (const ref of missing) console.warn(`MISSING ${ref} (used by the deck, not found with this exact name)`);
console.log(`/slides/${slug}/: ${published.size - missing.length} files, ${(total / 1e6).toFixed(1)} MB`);
