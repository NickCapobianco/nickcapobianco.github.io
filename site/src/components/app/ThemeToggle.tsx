"use client";

import { Moon, Sun } from "lucide-react";
import { applyPreference, isDark } from "./theme";

/** Flips between light and dark. Icons swap purely via CSS, so there's no hydration flicker. */
export function ThemeToggle() {
  return (
    <button
      type="button"
      className="icon-btn"
      aria-label="Toggle color theme"
      title="Toggle theme"
      onClick={() => applyPreference(isDark() ? "light" : "dark")}
    >
      <Sun className="size-[18px] dark:hidden" aria-hidden="true" />
      <Moon className="hidden size-[18px] dark:block" aria-hidden="true" />
    </button>
  );
}
