"use client";

import { useEffect, useRef } from "react";
import { TIMELINE } from "@/lib/data";
import { cn } from "@/lib/utils";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";

/**
 * Animates the vertical timeline line as the section scrolls into view.
 * The line element itself has scaleY(0) which collapses its bounding rect,
 * making it invisible to IntersectionObserver. Instead we observe a full-size
 * proxy div placed over the same container.
 */
function AnimatedLine() {
  const lineRef    = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line    = lineRef.current;
    const trigger = triggerRef.current;
    if (!line || !trigger) return;
    const observer = new IntersectionObserver(
      ([entry]) => line.classList.toggle("is-visible", entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(trigger);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Full-size proxy — gives the observer a real bounding rect to watch */}
      <div ref={triggerRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div
        ref={lineRef}
        className="timeline-line-fill absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary/50 via-border/60 to-transparent md:block"
      />
    </>
  );
}

export default function Timeline() {
  return (
    <section
      id="timeline"
      aria-labelledby="timeline-heading"
      className="relative z-10 py-16"
    >
      <div className="mx-auto max-w-6xl px-6">
        <FadeInOnScroll>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary/70">
            Career
          </p>
          <h2
            id="timeline-heading"
            className="mb-12 text-2xl font-bold tracking-tight text-foreground"
          >
            Professional Timeline
          </h2>
        </FadeInOnScroll>

        <div className="relative">
          <AnimatedLine />

          <div className="flex flex-col gap-10">
            {TIMELINE.map((entry, i) => (
              <FadeInOnScroll
                key={i}
                direction={entry.side === "left" ? "left" : "right"}
                delay={i < 4 ? i * 60 : 0}
                className={cn(
                  "relative md:w-[calc(50%-2rem)]",
                  entry.side === "left" ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                )}
              >
                {/* Connector dot */}
                <div
                  className={cn(
                    "timeline-dot absolute top-5 hidden h-3 w-3 rounded-full border-2 border-primary bg-background md:block",
                    entry.side === "left"
                      ? "right-[-1.65rem] translate-x-1/2"
                      : "left-[-1.65rem] -translate-x-1/2"
                  )}
                  aria-hidden="true"
                />

                <article className="rounded-xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/80">
                  {/* Type badge */}
                  {entry.type === "education" && (
                    <span className="mb-2 inline-block rounded-full border border-[var(--accent-purple)]/30 bg-[var(--accent-purple)]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[var(--accent-purple)]">
                      Education
                    </span>
                  )}

                  <h3 className="mb-1 text-base font-bold text-foreground">
                    {entry.title}
                  </h3>
                  <p className="mb-0.5 text-sm font-medium text-primary/80">
                    {entry.company}
                  </p>
                  <time
                    className="mb-4 block text-xs text-muted-foreground/70"
                    dateTime={entry.period}
                  >
                    {entry.period}
                  </time>
                  <ul className="space-y-1.5" role="list">
                    {entry.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex gap-2 text-sm text-muted-foreground"
                      >
                        <span
                          className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/50"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
