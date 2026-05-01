import { TESTIMONIALS } from "@/lib/data";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative z-10 py-16"
    >
      <div className="mx-auto max-w-6xl px-6">
        <FadeInOnScroll>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary/70">
            Social Proof
          </p>
          <h2
            id="testimonials-heading"
            className="mb-10 text-2xl font-bold tracking-tight text-foreground"
          >
            What Colleagues Say
          </h2>
        </FadeInOnScroll>

        <FadeInOnScroll
          stagger
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {TESTIMONIALS.map((t) => (
            <div
              key={t.initials}
              className="animate-on-scroll flex flex-col rounded-xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:bg-card/80"
            >
              {/* Quote mark */}
              <span className="mb-4 block text-3xl leading-none text-primary/30 select-none" aria-hidden="true">
                &ldquo;
              </span>

              {/* Quote text */}
              <blockquote className="flex-1 text-sm leading-relaxed text-muted-foreground">
                {t.quote}
              </blockquote>

              {/* Attribution */}
              <footer className="mt-6 flex items-center gap-3">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary"
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.author}</p>
                  <p className="text-xs text-muted-foreground/70">
                    {t.role} · {t.company}
                  </p>
                </div>
              </footer>
            </div>
          ))}
        </FadeInOnScroll>
      </div>
    </section>
  );
}
