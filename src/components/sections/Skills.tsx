import { SKILLS } from "@/lib/data";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative z-10 py-16"
    >
      <div className="mx-auto max-w-6xl px-6">
        <FadeInOnScroll>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary/70">
            Capabilities
          </p>
          <h2
            id="skills-heading"
            className="mb-10 text-2xl font-bold tracking-tight text-foreground"
          >
            Technical Skills
          </h2>
        </FadeInOnScroll>

        <FadeInOnScroll
          stagger
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SKILLS.map((category) => (
            <div
              key={category.title}
              className="animate-on-scroll rounded-xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/80"
            >
              {/* Category header */}
              <div className="mb-4 flex items-center gap-2">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-base"
                  aria-hidden="true"
                >
                  {category.icon}
                </span>
                <h3 className="text-sm font-bold text-primary">{category.title}</h3>
              </div>

              {/* Skill items with tooltips */}
              <ul className="space-y-1.5">
                {category.items.map((item) => (
                  <li
                    key={item.name}
                    className="skill-item relative flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                    <span className="cursor-default">{item.name}</span>
                    {item.tooltip && (
                      <span className="skill-tooltip" role="tooltip">
                        {item.tooltip}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </FadeInOnScroll>

        <FadeInOnScroll delay={200} className="mt-6">
          <p className="text-xs text-muted-foreground/50">
            Hover any skill for context on how I apply it.
          </p>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
