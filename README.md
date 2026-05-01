# sabitkadli.com

Personal portfolio for Sabit Kadli — Business Analyst, IT Consultant, Solution Architect, and Full-Stack Developer.

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and shadcn/ui. Deployed as a static export to GitHub Pages under a custom domain.

## Stack

- **Framework** — Next.js 14, App Router, `output: "export"` for static hosting
- **Language** — TypeScript
- **Styling** — Tailwind CSS v3, shadcn/ui design tokens, CSS custom properties
- **Animations** — GSAP (footer), CSS transitions (scroll sections), IntersectionObserver
- **Fonts** — Inter via `next/font/google`
- **Deployment** — GitHub Pages, custom domain `sabitkadli.com`

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              Root layout — metadata, JSON-LD schema, hreflang, favicon
│   ├── page.tsx                Home page
│   ├── globals.css             Design tokens and animation utilities
│   ├── sitemap.ts              Auto-generated /sitemap.xml
│   ├── blog/
│   │   ├── page.tsx            Blog index
│   │   └── [slug]/page.tsx     Individual articles (5 posts, statically generated)
│   ├── cv/page.tsx             Printable CV — browser Print to Save as PDF
│   └── games/page.tsx          Interactive skill games
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── ParticleCanvas.tsx  Canvas particle background (SSR-disabled)
│   │   └── motion-footer.tsx   GSAP cinematic footer
│   ├── sections/               Home page sections
│   ├── games/                  Four interactive games (API, SQL, React, Telephony)
│   └── ui/
│       └── FadeInOnScroll.tsx  Bidirectional scroll animation wrapper
├── hooks/
│   └── useCounter.ts           Animated metric counter
└── lib/
    ├── data.ts                 All portfolio content — edit here to update the site
    ├── blog-data.ts            Blog post content
    └── utils.ts                shadcn cn() helper
public/
├── assets/profile.jpg
├── robots.txt
└── CNAME
```

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to out/
npm run lint
```

## Updating Content

All portfolio content lives in `src/lib/data.ts` — skills, timeline, metrics, testimonials, contact details. Blog posts are in `src/lib/blog-data.ts`. No CMS required.

## Deployment

`npm run build` produces a fully static site in `out/`. Push that to the `gh-pages` branch or configure GitHub Pages to serve from it. The `CNAME` file handles the custom domain automatically.

## License

Personal portfolio — all rights reserved.
