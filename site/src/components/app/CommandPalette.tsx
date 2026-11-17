"use client";

import { useEffect, useMemo, useRef, useState, type ComponentType, type SVGProps } from "react";
import { ArrowRight, CornerDownLeft, FolderGit2, Hash, Printer, Search, SunMoon } from "lucide-react";
import { sections } from "@/content/navigation";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { GitHubIcon, LinkedInIcon } from "../ui/BrandIcons";
import { applyPreference, isDark } from "./theme";
import { lockScroll } from "@/lib/scroll-lock";

type Command = {
  id: string;
  group: "Navigate" | "Projects" | "Links" | "Actions";
  label: string;
  hint?: string;
  keywords?: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  run: () => void;
};

function score(cmd: Command, q: string) {
  if (!q) return 1;
  const hay = `${cmd.label} ${cmd.hint ?? ""} ${cmd.keywords ?? ""}`.toLowerCase();
  const label = cmd.label.toLowerCase();
  if (label.startsWith(q)) return 3;
  if (label.includes(q)) return 2;
  // Every query word must appear somewhere.
  return q.split(/\s+/).every((w) => hay.includes(w)) ? 1 : 0;
}

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  // Read the latest onClose without re-running the open effect on every render.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const commands = useMemo<Command[]>(() => {
    const go = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    const ext = (href: string) => () => window.open(href, "_blank", "noopener,noreferrer");
    return [
      ...sections.map<Command>((s) => ({
        id: `nav-${s.id}`,
        group: "Navigate",
        label: s.label,
        hint: `Jump to section`,
        icon: Hash,
        run: go(s.id),
      })),
      ...projects.map<Command>((p) => ({
        id: `project-${p.id}`,
        group: "Projects",
        label: p.name,
        hint: p.category,
        keywords: `${p.summary} ${p.stack.join(" ")}`,
        icon: FolderGit2,
        run: () => document.getElementById(`project-${p.id}`)?.scrollIntoView({ behavior: "smooth" }),
      })),
      {
        id: "link-github",
        group: "Links",
        label: "GitHub",
        hint: "github.com/NickCapobianco",
        keywords: "code repositories",
        icon: GitHubIcon,
        run: ext(profile.links.github),
      },
      {
        id: "link-linkedin",
        group: "Links",
        label: "LinkedIn",
        hint: "Connect",
        keywords: "contact hire message",
        icon: LinkedInIcon,
        run: ext(profile.links.linkedin),
      },
      {
        id: "link-cmg",
        group: "Links",
        label: "Coastal Marketing Group",
        hint: "coastal-marketing.com",
        keywords: "cmg company work",
        icon: ArrowRight,
        run: ext(profile.companyUrl),
      },
      {
        id: "action-theme",
        group: "Actions",
        label: "Toggle theme",
        hint: "Light / dark",
        keywords: "dark light mode appearance",
        icon: SunMoon,
        run: () => applyPreference(isDark() ? "light" : "dark"),
      },
      {
        id: "action-print",
        group: "Actions",
        label: "Print or save as PDF",
        hint: "Résumé layout",
        keywords: "resume cv download pdf",
        icon: Printer,
        run: () => setTimeout(() => window.print(), 50),
      },
    ];
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return commands
      .map((c) => ({ c, s: score(c, q) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => (q ? b.s - a.s : 0))
      .map((r) => r.c);
  }, [commands, query]);

  useEffect(() => {
    if (!open) return;
    restoreFocus.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setIndex(0);
    const unlock = lockScroll();
    requestAnimationFrame(() => inputRef.current?.focus());
    // Escape and Tab belong to the palette while it is open, wherever focus
    // happens to be (the input takes focus a frame late). Capturing on window
    // runs before any other listener and keeps the key from a panel beneath.
    const onKeyCapture = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onCloseRef.current();
      } else if (e.key === "Tab") {
        e.preventDefault();
        e.stopPropagation();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyCapture, true);
    return () => {
      window.removeEventListener("keydown", onKeyCapture, true);
      unlock();
      restoreFocus.current?.focus?.();
    };
  }, [open]);

  useEffect(() => setIndex(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${index}"]`)?.scrollIntoView({ block: "nearest" });
  }, [index]);

  if (!open) return null;

  const run = (cmd: Command | undefined) => {
    if (!cmd) return;
    onClose();
    // Let the dialog unmount (and focus restore) before navigating.
    requestAnimationFrame(() => cmd.run());
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[index]);
    }
  };

  let lastGroup: string | null = null;

  return (
    <div className="no-print fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]" onKeyDown={onKeyDown}>
      <div
        className="absolute inset-0 animate-fade-in bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        className="relative w-full max-w-xl animate-pop-in overflow-hidden rounded-2xl border border-line bg-surface shadow-float"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="size-4 shrink-0 text-subtle" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sections, projects, links…"
            className="h-14 w-full bg-transparent text-[15px] text-fg outline-none placeholder:text-subtle"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-list"
            aria-activedescendant={results[index] ? `cmd-${results[index].id}` : undefined}
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="kbd">Esc</kbd>
        </div>

        <ul id="command-list" ref={listRef} role="listbox" className="max-h-[min(60vh,420px)] overflow-y-auto p-2">
          {results.length === 0 ? (
            <li className="px-3 py-10 text-center text-sm text-subtle">No results for “{query}”</li>
          ) : (
            results.map((cmd, i) => {
              const header = cmd.group !== lastGroup ? cmd.group : null;
              lastGroup = cmd.group;
              const Icon = cmd.icon;
              const selected = i === index;
              return (
                <li key={cmd.id} role="presentation">
                  {header ? <div className="px-3 pt-3 pb-1.5 eyebrow">{header}</div> : null}
                  <div
                    id={`cmd-${cmd.id}`}
                    role="option"
                    aria-selected={selected}
                    data-index={i}
                    onMouseMove={() => setIndex(i)}
                    onClick={() => run(cmd)}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                      selected ? "bg-surface-2 text-fg" : "text-muted"
                    }`}
                  >
                    <Icon
                      className={`size-4 shrink-0 ${selected ? "text-accent" : "text-subtle"}`}
                      aria-hidden="true"
                    />
                    <span className="font-medium text-fg">{cmd.label}</span>
                    {cmd.hint ? <span className="truncate text-subtle">{cmd.hint}</span> : null}
                    {selected ? (
                      <CornerDownLeft className="ml-auto size-3.5 shrink-0 text-subtle" aria-hidden="true" />
                    ) : null}
                  </div>
                </li>
              );
            })
          )}
        </ul>

        <div className="flex items-center gap-4 border-t border-line bg-surface-2/60 px-4 py-2.5 text-[11px] text-subtle">
          <span className="flex items-center gap-1.5">
            <kbd className="kbd">↑</kbd>
            <kbd className="kbd">↓</kbd> navigate
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="kbd">↵</kbd> open
          </span>
          <span className="ml-auto hidden items-center gap-1.5 sm:flex">
            <kbd className="kbd">/</kbd> or <kbd className="kbd">⌘K</kbd> anywhere
          </span>
        </div>
      </div>
    </div>
  );
}
