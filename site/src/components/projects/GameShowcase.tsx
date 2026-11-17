"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Minus, Square, X } from "lucide-react";

/**
 * Mock Windows game window: a main menu and a loading screen. Original art,
 * no title, no gameplay; the game itself stays private until release.
 */
type Screen = "menu" | "loading" | "ready" | "settings" | "credits";

/** Deterministic star field so server and client render the same markup. */
const STARS = Array.from({ length: 70 }, (_, i) => {
  const r = (n: number) => (((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1) + 1) % 1;
  return { x: r(1) * 100, y: r(2) * 100, s: r(3) * 1.6 + 0.4, o: r(4) * 0.6 + 0.3 };
});

function Emblem() {
  return (
    <svg viewBox="0 0 120 120" className="size-20 sm:size-24" aria-hidden="true">
      <defs>
        <radialGradient id="core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#a5b4fc" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="22" fill="url(#core)" />
      <ellipse
        cx="60"
        cy="60"
        rx="52"
        ry="16"
        fill="none"
        stroke="#a5b4fc"
        strokeOpacity="0.7"
        strokeWidth="1.5"
        transform="rotate(-20 60 60)"
      />
      <ellipse
        cx="60"
        cy="60"
        rx="52"
        ry="16"
        fill="none"
        stroke="#f0abfc"
        strokeOpacity="0.5"
        strokeWidth="1.5"
        transform="rotate(40 60 60)"
      />
      <circle cx="108" cy="44" r="3" fill="#f0abfc" />
      <circle cx="18" cy="80" r="2.5" fill="#a5b4fc" />
    </svg>
  );
}

function MenuButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-40 rounded-md border border-indigo-300/30 bg-white/5 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-indigo-100 uppercase backdrop-blur transition hover:border-indigo-300/70 hover:bg-indigo-400/15 hover:text-white"
    >
      {children}
    </button>
  );
}

function Back({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 text-[10px] font-semibold tracking-widest text-indigo-200 uppercase hover:text-white"
    >
      <ArrowLeft className="size-3" aria-hidden="true" /> Back
    </button>
  );
}

export function GameShowcase() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [progress, setProgress] = useState(0);
  const [settings, setSettings] = useState({ Music: true, Effects: true, Fullscreen: false });

  useEffect(() => {
    if (screen !== "loading") return;
    setProgress(0);
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id);
          setScreen("ready");
          return 100;
        }
        return Math.min(100, p + 4);
      });
    }, 70);
    return () => clearInterval(id);
  }, [screen]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full max-w-[640px] overflow-hidden rounded-lg border border-line-strong bg-zinc-900 shadow-float">
        {/* Windows title bar */}
        <div className="flex items-center justify-between bg-zinc-800 pl-3 text-[10px] text-zinc-300">
          <span>Game</span>
          <span className="flex" aria-hidden="true">
            <span className="grid h-6 w-8 place-items-center">
              <Minus className="size-3" />
            </span>
            <span className="grid h-6 w-8 place-items-center">
              <Square className="size-2.5" />
            </span>
            <span className="grid h-6 w-8 place-items-center">
              <X className="size-3" />
            </span>
          </span>
        </div>

        {/* Scene */}
        <div className="relative aspect-[16/9] overflow-hidden bg-[#05060f] text-white">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(139,92,246,0.35),transparent_55%),radial-gradient(ellipse_at_20%_80%,rgba(56,189,248,0.25),transparent_50%)]"
          />
          <div aria-hidden="true" className="absolute inset-0">
            {STARS.map((st, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-white"
                style={{ left: `${st.x}%`, top: `${st.y}%`, width: st.s, height: st.s, opacity: st.o }}
              />
            ))}
          </div>

          <div
            key={screen}
            aria-live="polite"
            className="relative flex h-full animate-fade-in flex-col items-center justify-center gap-4 p-4"
          >
            {screen === "menu" ? (
              <>
                <Emblem />
                <div className="flex flex-col items-center gap-2">
                  <MenuButton onClick={() => setScreen("loading")}>Play</MenuButton>
                  <MenuButton onClick={() => setScreen("settings")}>Settings</MenuButton>
                  <MenuButton onClick={() => setScreen("credits")}>Credits</MenuButton>
                </div>
              </>
            ) : null}

            {screen === "loading" || screen === "ready" ? (
              <>
                <Emblem />
                <div className="w-3/5 max-w-xs">
                  <div className="h-1 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sky-400 to-fuchsia-400 transition-[width] duration-75"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="mt-2 text-center text-[10px] tracking-[0.25em] text-indigo-200 uppercase">
                    {screen === "ready" ? "Release coming soon" : `Loading ${progress}%`}
                  </p>
                </div>
                {screen === "ready" ? <Back onClick={() => setScreen("menu")} /> : null}
              </>
            ) : null}

            {screen === "settings" ? (
              <div className="w-56 rounded-lg border border-indigo-300/20 bg-black/40 p-4 backdrop-blur">
                <p className="mb-3 text-[11px] font-semibold tracking-[0.2em] uppercase">Settings</p>
                {Object.entries(settings).map(([k, v]) => (
                  <button
                    key={k}
                    type="button"
                    role="switch"
                    aria-checked={v}
                    onClick={() => setSettings((s) => ({ ...s, [k]: !v }))}
                    className="flex w-full items-center justify-between py-1.5 text-[11px] text-indigo-100"
                  >
                    {k}
                    <span
                      className={`flex h-4 w-7 items-center rounded-full p-0.5 transition-colors ${v ? "bg-indigo-500" : "bg-white/20"}`}
                    >
                      <span
                        className={`size-3 rounded-full bg-white transition-transform ${v ? "translate-x-3" : ""}`}
                      />
                    </span>
                  </button>
                ))}
                <div className="mt-3">
                  <Back onClick={() => setScreen("menu")} />
                </div>
              </div>
            ) : null}

            {screen === "credits" ? (
              <div className="flex flex-col items-center gap-3 text-center">
                <p className="text-[10px] tracking-[0.25em] text-indigo-300 uppercase">Designed and developed by</p>
                <p className="text-lg font-semibold">Nick Capobianco</p>
                <p className="text-[10px] tracking-[0.25em] text-indigo-300 uppercase">Built with Unity</p>
                <Back onClick={() => setScreen("menu")} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <p className="text-center text-[11px] text-subtle">Main menu preview. Try Play.</p>
    </div>
  );
}
