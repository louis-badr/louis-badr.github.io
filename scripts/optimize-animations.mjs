// Recompresses the animated WebP originals in raw/animations/ for the web.
// - public/gallery/<name>.webp : smaller, lighter animation (only loaded when opened)
// - src/assets/gallery/<name>.webp : first frame, used by Astro to build the thumbnails
// Frames shorter than MIN_DELAY ms are merged (60 fps -> 30 fps by default).
// Usage: npm run optimize:animations [-- name1 name2 ...]
import sharp from "sharp";
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const SRC = "raw/animations";
const OUT_ANIM = "public/gallery";
const OUT_STILL = "src/assets/gallery";
const LONG_EDGE = Number(process.env.LONG_EDGE ?? 720);
const QUALITY = Number(process.env.QUALITY ?? 50);
const MIN_DELAY = Number(process.env.MIN_DELAY ?? 33);

await mkdir(OUT_ANIM, { recursive: true });
await mkdir(OUT_STILL, { recursive: true });

const only = process.argv.slice(2);
const files = (await readdir(SRC)).filter(
  (f) => f.endsWith(".webp") && (only.length === 0 || only.includes(path.parse(f).name)),
);

for (const file of files) {
  const t = Date.now();
  const src = path.join(SRC, file);
  const opts = { animated: true, limitInputPixels: false };
  const { width, pageHeight, delay = [], loop = 0 } = await sharp(src, opts).metadata();
  const landscape = width >= pageHeight;

  // Decode every frame, already resized.
  const { data, info } = await sharp(src, opts)
    .resize({ [landscape ? "width" : "height"]: LONG_EDGE, withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.pageHeight ?? info.height / delay.length;
  const frameBytes = w * h * 4;

  // Keep a frame, add the duration of the dropped ones to it.
  const frames = [];
  const delays = [];
  let acc = MIN_DELAY;
  for (let i = 0; i < delay.length; i++) {
    if (acc >= MIN_DELAY) {
      frames.push(data.subarray(i * frameBytes, (i + 1) * frameBytes));
      delays.push(delay[i]);
      acc = delay[i];
    } else {
      delays[delays.length - 1] += delay[i];
      acc += delay[i];
    }
  }

  const anim = await sharp(Buffer.concat(frames), {
    raw: { width: w, height: h * frames.length, channels: 4, pageHeight: h },
  })
    .webp({ quality: QUALITY, effort: 4, loop, delay: delays })
    .toFile(path.join(OUT_ANIM, file));

  await sharp(src, { page: 0 })
    .resize({ [landscape ? "width" : "height"]: 1600, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(path.join(OUT_STILL, file));

  console.log(
    `${file}: ${delay.length} -> ${frames.length} frames, ${(anim.size / 1e6).toFixed(1)} MB (${((Date.now() - t) / 1000).toFixed(0)} s)`,
  );
}
