import Link from "next/link";
import { CONTACT } from "@/lib/data";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";

// LinkedIn icon
function LinkedInIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// GitHub icon
function GitHubIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative z-10 py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* High-contrast CTA area */}
        <FadeInOnScroll>
          <div className="mb-10 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card/40 to-card/20 p-8 md:p-12 backdrop-blur-sm">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary/70">
              Contact
            </p>
            <h2
              id="contact-heading"
              className="mb-3 text-3xl font-black tracking-tight text-foreground md:text-4xl"
            >
              Hire the analyst who ships the code.
            </h2>
            <p className="mb-8 max-w-lg text-base text-muted-foreground">
              Strategy, architecture, and delivery — in one person. If you need a BA who
              can write the spec <em>and</em> build the integration, I&apos;m available
              for new projects in Melbourne, remote, or globally.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href={`mailto:${CONTACT.email}`}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Me
              </a>

              <Link
                href="/cv"
                className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-8 py-3 text-sm font-bold text-primary backdrop-blur-sm transition-all hover:border-primary/60 hover:bg-primary/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View CV / Resume
              </Link>

              <Link
                href="/games"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-8 py-3 text-sm font-bold text-foreground backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                Explore Skill Games
              </Link>
            </div>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-xs text-muted-foreground/50 uppercase tracking-widest font-bold">Find me</span>
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded"
                aria-label="Sabit Kadli on LinkedIn"
              >
                <LinkedInIcon /> LinkedIn
              </a>
              <a
                href={CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded"
                aria-label="Sabit Kadli on GitHub"
              >
                <GitHubIcon /> GitHub
              </a>
            </div>
          </div>
        </FadeInOnScroll>

        {/* Location badges */}
        <FadeInOnScroll delay={100}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-foreground/40">
              Based in
            </span>
            {CONTACT.locations.map((loc) => (
              <span
                key={loc.city}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card/50 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm"
              >
                <span aria-hidden="true">{loc.flag}</span>
                {loc.city}, {loc.country}
              </span>
            ))}
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
