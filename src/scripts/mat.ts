// Cutting mat, drawn exactly like the Cutting Mat app
// (github.com/louis-badr/CuttingMat, js/draw-mat.js): navy mat with cream
// ink, faint 1 cm lines and a heavier line every 5 cm, angle rays from the
// bottom-left origin, an info block, numbers on the four edges.
//
// Two uses, chosen per canvas:
// - `canvas.cutting-mat`: the mat behind a full-screen desk page, with the
//   app's black margin around it. A browser does not know the physical size
//   of the screen, so a square is only about one centimetre.
// - `canvas.cutting-mat[data-a4]`: an A4 mat (29.7 x 21 cm) filling its
//   canvas, which is the mat itself lying on the desk.
// Everything is drawn in device pixels, like the app, so lines stay sharp.

const MAT = "#12183b";
const INK = "#f4efdc";
const BACKDROP = "#000000";
// CSS px per square on full-screen mats, unless the canvas sets data-cm
const CM = 56;
const FONT_STACK =
  '"Helvetica Neue", Helvetica, Arial, "Liberation Sans", sans-serif';
const RAY_ANGLES: [number, number][] = [
  [10, 11.5],
  [20, 9.5],
  [30, 8.0],
  [45, 7.8],
  [60, 7.0],
  [80, 9.2],
];

interface Options {
  W: number; // canvas size, device px
  H: number;
  cm: number; // device px per centimetre
  margin: number; // device px between the canvas edge and the mat
  backdrop: string | null;
}

// Put a 1-px-wide line on pixel centres so it stays sharp.
function crisp(v: number, w: number) {
  return w % 2 === 1 ? Math.floor(v) + 0.5 : Math.round(v);
}

function drawMat(ctx: CanvasRenderingContext2D, o: Options) {
  const { W, H, cm } = o;
  const mx0 = o.margin;
  const my0 = o.margin;
  const mx1 = W - o.margin;
  const my1 = H - o.margin;
  const pad = 0.62 * cm;
  const cols = Math.max(4, Math.floor((mx1 - mx0 - 2 * pad) / cm));
  const rows = Math.max(3, Math.floor((my1 - my0 - 2 * pad) / cm));
  const gx0 = Math.round(mx0 + (mx1 - mx0 - cols * cm) / 2);
  const gy0 = Math.round(my0 + (my1 - my0 - rows * cm) / 2);
  const gx1 = Math.round(gx0 + cols * cm);
  const gy1 = Math.round(gy0 + rows * cm);
  const X = (i: number) => Math.round(gx0 + i * cm);
  const Y = (j: number) => Math.round(gy0 + j * cm);

  const THIN = Math.max(1, Math.round(0.01 * cm));
  const MAJOR = Math.max(2, Math.round(0.02 * cm));
  const FRAME = Math.max(2, Math.round(0.03 * cm));
  const px = (cmSize: number) => Math.max(9, Math.round(cmSize * cm));

  ctx.clearRect(0, 0, W, H);
  if (o.backdrop) {
    ctx.fillStyle = o.backdrop;
    ctx.fillRect(0, 0, W, H);
  }
  ctx.fillStyle = MAT;
  ctx.beginPath();
  ctx.roundRect(mx0, my0, mx1 - mx0, my1 - my0, 0.4 * cm);
  ctx.fill();

  // Grid: faint 1 cm lines, a heavier line every 5 cm from the origin
  const step = 5;
  ctx.strokeStyle = INK;
  ctx.lineCap = "butt";
  for (let i = 0; i <= cols; i++) {
    const strong = i % step === 0;
    const w = strong ? MAJOR : THIN;
    const x = crisp(X(i), w);
    ctx.lineWidth = w;
    ctx.globalAlpha = strong ? 1 : 0.5;
    ctx.beginPath();
    ctx.moveTo(x, gy0);
    ctx.lineTo(x, gy1);
    ctx.stroke();
  }
  for (let j = 0; j <= rows; j++) {
    const strong = (rows - j) % step === 0;
    const w = strong ? MAJOR : THIN;
    const y = crisp(Y(j), w);
    ctx.lineWidth = w;
    ctx.globalAlpha = strong ? 1 : 0.5;
    ctx.beginPath();
    ctx.moveTo(gx0, y);
    ctx.lineTo(gx1, y);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // Angle rays from the bottom-left origin
  const ox = gx0;
  const oy = gy1;
  const labels: [string, number, number][] = [];
  if (cols >= 10 && rows >= 8) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(gx0, gy0, gx1 - gx0, gy1 - gy0);
    ctx.clip();
    ctx.lineWidth = Math.max(1, 0.015 * cm);
    for (const [a, dist] of RAY_ANGLES) {
      const t = (a * Math.PI) / 180;
      const ux = Math.cos(t);
      const uy = -Math.sin(t);
      const tmax = Math.min((gx1 - ox) / ux, (gy1 - gy0) / Math.sin(t));
      ctx.beginPath();
      ctx.moveTo(ox, oy);
      ctx.lineTo(ox + ux * tmax, oy + uy * tmax);
      ctx.stroke();
      const d = Math.min(dist, tmax / cm - 0.6);
      labels.push([`${a}°`, ox + ux * d * cm, oy + uy * d * cm]);
    }
    ctx.restore();
    if (cols > 12) labels.push(["0°", ox + 10.5 * cm, oy - 0.35 * cm]);
  }

  // Info block, top-left, masking the grid behind it
  const title = "CUTTING MAT";
  const sub = `${cols} × ${rows} CM`;
  const fTitle = `bold ${px(0.23)}px ${FONT_STACK}`;
  const fSub = `${px(0.21)}px ${FONT_STACK}`;
  ctx.font = fTitle;
  const wt = ctx.measureText(title).width;
  ctx.font = fSub;
  const ws = ctx.measureText(sub).width;
  const cells = Math.min(
    cols - 1,
    Math.max(4, Math.ceil((Math.max(wt, ws) + 0.56 * cm) / cm)),
  );
  const bx1 = X(cells);
  const by1 = Y(1);
  ctx.fillStyle = MAT;
  ctx.fillRect(gx0 + 3, gy0 + 3, bx1 - gx0 - 6, by1 - gy0 - 6);
  ctx.fillStyle = INK;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  const tx = gx0 + 0.28 * cm;
  ctx.font = fTitle;
  ctx.fillText(title, tx, gy0 + 0.34 * cm);
  ctx.font = fSub;
  ctx.fillText(sub, tx, gy0 + 0.68 * cm);

  // Frame
  ctx.strokeStyle = INK;
  ctx.lineWidth = FRAME;
  const f = FRAME % 2 ? 0.5 : 0;
  ctx.strokeRect(gx0 + f, gy0 + f, gx1 - gx0, gy1 - gy0);

  // Small arc at the origin
  ctx.beginPath();
  ctx.arc(ox, oy, 0.55 * cm, -Math.PI / 2, 0);
  ctx.stroke();

  // Angle labels on a patch of mat colour
  ctx.font = `${px(0.22)}px ${FONT_STACK}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const lp = 0.06 * cm;
  for (const [text, x, y] of labels) {
    const tw = ctx.measureText(text).width;
    const th = px(0.22);
    ctx.fillStyle = MAT;
    ctx.fillRect(x - tw / 2 - lp, y - th / 2 - lp, tw + 2 * lp, th + 2 * lp);
    ctx.fillStyle = INK;
    ctx.fillText(text, x, y);
  }

  // Numbers on the four edges, "CM" in the corner
  const bandx = gx0 - mx0;
  const bandy = gy0 - my0;
  ctx.fillStyle = INK;
  ctx.font = `${px(0.23)}px ${FONT_STACK}`;
  for (let i = 0; i <= cols; i++) {
    const x = X(i);
    if (i > 0) ctx.fillText(String(i), x, gy0 - bandy / 2);
    ctx.fillText(String(i), x, gy1 + (my1 - gy1) / 2);
  }
  for (let j = 0; j <= rows; j++) {
    const y = gy1 - Math.round(j * cm);
    ctx.fillText(String(j), gx0 - bandx / 2, y);
    ctx.fillText(String(j), gx1 + (mx1 - gx1) / 2, y);
  }
  ctx.font = `bold ${px(0.23)}px ${FONT_STACK}`;
  ctx.fillText("CM", gx0 - bandx / 2, gy0 - bandy / 2);
}

function draw(canvas: HTMLCanvasElement) {
  const dpr = window.devicePixelRatio || 1;
  const W = Math.round(canvas.clientWidth * dpr);
  const H = Math.round(canvas.clientHeight * dpr);
  if (!W || !H) return;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  if ("a4" in canvas.dataset) {
    // The canvas is the mat: 29.7 cm along its long side
    const cm = Math.max(W, H) / 29.7;
    drawMat(ctx, { W, H, cm, margin: 0, backdrop: null });
  } else {
    const css = Number(canvas.dataset.cm) || CM;
    const cm = Math.min(css * dpr, W / 7); // keep a few squares on phones
    drawMat(ctx, {
      W,
      H,
      cm,
      margin: Math.round(0.16 * cm),
      backdrop: BACKDROP,
    });
  }
}

/** Draws every `canvas.cutting-mat` of the page, at its own size. */
export function initCuttingMat() {
  for (const canvas of document.querySelectorAll<HTMLCanvasElement>(
    "canvas.cutting-mat",
  )) {
    new ResizeObserver(() => draw(canvas)).observe(canvas);
  }
}
