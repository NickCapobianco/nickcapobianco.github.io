"use client";

import type { ReactNode } from "react";

export function PrintButton({ icon }: { icon: ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium text-bg/70 transition-colors hover:bg-bg/10 hover:text-bg"
    >
      {icon}
      Print or save as PDF
    </button>
  );
}
