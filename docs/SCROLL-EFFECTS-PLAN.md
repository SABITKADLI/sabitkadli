# Scroll-Driven Interactive Elements — Implementation Plan

**Project:** sabitkadli.com (personal portfolio) + `TrilloBytes` venture showcase
**Aesthetic:** Dark, futuristic, "terminal" minimalism — blue `#4a9eff` / green `#00d9a3` accents
**Moving elements:** background orbs (parallax), content cards (reveals), delivery-process cards (horizontal scroll), "TIB" badge (sticky morph)

| Effect | Shipped implementation (Option B) | Pure-CSS/IO equivalent (Option A) |
|---|---|---|
| Parallax | `src/components/ui/ParallaxLayer.tsx` | §A.1 |
| Scroll-triggered reveal | `src/components/ui/FadeInOnScroll.tsx` (existing) | §A.2 + `.sd-reveal` in `globals.css` |
| Horizontal scroll section | `TrilloBytes.tsx` → delivery playbook | §A.3 |
| Sticky morphing | `TrilloBytes.tsx` → TIB badge | §A.4 |

Everything JS-driven is gated by `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`
and falls back to a readable static layout — see §4.

---

## 1. Architecture (what already exists in this repo)

```
src/
├─ app/
│  ├─ page.tsx                    → mounts <TrilloBytes /> after <HeroSummary />
│  └─ globals.css                 → scroll-driven CSS: GPU hints, fallbacks,
│                                   .sd-reveal (Option A), prefers-reduced-motion
├─ components/
│  ├─ ui/
│  │  ├─ FadeInOnScroll.tsx       → IO-based reveal (bidirectional, stagger)
│  │  └─ ParallaxLayer.tsx        → GSAP scrubbed parallax wrapper (Option B ①)
│  └─ sections/
│     └─ TrilloBytes.tsx          → ③ horizontal pin + ④ sticky morph + ① orbs
└─ lib/data.ts                    → TRILLOBYTES content + timeline entry
```

Decision: **Option B (GSAP ScrollTrigger)** for the shipped site because `gsap` is
already in the bundle (used by `motion-footer.tsx`), and it covers all four effects
with one engine. **Option A** is fully documented below for the static pages
(`index.html`, `games.html`) or any site without a JS framework.

---

## 2. Option B — GSAP + ScrollTrigger (shipped)

```bash
npm install gsap          # already present in this repo
```

```ts
// One-time registration, guarded for SSR (Next.js safe)
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);
```

### ②–④ Core pattern: `gsap.matchMedia()`

Every effect lives inside a media-query context. If the query stops matching
(resize below breakpoint, OS reduced-motion toggles on), GSAP **reverts** the
animation and restores the DOM automatically.

```tsx
useEffect(() => {
  const mm = gsap.matchMedia();

  mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
    /* … create tweens / ScrollTriggers here … */
    return () => { /* optional extra cleanup */ };
  });

  return () => mm.revert(); // React unmount cleanup
}, []);
```

### ③ Horizontal scroll (delivery playbook)

```tsx
// Track is `display:flex; width:max-content` ONLY when JS flips
// .is-gsap-horizontal on the wrapper (see globals.css). Without JS → grid.
const distance = () => Math.max(0, track.scrollWidth - wrap.clientWidth);

gsap.to(track, {
  x: () => -distance(),          // function-based → recalculated on refresh/resize
  ease: "none",                  // scroll position IS the easing
  scrollTrigger: {
    trigger: wrap,
    start: "top 12%",            // park below the sticky site header
    end: () => `+=${distance()}`,
    pin: true,                   // wrapper locks; vertical scroll → x translate
    scrub: 1,                    // 1s catch-up smoothing (kills janky flick input)
    anticipatePin: 1,            // spacing inserted early → no layout jump
    invalidateOnRefresh: true,
  },
});
```

### ④ Sticky morphing (TIB badge)

The *stickiness* is plain CSS (`md:sticky md:top-36`) — no JS. GSAP scrubs a
morph timeline across the two-column row while the copy scrolls past:

```tsx
const tl = gsap.timeline({
  scrollTrigger: { trigger: wrap, start: "top 60%", end: "bottom 70%", scrub: 0.6 },
  defaults: { ease: "power2.inOut", duration: 1 },
});
tl.to(blob, { borderRadius: "30%", rotate: 90,  scale: 1.07, filter: "hue-rotate(130deg)" }, 0.35)
  .to(labels[0], { autoAlpha: 0, y: -12 }, 0.35)          // Think fades out
  .to(labels[1], { autoAlpha: 1, y: 0 }, 0.6)             // Integrate fades in
  .to(blob, { borderRadius: "14%", rotate: 180, scale: 1.14, filter: "hue-rotate(260deg)" }, 1.7)
  .to(labels[1], { autoAlpha: 0, y: -12 }, 1.7)
  .to(labels[2], { autoAlpha: 1, y: 0 }, 1.95);           // Build fades in
```

### ① Parallax (`ParallaxLayer.tsx`)

```tsx
gsap.fromTo(el, { y: -travel }, {
  y: travel,
  ease: "none",
  scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: 0.8 },
});
```

---

## 3. Option A — Native CSS + vanilla JS (zero dependencies)

Use this on static sites or when bundle size matters. Same four effects.

### A.1 Parallax — IntersectionObserver-gated rAF loop

Only run the scroll math while the target is on screen; write a composited
`translate3d`; listen passively.

```html
<div class="parallax-shape" data-speed="0.35" aria-hidden="true"></div>
<style>
  /* Hardware acceleration: own compositor layer, painted once */
  .parallax-shape {
    position: absolute; width: 260px; height: 260px; border-radius: 50%;
    background: radial-gradient(circle, rgba(74,158,255,.25), transparent 70%);
    will-change: transform; contain: layout paint;
  }
  @media (prefers-reduced-motion: reduce) { .parallax-shape { display: none; } }
</style>
<script>
(() => {
  const shapes = [...document.querySelectorAll(".parallax-shape")];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const visible = new Set();   // only animate what's on screen
  let ticking = false;

  // 1. Observe visibility — no work for off-screen elements
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => e.isIntersecting ? visible.add(e.target) : visible.delete(e.target));
  });
  shapes.forEach(el => io.observe(el));

  // 2. rAF-throttled scroll handler: one style write per frame max
  function update() {
    ticking = false;
    const vh = innerHeight;
    visible.forEach(el => {
      const r = el.getBoundingClientRect();            // read…
      const progress = (r.top + r.height / 2 - vh / 2) / vh; // -0.5 … 0.5
      const y = -progress * 160 * parseFloat(el.dataset.speed || 0.3);
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`; // …then write
    });
  }
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }

  function enable()  { addEventListener("scroll", onScroll, { passive: true }); onScroll(); }
  function disable() { removeEventListener("scroll", onScroll); shapes.forEach(el => el.style.transform = ""); }

  // 3. Respect reduced motion — react to live changes too
  reduced.addEventListener("change", () => (reduced.matches ? disable() : enable()));
  if (!reduced.matches) enable();
})();
</script>
```

Key points: `{ passive: true }` never blocks scrolling; reads and writes are
batched inside the same rAF (no layout thrash); `translate3d` keeps it on the GPU.

### A.2 Scroll-triggered reveal — pure CSS (`animation-timeline`) + IO fallback

**Modern path (Chrome/Edge 115+, Safari 26+)** — no JS at all. Already shipped in
`globals.css` as `.sd-reveal`:

```css
@keyframes sd-reveal-in {
  from { opacity: 0; transform: translate3d(0, 30px, 0); }
  to   { opacity: 1; transform: translate3d(0, 0, 0); }
}
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .sd-reveal {
      animation: sd-reveal-in linear both;
      animation-timeline: view();      /* progress = element crossing viewport */
      animation-range: entry 0% entry 45%;
    }
  }
}
```

**Universal path — IntersectionObserver** (this is exactly what the site's
`FadeInOnScroll.tsx` does in React; here as vanilla JS):

```css
.reveal { opacity: 0; transform: translateY(28px);
          transition: opacity .55s cubic-bezier(.22,1,.36,1), transform .55s cubic-bezier(.22,1,.36,1); }
.reveal.is-visible { opacity: 1; transform: none; }
/* IMPORTANT: reveal only applies when JS is running — no-JS users see content */
.reveal { visibility: visible; } /* elements start visible in HTML; JS adds .reveal at init */
```

```js
// Add the hidden-state class from JS (progressive enhancement), then observe.
const els = document.querySelectorAll("[data-reveal]");
els.forEach(el => el.classList.add("reveal"));

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => e.target.classList.toggle("is-visible", e.isIntersecting));
  // one-way instead? → if (e.isIntersecting) { add; io.unobserve(e.target); }
}, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }); // fire slightly before fully in view

els.forEach(el => io.observe(el));
```

### A.3 Horizontal scroll — CSS-only sticky technique

No GSAP needed: a tall spacer section defines the scroll distance; a sticky
viewport frame stays pinned via CSS; IO… can't translate, so the scroll handler
from A.1 drives `translateX`. (For a *fully* JS-free version, consider
**scroll-snap** instead — see below.)

```html
<section class="h-scroll" style="--distance: 2600px;">
  <div class="h-sticky">
    <div class="h-track">
      <!-- cards… -->
    </div>
  </div>
</section>
<style>
  .h-scroll  { height: calc(100vh + var(--distance)); }   /* scroll runway */
  .h-sticky  { position: sticky; top: 0; height: 100vh;
               display: flex; align-items: center; overflow: hidden; }
  .h-track   { display: flex; gap: 1.5rem; padding: 0 6vw;
               will-change: transform; }
  @media (prefers-reduced-motion: reduce), (max-width: 767px) {
    .h-scroll { height: auto; }
    .h-sticky { position: static; height: auto; overflow: visible; }
    .h-track  { flex-direction: column; padding: 0 1rem; transform: none !important; }
  }
</style>
<script>
(() => {
  const section = document.querySelector(".h-scroll");
  const track   = section.querySelector(".h-track");
  let ticking = false;
  function update() {
    ticking = false;
    const r = section.getBoundingClientRect();
    const scrollable = r.height - innerHeight;
    const progress = Math.min(1, Math.max(0, -r.top / scrollable)); // 0 → 1 inside runway
    const x = -progress * (track.scrollWidth - innerWidth);
    track.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;
  }
  addEventListener("scroll", () => {
    if (!ticking && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ticking = true; requestAnimationFrame(update);
    }
  }, { passive: true });
})();
</script>
```

**Mobile-friendly alternative — native scroll-snap** (verbs: swipe, not hijack):

```css
.snap-row { display: flex; gap: 1rem; overflow-x: auto;
            scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; }
.snap-row > * { flex: 0 0 82%; scroll-snap-align: start; }
```

### A.4 Sticky morphing — scroll progress driver

Element sticks via CSS; a compact progress function morphs it. Continuous values
avoid `getBoundingClientRect` in a hot path by caching section bounds on resize.

```html
<div class="morph-zone">
  <div class="morph-sticky"><div class="morph-shape">TIB</div></div>
  <article>Think…</article><article>Integrate…</article><article>Build…</article>
</div>
<style>
  .morph-sticky { position: sticky; top: 20vh; }
  .morph-shape  { width: 160px; height: 160px; display: grid; place-items: center;
                  background: linear-gradient(135deg, #4a9eff44, #00d9a344);
                  will-change: transform, border-radius; }
</style>
<script>
(() => {
  const zone = document.querySelector(".morph-zone");
  const shape = zone.querySelector(".morph-shape");
  let top = 0, range = 1, ticking = false;

  const measure = () => {                       // cache bounds — never measure per frame
    const r = zone.getBoundingClientRect();
    top = r.top + scrollY;
    range = Math.max(1, zone.offsetHeight - innerHeight);
  };
  measure(); addEventListener("resize", measure);

  addEventListener("scroll", () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const p = Math.min(1, Math.max(0, (scrollY - top) / range));  // 0 → 1
      shape.style.borderRadius = `${50 - 36 * p}%`;                 // circle → square
      shape.style.transform = `translate3d(0,0,0) rotate(${180 * p}deg) scale(${1 + 0.14 * p})`;
    });
  }, { passive: true });
})();
</script>
```

Where supported, A.4 and A.1-style transforms can also be **pure CSS** with
`animation-timeline: scroll()` — e.g. `animation: morph linear both; animation-timeline: view();`
inside the same `@supports` guard as A.2.

---

## 4. Performance & accessibility contract (both options)

### Preventing scroll jank

1. **Animate only `transform` and `opacity`.** They skip layout and paint and run
   on the compositor. (The morph also touches `border-radius`/`filter` —
   acceptable on a single small element, not on a list.)
2. **`transform: translate3d(...)` / `translateZ(0)`** forces a GPU layer;
   GSAP does this automatically on `x`/`y`.
3. **`will-change: transform`** — declare *sparingly* (the animating elements only,
   in `globals.css`: `.parallax-layer`, `.morph-blob`, enhanced `.h-process-track`).
   Applying it everywhere wastes GPU memory and can *cause* jank.
4. **Throttle scroll work to rAF** and mark listeners `{ passive: true }`
   (Option A). With GSAP use `scrub` — it's already rAF-driven.
5. **No layout reads in the hot path**: cache `getBoundingClientRect()` results;
   use function-based `invalidateOnRefresh: true` in ScrollTrigger so recalcs
   happen on refresh, not per frame.
6. **Gate work by visibility** with IntersectionObserver (Option A.1) — off-screen
   elements cost nothing.
7. **`anticipatePin: 1`** when pinning — pin spacing exists before arrival, so
   there's no mid-scroll layout shift (also protects CLS).
8. **Cleanup**: `mm.revert()` (GSAP) / `observer.disconnect()` + listener removal
   (vanilla) on unmount — prevents duplicate triggers under React StrictMode/HMR.

### `prefers-reduced-motion`

Three layers, all shipped:

- **CSS** (`globals.css`): a `reduce` block freezes loops, disables transitions on
  reveal classes, forces end states (`scaleY(1)`, `opacity: 1`) and resets
  `scroll-behavior`.
- **JS**: every GSAP effect is created inside a
  `(prefers-reduced-motion: no-preference)` `gsap.matchMedia()`; the vanilla
  patterns in §3 check `matchMedia(...).matches` *and* listen for live changes.
- **Markup-first states**: nothing starts `opacity: 0` in HTML — hidden states are
  added by JS/CSS-guards only, so reduced-motion and no-JS users never see
  blank content.

### Mobile degradation

| Enhancement | Mobile fallback (automatic) |
|---|---|
| Pinned horizontal scroll (≥1024px) | Responsive 1–2 column grid; content just stacks |
| Sticky morph (≥768px) | Static badge above the copy; article text unchanged |
| Parallax orbs | Static (still gated by reduced-motion) |
| SD-reveal chips | No-op without `animation-timeline` support |

Breakpoints are enforced by the *same* `gsap.matchMedia` queries that create the
effects — the fallback is the default stylesheet; JS only opts *into* enhancement.

### Checklist before launch

- [ ] DevTools → Performance: record a scroll pass — no long tasks >50ms, no
      purple "Layout" bars inside frames.
- [ ] DevTools → Rendering → "Layer borders": confirm only intended layers are promoted.
- [ ] OS reduced-motion on → full page readable, zero motion, no blank sections.
- [ ] Lighthouse: CLS ~0 (pin spacing + `anticipatePin`), no
      "Avoid non-composited animations" warnings.
- [ ] Keyboard: sticky content never traps focus; skip link still lands correctly.

---

## 5. Integration guide (any existing site)

1. **Content** — timeline/venture copy lives in `src/lib/data.ts`
   (`TIMELINE` + `TRILLOBYTES`). Static pages got the same entry directly in
   `index.html` / `index-enhanced.html`.
2. **Component** — drop `src/components/sections/TrilloBytes.tsx` +
   `src/components/ui/ParallaxLayer.tsx` into the app, render after the hero:
   `#venture` anchor is already linked from the site header.
3. **Styles** — everything after the "SCROLL-DRIVEN SYSTEM" banner in
   `src/app/globals.css` is self-contained; copy that block wholesale into any
   stylesheet (Option A relies on it too).
4. **GSAP** — `npm i gsap`, register once per client module (guard with
   `typeof window`).
5. **Static/HTML sites** — skip React; use §3 snippets verbatim. Add the CSS and
   one `<script>` per effect; they are dependency-free.
6. **QA** — run through the §4 checklist; test on a real mid-range phone, not
   just throttled desktop.
