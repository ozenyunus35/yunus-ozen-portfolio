# Yunus Emre Özen — Portfolio

Personal portfolio site documenting selected product and engineering work, process notes, and learning milestones. Built as a static Next.js site and deployed to GitHub Pages.

**Live site:** [https://ozenyunus35.github.io/yunus-ozen-portfolio/](https://ozenyunus35.github.io/yunus-ozen-portfolio/)

## Featured projects

- **Bi-Sevk** — Logistics marketplace connecting shippers with carriers
- **Eyfel Kurye** — Restaurant and courier operations platform
- **FMD Eğitim Portalı** — Education management panel (UI/UX & information architecture)
- **Tavuk da Tavuk** — Corporate website and QR menu platform

Each project includes a case study with system diagrams and process context.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, static export)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/), [Lenis](https://lenis.darkroom.engineering/)

## Local development

Requirements: Node.js 20+ and npm.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Development runs without a GitHub Pages base path.

## Build

Static export (local verification, no repo subpath):

```bash
npm run build
```

GitHub Pages production build (matches CI):

```bash
npm run build:pages
```

Preview the exported site locally:

```bash
npm run preview:pages
# open http://localhost:3000/yunus-ozen-portfolio/
```

Type check:

```bash
npm run typecheck
```

## Deployment (GitHub Pages)

**One-time setup:** In the repository go to **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**. Deploy will fail with a 404 until this is done.

This repository deploys automatically via GitHub Actions on pushes to `main`.

1. Push the repository to GitHub as `yunus-ozen-portfolio`.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. The workflow builds with:
   - `NEXT_PUBLIC_BASE_PATH=/${{ github.event.repository.name }}`
   - `NEXT_PUBLIC_SITE_URL=https://${{ github.repository_owner }}.github.io/${{ github.event.repository.name }}`
4. Static files are uploaded from the `out/` directory.

For manual local parity, copy `.env.example` to `.env.local` and adjust values if needed.

## Repository notes

- `out/`, `.next/`, and `node_modules/` are gitignored.
- Do not commit `.env` or `.env.local` — only `.env.example` is tracked.
- CV download is served from `public/documents/` when the PDF is present at build time.

## Author

**Yunus Emre Özen**

- GitHub: [@ozenyunus35](https://github.com/ozenyunus35)
- LinkedIn: [yunus-ozen](https://www.linkedin.com/in/yunus-ozen/)
- Email: ozenyunusemre@outlook.com
