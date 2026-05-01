import Image from "next/image";
import Link from "next/link";
import { CONTACT } from "@/lib/data";

/**
 * Header — sticky site navigation.
 *
 * The <h1> here is the primary identity element for the page.
 * Section-level headings inside sections use <h2>.
 *
 * Location: shows three cities from CONTACT.locations.
 */
export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md"
      role="banner"
    >
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Identity / Brand */}
          <div className="flex items-center gap-4">
            <div
              className="profile-float relative h-24 w-24 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/40 transition-all hover:ring-primary/70"
              aria-hidden="true"
            >
              <Image
                src="/assets/profile.jpg"
                alt=""
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  Sabit Kadli
                </h1>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-gradient-to-r from-primary/8 to-[var(--accent-green)]/8 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-foreground/70"
                  title="Available for new roles and freelance projects"
                >
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-green)] opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent-green)]" />
                  </span>
                  Open to Opportunities
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Business Analyst · IT Consultant · Solution Architect
              </p>
              {/* Three-city presence */}
              <p className="mt-0.5 flex flex-wrap gap-x-1.5 text-xs text-muted-foreground/60">
                {CONTACT.locations.map((loc, i) => (
                  <span key={loc.city}>
                    <span aria-hidden="true">{loc.flag}</span> {loc.city}
                    {i < CONTACT.locations.length - 1 && (
                      <span className="ml-1.5 opacity-40">·</span>
                    )}
                  </span>
                ))}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <nav aria-label="Main navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium list-none p-0 m-0">
              <li>
                <a
                  href="#about"
                  className="text-muted-foreground transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#achievements"
                  className="text-muted-foreground transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded"
                >
                  Achievements
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="text-muted-foreground transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded"
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#timeline"
                  className="text-muted-foreground transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded"
                >
                  Timeline
                </a>
              </li>
              <li>
                <Link
                  href="/games"
                  className="text-primary transition-colors hover:text-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded"
                  aria-label="Interactive Skill Games"
                >
                  Games
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/cv"
                  className="text-muted-foreground transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded"
                >
                  CV
                </Link>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-muted-foreground transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
