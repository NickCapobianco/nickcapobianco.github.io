"use client";

import { useState } from "react";
import { Check, Home, Plus, Search, User } from "lucide-react";

/**
 * Home-screen snapshot of an unreleased app. Interactive enough to feel real
 * (tick items off, the ring fills), but it shows no feature list or name.
 */
const ITEMS = ["Morning routine", "Review the week", "Plan tomorrow"];

export function PhoneShowcase() {
  const [done, setDone] = useState<boolean[]>([true, false, false]);
  const count = done.filter(Boolean).length;
  const pct = count / ITEMS.length;
  const r = 26;
  const circ = 2 * Math.PI * r;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-[240px] shrink-0 rounded-[38px] border border-line-strong bg-zinc-950 p-[7px] shadow-float">
        <div className="relative flex h-[440px] flex-col overflow-hidden rounded-[32px] bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
          {/* Status bar */}
          <div className="relative flex items-center justify-between px-6 pt-2.5 text-[10px] font-semibold">
            <span>9:41</span>
            <span className="absolute top-2 left-1/2 h-[18px] w-[72px] -translate-x-1/2 rounded-full bg-zinc-950" />
            <span className="h-2 w-3 rounded-[2px] border border-current opacity-70" />
          </div>

          <div className="flex-1 px-5 pt-6">
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Good morning</p>
            <p className="text-xl font-semibold tracking-tight">Today</p>

            {/* Progress ring */}
            <div className="mt-4 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-zinc-800">
              <svg viewBox="0 0 64 64" className="size-16 -rotate-90" aria-hidden="true">
                <circle
                  cx="32"
                  cy="32"
                  r={r}
                  fill="none"
                  strokeWidth="7"
                  className="stroke-zinc-200 dark:stroke-zinc-700"
                />
                <circle
                  cx="32"
                  cy="32"
                  r={r}
                  fill="none"
                  strokeWidth="7"
                  strokeLinecap="round"
                  stroke="url(#ring)"
                  strokeDasharray={circ}
                  strokeDashoffset={circ * (1 - pct)}
                  className="transition-[stroke-dashoffset] duration-500"
                />
                <defs>
                  <linearGradient id="ring" x1="0" x2="1">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
              <div>
                <p className="text-2xl font-semibold tabular-nums">
                  {count}/{ITEMS.length}
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  {count === ITEMS.length ? "All done" : "Keep going"}
                </p>
              </div>
            </div>

            {/* Checklist */}
            <ul className="mt-4 space-y-2">
              {ITEMS.map((label, i) => (
                <li key={label}>
                  <button
                    type="button"
                    aria-pressed={done[i]}
                    onClick={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))}
                    className="flex w-full items-center gap-3 rounded-xl bg-white px-3 py-2.5 text-left shadow-sm transition-colors hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                  >
                    <span
                      className={`grid size-5 shrink-0 place-items-center rounded-full border-2 transition-colors ${
                        done[i] ? "border-indigo-500 bg-indigo-500 text-white" : "border-zinc-300 dark:border-zinc-600"
                      }`}
                    >
                      {done[i] ? <Check className="size-3" strokeWidth={3} aria-hidden="true" /> : null}
                    </span>
                    <span className={`text-[13px] font-medium ${done[i] ? "text-zinc-400 line-through" : ""}`}>
                      {label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tab bar */}
          <nav
            aria-hidden="true"
            className="flex items-center justify-around border-t border-zinc-200 bg-white/80 px-4 pt-2 pb-4 dark:border-zinc-800 dark:bg-zinc-900/80"
          >
            <Home className="size-5 text-indigo-500" />
            <Search className="size-5 text-zinc-400" />
            <span className="grid size-8 place-items-center rounded-full bg-indigo-500 text-white">
              <Plus className="size-4" />
            </span>
            <User className="size-5 text-zinc-400" />
          </nav>
        </div>
      </div>
      <p className="text-center text-[11px] text-subtle">Home screen preview</p>
    </div>
  );
}
