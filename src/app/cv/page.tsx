"use client";

import Link from "next/link";
import { ABOUT, METRICS, SKILLS, TIMELINE, CONTACT } from "@/lib/data";

export default function CVPage() {
  return (
    <div className="min-h-screen bg-background text-foreground print:bg-white print:text-black">
      {/* Screen-only nav bar */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md print:hidden" role="banner">
        <div className="mx-auto max-w-4xl px-6 py-3 flex items-center justify-between">
          <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            ← Portfolio
          </Link>
          <div className="flex gap-3">
            <button
              onClick={() => window.print()}
              className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90"
            >
              Download PDF
            </button>
          </div>
        </div>
      </header>

      {/* CV body */}
      <main
        className="mx-auto max-w-4xl px-8 py-12 print:py-6 print:px-6"
        id="cv-content"
      >
        {/* ── Identity ─────────────────────────────── */}
        <header className="mb-10 print:mb-6">
          <h1 className="text-4xl font-black tracking-tight text-foreground print:text-black md:text-5xl">
            Sabit Kadli
          </h1>
          <p className="mt-2 text-lg font-semibold text-primary print:text-blue-700">
            Business Analyst · IT Consultant · Solution Architect · Full-Stack Developer
          </p>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground print:text-gray-600">
            <a href={`mailto:${CONTACT.email}`} className="hover:text-primary print:text-gray-600">
              {CONTACT.email}
            </a>
            <span>Melbourne · Bengaluru · Dubai</span>
            <a href="https://sabitkadli.com" className="hover:text-primary print:text-gray-600">
              sabitkadli.com
            </a>
            <a
              href="https://www.linkedin.com/in/sabit-kadli"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary print:text-gray-600"
            >
              linkedin.com/in/sabit-kadli
            </a>
          </div>
        </header>

        <div className="h-px bg-border/60 print:bg-gray-300 mb-8" />

        {/* ── Summary ──────────────────────────────── */}
        <section className="mb-8" aria-labelledby="cv-summary">
          <h2 id="cv-summary" className="cv-section-heading">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground print:text-gray-700">
            {ABOUT.summary}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground print:text-gray-700">
            {ABOUT.narrative}
          </p>
        </section>

        {/* ── Key Achievements ─────────────────────── */}
        <section className="mb-8" aria-labelledby="cv-achievements">
          <h2 id="cv-achievements" className="cv-section-heading">
            Key Achievements
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 print:grid-cols-3">
            {METRICS.map((m) => (
              <div
                key={m.label}
                className="rounded-lg border border-border/50 bg-card/40 px-4 py-3 print:border-gray-200 print:bg-gray-50"
              >
                <p className="text-xl font-black text-primary print:text-blue-700">
                  {m.isZero ? "Zero" : `${m.target}${m.suffix ?? ""}`}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground print:text-gray-600">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Core Stack ───────────────────────────── */}
        <section className="mb-8" aria-labelledby="cv-stack">
          <h2 id="cv-stack" className="cv-section-heading">
            Core Technology Stack
          </h2>
          <p className="text-sm text-muted-foreground print:text-gray-700">
            {ABOUT.coreStack}
          </p>
        </section>

        {/* ── Technical Skills ─────────────────────── */}
        <section className="mb-8" aria-labelledby="cv-skills">
          <h2 id="cv-skills" className="cv-section-heading">
            Technical Skills
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 print:grid-cols-2">
            {SKILLS.map((cat) => (
              <div key={cat.title}>
                <h3 className="mb-1.5 text-xs font-bold uppercase tracking-[0.12em] text-primary print:text-blue-700">
                  {cat.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground print:text-gray-600">
                  {cat.items.map((i) => i.name).join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Experience ───────────────────────────── */}
        <section className="mb-8" aria-labelledby="cv-experience">
          <h2 id="cv-experience" className="cv-section-heading">
            Work Experience
          </h2>
          <div className="space-y-7">
            {TIMELINE.filter((e) => e.type !== "education").map((entry, i) => (
              <div key={i} className="print:break-inside-avoid">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <div>
                    <h3 className="text-sm font-bold text-foreground print:text-black">
                      {entry.title}
                    </h3>
                    <p className="text-xs font-medium text-primary/80 print:text-blue-700">
                      {entry.company}
                    </p>
                  </div>
                  <time className="text-xs text-muted-foreground print:text-gray-500 shrink-0">
                    {entry.period}
                  </time>
                </div>
                <ul className="mt-2 space-y-1">
                  {entry.items.map((item, j) => (
                    <li key={j} className="flex gap-2 text-xs text-muted-foreground print:text-gray-600">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/50 print:bg-blue-400" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Education ────────────────────────────── */}
        <section className="mb-8" aria-labelledby="cv-education">
          <h2 id="cv-education" className="cv-section-heading">
            Education
          </h2>
          <div className="space-y-4">
            {TIMELINE.filter((e) => e.type === "education").map((entry, i) => (
              <div key={i}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-foreground print:text-black">
                      {entry.title}
                    </h3>
                    <p className="text-xs font-medium text-primary/80 print:text-blue-700">
                      {entry.company}
                    </p>
                  </div>
                  <time className="text-xs text-muted-foreground print:text-gray-500 shrink-0">
                    {entry.period}
                  </time>
                </div>
                {entry.items.map((item, j) => (
                  <p key={j} className="mt-1 text-xs text-muted-foreground print:text-gray-600">
                    {item}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Print footer */}
        <footer className="mt-10 border-t border-border/40 pt-4 print:border-gray-200">
          <p className="text-xs text-muted-foreground/50 print:text-gray-400 text-center">
            sabitkadli.com · {CONTACT.email} · Updated {new Date().getFullYear()}
          </p>
        </footer>
      </main>

      <style jsx global>{`
        .cv-section-heading {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: var(--muted-foreground);
          margin-bottom: 0.875rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--border);
          opacity: 0.7;
        }

        @media print {
          .cv-section-heading {
            color: #6b7280;
            border-color: #e5e7eb;
          }
          @page {
            margin: 1.5cm;
            size: A4;
          }
          body {
            background: white !important;
            color: black !important;
          }
        }
      `}</style>
    </div>
  );
}
