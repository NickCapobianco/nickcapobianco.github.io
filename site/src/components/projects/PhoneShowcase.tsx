"use client";

import { useState, type ReactNode } from "react";
import { ArrowLeft, Check, ChevronRight, Fingerprint, HeartPulse, Home, Moon, Footprints } from "lucide-react";

/**
 * Interactive preview of an unreleased app: the home screen plus two screens
 * (Health and Blueprint). No app name; the rest of the app stays private.
 */
type Screen = "home" | "health" | "blueprint";

const CHECKLIST = ["Morning routine", "Review the week", "Plan tomorrow"];
const WEEK = [0.55, 0.8, 0.62, 0.9, 0.7, 0.95, 0.74];
const TRAITS: [string, number][] = [
  ["Openness", 0.82],
  ["Conscientiousness", 0.74],
  ["Extraversion", 0.58],
  ["Agreeableness", 0.69],
  ["Emotional stability", 0.66],
];

function Ring({ value, size = 64 }: { value: number; size?: number }) {
  const r = 26;
  const circ = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 64 64" style={{ width: size, height: size }} className="-rotate-90" aria-hidden="true">
      <circle cx="32" cy="32" r={r} fill="none" strokeWidth="7" className="stroke-zinc-200 dark:stroke-zinc-700" />
      <circle
        cx="32"
        cy="32"
        r={r}
        fill="none"
        strokeWidth="7"
        strokeLinecap="round"
        stroke="url(#phone-ring)"
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - value)}
        className="transition-[stroke-dashoffset] duration-500"
      />
      <defs>
        <linearGradient id="phone-ring" x1="0" x2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const card = "rounded-2xl bg-white p-4 shadow-sm dark:bg-zinc-800";

function Header({ title, onBack }: { title: string; onBack?: () => void }) {
  return (
    <div className="flex items-center gap-2">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to home"
          className="-ml-1.5 grid size-7 place-items-center rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
        </button>
      ) : null}
      <p className="text-xl font-semibold tracking-tight">{title}</p>
    </div>
  );
}

function HomeScreen({ go }: { go: (s: Screen) => void }) {
  const [done, setDone] = useState([true, false, false]);
  const count = done.filter(Boolean).length;
  return (
    <>
      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Good morning</p>
      <Header title="Today" />
      <div className={`mt-3 flex items-center gap-4 ${card}`}>
        <Ring value={count / CHECKLIST.length} />
        <div>
          <p className="text-2xl font-semibold tabular-nums">
            {count}/{CHECKLIST.length}
          </p>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            {count === CHECKLIST.length ? "All done" : "Keep going"}
          </p>
        </div>
      </div>
      <ul className="mt-3 space-y-2">
        {CHECKLIST.map((label, i) => (
          <li key={label}>
            <button
              type="button"
              aria-pressed={done[i]}
              onClick={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))}
              className="flex w-full items-center gap-3 rounded-xl bg-white px-3 py-2 text-left shadow-sm hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700"
            >
              <span
                className={`grid size-5 shrink-0 place-items-center rounded-full border-2 transition-colors ${
                  done[i] ? "border-indigo-500 bg-indigo-500 text-white" : "border-zinc-300 dark:border-zinc-600"
                }`}
              >
                {done[i] ? <Check className="size-3" strokeWidth={3} aria-hidden="true" /> : null}
              </span>
              <span className={`text-[13px] font-medium ${done[i] ? "text-zinc-400 line-through" : ""}`}>{label}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {(
          [
            ["health", "Health", HeartPulse, "from-rose-400 to-red-600"],
            ["blueprint", "Blueprint", Fingerprint, "from-violet-400 to-purple-700"],
          ] as const
        ).map(([id, label, Icon, hue]) => (
          <button
            key={id}
            type="button"
            onClick={() => go(id)}
            className="flex flex-col items-start gap-2 rounded-2xl bg-white p-3 text-left shadow-sm hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          >
            <span className={`grid size-8 place-items-center rounded-xl bg-gradient-to-br ${hue} text-white`}>
              <Icon className="size-4" aria-hidden="true" />
            </span>
            <span className="flex w-full items-center justify-between text-[12px] font-semibold">
              {label}
              <ChevronRight className="size-3.5 text-zinc-400" aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>
    </>
  );
}

function HealthScreen({ back }: { back: () => void }) {
  return (
    <>
      <Header title="Health" onBack={back} />
      <div className={`mt-3 flex items-center gap-4 ${card}`}>
        <Ring value={0.78} />
        <div>
          <p className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
            <Footprints className="size-3.5" aria-hidden="true" /> Steps
          </p>
          <p className="text-2xl font-semibold tabular-nums">7,812</p>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">of 10,000</p>
        </div>
      </div>
      <div className={`mt-3 ${card}`}>
        <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">This week</p>
        <div className="mt-2 flex h-16 items-end gap-1.5" aria-hidden="true">
          {WEEK.map((h, i) => (
            <span
              key={i}
              className={`flex-1 rounded-t-md ${i === WEEK.length - 1 ? "bg-rose-500" : "bg-rose-200 dark:bg-rose-500/40"}`}
              style={{ height: `${h * 100}%` }}
            />
          ))}
        </div>
        <div className="mt-1 flex justify-between text-[9px] text-zinc-400">
          {"MTWTFSS".split("").map((d, i) => (
            <span key={i} className="flex-1 text-center">
              {d}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className={card}>
          <HeartPulse className="size-4 text-rose-500" aria-hidden="true" />
          <p className="mt-1.5 text-lg font-semibold tabular-nums">62</p>
          <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Resting bpm</p>
        </div>
        <div className={card}>
          <Moon className="size-4 text-indigo-500" aria-hidden="true" />
          <p className="mt-1.5 text-lg font-semibold tabular-nums">7:40</p>
          <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Sleep (hrs)</p>
        </div>
      </div>
    </>
  );
}

function BlueprintScreen({ back }: { back: () => void }) {
  return (
    <>
      <Header title="Blueprint" onBack={back} />
      <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">Your personality profile</p>
      <div className={`mt-3 space-y-3 ${card}`}>
        {TRAITS.map(([name, v]) => (
          <div key={name}>
            <div className="flex justify-between text-[11px]">
              <span className="font-medium">{name}</span>
              <span className="text-zinc-500 tabular-nums dark:text-zinc-400">{Math.round(v * 100)}</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-400 to-purple-600"
                style={{ width: `${v * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className={`mt-3 ${card}`}>
        <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">Where you&rsquo;d thrive</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["Building things", "Leading teams", "Problem solving"].map((t) => (
            <span
              key={t}
              className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-medium text-violet-700 dark:bg-violet-500/20 dark:text-violet-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export function PhoneShowcase() {
  const [screen, setScreen] = useState<Screen>("home");
  const home = () => setScreen("home");

  const screens: Record<Screen, ReactNode> = {
    home: <HomeScreen go={setScreen} />,
    health: <HealthScreen back={home} />,
    blueprint: <BlueprintScreen back={home} />,
  };

  const tabs = [
    ["home", Home, "Home"],
    ["health", HeartPulse, "Health"],
    ["blueprint", Fingerprint, "Blueprint"],
  ] as const;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-[248px] shrink-0 rounded-[38px] border border-line-strong bg-zinc-950 p-[7px] shadow-float">
        <div className="relative flex h-[480px] flex-col overflow-hidden rounded-[32px] bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
          <div className="relative flex items-center justify-between px-6 pt-2.5 text-[10px] font-semibold">
            <span>9:41</span>
            <span className="absolute top-2 left-1/2 h-[18px] w-[72px] -translate-x-1/2 rounded-full bg-zinc-950" />
            <span className="h-2 w-3 rounded-[2px] border border-current opacity-70" />
          </div>

          <div
            key={screen}
            aria-live="polite"
            className="flex-1 animate-fade-in [scrollbar-width:none] overflow-y-auto px-4 pt-5 pb-3"
          >
            {screens[screen]}
          </div>

          <nav
            aria-label="Preview screens"
            className="flex items-center justify-around border-t border-zinc-200 bg-white/90 px-4 pt-2 pb-3 dark:border-zinc-800 dark:bg-zinc-900/90"
          >
            {tabs.map(([id, Icon, label]) => {
              const active = screen === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setScreen(id)}
                  aria-pressed={active}
                  className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1 text-[9px] font-medium ${
                    active ? "text-indigo-500" : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                  }`}
                >
                  <Icon className="size-5" aria-hidden="true" />
                  {label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
      <p className="text-center text-[11px] text-subtle">Tip of the iceberg: three screens of many</p>
    </div>
  );
}
