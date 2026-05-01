import type { Metadata } from "next";
import Link from "next/link";
import ApiGame from "@/components/games/ApiGame";
import SqlGame from "@/components/games/SqlGame";
import ReactMemoryGame from "@/components/games/ReactMemoryGame";
import TelephonyGame from "@/components/games/TelephonyGame";

export const metadata: Metadata = {
  title: "Interactive Skill Games",
  description:
    "Four interactive games that demonstrate real-world technical skills: API integration matching, SQL query building, React concepts memory, and telephony call routing — all based on scenarios from Sabit Kadli's actual work.",
};

const GAME_MAP = [
  {
    id: "api-game",
    skill: "API Integration",
    description:
      "I've integrated DocuSign, PropertyMe, Kraken, and AWS EventBridge in production systems. This game tests that knowledge.",
  },
  {
    id: "sql-game",
    skill: "SQL",
    description:
      "SQL is a daily tool for data migration, reporting, and business analysis. Build queries against real schemas.",
  },
  {
    id: "react-game",
    skill: "React",
    description:
      "React is my primary frontend framework for CRM portals and 3D web experiences. Test your knowledge of core concepts.",
  },
  {
    id: "telephony-game",
    skill: "Telephony & Routing",
    description:
      "As a Genesys Cloud administrator, I designed IVR and routing rules for call centre operations. Route calls like I did.",
  },
];

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md"
        role="banner"
      >
        <div className="mx-auto max-w-6xl px-6 py-4">
          <nav aria-label="Games navigation">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium list-none p-0 m-0">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded"
                >
                  ← Portfolio
                </Link>
              </li>
              {GAME_MAP.map((g) => (
                <li key={g.id}>
                  <a
                    href={`#${g.id}`}
                    className="text-muted-foreground transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded"
                  >
                    {g.skill}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12" id="main-content">
        {/* Intro */}
        <header className="mb-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary/70">
            Skill Playground
          </p>
          <h1 className="mb-4 text-3xl font-black tracking-tight text-foreground md:text-4xl">
            Interactive Skill Demonstrations
          </h1>
          <p className="mb-6 max-w-2xl text-base text-muted-foreground">
            These aren&apos;t generic coding puzzles — each game is drawn directly
            from real scenarios I encounter in my work as a Business Analyst, IT
            Consultant, and developer. They test the same skills I apply every week.
          </p>

          {/* Skills index */}
          <div className="flex flex-wrap gap-3">
            {GAME_MAP.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="group inline-flex flex-col rounded-xl border border-border/50 bg-card/60 px-5 py-3 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                <span className="text-xs font-bold text-primary">{g.skill}</span>
                <span className="mt-0.5 max-w-[200px] text-[11px] leading-snug text-muted-foreground/80">
                  {g.description}
                </span>
              </a>
            ))}
          </div>
        </header>

        {/* Skip-to-content */}
        <a
          href="#api-game"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-primary-foreground"
        >
          Skip to first game
        </a>

        {/* Games */}
        <div className="flex flex-col gap-12">
          <section id="api-game" className="scroll-mt-20">
            <ApiGame />
          </section>

          <section id="sql-game" className="scroll-mt-20">
            <SqlGame />
          </section>

          <section id="react-game" className="scroll-mt-20">
            <ReactMemoryGame />
          </section>

          <section id="telephony-game" className="scroll-mt-20">
            <TelephonyGame />
          </section>
        </div>

        {/* Footer return link */}
        <footer className="mt-20 border-t border-border/40 pt-8 text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded"
          >
            ← Return to Portfolio
          </Link>
        </footer>
      </main>
    </div>
  );
}
