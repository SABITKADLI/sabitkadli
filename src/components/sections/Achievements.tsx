"use client";

import { METRICS } from "@/lib/data";
import { useCounter } from "@/hooks/useCounter";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";

const GROUP_LABELS: Record<string, { label: string; color: string }> = {
  efficiency: { label: "Efficiency", color: "text-[var(--accent-green)]" },
  quality:    { label: "Quality",    color: "text-[var(--accent-blue)]" },
  scale:      { label: "Scale",      color: "text-[var(--accent-purple)]" },
  savings:    { label: "Cost",       color: "text-amber-400" },
};

function MetricCard({
  target,
  label,
  suffix,
  isZero,
  group,
}: {
  target: number;
  label: string;
  suffix?: string;
  isZero?: boolean;
  group?: string;
}) {
  const { ref, value } = useCounter(target);
  const groupInfo = group ? GROUP_LABELS[group] : null;

  return (
    <div
      ref={ref}
      className="metric-card-glow group relative overflow-hidden rounded-xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/80"
    >
      {/* Group badge */}
      {groupInfo && (
        <span
          className={`mb-3 inline-block text-[10px] font-bold uppercase tracking-widest opacity-60 ${groupInfo.color}`}
        >
          {groupInfo.label}
        </span>
      )}

      {/* Value */}
      <div className="mb-2 text-4xl font-black tracking-tight text-primary transition-transform duration-300 group-hover:scale-105">
        {isZero ? (
          <span>Zero</span>
        ) : (
          <>
            {value}
            {suffix}
          </>
        )}
      </div>

      {/* Label */}
      <div className="text-sm font-medium leading-snug text-muted-foreground">
        {label}
      </div>

      {/* Subtle glow bg on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_120%,color-mix(in_oklch,var(--primary)_8%,transparent),transparent_60%)]" />
    </div>
  );
}

export default function Achievements() {
  return (
    <section
      id="achievements"
      aria-labelledby="achievements-heading"
      className="relative z-10 py-16"
    >
      <div className="mx-auto max-w-6xl px-6">
        <FadeInOnScroll>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary/70">
            Impact
          </p>
          <h2
            id="achievements-heading"
            className="mb-10 text-2xl font-bold tracking-tight text-foreground"
          >
            Key Achievements
          </h2>
        </FadeInOnScroll>

        <FadeInOnScroll stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {METRICS.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </FadeInOnScroll>
      </div>
    </section>
  );
}
