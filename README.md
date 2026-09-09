# sabitkadli.com

Personal portfolio for Sabit Kadli: Business Analyst, IT Consultant, Solution Architect, and Full-Stack Developer.

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and shadcn/ui. Deployed on Vercel under the custom domain `sabitkadli.com`.

## Stack

- **Framework**: Next.js 14, App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3, shadcn/ui design tokens, CSS custom properties
- **Animations**: GSAP + ScrollTrigger (cinematic footer, TrilloBytes parallax/sticky-morph/horizontal-scroll), CSS transitions (scroll sections), IntersectionObserver, CSS scroll-driven animations (progressive enhancement)
- **Fonts**: Inter via `next/font/google`
- **Deployment**: Vercel, custom domain `sabitkadli.com`

## Project Structure

```text
src/
|-- app/
|   |-- layout.tsx              Root layout: metadata, JSON-LD schema, hreflang, favicon
|   |-- page.tsx                Home page
|   |-- globals.css             Design tokens and animation utilities
|   |-- sitemap.ts              Auto-generated /sitemap.xml
|   |-- blog/
|   |   |-- page.tsx            Blog index
|   |   `-- [slug]/page.tsx     Individual articles, statically generated
|   |-- cv/page.tsx             Printable CV
|   `-- games/page.tsx          Interactive skill games
|-- components/
|   |-- layout/
|   |   |-- Header.tsx
|   |   |-- ParticleCanvas.tsx  Canvas particle background, SSR-disabled
|   |   `-- motion-footer.tsx   GSAP cinematic footer
|   |-- sections/
|   |   |-- TrilloBytes.tsx     Venture showcase: parallax orbs, sticky morph, pinned horizontal scroll
|   |   `-- ...                 Other home page sections
|   |-- games/                  Four interactive games
|   `-- ui/
|       `-- FadeInOnScroll.tsx  Scroll animation wrapper
|-- hooks/
|   `-- useCounter.ts           Animated metric counter
`-- lib/
    |-- data.ts                 Portfolio content
    |-- blog-data.ts            Blog post content
    `-- utils.ts                shadcn cn() helper
public/
|-- assets/profile.jpg
`-- robots.txt
```

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Vercel-compatible production build
npm run lint
```

## Updating Content

All portfolio content lives in `src/lib/data.ts`: skills, timeline (incl. the TrilloBytes Director & Owner entry), TrilloBytes venture copy, metrics, testimonials, and contact details. Blog posts are in `src/lib/blog-data.ts`. No CMS required.

## Scroll-Driven Effects

The implementation plan for the scroll-driven interactions (parallax, IntersectionObserver reveals, pinned horizontal scroll, sticky morphing — plus the pure-CSS/vanilla-JS variant, performance budget, and reduced-motion/mobile fallbacks) is documented in [`docs/SCROLL-EFFECTS-PLAN.md`](docs/SCROLL-EFFECTS-PLAN.md).

## Deployment

Vercel auto-detects this as a Next.js project.

- **Install command**: `npm ci`
- **Build command**: `npm run build`
- **Output directory**: managed by Vercel for Next.js

Deploy manually with:

```bash
npx vercel --prod
```

The custom domain should be managed in the Vercel project settings. GitHub Pages `CNAME` files are intentionally not used.

## License

Personal portfolio: all rights reserved.
