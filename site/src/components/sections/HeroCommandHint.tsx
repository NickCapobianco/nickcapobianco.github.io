"use client";

import type { ReactNode } from "react";
import { useUi } from "../app/UiProvider";

export function HeroCommandHint({ icon }: { icon: ReactNode }) {
  const { openPalette } = useUi();
  return (
    <button
      type="button"
      onClick={openPalette}
      className="no-print mt-8 hidden items-center gap-2 text-xs text-subtle transition-colors hover:text-fg sm:inline-flex"
    >
      Press
      <kbd className="kbd gap-0.5">{icon}K</kbd>
      or
      <kbd className="kbd">/</kbd>
      to search anything on this site
    </button>
  );
}
