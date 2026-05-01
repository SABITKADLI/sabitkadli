"use client";

import { useState, useEffect, useCallback } from "react";

// ─── Data — concepts unchanged ───────────────────────────────────────────────
const CONCEPTS: Record<string, string> = {
  useState:
    "useState — Returns a stateful value and a setter. Triggers a re-render when the value changes.",
  useEffect:
    "useEffect — Runs side-effects after render. Use for data fetching, subscriptions, or DOM mutations.",
  Props:
    "Props — Immutable data passed from a parent component. The primary way to compose and configure components.",
  JSX:
    "JSX — A syntax extension that lets you write HTML-like markup inside JavaScript. Compiled to React.createElement() calls.",
  Components:
    "Components — Self-contained, reusable pieces of UI. They can be functions or classes; functions are standard today.",
  Hooks:
    "Hooks — Functions that let function components use state and lifecycle features. All hooks start with 'use'.",
  "Virtual DOM":
    "Virtual DOM — React's in-memory representation of the real DOM. It diffs efficiently before applying minimal DOM updates.",
  State:
    "State — Mutable data local to a component. When state changes, React re-renders the component and its children.",
};

const CONCEPT_KEYS = Object.keys(CONCEPTS);

interface Card {
  id: number;
  concept: string;
  flipped: boolean;
  matched: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildCards(): Card[] {
  return shuffle([...CONCEPT_KEYS, ...CONCEPT_KEYS]).map((concept, i) => ({
    id: i,
    concept,
    flipped: false,
    matched: false,
  }));
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function ReactMemoryGame() {
  const [cards, setCards] = useState<Card[]>(buildCards);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);
  const [locked, setLocked] = useState(false);
  const [lastMatched, setLastMatched] = useState<string | null>(null);

  const reset = useCallback(() => {
    setCards(buildCards());
    setFlipped([]);
    setMoves(0);
    setMatchedCount(0);
    setLocked(false);
    setLastMatched(null);
  }, []);

  const flipCard = (id: number) => {
    if (locked) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.flipped || card.matched) return;
    if (flipped.length === 1 && flipped[0] === id) return;

    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, flipped: true } : c))
    );
    setFlipped((prev) => [...prev, id]);

    if (flipped.length === 1) {
      setMoves((m) => m + 1);
      setLocked(true);
    }
  };

  useEffect(() => {
    if (flipped.length !== 2) return;
    const [a, b] = flipped.map((id) => cards.find((c) => c.id === id)!);

    if (a.concept === b.concept) {
      setCards((prev) =>
        prev.map((c) =>
          c.id === a.id || c.id === b.id ? { ...c, matched: true } : c
        )
      );
      setMatchedCount((n) => n + 1);
      setLastMatched(a.concept);
      setFlipped([]);
      setLocked(false);
    } else {
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === a.id || c.id === b.id ? { ...c, flipped: false } : c
          )
        );
        setFlipped([]);
        setLocked(false);
        setLastMatched(null);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flipped]);

  const isComplete = matchedCount === CONCEPT_KEYS.length;

  const resultLabel =
    moves <= 12
      ? "React Expert 🏆"
      : moves <= 18
      ? "Strong recall 🎯"
      : "Keep practising 💪";

  return (
    <article
      aria-labelledby="react-game-heading"
      className="rounded-xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm"
    >
      <header className="mb-6">
        <h2 id="react-game-heading" className="mb-1 text-xl font-bold text-foreground">
          React Concepts Memory Match
        </h2>
        <p className="text-sm text-muted-foreground">
          Flip cards to find matching pairs of React concepts. When you match a pair,
          you&apos;ll see a one-sentence explanation.{" "}
          <span className="text-primary/70">I use all of these daily.</span>
        </p>
      </header>

      {/* Card grid */}
      <div
        className="mb-5 grid grid-cols-4 gap-2"
        role="list"
        aria-label="Memory cards"
      >
        {cards.map((card) => (
          <button
            key={card.id}
            role="listitem"
            onClick={() => flipCard(card.id)}
            disabled={card.matched || locked && !card.flipped}
            aria-label={
              card.flipped || card.matched
                ? `${card.concept} — revealed`
                : "Hidden card"
            }
            className={`aspect-square rounded-lg border text-[10px] font-bold leading-tight transition-all duration-300 md:text-xs ${
              card.matched
                ? "border-[var(--accent-green)]/50 bg-[var(--accent-green)]/10 text-[var(--accent-green)] cursor-default"
                : card.flipped
                ? "border-primary/50 bg-primary/10 text-primary"
                : "border-border/50 bg-accent/40 text-muted-foreground hover:border-primary/30 hover:bg-accent/70 cursor-pointer"
            }`}
          >
            <span className="block px-1 text-center leading-tight">
              {card.flipped || card.matched ? card.concept : "?"}
            </span>
          </button>
        ))}
      </div>

      {/* Explanation panel — shown on match */}
      {lastMatched && !isComplete && (
        <div
          aria-live="polite"
          className="mb-4 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-muted-foreground"
        >
          <span className="font-semibold text-foreground">
            {lastMatched}
          </span>{" "}
          — {CONCEPTS[lastMatched].split(" — ")[1]}
        </div>
      )}

      {/* Completion panel */}
      {isComplete && (
        <div
          role="alert"
          className="mb-4 rounded-xl border border-[var(--accent-green)]/30 bg-[var(--accent-green)]/5 p-5"
        >
          <p className="mb-2 font-bold text-[var(--accent-green)]">
            {resultLabel} — All {CONCEPT_KEYS.length} pairs matched in{" "}
            <span className="text-foreground">{moves} moves</span>.
          </p>
          <p className="text-xs text-muted-foreground">
            ≤ 12 moves = expert · 13–18 = solid · 19+ = room to grow
          </p>
        </div>
      )}

      {/* Stats + reset */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>
            Moves:{" "}
            <strong className="font-bold text-foreground">{moves}</strong>
          </span>
          <span>
            Matched:{" "}
            <strong className="font-bold text-foreground">
              {matchedCount}/{CONCEPT_KEYS.length}
            </strong>
          </span>
        </div>
        <button
          onClick={reset}
          className="rounded-full border border-border/60 px-5 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-primary/50 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        >
          New Game
        </button>
      </div>
    </article>
  );
}
