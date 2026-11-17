"use client";

import { useEffect, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { sections } from "@/content/navigation";
import { profile } from "@/content/profile";
import { ThemeToggle } from "../app/ThemeToggle";
import { useActiveSection } from "../app/useActiveSection";
import { useUi } from "../app/UiProvider";

const sectionIds = sections.map((s) => s.id);

export function SiteHeader() {
  const { openPalette } = useUi();
  const active = useActiveSection(sectionIds);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const onResize = () => window.innerWidth >= 768 && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const elevated = scrolled || menuOpen;

  return (
    <header
      className={`no-print fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        elevated ? "border-b border-line bg-bg/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center gap-4">
        <a href="#top" className="group flex items-center gap-2.5" aria-label={`${profile.name}, back to top`}>
          <span className="grid size-8 place-items-center rounded-lg bg-fg font-mono text-[11px] font-semibold tracking-tight text-bg transition-transform group-hover:-rotate-6">
            {profile.initials}
          </span>
          <span className="hidden text-sm font-semibold tracking-tight text-fg sm:block">{profile.name}</span>
        </a>

        <nav aria-label="Sections" className="ml-auto hidden md:block">
          <ul className="flex items-center gap-0.5">
            {sections.map((s) => {
              const isActive = active === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative rounded-full px-3 py-1.5 text-sm transition-colors ${
                      isActive ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {s.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1 md:ml-2">
          <button
            type="button"
            onClick={openPalette}
            className="hidden h-9 items-center gap-2 rounded-full border border-line bg-surface pr-1.5 pl-3 text-sm text-subtle transition-colors hover:border-line-strong hover:text-fg lg:flex"
            aria-label="Open command menu"
          >
            <Search className="size-3.5" aria-hidden="true" />
            <span>Search</span>
            <kbd className="ml-3 kbd">⌘K</kbd>
          </button>
          <button type="button" onClick={openPalette} className="icon-btn lg:hidden" aria-label="Open command menu">
            <Search className="size-[18px]" aria-hidden="true" />
          </button>
          <ThemeToggle />
          <button
            type="button"
            className="icon-btn md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav id="mobile-nav" aria-label="Sections" className="animate-pop-in border-t border-line md:hidden">
          <ul className="container-page grid grid-cols-2 gap-1 py-3">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium transition-colors ${
                    active === s.id ? "bg-surface-2 text-fg" : "text-muted hover:bg-surface-2 hover:text-fg"
                  }`}
                >
                  {s.label}
                  <span className="font-mono text-[11px] text-subtle">0{s.shortcut}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
