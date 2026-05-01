"use client";

import { useState } from "react";

// ─── Data — correct answer and blocks unchanged ──────────────────────────────
const SCENARIO = {
  question: "Find all customers who made purchases over $1000 in 2024",
  tableSchema: {
    name: "purchases",
    columns: ["id", "name", "total", "year", "category"],
  },
  hint: "Think about which table holds purchase records, then filter by total amount and year.",
};

const SQL_BLOCKS = [
  { value: "SELECT * FROM",          category: "select" },
  { value: "SELECT name, total FROM", category: "select" },
  { value: "customers",              category: "table"  },
  { value: "purchases",              category: "table"  },
  { value: "WHERE total > 1000",     category: "filter" },
  { value: "WHERE year = 2024",      category: "filter" },
  { value: "AND year = 2024",        category: "filter" },
  { value: "ORDER BY total DESC",    category: "order"  },
];

const CORRECT_QUERY = "SELECT name, total FROM purchases WHERE total > 1000 AND year = 2024";

const BLOCK_COLOR: Record<string, string> = {
  select: "border-blue-500/40 bg-blue-500/10 text-blue-300",
  table:  "border-[var(--accent-green)]/40 bg-[var(--accent-green)]/10 text-[var(--accent-green)]",
  filter: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  order:  "border-[var(--accent-purple)]/40 bg-[var(--accent-purple)]/10 text-[var(--accent-purple)]",
};

const MOCK_RESULTS = [
  { name: "Alice Chen",     total: "$1,420", year: 2024 },
  { name: "James O'Brien",  total: "$2,110", year: 2024 },
  { name: "Priya Nair",     total: "$1,050", year: 2024 },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function SqlGame() {
  const [queryParts, setQueryParts] = useState<string[]>([]);
  const [used, setUsed] = useState<Set<string>>(new Set());
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showSchema, setShowSchema] = useState(false);

  const addBlock = (value: string) => {
    if (used.has(value)) return;
    setQueryParts((prev) => [...prev, value]);
    setUsed((prev) => new Set(prev).add(value));
    setFeedback(null);
  };

  const removeLastBlock = () => {
    if (queryParts.length === 0) return;
    const last = queryParts[queryParts.length - 1];
    setQueryParts((prev) => prev.slice(0, -1));
    setUsed((prev) => {
      const next = new Set(prev);
      next.delete(last);
      return next;
    });
    setFeedback(null);
  };

  const checkQuery = () => {
    setFeedback(queryParts.join(" ") === CORRECT_QUERY ? "correct" : "incorrect");
  };

  const reset = () => {
    setQueryParts([]);
    setUsed(new Set());
    setFeedback(null);
    setShowHint(false);
  };

  return (
    <article
      aria-labelledby="sql-game-heading"
      className="rounded-xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm"
    >
      <header className="mb-6">
        <h2 id="sql-game-heading" className="mb-1 text-xl font-bold text-foreground">
          SQL Query Builder
        </h2>
        <p className="text-sm text-muted-foreground">
          Click blocks to build a SQL query that answers the scenario below.{" "}
          <span className="text-primary/70">Based on real data-retrieval patterns I use daily.</span>
        </p>
      </header>

      {/* Scenario */}
      <div className="mb-5 rounded-lg border border-border/40 bg-background/60 px-5 py-4">
        <h3 className="mb-1.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          Scenario
        </h3>
        <p className="text-sm font-medium text-foreground">{SCENARIO.question}</p>

        {/* Table schema toggle */}
        <button
          onClick={() => setShowSchema((s) => !s)}
          className="mt-3 text-xs font-medium text-primary/70 hover:text-primary underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded"
        >
          {showSchema ? "Hide" : "Show"} table schema
        </button>
        {showSchema && (
          <div className="mt-3 rounded-lg border border-border/40 bg-accent/30 px-4 py-3">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Table: {SCENARIO.tableSchema.name}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {SCENARIO.tableSchema.columns.map((col) => (
                <span
                  key={col}
                  className="rounded bg-border/40 px-2 py-0.5 font-mono text-xs text-muted-foreground"
                >
                  {col}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Block palette */}
      <div className="mb-5">
        <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          Available blocks
        </h3>
        <div className="flex flex-wrap gap-2">
          {SQL_BLOCKS.map((block) => (
            <button
              key={block.value}
              onClick={() => addBlock(block.value)}
              disabled={used.has(block.value)}
              className={`rounded-lg border px-3 py-2 font-mono text-xs font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
                used.has(block.value)
                  ? "cursor-not-allowed border-border/30 bg-accent/20 text-muted-foreground/40 opacity-40"
                  : `cursor-pointer ${BLOCK_COLOR[block.category]} hover:opacity-80`
              }`}
            >
              {block.value}
            </button>
          ))}
        </div>
      </div>

      {/* Query builder display */}
      <div className="mb-5 rounded-lg border border-border/40 bg-background/60 px-5 py-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            Your query
          </h3>
          {queryParts.length > 0 && (
            <button
              onClick={removeLastBlock}
              className="text-xs text-muted-foreground/60 hover:text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded"
            >
              ← Undo last
            </button>
          )}
        </div>
        <p className="min-h-[1.5rem] font-mono text-sm text-foreground">
          {queryParts.length > 0 ? (
            queryParts.join(" ")
          ) : (
            <span className="text-muted-foreground/40">
              Click blocks above to build your query…
            </span>
          )}
        </p>
      </div>

      {/* Hint */}
      {showHint && (
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-3">
          <span className="text-base" aria-hidden="true">💡</span>
          <p className="text-sm text-muted-foreground">{SCENARIO.hint}</p>
        </div>
      )}

      {/* Feedback */}
      {feedback && (
        <div
          role="alert"
          className={`mb-4 rounded-lg px-4 py-3 text-sm font-medium ${
            feedback === "correct"
              ? "border border-[var(--accent-green)]/40 bg-[var(--accent-green)]/10 text-[var(--accent-green)]"
              : "border border-destructive/40 bg-destructive/10 text-destructive"
          }`}
        >
          {feedback === "correct"
            ? "✓ Correct! That query retrieves customers with purchases over $1000 in 2024."
            : "✗ Not quite right. Check your table name and filters — use the hint if needed."}
        </div>
      )}

      {/* Mock result preview on correct */}
      {feedback === "correct" && (
        <div className="mb-4 overflow-x-auto rounded-lg border border-border/40 bg-background/60">
          <table className="w-full text-xs">
            <caption className="sr-only">Mocked query results</caption>
            <thead>
              <tr className="border-b border-border/40">
                {["name", "total"].map((col) => (
                  <th
                    key={col}
                    className="px-4 py-2 text-left font-mono font-bold text-muted-foreground/70"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_RESULTS.map((row) => (
                <tr
                  key={row.name}
                  className="border-b border-border/20 last:border-0"
                >
                  <td className="px-4 py-2 font-mono text-muted-foreground">{row.name}</td>
                  <td className="px-4 py-2 font-mono text-[var(--accent-green)]">{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={checkQuery}
          disabled={queryParts.length === 0}
          className="rounded-full bg-primary px-6 py-2 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        >
          Check Query
        </button>
        <button
          onClick={() => setShowHint((h) => !h)}
          className="rounded-full border border-amber-500/30 bg-amber-500/10 px-5 py-2 text-sm font-medium text-amber-300 transition-all hover:bg-amber-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        >
          {showHint ? "Hide hint" : "Need a hint?"}
        </button>
        <button
          onClick={reset}
          className="rounded-full border border-border/60 px-5 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-primary/50 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        >
          Reset
        </button>
      </div>
    </article>
  );
}
