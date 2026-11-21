// Recompresses an animated image (WebP or GIF) into a lighter animated WebP.
// Frames shorter than minDelay ms are merged (60 fps -> 30 fps by default).
// Used by optimize-animations.mjs and publish-slides.mjs.
import sharp from "sharp";

export async function encodeAnimation(src, out, { longEdge = 720, quality = 50, minDelay = 33 } = {}) {
  const opts = { animated: true, limitInputPixels: false };
  const { width, pageHeight, delay = [], loop = 0 } = await sharp(src, opts).metadata();
  const landscape = width >= pageHeight;

  // Decode every frame, already resized.
  const { data, info } = await sharp(src, opts)
    .resize({ [landscape ? "width" : "height"]: longEdge, withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.pageHeight ?? info.height / delay.length;
  const frameBytes = w * h * 4;

  // Keep a frame, add the duration of the dropped ones to it.
  const frames = [];
  const delays = [];
  let acc = minDelay;
  for (let i = 0; i < delay.length; i++) {
    if (acc >= minDelay) {
      frames.push(data.subarray(i * frameBytes, (i + 1) * frameBytes));
      delays.push(delay[i]);
      acc = delay[i];
    } else {
      delays[delays.length - 1] += delay[i];
      acc += delay[i];
    }
  }

  const result = await sharp(Buffer.concat(frames), {
    raw: { width: w, height: h * frames.length, channels: 4, pageHeight: h },
  })
    .webp({ quality, effort: 4, loop, delay: delays })
    .toFile(out);

  return { framesIn: delay.length, framesOut: frames.length, size: result.size, landscape };
}
