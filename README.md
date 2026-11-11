# louis-badr.fr

Portfolio of Louis Badr, built with [Astro](https://astro.build) and Tailwind CSS, deployed on GitHub Pages.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
npm run preview  # serve dist/
```

## Content

| What | Where |
| --- | --- |
| Projects | `src/content/projects/*.md` (front matter: title, subtitle, year, order, image, links) |
| Notes | `src/content/notes/*.md` (`draft: true` hides a note) |
| Gallery | `src/content/gallery.json` + pictures in `src/assets/gallery/` |
| Skills, bio | `src/pages/aboutme.astro` |
| CV | `cv.typ` → `npm run cv` writes `public/cv.pdf` |

Images placed in `src/assets/` are resized and converted to WebP at build time: drop in the original photo.

### Gallery animations

Animated WebP originals go in `raw/animations/` (not committed, they are huge).
`npm run optimize:animations` writes a lighter copy to `public/gallery/` and the first frame to
`src/assets/gallery/` (used for the thumbnail). Add the entry to `gallery.json` with
`"animation": "/gallery/<name>.webp"`.
Settings: `LONG_EDGE` (default 720 px), `QUALITY` (50), `MIN_DELAY` (33 ms ≈ 30 fps).

## Structure

- `src/layouts/Base.astro`: page shell, meta tags, blueprint background
- `src/scripts/blueprint.ts`: rulers, grid and glow (configured per page with `axes`, `origin`, `glow`)
- `src/scripts/measure.ts`: dimension tool on the home page
- `src/components/`: title block, navigation arrows, notebook, link chips

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`.
In the repository settings, *Pages → Source* must be set to **GitHub Actions**.
The REV shown in the title block is the `version` in `package.json`.
