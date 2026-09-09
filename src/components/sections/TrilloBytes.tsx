"use client";

/**
 * TrilloBytes — current-venture showcase (Director & Owner timeline entry).
 *
 * This section is also the live implementation of the four scroll effects
 * documented in docs/SCROLL-EFFECTS-PLAN.md:
 *
 *   ① PARALLAX      — blurred orbs drift at different speeds (ParallaxLayer)
 *   ② REVEAL        — cards fade/slide in via IntersectionObserver (FadeInOnScroll)
 *   ③ HORIZONTAL    — the 5-step delivery playbook pins to the viewport and
 *                     vertical scroll is translated into horizontal movement
 *   ④ STICKY MORPH  — the "TIB" badge stays sticky and morphs
 *                     shape/rotation/hue per Think → Integrate → Build stage
 *
 * Everything GSAP-driven runs inside gsap.matchMedia() gated on
 * `prefers-reduced-motion: no-preference` + a min-width, so:
 *   - mobile / reduced-motion / no-JS users get a fully readable static grid
 *   - the enhanced layout is only switched on by JavaScript (.is-gsap-horizontal)
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TRILLOBYTES } from "@/lib/data";
import { cn } from "@/lib/utils";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Accent color per TIB stage — used for the morph label + decorations */
const STAGE_COLORS = [
  "text-primary",
  "text-[var(--accent-purple)]",
  "text-[var(--accent-green)]",
] as const;

export default function TrilloBytes() {
  /* ④ sticky morph refs */
  const morphWrapRef = useRef<HTMLDivElement>(null);
  const morphBlobRef = useRef<HTMLDivElement>(null);

  /* ③ horizontal scroll refs */
  const hWrapRef = useRef<HTMLDivElement>(null);
  const hTrackRef = useRef<HTMLDivElement>(null);
  const hProgressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    /* ────────────────────────────────────────────────
       ④ STICKY MORPH — badge morphs while the copy scrolls
       The stickiness itself is plain CSS (md:sticky md:top-36).
       GSAP only supplies the scrubbed morph timeline.
    ──────────────────────────────────────────────── */
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const wrap = morphWrapRef.current;
      const blob = morphBlobRef.current;
      if (!wrap || !blob) return;

      const labels = gsap.utils.toArray<HTMLElement>("[data-morph-label]", wrap);
      if (labels.length !== 3) return;

      // Explicit start state: Think = circle, neutral hue
      gsap.set(blob, { borderRadius: "50%", rotate: 0, scale: 1, filter: "hue-rotate(0deg)" });
      gsap.set([labels[1], labels[2]], { autoAlpha: 0, y: 12 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          // Scrub through the whole two-column row; the sticky CSS keeps the
          // blob on screen for the entire range.
          start: "top 60%",
          end: "bottom 70%",
          scrub: 0.6,
        },
        defaults: { ease: "power2.inOut", duration: 1 },
      });

      tl
        // → Integrate: squircle, quarter turn, hue shift
        .to(blob, { borderRadius: "30%", rotate: 90, scale: 1.07, filter: "hue-rotate(130deg)" }, 0.35)
        .to(labels[0], { autoAlpha: 0, y: -12 }, 0.35)
        .to(labels[1], { autoAlpha: 1, y: 0 }, 0.6)
        // → Build: soft square, half turn, deeper hue shift
        .to(blob, { borderRadius: "14%", rotate: 180, scale: 1.14, filter: "hue-rotate(260deg)" }, 1.7)
        .to(labels[1], { autoAlpha: 0, y: -12 }, 1.7)
        .to(labels[2], { autoAlpha: 1, y: 0 }, 1.95);
    });

    /* ────────────────────────────────────────────────
       ③ HORIZONTAL SCROLL — pin the wrapper, translate the track
       Graceful degradation:
         default CSS (.h-process-track)     = readable responsive grid
         .is-gsap-horizontal (added by JS)  = flex track, pinned + scrubbed
    ──────────────────────────────────────────────── */
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const wrap = hWrapRef.current;
      const track = hTrackRef.current;
      const progress = hProgressRef.current;
      if (!wrap || !track) return;

      // Flip the layout into "enhanced" mode (CSS lives in globals.css)
      wrap.classList.add("is-gsap-horizontal");

      // Total horizontal distance = track overflow beyond the visible wrapper.
      // Computed lazily (function-based) so resizes recalc via invalidateOnRefresh.
      const distance = () => Math.max(0, track.scrollWidth - wrap.clientWidth);

      gsap.to(track, {
        x: () => -distance(), // translate3d under the hood → compositor only
        ease: "none", // linear — scroll position is already the easing
        scrollTrigger: {
          trigger: wrap,
          start: "top 12%", // pin just below the sticky site header
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1, // 1s catch-up smoothing, kills scroll jank on fast flicks
          anticipatePin: 1, // pre-adds pin spacing → no layout jump as you approach
          invalidateOnRefresh: true,
        },
      });

      // Scroll progress bar — pure visual, aria-hidden
      if (progress) {
        gsap.fromTo(
          progress,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top 12%",
              end: () => `+=${distance()}`,
              scrub: true,
            },
          }
        );
      }

      // matchMedia cleanup: restore the readable grid + clear inline transforms
      return () => {
        wrap.classList.remove("is-gsap-horizontal");
        gsap.set(track, { clearProps: "x" });
        if (progress) gsap.set(progress, { clearProps: "transform" });
      };
    });

    return () => mm.revert(); // unmount / setting change → revert everything
  }, []);

  return (
    <section
      id="venture"
      aria-labelledby="venture-heading"
      className="relative z-10 overflow-hidden py-16 md:py-24"
    >
      {/* ① PARALLAX ORBS — decorative depth (aria-hidden inside ParallaxLayer) */}
      <ParallaxLayer speed={0.45} className="absolute -left-32 top-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <ParallaxLayer speed={-0.3} className="absolute -right-24 top-1/3 h-64 w-64 rounded-full bg-[var(--accent-purple)]/10 blur-3xl" />
      <ParallaxLayer speed={0.7} className="absolute bottom-24 left-1/4 h-40 w-40 rounded-full bg-[var(--accent-green)]/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* ── Section header (② IO reveal) ─────────────────────── */}
        <FadeInOnScroll>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary/70">
            Current Venture · {TRILLOBYTES.role}
          </p>
          <h2
            id="venture-heading"
            className="mb-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl"
          >
            {TRILLOBYTES.name}{" "}
            <span className="text-muted-foreground/60">—</span>{" "}
            <span className="bg-gradient-to-r from-primary via-[var(--accent-purple)] to-[var(--accent-green)] bg-clip-text text-transparent">
              Think. Integrate. Build.
            </span>
          </h2>
          <p className="mb-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            {TRILLOBYTES.positioning}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <span className="text-muted-foreground/70">
              🌏 {TRILLOBYTES.footprint}
            </span>
            <span className="text-muted-foreground/70">
              🚀 Launched {TRILLOBYTES.launched}
            </span>
            <a
              href={TRILLOBYTES.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded font-semibold text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              Visit trillobytes.com ↗
            </a>
          </div>
        </FadeInOnScroll>

        {/* Offering chips — `.sd-reveal`: pure-CSS scroll-driven animation
            where supported (Chrome/Edge 115+); harmless no-op elsewhere */}
        <ul className="mt-6 flex flex-wrap gap-2" role="list" aria-label="What TrilloBytes builds">
          {TRILLOBYTES.offerings.map((offering) => (
            <li
              key={offering}
              className="sd-reveal rounded-full border border-border/50 bg-card/50 px-3 py-1.5 text-xs font-semibold text-muted-foreground backdrop-blur-sm"
            >
              {offering}
            </li>
          ))}
        </ul>

        {/* ── ④ STICKY MORPH layout: sticky badge ◄ ► scrolling copy ── */}
        <div ref={morphWrapRef} className="mt-16 gap-14 md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* Sticky column — `sticky` is CSS; morph is GSAP-scrubbed */}
          <div className="mb-12 md:mb-0">
            <div className="md:sticky md:top-36">
              <div className="flex flex-col items-center gap-5">
                <div
                  ref={morphBlobRef}
                  className="morph-blob flex h-40 w-40 items-center justify-center border border-primary/30 bg-gradient-to-br from-primary/25 via-[var(--accent-purple)]/20 to-[var(--accent-green)]/25 shadow-[0_0_70px_-14px_var(--primary)] md:h-48 md:w-48"
                  style={{ borderRadius: "50%" }}
                >
                  <span className="text-xl font-black tracking-[0.25em] text-foreground">
                    TIB
                  </span>
                </div>
                {/* Stacked stage labels — cross-faded by the morph timeline.
                    Decorative: real content lives in the articles → aria-hidden */}
                <div className="relative h-6 w-full" aria-hidden="true">
                  {TRILLOBYTES.morphStages.map((stage, i) => (
                    <p
                      key={stage.key}
                      data-morph-label
                      className={cn(
                        "absolute inset-x-0 text-center text-sm font-bold uppercase tracking-[0.3em]",
                        STAGE_COLORS[i],
                        i !== 0 && "opacity-0" // no-JS / reduced-motion: show "Think"
                      )}
                    >
                      {stage.label}
                    </p>
                  ))}
                </div>
                <p className="max-w-xs text-center text-xs leading-relaxed text-muted-foreground/60">
                  {TRILLOBYTES.tagline} — the delivery method behind every TrilloBytes system.
                </p>
              </div>
            </div>
          </div>

          {/* Scrolling column — stage articles + AI tiers (② IO reveals) */}
          <div className="space-y-8">
            {TRILLOBYTES.morphStages.map((stage, i) => (
              <FadeInOnScroll key={stage.key} direction="right">
                <article className="rounded-xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-primary/30 hover:bg-card/80">
                  <p className={cn("mb-1 text-[10px] font-black uppercase tracking-[0.3em]", STAGE_COLORS[i])}>
                    {String(i + 1).padStart(2, "0")} · {stage.label}
                  </p>
                  <h3 className="mb-2 text-lg font-bold text-foreground">
                    {stage.heading}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {stage.body}
                  </p>
                </article>
              </FadeInOnScroll>
            ))}

            {/* AI tiers — 3-up strip */}
            <FadeInOnScroll stagger className="grid gap-4 sm:grid-cols-3">
              {TRILLOBYTES.tiers.map((tier, i) => (
                <article
                  key={tier.name}
                  className="animate-on-scroll rounded-xl border border-border/50 bg-card/40 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-primary/30"
                >
                  <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-primary/60">
                    Tier {i + 1}
                  </p>
                  <h4 className="mb-2 text-sm font-bold text-foreground">{tier.name}</h4>
                  <p className="text-xs leading-relaxed text-muted-foreground/80">
                    {tier.blurb}
                  </p>
                </article>
              ))}
            </FadeInOnScroll>
          </div>
        </div>

        {/* ── ③ HORIZONTAL SCROLL — the delivery playbook ────────
            Default (mobile / reduced-motion / no-JS): responsive grid.
            Enhanced (JS flips .is-gsap-horizontal): pinned + scrubbed. */}
        <div className="mt-24">
          <FadeInOnScroll>
            <h3 className="mb-1 text-lg font-bold text-foreground">
              The delivery playbook
            </h3>
            <p className="mb-6 text-sm text-muted-foreground/70">
              From idea to operating system —{" "}
              <span className="hidden font-medium text-primary/80 lg:inline">
                keep scrolling to move through the five steps →
              </span>
              <span className="lg:hidden">five steps, every build.</span>
              <span className="block text-xs text-[var(--accent-green)]/80">
                {TRILLOBYTES.cta}
              </span>
            </p>
          </FadeInOnScroll>

          <div ref={hWrapRef} className="relative">
            {/* Progress bar — only visible in enhanced mode (CSS) */}
            <div className="h-progress-track mb-6 h-0.5 w-full overflow-hidden rounded-full bg-border/40" aria-hidden="true">
              <div
                ref={hProgressRef}
                className="h-progress-fill h-full w-full origin-left scale-x-0 bg-gradient-to-r from-primary via-[var(--accent-purple)] to-[var(--accent-green)]"
              />
            </div>

            <div ref={hTrackRef} className="h-process-track">
              {/* Lead card — hints the horizontal behaviour in enhanced mode */}
              <article className="h-process-card h-process-lead flex flex-col justify-center rounded-xl border border-dashed border-primary/40 bg-primary/5 p-6">
                <p className="mb-2 text-2xl" aria-hidden="true">⟶</p>
                <h4 className="mb-2 text-base font-bold text-foreground">
                  Scroll = movement
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  In this strip your vertical scroll turns into horizontal motion —
                  the section pins while the five steps glide past.
                </p>
              </article>

              {TRILLOBYTES.process.map((step) => (
                <article
                  key={step.step}
                  className="h-process-card flex flex-col rounded-xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-primary/30 hover:bg-card/80"
                >
                  <span
                    className="mb-4 text-4xl font-black text-primary/25"
                    aria-hidden="true"
                  >
                    {step.step}
                  </span>
                  <h4 className="mb-2 text-base font-bold text-foreground">
                    {step.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </article>
              ))}

              {/* Closing CTA card */}
              <article className="h-process-card flex flex-col justify-center rounded-xl border border-[var(--accent-green)]/30 bg-[var(--accent-green)]/5 p-6">
                <h4 className="mb-2 text-base font-bold text-foreground">
                  Free consultation, first come first served.
                </h4>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  Bring the messy workflow, current tools, and the outcome you want.
                </p>
                <a
                  href={TRILLOBYTES.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit rounded font-semibold text-[var(--accent-green)] underline-offset-4 transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                >
                  Book at trillobytes.com ↗
                </a>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
