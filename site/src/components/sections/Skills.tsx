"use client";

import { useMemo, useState } from "react";
import { Award, Search, X } from "lucide-react";
import { credentials, skillGroups } from "@/content/skills";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";

export function Skills() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const total = useMemo(() => skillGroups.reduce((n, g) => n + g.skills.length, 0), []);
  const matches = useMemo(
    () => (q ? skillGroups.reduce((n, g) => n + g.skills.filter((s) => s.toLowerCase().includes(q)).length, 0) : total),
    [q, total],
  );

  const search = (
    <label className="relative flex h-10 w-full items-center sm:w-72">
      <span className="sr-only">Filter skills</span>
      <Search className="pointer-events-none absolute left-3.5 size-4 text-subtle" aria-hidden="true" />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={`Filter ${total} skills…`}
        className="h-full w-full rounded-full border border-line bg-surface pr-9 pl-10 text-sm text-fg transition-colors outline-none placeholder:text-subtle focus:border-accent [&::-webkit-search-cancel-button]:hidden"
      />
      {query ? (
        <button
          type="button"
          onClick={() => setQuery("")}
          className="absolute right-2 grid size-6 place-items-center rounded-full text-subtle hover:bg-surface-2 hover:text-fg"
          aria-label="Clear filter"
        >
          <X className="size-3.5" aria-hidden="true" />
        </button>
      ) : null}
    </label>
  );

  return (
    <Section
      id="skills"
      index="04"
      eyebrow="Skills"
      title="What I work with."
      intro="Operations and finance on the business side, software and hardware on the engineering side."
      actions={search}
    >
      <p className="sr-only" aria-live="polite">
        {q ? `${matches} skills match “${query}”` : ""}
      </p>

      <Reveal>
        <ul className="mb-5 grid gap-3">
          {credentials.map((c) => (
            <li
              key={c.title}
              className="flex flex-col gap-4 card bg-gradient-to-r from-accent-soft to-surface p-5 sm:flex-row sm:items-center sm:p-6"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent text-accent-fg shadow-card">
                <Award className="size-6" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <p className="eyebrow">Certification · {c.issuer}</p>
                <p className="mt-1 text-lg font-semibold tracking-tight text-fg">{c.title}</p>
                <p className="text-sm text-muted">{c.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => {
          const hits = g.skills.filter((s) => !q || s.toLowerCase().includes(q)).length;
          const dimmed = q && hits === 0;
          return (
            <Reveal key={g.id} delay={(i % 3) * 60} className="h-full">
              <article className={`h-full card p-6 transition-opacity ${dimmed ? "opacity-40" : ""}`}>
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-semibold tracking-tight text-fg">{g.title}</h3>
                  <span className="font-mono text-[11px] text-subtle">
                    {q ? `${hits}/${g.skills.length}` : g.skills.length}
                  </span>
                </div>
                <p className="mt-1 text-sm text-subtle">{g.description}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {g.skills.map((s) => {
                    const hit = !!q && s.toLowerCase().includes(q);
                    return (
                      <li
                        key={s}
                        className={`chip transition-colors ${
                          hit ? "border-accent/40 bg-accent-soft text-accent" : q ? "opacity-50" : ""
                        }`}
                      >
                        {s}
                      </li>
                    );
                  })}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
      {q && matches === 0 ? <p className="mt-6 text-center text-sm text-subtle">No skills match “{query}”.</p> : null}
    </Section>
  );
}
