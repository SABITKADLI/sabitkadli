"use client";

/**
 * FadeInOnScroll — reusable scroll-triggered animation wrapper.
 *
 * Usage:
 *   <FadeInOnScroll>                     → fadeInUp (default)
 *   <FadeInOnScroll direction="left">    → fadeInLeft
 *   <FadeInOnScroll direction="right">   → fadeInRight
 *   <FadeInOnScroll variant="scale">     → scaleIn
 *   <FadeInOnScroll delay={200}>         → 200ms delay
 *   <FadeInOnScroll stagger>             → cascades is-visible to direct children
 *
 * Animations are CSS-transition-based (bidirectional): sections fade in on
 * scroll-down and fade back out on scroll-up.
 */

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Direction = "up" | "left" | "right";
type Variant   = "fade" | "scale";

interface FadeInOnScrollProps {
  children:   ReactNode;
  className?: string;
  direction?: Direction;
  variant?:   Variant;
  delay?:     number;
  stagger?:   boolean;
  threshold?: number;
}

export function FadeInOnScroll({
  children,
  className,
  direction = "up",
  variant   = "fade",
  delay     = 0,
  stagger   = false,
  threshold = 0.15,
}: FadeInOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        el.classList.toggle("is-visible", visible);
        // Propagate visibility to direct children so stagger works
        if (stagger) {
          Array.from(el.children).forEach((child) => {
            child.classList.toggle("is-visible", visible);
          });
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, stagger]);

  const dirClass =
    variant === "scale"
      ? "scale-in"
      : direction === "left"
      ? "from-left"
      : direction === "right"
      ? "from-right"
      : "";

  return (
    <div
      ref={ref}
      className={cn("animate-on-scroll", dirClass, stagger && "stagger-children", className)}
      style={delay ? ({ transitionDelay: `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
