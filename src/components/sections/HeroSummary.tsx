import { ABOUT } from "@/lib/data";

export default function HeroSummary() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative z-10 py-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Section label */}
        <p className="hero-animate hero-animate-delay-1 mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary/70">
          About
        </p>

        {/* Prose block */}
        <div className="hero-animate hero-animate-delay-2 mb-8">
          <h2
            id="about-heading"
            className="mb-5 text-2xl font-bold leading-snug tracking-tight text-foreground md:text-3xl"
          >
            Professional Summary
          </h2>
          <p className="mb-8 text-base leading-relaxed text-muted-foreground md:text-lg">
            {ABOUT.summary}
          </p>
          <div className="mb-8 h-px bg-border/40" />
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            {ABOUT.narrative}
          </p>
        </div>

        {/* Currently building */}
        <div className="hero-animate hero-animate-delay-3 mb-8">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-foreground/60">
            Currently building
          </h3>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {ABOUT.currentlyBuilding.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-lg border border-border/40 bg-card/40 px-4 py-3 text-sm text-muted-foreground backdrop-blur-sm"
              >
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Core stack */}
        <div className="hero-animate hero-animate-delay-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-foreground/50">
            Core stack
          </span>
          {ABOUT.coreStack.split(" · ").map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary/90"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
