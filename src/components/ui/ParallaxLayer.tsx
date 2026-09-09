"use client";

/**
 * ParallaxLayer — moves its children along Y at a different rate than the
 * page scroll, producing 3D depth. (Docs: docs/SCROLL-EFFECTS-PLAN.md §3.1)
 *
 * How it works:
 *  - GSAP scrubs `y` from -speed*RANGE to +speed*RANGE while the layer's
 *    parent crosses the viewport ("top bottom" → "bottom top").
 *  - Positive speed → drifts slower than scroll (background feel).
 *    Negative speed → drifts faster (foreground feel).
 *  - GSAP writes `transform: translate3d(...)`, so movement stays on the
 *    compositor thread — no layout, no paint per frame.
 *
 * Performance contract:
 *  - Only `transform` is animated. `will-change: transform` (from the
 *    .parallax-layer class in globals.css) pre-creates the GPU layer.
 *  - `scrub` ties motion to scroll position — zero timers, zero layout reads.
 *
 * Accessibility contract:
 *  - The whole effect is created inside a `prefers-reduced-motion:
 *    no-preference` matchMedia. gsap.matchMedia() reverts everything if the
 *    OS-level setting changes, so reduced-motion users get a static page.
 *  - The element is `aria-hidden` — use it for decorative content only.
 */

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxLayerProps {
  /** Optional — the wrapper itself can be the visual (e.g. a blurred orb) */
  children?: ReactNode;
  /** Multiplier of the base travel distance. >0 = slower (bg), <0 = faster (fg) */
  speed?: number;
  className?: string;
}

export function ParallaxLayer({
  children,
  speed = 0.3,
  className,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // matchMedia scopes the animation so it auto-reverts on setting change
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const el = ref.current;
      if (!el) return;

      const travel = speed * 140; // total px travelled across the viewport

      gsap.fromTo(
        el,
        { y: -travel },
        {
          y: travel,
          ease: "none", // linear — scrub supplies the easing via scroll
          scrollTrigger: {
            // Animate on the parent so absolute-positioned layers still get
            // a trigger with a real height to measure against.
            trigger: el.parentElement ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8, // slight smoothing — softens scroll "steppiness"
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => mm.revert(); // kill tweens + restore inline styles on unmount
  }, [speed]);

  return (
    <div
      ref={ref}
      className={cn("parallax-layer pointer-events-none", className)}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}
