# Gabriel Oyetunji Product Engineering Portfolio

Portfolio for backend platforms, AI-enabled products, data-heavy systems, scientific apps, and polished web interfaces. Built with **Vite**, **React**, **TypeScript**, **Lenis** (smooth scroll), and **GSAP** (intro + hero staging).

Live site: https://gabriel-portfolio-orpin.vercel.app

## Local development

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

Vercel: set **Build command** to `npm run build` and **Output directory** to `dist` (auto-detected for Vite).

## Structure

- `index.html` — Vite entry, meta tags, preload for hero image
- `src/` — React app (`App.tsx`, hooks, `IntroLoader`)
- `src/index.css` — layout and visual system (migrated from the previous static stylesheet)
- `public/images/` — project and profile media
- `public/resume/` — downloadable resume
- `public/robots.txt`, `public/sitemap.xml`, `public/site.webmanifest`, `public/favicon.svg` — SEO and PWA metadata

## Motion

- **Intro loader**: cycles greetings, then fades (skipped when `prefers-reduced-motion: reduce`).
- **Lenis**: smooth scrolling when motion is allowed and after the intro completes.
- **Hero**: light stagger after intro (also respects reduced motion).
