"use client";

import { bullet } from "@/lib/text";
import { useMemo, useState, type ComponentType, type SVGProps } from "react";
import Image from "next/image";
import { Bot, Building2, Gamepad2, Smartphone } from "lucide-react";
import { projectCategories, projects } from "@/content/projects";
import type { Project, ProjectCategory } from "@/content/types";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { ProgressBar } from "../ui/ProgressBar";
import { PhoneShowcase } from "../projects/PhoneShowcase";
import { BrowserShowcase } from "../projects/BrowserShowcase";
import { GameShowcase } from "../projects/GameShowcase";

type Category = (typeof projectCategories)[number];

/** A neutral emblem per category: unreleased work is never shown as screenshots. */
const CATEGORY_ICON: Record<ProjectCategory, ComponentType<SVGProps<SVGSVGElement>>> = {
  Product: Smartphone,
  Game: Gamepad2,
  Platform: Building2,
  Robotics: Bot,
};

function Cover({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-surface-2">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
    );
  }
  const Icon = CATEGORY_ICON[project.category];
  return (
    <div
      aria-hidden="true"
      className="relative grid aspect-[16/9] place-items-center overflow-hidden border-b border-line bg-gradient-to-br from-surface-2 to-accent-soft"
    >
      <div className="absolute inset-0 bg-grid opacity-70" />
      <span className="relative grid size-16 place-items-center rounded-2xl border border-line bg-surface text-accent shadow-card transition-transform duration-500 group-hover:scale-105">
        <Icon className="size-7" />
      </span>
    </div>
  );
}

function ProjectBody({ project }: { project: Project }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-medium text-accent">{project.category}</span>
        <span className="text-subtle">{project.status}</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold tracking-tight text-fg">{project.name}</h3>
      {project.period ? <p className="mt-1 font-mono text-xs text-subtle">{project.period}</p> : null}
      <p className="mt-3 text-[15px] leading-relaxed text-pretty text-muted">{project.summary}</p>
      {project.details?.length ? (
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
          {project.details.map((d) => (
            <li key={d.slice(0, 24)} className="flex gap-2.5">
              <span aria-hidden="true" className="mt-[0.55em] size-1 shrink-0 rounded-full bg-accent" />
              <span>{bullet(d)}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-auto space-y-5 pt-6">
        {project.progress !== undefined ? <ProgressBar value={project.progress} /> : null}
        <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
          {project.stack.map((s) => (
            <li key={s} className="chip">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/** A wide card with an interactive preview beside the text. */
function ShowcaseCard({ project }: { project: Project }) {
  return (
    <article
      id={`project-${project.id}`}
      className={`grid scroll-mt-24 overflow-hidden card ${
        project.showcase !== "phone" ? "lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.6fr)]" : "md:grid-cols-[1fr_1.1fr]"
      }`}
    >
      <div className="flex flex-col p-6 sm:p-8">
        <ProjectBody project={project} />
      </div>
      <div
        className={`relative border-t border-line bg-surface-2/70 px-4 py-8 ${
          project.showcase !== "phone" ? "lg:border-t-0 lg:border-l" : "md:border-t-0 md:border-l"
        }`}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
        <div className="no-print relative">
          {project.showcase === "browser" ? (
            <BrowserShowcase />
          ) : project.showcase === "game" ? (
            <GameShowcase />
          ) : (
            <PhoneShowcase />
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      id={`project-${project.id}`}
      className={`group flex h-full scroll-mt-24 flex-col overflow-hidden card transition-[border-color,box-shadow] hover:border-line-strong hover:shadow-float ${
        project.wide ? "md:flex-row" : ""
      }`}
    >
      <div
        className={
          project.wide
            ? "md:w-2/5 md:shrink-0 md:[&>div]:aspect-auto md:[&>div]:h-full md:[&>div]:border-r md:[&>div]:border-b-0"
            : ""
        }
      >
        <Cover project={project} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <ProjectBody project={project} />
      </div>
    </article>
  );
}

export function Projects() {
  const [category, setCategory] = useState<Category>("All");

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: projects.length };
    for (const p of projects) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, []);

  const visible = projects.filter((p) => category === "All" || p.category === category);

  const filter = (
    <div
      role="group"
      aria-label="Filter projects by category"
      className="-mx-4 flex [scrollbar-width:none] gap-1 overflow-x-auto px-4 sm:mx-0 sm:px-0"
    >
      <div className="flex shrink-0 gap-1 rounded-full border border-line bg-surface p-1">
        {projectCategories.map((c) => {
          const selected = c === category;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={selected}
              aria-controls="project-list"
              onClick={() => setCategory(c)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                selected ? "bg-fg text-bg" : "text-muted hover:text-fg"
              }`}
            >
              {c}
              <span className={`ml-1.5 font-mono text-[10px] ${selected ? "opacity-70" : "text-subtle"}`}>
                {counts[c] ?? 0}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <Section
      id="projects"
      index="03"
      eyebrow="Projects"
      title="What I'm building."
      intro="Software I'm developing now, plus robotics projects."
      actions={filter}
    >
      <p className="sr-only" aria-live="polite">
        {category === "All"
          ? ""
          : `Showing ${visible.length} ${category.toLowerCase()} project${visible.length === 1 ? "" : "s"}`}
      </p>
      <div id="project-list" className="grid gap-6 md:grid-cols-2">
        {visible.map((p, i) =>
          p.showcase ? (
            <Reveal key={p.id} className="md:col-span-2">
              <ShowcaseCard project={p} />
            </Reveal>
          ) : (
            <Reveal key={p.id} delay={(i % 2) * 60} className={p.wide ? "h-full md:col-span-2" : "h-full"}>
              <ProjectCard project={p} />
            </Reveal>
          ),
        )}
      </div>
    </Section>
  );
}
