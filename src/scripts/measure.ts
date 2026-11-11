// Dimension tool: drag on the canvas to draw a double-headed arrow showing
// its length in pixels, like a dimension line on a technical drawing.

const COLOR = "#2e45ed";
const HEAD = 10;
const MIN_LENGTH = 100;
const LABEL_GAP = 20;

/** `label` defaults to the measured length in px. */
export function drawDimension(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  label?: string,
) {
  const length = Math.hypot(x2 - x1, y2 - y1);
  if (length < MIN_LENGTH) return;
  const angle = Math.atan2(y2 - y1, x2 - x1);

  ctx.strokeStyle = COLOR;
  ctx.fillStyle = COLOR;
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  // Arrow heads at both ends
  for (const [x, y, dir] of [
    [x2, y2, -1],
    [x1, y1, 1],
  ] as const) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(
      x + dir * HEAD * Math.cos(angle - Math.PI / 7),
      y + dir * HEAD * Math.sin(angle - Math.PI / 7),
    );
    ctx.lineTo(
      x + dir * HEAD * Math.cos(angle + Math.PI / 7),
      y + dir * HEAD * Math.sin(angle + Math.PI / 7),
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  // Clear the middle of the line and write the length there
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(mx, my, LABEL_GAP, 0, 2 * Math.PI);
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";

  ctx.font = "16px osifont, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label ?? length.toFixed(0), mx, my);
}

/**
 * @param background drawn again every time the canvas is cleared
 *   (e.g. a fixed dimension that should stay under the user's own).
 */
export function initMeasure(
  canvas: HTMLCanvasElement,
  background?: (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => void,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  let start: { x: number; y: number } | null = null;

  const clear = () => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    background?.(ctx, canvas.clientWidth, canvas.clientHeight);
  };
  const resize = () => {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    clear();
  };
  const point = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  new ResizeObserver(resize).observe(canvas);
  // Redraw once the web font is available for the labels
  document.fonts?.ready.then(() => !start && clear());

  canvas.addEventListener("pointerdown", (e) => {
    canvas.setPointerCapture(e.pointerId);
    start = point(e);
    clear();
  });
  canvas.addEventListener("pointermove", (e) => {
    if (!start) return;
    const p = point(e);
    clear();
    drawDimension(ctx, start.x, start.y, p.x, p.y);
  });
  const stop = () => (start = null);
  canvas.addEventListener("pointerup", stop);
  canvas.addEventListener("pointercancel", stop);
}
