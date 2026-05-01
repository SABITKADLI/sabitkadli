"use client";

import { useState } from "react";

// ─── Data — do not alter correct answers or API names ───────────────────────
const API_ITEMS = [
  {
    id: "docusign",
    label: "DocuSign API",
    icon: "✍️",
    domain: "Contracts",
    domainColor: "text-blue-400",
  },
  {
    id: "propertyme",
    label: "PropertyMe API",
    icon: "🏠",
    domain: "Property",
    domainColor: "text-[var(--accent-green)]",
  },
  {
    id: "kraken",
    label: "Kraken API",
    icon: "⚡",
    domain: "Energy",
    domainColor: "text-amber-400",
  },
  {
    id: "rest",
    label: "RESTful API",
    icon: "🌐",
    domain: "Web",
    domainColor: "text-[var(--accent-purple)]",
  },
  {
    id: "eventbridge",
    label: "AWS EventBridge",
    icon: "☁️",
    domain: "Cloud",
    domainColor: "text-orange-400",
  },
];

const DROP_ZONES = [
  {
    id: "docusign",
    label: "Electronic Signature Management",
    explanation: "DocuSign specialises in legally binding e-signatures, making it the standard integration for contracts and approvals workflows.",
  },
  {
    id: "propertyme",
    label: "Property Management Integration",
    explanation: "PropertyMe is an Australian property management platform — its API connects leasing and maintenance data to CRM systems.",
  },
  {
    id: "kraken",
    label: "Energy Comparison Services",
    explanation: "Kraken (by Octopus Energy) powers retail energy data, making it ideal for broadband/energy comparison platforms.",
  },
  {
    id: "rest",
    label: "Standard Web Service Communication",
    explanation: "RESTful APIs are the universal contract for web-to-web communication — every modern integration starts here.",
  },
  {
    id: "eventbridge",
    label: "Event-Driven Serverless Architecture",
    explanation: "AWS EventBridge routes events between AWS services and SaaS apps, enabling decoupled, scalable architectures.",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function ApiGame() {
  const [matched, setMatched] = useState<Record<string, boolean>>({});
  const [dragging, setDragging] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const handleDragStart = (id: string) => setDragging(id);
  const handleDragEnd = () => setDragging(null);

  const handleDrop = (zoneId: string) => {
    if (!dragging || matched[zoneId]) return;
    if (dragging === zoneId) {
      const next = score + 1;
      setMatched((prev) => ({ ...prev, [zoneId]: true }));
      setScore(next);
      if (next === 5) setShowSummary(true);
    }
    setDragging(null);
  };

  // Mobile tap-to-select
  const [selected, setSelected] = useState<string | null>(null);
  const handleTap = (id: string) => {
    if (matched[id]) return;
    setSelected((prev) => (prev === id ? null : id));
  };
  const handleZoneTap = (zoneId: string) => {
    if (!selected || matched[zoneId]) return;
    if (selected === zoneId) {
      const next = score + 1;
      setMatched((prev) => ({ ...prev, [zoneId]: true }));
      setScore(next);
      if (next === 5) setShowSummary(true);
    }
    setSelected(null);
  };

  const reset = () => {
    setMatched({});
    setScore(0);
    setDragging(null);
    setSelected(null);
    setShowSummary(false);
  };

  return (
    <article
      aria-labelledby="api-game-heading"
      className="rounded-xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm"
    >
      <header className="mb-6">
        <h2 id="api-game-heading" className="mb-1 text-xl font-bold text-foreground">
          API Integration Matcher
        </h2>
        <p className="text-sm text-muted-foreground">
          Match each API to its real-world use case. Drag and drop — or tap to select,
          then tap a target.{" "}
          <span className="text-primary/70">Based on APIs I&apos;ve integrated in production.</span>
        </p>
      </header>

      {/* Board */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Draggable APIs */}
        <div>
          <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            APIs
          </h3>
          <div className="flex flex-col gap-2" role="list" aria-label="API list">
            {API_ITEMS.map((item) =>
              matched[item.id] ? null : (
                <div
                  key={item.id}
                  role="listitem"
                  draggable
                  onDragStart={() => handleDragStart(item.id)}
                  onDragEnd={handleDragEnd}
                  onClick={() => handleTap(item.id)}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && handleTap(item.id)}
                  className={`flex cursor-grab items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium transition-all active:cursor-grabbing ${
                    selected === item.id
                      ? "border-primary bg-primary/15 text-foreground"
                      : "border-border/60 bg-accent/50 text-foreground hover:border-primary/40 hover:bg-accent"
                  }`}
                >
                  <span className="text-lg" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="flex-1">{item.label}</span>
                  <span className={`text-[10px] font-bold ${item.domainColor}`}>
                    {item.domain}
                  </span>
                </div>
              )
            )}
            {score === 5 && (
              <p className="py-2 text-center text-sm font-medium text-[var(--accent-green)]">
                All matched! 🎉
              </p>
            )}
          </div>
        </div>

        {/* Drop zones */}
        <div>
          <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            Use Cases
          </h3>
          <div className="flex flex-col gap-2" role="list" aria-label="Use case targets">
            {DROP_ZONES.map((zone) => (
              <div
                key={zone.id}
                role="listitem"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(zone.id)}
                onClick={() => handleZoneTap(zone.id)}
                tabIndex={matched[zone.id] ? -1 : 0}
                onKeyDown={(e) => e.key === "Enter" && handleZoneTap(zone.id)}
                className={`min-h-[52px] rounded-lg border px-4 py-3 text-sm transition-all ${
                  matched[zone.id]
                    ? "border-[var(--accent-green)]/50 bg-[var(--accent-green)]/10 text-[var(--accent-green)]"
                    : dragging || selected
                    ? "cursor-pointer border-primary/40 bg-primary/5 text-muted-foreground hover:border-primary/70 hover:bg-primary/10"
                    : "border-border/60 bg-accent/30 text-muted-foreground"
                }`}
              >
                <span className="flex items-center gap-2">
                  {matched[zone.id] && (
                    <span aria-hidden="true" className="shrink-0">
                      ✓
                    </span>
                  )}
                  {zone.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Score row */}
      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          Score:{" "}
          <span className="font-bold text-foreground">
            {score}/{API_ITEMS.length}
          </span>
        </span>
        <button
          onClick={reset}
          className="rounded-full border border-border/60 px-5 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-primary/50 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        >
          Reset
        </button>
      </div>

      {/* Summary panel — shown after all matched */}
      {showSummary && (
        <div className="mt-6 rounded-xl border border-[var(--accent-green)]/30 bg-[var(--accent-green)]/5 p-5">
          <p className="mb-4 text-sm font-bold text-[var(--accent-green)]">
            🏆 API Integration Pro — All 5 matched!
          </p>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Why each pairing is correct
          </h3>
          <ul className="space-y-3">
            {DROP_ZONES.map((zone) => {
              const api = API_ITEMS.find((a) => a.id === zone.id)!;
              return (
                <li key={zone.id} className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {api.icon} {api.label}
                  </span>{" "}
                  → {zone.label}
                  <p className="mt-0.5 text-xs text-muted-foreground/70">
                    {zone.explanation}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </article>
  );
}
