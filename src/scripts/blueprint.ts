// Drawing sheet frame, like the corner of a large schematic sheet: the
// screen shows only its bottom-right quarter, so only the right and bottom
// edges are drawn. Each edge has an outer and an inner border with zone
// references between them (numbers along the bottom, letters down the right
// side), a tick at each zone boundary and a dot where the boundaries cross.
// Accent blue on cream paper.
// The width from the window edge to the inner border is the CSS variable
// --spacing-frame (styles/global.css).

const LINE = "#2e45ed";
const FONT = "osifont, sans-serif";
const ZONE = 240; // target zone size in px (KiCad uses 50 mm)

function draw(canvas: HTMLCanvasElement, dotsCanvas: HTMLCanvasElement | null) {
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);

  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  let dots: CanvasRenderingContext2D | null = null;
  if (dotsCanvas) {
    dotsCanvas.width = canvas.width;
    dotsCanvas.height = canvas.height;
    dots = dotsCanvas.getContext("2d");
    dots?.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  const style = getComputedStyle(canvas);
  const frame = parseFloat(style.getPropertyValue("--spacing-frame")) || 26;
  const outer = Math.round(frame * 0.3); // margin outside the outer border
  const band = frame - outer; // between the two borders

  // Half-pixel offsets keep the 1px lines sharp
  const o = { x1: w - outer - 0.5, y1: h - outer - 0.5 }; // outer border
  const i = { x1: o.x1 - band, y1: o.y1 - band }; // inner border

  ctx.strokeStyle = LINE;
  ctx.fillStyle = LINE;
  ctx.lineWidth = 1;

  // Borders: from the left and top edges of the window into the corner
  ctx.beginPath();
  ctx.moveTo(0, o.y1);
  ctx.lineTo(o.x1, o.y1);
  ctx.lineTo(o.x1, 0);
  ctx.moveTo(0, i.y1);
  ctx.lineTo(i.x1, i.y1);
  ctx.lineTo(i.x1, 0);

  // Zones, counted from the top-left of the window
  const cols = Math.max(2, Math.round(i.x1 / ZONE));
  const rows = Math.max(2, Math.round(i.y1 / ZONE));
  const zw = i.x1 / cols;
  const zh = i.y1 / rows;
  for (let c = 1; c < cols; c++) {
    const x = Math.round(c * zw) + 0.5;
    ctx.moveTo(x, i.y1);
    ctx.lineTo(x, o.y1);
  }
  for (let r = 1; r < rows; r++) {
    const y = Math.round(r * zh) + 0.5;
    ctx.moveTo(i.x1, y);
    ctx.lineTo(o.x1, y);
  }
  ctx.stroke();

  // A dot where the zone boundaries cross, on the layer behind the content
  if (dots) {
    dots.clearRect(0, 0, w, h);
    dots.fillStyle = LINE;
    for (let c = 1; c < cols; c++) {
      for (let r = 1; r < rows; r++) {
        dots.beginPath();
        dots.arc(
          Math.round(c * zw) + 0.5,
          Math.round(r * zh) + 0.5,
          1.6,
          0,
          2 * Math.PI,
        );
        dots.fill();
      }
    }
  }

  // Zone references, centred in the band
  ctx.font = `${Math.max(9, Math.round(band * 0.62))}px ${FONT}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const midBottom = (i.y1 + o.y1) / 2;
  const midRight = (i.x1 + o.x1) / 2;
  // The window shows the bottom-right quarter of a sheet twice as wide and
  // twice as tall: the references go on from where the hidden half stops.
  for (let c = 0; c < cols; c++)
    ctx.fillText(String(cols + c + 1), (c + 0.5) * zw, midBottom);
  for (let r = 0; r < rows; r++)
    ctx.fillText(String.fromCharCode(65 + rows + r), midRight, (r + 0.5) * zh);
}

export function initSheetGrid() {
  const canvas = document.getElementById("sheet-grid");
  if (!(canvas instanceof HTMLCanvasElement)) return;
  const dots = document.getElementById(
    "sheet-dots",
  ) as HTMLCanvasElement | null;
  new ResizeObserver(() => draw(canvas, dots)).observe(canvas);
  // Redraw once the lettering font is available for the zone references
  document.fonts?.load(`12px ${FONT}`).then(() => draw(canvas, dots));
}
