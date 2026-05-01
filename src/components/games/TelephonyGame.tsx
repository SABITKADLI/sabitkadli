"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Data — scenarios and correct routing unchanged ──────────────────────────
const SCENARIOS = [
  { text: "Customer wants to purchase new service", dept: "sales"   },
  { text: "Technical issue with internet connection", dept: "tech"   },
  { text: "Question about recent invoice charges",   dept: "billing" },
  { text: "Need help setting up email account",      dept: "support" },
  { text: "Interested in upgrading current plan",    dept: "sales"   },
  { text: "System not responding to commands",       dept: "tech"    },
  { text: "Disputed charges on account",             dept: "billing" },
  { text: "Password reset assistance needed",        dept: "support" },
  { text: "Wants quote for enterprise solution",     dept: "sales"   },
  { text: "Network connectivity problems",           dept: "tech"    },
];

const DEPTS = [
  { id: "sales",   label: "Sales",     color: "border-blue-500/50 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20"  },
  { id: "support", label: "Support",   color: "border-[var(--accent-green)]/50 bg-[var(--accent-green)]/10 text-[var(--accent-green)] hover:bg-[var(--accent-green)]/20" },
  { id: "tech",    label: "Technical", color: "border-[var(--accent-purple)]/50 bg-[var(--accent-purple)]/10 text-[var(--accent-purple)] hover:bg-[var(--accent-purple)]/20" },
  { id: "billing", label: "Billing",   color: "border-amber-500/50 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20" },
];

const CALL_TIMEOUT_MS = 5000;
const TOTAL_CALLS = 10;

interface GameResult {
  correct: number;
  missed: number;
  timeElapsed: number;
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function TelephonyGame() {
  const [active, setActive]         = useState(false);
  const [correct, setCorrect]       = useState(0);
  const [missed, setMissed]         = useState(0);
  const [timer, setTimer]           = useState(0);
  const [callText, setCallText]     = useState("Click Start to begin");
  const [callProgress, setCallProgress] = useState(0); // 0–100 for timeout bar
  const [result, setResult]         = useState<GameResult | null>(null);

  const currentDept    = useRef<string | null>(null);
  const callTimeout    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerInterval  = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalRef       = useRef(0);
  const correctRef     = useRef(0);
  const missedRef      = useRef(0);
  const timerRef       = useRef(0);

  const clearTimers = () => {
    if (callTimeout.current)    clearTimeout(callTimeout.current);
    if (timerInterval.current)  clearInterval(timerInterval.current);
    if (progressInterval.current) clearInterval(progressInterval.current);
  };

  const endGame = useCallback(() => {
    clearTimers();
    setActive(false);
    setCallText("Game over — click Start to play again.");
    setCallProgress(0);
    setResult({
      correct: correctRef.current,
      missed: missedRef.current,
      timeElapsed: timerRef.current,
    });
  }, []);

  const nextCall = useCallback(() => {
    if (callTimeout.current) clearTimeout(callTimeout.current);
    if (progressInterval.current) clearInterval(progressInterval.current);

    const scenario = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
    currentDept.current = scenario.dept;
    setCallText(scenario.text);
    setCallProgress(0);

    // Progress bar — tick every ~50 ms over CALL_TIMEOUT_MS
    let elapsed = 0;
    progressInterval.current = setInterval(() => {
      elapsed += 50;
      setCallProgress(Math.min((elapsed / CALL_TIMEOUT_MS) * 100, 100));
    }, 50);

    callTimeout.current = setTimeout(() => {
      clearInterval(progressInterval.current!);
      missedRef.current += 1;
      setMissed(missedRef.current);
      totalRef.current += 1;
      if (totalRef.current >= TOTAL_CALLS) {
        endGame();
      } else {
        nextCall();
      }
    }, CALL_TIMEOUT_MS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endGame]);

  const start = () => {
    correctRef.current = 0;
    missedRef.current  = 0;
    timerRef.current   = 0;
    totalRef.current   = 0;
    setCorrect(0);
    setMissed(0);
    setTimer(0);
    setResult(null);
    setActive(true);

    timerInterval.current = setInterval(() => {
      timerRef.current += 1;
      setTimer((t) => t + 1);
    }, 1000);

    nextCall();
  };

  const handleRoute = (dept: string) => {
    if (!active || !currentDept.current) return;
    const isCorrect = currentDept.current === dept;
    if (isCorrect) {
      correctRef.current += 1;
      setCorrect(correctRef.current);
    } else {
      missedRef.current += 1;
      setMissed(missedRef.current);
    }
    totalRef.current += 1;

    if (totalRef.current >= TOTAL_CALLS) {
      endGame();
    } else {
      nextCall();
    }
  };

  const reset = () => {
    clearTimers();
    setActive(false);
    setCorrect(0);
    setMissed(0);
    setTimer(0);
    setCallText("Click Start to begin");
    setCallProgress(0);
    setResult(null);
    currentDept.current = null;
    correctRef.current  = 0;
    missedRef.current   = 0;
    timerRef.current    = 0;
    totalRef.current    = 0;
  };

  useEffect(() => () => clearTimers(), []);

  const accuracy =
    result
      ? result.correct + result.missed > 0
        ? Math.round((result.correct / (result.correct + result.missed)) * 100)
        : 0
      : null;

  const resultLabel =
    accuracy !== null
      ? accuracy >= 90
        ? "SLA Met — Expert Routing 🏆"
        : accuracy >= 70
        ? "Good Performance 🎯"
        : "Routing needs work 💪"
      : null;

  return (
    <article
      aria-labelledby="telephony-game-heading"
      className="rounded-xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm"
    >
      <header className="mb-6">
        <h2
          id="telephony-game-heading"
          className="mb-1 text-xl font-bold text-foreground"
        >
          Telephony Call Routing
        </h2>
        <p className="text-sm text-muted-foreground">
          Route 10 incoming calls to the correct department within 5 seconds each.{" "}
          <span className="text-primary/70">
            Simulates the IVR/routing logic I configured in Genesys Cloud.
          </span>
        </p>
      </header>

      {/* Incoming call display */}
      <div
        className="mb-5 overflow-hidden rounded-xl border border-border/40 bg-background/60"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="px-5 pt-5 pb-4">
          <h3 className="mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            Incoming Call
          </h3>
          <p
            className={`min-h-[1.5rem] text-base font-medium ${
              active ? "text-foreground" : "text-muted-foreground/70"
            }`}
          >
            {callText}
          </p>
        </div>
        {/* Timeout progress bar */}
        {active && (
          <div className="h-1 w-full bg-border/30">
            <div
              className="h-full bg-primary transition-none"
              style={{ width: `${100 - callProgress}%` }}
              role="progressbar"
              aria-valuenow={Math.round(100 - callProgress)}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        )}
      </div>

      {/* Routing buttons — department queue cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4" role="group" aria-label="Route call to department">
        {DEPTS.map((d) => (
          <button
            key={d.id}
            onClick={() => handleRoute(d.id)}
            disabled={!active}
            className={`rounded-xl border px-4 py-4 text-sm font-bold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-30 ${d.color}`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Stats dashboard row */}
      <div className="mb-5 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-lg border border-border/40 bg-accent/30 px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Correct</p>
          <p className="text-xl font-black text-[var(--accent-green)]">{correct}</p>
        </div>
        <div className="rounded-lg border border-border/40 bg-accent/30 px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Missed</p>
          <p className="text-xl font-black text-destructive">{missed}</p>
        </div>
        <div className="rounded-lg border border-border/40 bg-accent/30 px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Time</p>
          <p className="text-xl font-black text-foreground">{timer}s</p>
        </div>
      </div>

      {/* Performance summary after round */}
      {result && accuracy !== null && (
        <div
          role="alert"
          className={`mb-5 rounded-xl border p-5 ${
            accuracy >= 90
              ? "border-[var(--accent-green)]/30 bg-[var(--accent-green)]/5"
              : accuracy >= 70
              ? "border-primary/30 bg-primary/5"
              : "border-destructive/30 bg-destructive/5"
          }`}
        >
          <p className="mb-3 font-bold text-foreground">{resultLabel}</p>
          <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
            <div>
              <p className="text-xs text-muted-foreground/60">Accuracy</p>
              <p className="font-bold text-foreground">{accuracy}%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground/60">Correct routes</p>
              <p className="font-bold text-[var(--accent-green)]">{result.correct}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground/60">Missed calls</p>
              <p className="font-bold text-destructive">{result.missed}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground/60">Total time</p>
              <p className="font-bold text-foreground">{result.timeElapsed}s</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground/60">
            SLA target: ≥ 90% accuracy · Avg routing target: &lt; 3s/call
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={start}
          disabled={active}
          className="rounded-full bg-primary px-6 py-2 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        >
          {result ? "Play Again" : "Start Game"}
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
