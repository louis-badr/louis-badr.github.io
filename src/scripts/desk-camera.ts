// Camera and hands over the desk (components/DeskScene.astro). The notes and
// the gallery are the same page as the desk; the address follows (/desk/,
// /notes/, /gallery/) without reloading.
//
// - Notes: the camera moves onto the notebook, which is put straight.
//   Sharpness: the close-up is not a scaled picture of the desk. The mat is
//   really laid out larger (--k) and placed so the notebook fills the window;
//   only the movement in between is a transform ("FLIP"), and it ends with
//   no scaling or rotation at all.
// - Gallery: the notebook and the pen are pushed aside and the prints are
//   spread out on the mat; one can be picked up to look at it closely.
//
// Ways back: the magnifier button, a click beside, Escape, the back button.

type View = "desk" | "notebook" | "prints";

const PATHS: Record<View, string> = {
  desk: "/desk/",
  notebook: "/notes/",
  prints: "/gallery/",
};
const TITLES: Record<View, string> = {
  desk: "Gallery & Notes • Louis Badr",
  notebook: "Notes • Louis Badr",
  prints: "Gallery • Louis Badr",
};
const DURATION = 700; // ms
const EASE = "cubic-bezier(0.6, 0, 0.25, 1)";
const PRINT = 26; // cm, long side of a print before scaling (DeskScene)

const viewOf = (path: string): View =>
  path.startsWith("/notes/")
    ? "notebook"
    : path.startsWith("/gallery/")
      ? "prints"
      : "desk";

export function initDeskCamera() {
  const scene = document.querySelector<HTMLElement>(".scene");
  const notebook = scene?.querySelector<HTMLElement>(".notebook");
  const pile = scene?.querySelector<HTMLElement>(".prints");
  if (!scene || !notebook || !pile) return;
  const mat: HTMLElement = scene;
  const book: HTMLElement = notebook;
  const stack: HTMLElement = pile;
  const surface = mat.parentElement!;

  const phone = window.matchMedia("(max-width: 767px)");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const animated = () => !reduced.matches;
  const view = () => mat.dataset.view as View;

  // ---------- Camera on the notebook ----------

  /** What the camera looks at: the notebook, or one of its pages on phones. */
  const target = () =>
    phone.matches
      ? book.querySelector<HTMLElement>(
          mat.dataset.focus === "note" ? ".page.right" : ".page.left",
        )!
      : book;

  function clearZoom() {
    mat.classList.remove("zoomed");
    mat.style.removeProperty("--k");
    mat.style.left = "";
    mat.style.top = "";
    mat.style.transition = "none";
    mat.style.transform = "";
  }

  /** Close-up on the notebook, measured on the desk framing. */
  function measure() {
    clearZoom();
    const sr = surface.getBoundingClientRect();
    const mr = mat.getBoundingClientRect();
    const el = target();
    const tr = el.getBoundingClientRect();
    const k = Math.min(
      (innerWidth * (phone.matches ? 0.9 : 0.92)) / el.offsetWidth,
      (innerHeight * 0.92) / el.offsetHeight,
    );
    // Notebook centre on the mat, before and after enlarging it
    const px = (tr.left + tr.width / 2 - mr.left) * k;
    const py = (tr.top + tr.height / 2 - mr.top) * k;
    // Where the enlarged mat goes so the notebook is in the middle of the window
    const left = innerWidth / 2 - sr.left - px;
    const top = innerHeight / 2 - sr.top - py;
    // The desk framing, expressed on the enlarged mat
    const dx = mr.left - sr.left - left;
    const dy = mr.top - sr.top - top;
    return {
      k,
      left,
      top,
      start: `translate(${dx}px, ${dy}px) scale(${1 / k})`,
    };
  }

  function place(m: ReturnType<typeof measure>, transform: string) {
    mat.classList.add("zoomed");
    mat.style.setProperty("--k", String(m.k));
    mat.style.left = `${m.left}px`;
    mat.style.top = `${m.top}px`;
    mat.style.transform = transform;
  }

  function animateTo(transform: string, then?: () => void) {
    mat.getBoundingClientRect(); // commit the starting point
    mat.style.transition = `transform ${DURATION}ms ${EASE}`;
    mat.style.transform = transform;
    if (then) setTimeout(then, DURATION);
  }

  function zoomIn(animate: boolean) {
    const m = measure();
    if (!animate) return place(m, "none");
    place(m, m.start);
    animateTo("translate(0px, 0px) scale(1)");
  }

  function zoomOut(animate: boolean) {
    const m = measure();
    if (!animate) return;
    place(m, "translate(0px, 0px) scale(1)");
    animateTo(m.start, () => view() !== "notebook" && clearZoom());
  }

  // ---------- Prints spread out on the mat ----------

  const prints = () =>
    [...stack.querySelectorAll<HTMLElement>(".print")].reverse(); // latest first
  const total = prints().length;
  let focused = -1;

  /** Mat size and the pile's centre, in centimetres. */
  function geometry() {
    const landscape = mat.clientWidth >= mat.clientHeight;
    const cm = mat.clientWidth / (landscape ? 29.7 : 21);
    return {
      w: mat.clientWidth / cm,
      h: mat.clientHeight / cm,
      cx: (stack.offsetLeft + stack.offsetWidth / 2) / cm,
      cy: (stack.offsetTop + stack.offsetHeight / 2) / cm,
    };
  }

  const set = (
    p: HTMLElement,
    dx: number,
    dy: number,
    s: number,
    rot?: number,
  ) => {
    p.style.setProperty("--dx", `calc(var(--cm) * ${dx})`);
    p.style.setProperty("--dy", `calc(var(--cm) * ${dy})`);
    p.style.setProperty("--s", String(s));
    if (rot === undefined) p.style.removeProperty("--rot");
    else p.style.setProperty("--rot", `${rot}deg`);
  };

  /** Lay all the prints out in rows on the mat, the latest first. */
  function spread() {
    const g = geometry();
    const margin = 0.8; // just inside the printed grid
    const W = g.w - 2 * margin;
    const H = g.h - 2 * margin;
    const ratios = prints().map(
      (p) => parseFloat(p.style.getPropertyValue("--ratio")) || 1.5,
    );
    // Each print fills its cell as far as its proportions allow
    const fit = (cw: number, ch: number, r: number) =>
      r >= 1 ? Math.min(cw, ch * r) : Math.min(ch, cw / r);
    const area = (cw: number, ch: number, r: number) => {
      const long = fit(cw, ch, r);
      return r >= 1 ? long * (long / r) : long * (long * r);
    };
    // Columns that give the largest prints overall
    let cols = 1;
    let best = 0;
    for (let c = 1; c <= total; c++) {
      const cw = W / c;
      const ch = H / Math.ceil(total / c);
      const sum = ratios.reduce((acc, r) => acc + area(cw, ch, r), 0);
      if (sum > best) [best, cols] = [sum, c];
    }
    const rows = Math.ceil(total / cols);
    const cw = W / cols;
    const ch = H / rows;
    prints().forEach((p, i) => {
      const img = p.querySelector("img")!;
      if (!img.getAttribute("src")) img.src = p.dataset.thumb!;
      const x = margin + ((i % cols) + 0.5) * cw;
      const y = margin + (Math.floor(i / cols) + 0.5) * ch;
      // Nearly touching, as when photos are spread out by hand
      set(p, x - g.cx, y - g.cy, (fit(cw, ch, ratios[i]) * 0.95) / PRINT);
    });
  }

  /** Put the prints back in the pile. */
  function gather() {
    unfocus();
    prints().forEach((p) => {
      p.style.removeProperty("--dx");
      p.style.removeProperty("--dy");
      p.style.removeProperty("--s");
      p.style.removeProperty("--rot");
    });
  }

  /** Pick a print up and hold it in the middle of the mat. */
  function focus(i: number) {
    const list = prints();
    if (focused >= 0) {
      list[focused].classList.remove("focus");
      spread();
    }
    focused = (i + total) % total;
    const p = list[focused];
    const g = geometry();
    const ratio = parseFloat(p.style.getPropertyValue("--ratio")) || 1.5;
    const w = ratio >= 1 ? PRINT : PRINT * ratio;
    const h = ratio >= 1 ? PRINT / ratio : PRINT;
    const s = Math.min((g.w * 0.9) / w, (g.h * 0.7) / h, 1);
    set(p, g.w / 2 - g.cx, g.h * 0.4 - g.cy, s, 0);
    p.classList.add("focus");
    mat.classList.add("focusing");
    const img = p.querySelector("img")!;
    img.src = p.dataset.anim ?? p.dataset.full!;
    const bar = surface.querySelector(".flip")!;
    bar.querySelector(".meta")!.textContent = p.dataset.meta ?? "";
    bar.querySelector(".caption")!.textContent = p.dataset.caption ?? "";
    bar.querySelector(".count")!.textContent = `${focused + 1} / ${total}`;
  }

  function unfocus() {
    if (focused < 0) return;
    const p = prints()[focused];
    p.classList.remove("focus");
    if (p.dataset.anim) p.querySelector("img")!.src = p.dataset.thumb!;
    focused = -1;
    mat.classList.remove("focusing");
    if (view() === "prints") spread();
  }

  // ---------- Views ----------

  function show(next: View, animate: boolean) {
    const from = view();
    const move = animate && animated();
    document.title = TITLES[next];
    if (from === "notebook" && next !== "notebook") zoomOut(move);
    mat.dataset.view = next;
    if (next === "notebook" && from !== "notebook") zoomIn(move);
    if (next === "prints") spread();
    else if (from === "prints") gather();
  }

  const go = (next: View) => {
    if (location.pathname !== PATHS[next])
      history.pushState({ view: next }, "", PATHS[next]);
    show(next, true);
  };

  mat.querySelector("a.open-notes")?.addEventListener("click", (e) => {
    e.preventDefault();
    go("notebook");
  });
  mat.querySelector("a.open-prints")?.addEventListener("click", (e) => {
    e.preventDefault();
    go("prints");
  });

  const back = (e: Event) => {
    if (view() === "desk") return;
    e.preventDefault();
    if (focused >= 0) return unfocus();
    go("desk");
  };
  surface.querySelector(".lens-out")?.addEventListener("click", (e) => {
    e.preventDefault();
    unfocus();
    go("desk");
  });

  surface.addEventListener("click", (e) => {
    const t = e.target as Element;
    // Not the controls, nor the click that just opened the object
    if (view() === "desk" || t.closest(".lens-out, .flip, .open")) return;
    if (view() === "prints") {
      const p = t.closest<HTMLElement>(".print");
      if (!p) return back(e);
      const i = prints().indexOf(p);
      return i === focused ? unfocus() : focus(i);
    }
    if (!book.contains(t)) back(e);
  });

  surface
    .querySelectorAll<HTMLButtonElement>("[data-flip]")
    .forEach((b) =>
      b.addEventListener("click", () =>
        focus(focused + Number(b.dataset.flip)),
      ),
    );

  addEventListener("keydown", (e) => {
    if (e.key === "Escape") back(e);
    if (view() !== "prints") return;
    if (e.key === "ArrowRight") focus(focused + 1);
    if (e.key === "ArrowLeft") focus(focused < 0 ? total - 1 : focused - 1);
  });

  addEventListener("popstate", () => show(viewOf(location.pathname), true));

  // Keep things framed when the window changes size
  let size = `${innerWidth}x${innerHeight}`;
  addEventListener("resize", () => {
    if (`${innerWidth}x${innerHeight}` === size) return;
    size = `${innerWidth}x${innerHeight}`;
    if (view() === "notebook") zoomIn(false);
    if (view() === "prints") focused >= 0 ? focus(focused) : spread();
  });

  // Pages opened on the notes or the gallery start there
  const start = () => {
    const initial = view();
    mat.dataset.view = "desk";
    if (initial !== "desk") {
      // Arrive already in place: no movement on load
      const moving = [
        book,
        ...stack.querySelectorAll<HTMLElement>(".print"),
        ...mat.querySelectorAll<HTMLElement>(".desk-pen"),
      ];
      moving.forEach((el) => (el.style.transition = "none"));
      show(initial, false);
      mat.getBoundingClientRect();
      requestAnimationFrame(() =>
        moving.forEach((el) => (el.style.transition = "")),
      );
    }
    mat.classList.add("ready");
  };
  if (document.fonts) document.fonts.ready.then(start);
  else start();
}
