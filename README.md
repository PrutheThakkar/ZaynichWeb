# Zaynich — Gatsby site

Converted from the original static HTML/CSS/JS `zynich-web` project.

## Run it

```
npm install
npm run develop
```

Then open http://localhost:8000

## Production build

```
npm run build
npm run serve
```

## What changed vs. the original HTML site

- **Pages**: each `.html` file is now a page component in `src/pages/`. Routes:
  `/`, `/what-is-amr/`, `/the-zaynich-journey/`, `/broad-spectrum/`,
  `/mechanism-of-action/`, `/dosage/`, `/compassionate-use/`,
  `/risks-and-hospitalisation/` (this last one was never linked from
  navigation in the original site either — the "Risks & Hospitalisation"
  menu item points at `/what-is-amr/#amrRisk`).
- **Header, footer, safety bar, page banner, and the repeated safety/PI
  block** are now real React components (`src/components/`) instead of
  being fetched at runtime via `data-include` + `component-loader.js`.
- **Swiper carousels, the AMR counters, and the risk-ring animations**
  are ported into small React components (`HeroSwiper`, `BenefitsSwiper`,
  `JourneyBannerSwiper`, `CountUp`, `AmrRiskMetric`) using the `swiper`
  npm package, wired up with the same DOM logic as the original JS files.
- **Styles**: the original `.scss` files are used directly via
  `gatsby-plugin-sass`; `site.css` is kept as-is. Two hard-coded relative
  asset paths (`../fonts/...`, `../assets/img/...`) were changed to
  root-absolute (`/fonts/...`, `/assets/img/...`) so they resolve
  correctly regardless of where webpack emits the compiled CSS.
- **Assets** (images, PDFs, fonts, videos) live under `static/` and are
  served at the same paths as before (e.g. `/assets/img/...`).

## A few things worth knowing

- The unused GSAP `<script>` tag from `index.html` was dropped — nothing
  in the codebase actually called `gsap.*`; the hero logo animation is
  pure CSS.
- Header/footer icons and the footer logo were hot-linked from
  `https://studiosentientdemo.com/...` in the original source even
  though local copies of every one of those images already existed in
  `assets/img/`. They now point at the local files instead, so the site
  doesn't depend on that external domain.
- The footer's logo `alt`/`aria-label` said "Novartis" — almost
  certainly copy-paste leftover from a template, since this is a
  Wockhardt site. Changed to "Wockhardt".
- `what-is-amr.scss` has a `background-image: url("/assets/img/world-map.png")`
  rule, but `world-map.png` doesn't exist anywhere in the original
  assets either — this was already a broken reference before the
  conversion. Add the image or remove the rule.
- The top-header "Prescribing Information" link and the
  `risks-and-hospitalisation` page were effectively unbuilt/unlinked in
  the original site too — kept as-is for parity rather than invented.
