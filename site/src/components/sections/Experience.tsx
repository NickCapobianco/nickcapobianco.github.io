import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { earlyExperience, experience, volunteering } from "@/content/experience";
import type { EarlyRole } from "@/content/types";
import type { Experience as ExperienceItem } from "@/content/types";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";

function range(start: string, end?: string) {
  return `${start} – ${end ?? "Present"}`;
}

function CompanyLogo({ item }: { item: ExperienceItem }) {
  return (
    <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-white p-1.5">
      <Image src={item.logo} alt="" width={40} height={40} className="size-full object-contain" />
    </span>
  );
}

function RoleLadder({ item }: { item: ExperienceItem }) {
  if (item.roles.length < 2) return null;
  return (
    <ol className="relative mt-6 space-y-0" aria-label={`Roles at ${item.company}`}>
      {item.roles.map((role, i) => {
        const current = !role.end;
        return (
          <li key={role.title} className="relative flex gap-4 pb-5 last:pb-0">
            {i < item.roles.length - 1 ? (
              <span aria-hidden="true" className="absolute top-3 left-[5px] h-full w-px bg-line-strong" />
            ) : null}
            <span
              aria-hidden="true"
              className={`relative mt-1.5 size-[11px] shrink-0 rounded-full border-2 ${
                current
                  ? "border-accent bg-accent shadow-[0_0_0_4px_var(--accent-soft)]"
                  : "border-line-strong bg-surface"
              }`}
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                <p className={`text-sm font-semibold ${current ? "text-fg" : "text-muted"}`}>{role.title}</p>
                <p className="font-mono text-[11px] text-subtle">{range(role.start, role.end)}</p>
              </div>
              {role.summary ? <p className="mt-1 text-sm text-subtle">{role.summary}</p> : null}
              {role.kept?.length || role.added?.length ? (
                <ul className="mt-2 flex flex-wrap gap-1" aria-label="Responsibilities">
                  {role.kept?.map((r) => (
                    <li key={r} className="rounded-full bg-surface-2 px-2 py-0.5 text-[11px] text-subtle">
                      {r}
                    </li>
                  ))}
                  {role.added?.map((r) => (
                    <li key={r} className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent">
                      <span aria-hidden="true">+ </span>
                      <span className="sr-only">Added: </span>
                      {r}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function ExperienceCard({ item, featured }: { item: ExperienceItem; featured?: boolean }) {
  const first = item.roles[item.roles.length - 1];
  const latest = item.roles[0];
  const multi = item.roles.length > 1;

  return (
    <article className={`card p-5 sm:p-7 ${featured ? "ring-1 ring-accent/20" : ""}`}>
      <header className="flex gap-4">
        <CompanyLogo item={item} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
            <div className="min-w-0">
              <h3 className="text-lg font-semibold tracking-tight text-fg">{latest.title}</h3>
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-accent"
                >
                  {item.company}
                  <ArrowUpRight className="size-3.5 opacity-60 transition group-hover:opacity-100" aria-hidden="true" />
                </a>
              ) : (
                <p className="text-sm font-medium text-muted">{item.company}</p>
              )}
            </div>
            <div className="text-left sm:ml-auto sm:text-right">
              <p className="font-mono text-xs text-muted">
                {item.dates ?? range(multi ? first.start : latest.start, latest.end)}
              </p>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-subtle sm:justify-end">
                <MapPin className="size-3" aria-hidden="true" />
                {item.location}
              </p>
            </div>
          </div>
        </div>
      </header>

      <RoleLadder item={item} />

      <ul className="mt-6 space-y-2.5 text-[15px] leading-relaxed text-muted">
        {item.highlights.map((h) => (
          <li key={h.slice(0, 32)} className="flex gap-3">
            <span aria-hidden="true" className="mt-[0.6em] size-1 shrink-0 rounded-full bg-accent" />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      {item.tools?.length ? (
        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tools">
          {item.tools.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

/** One line per job: title, place, optional location, dates, and a short note. */
function EarlyList({ jobs }: { jobs: EarlyRole[] }) {
  return (
    <ul className="mt-4 divide-y divide-line">
      {jobs.map((job) => (
        <li key={job.company} className="grid gap-1 py-3.5 first:pt-0 last:pb-0 sm:grid-cols-[1fr_auto] sm:gap-x-6">
          <div className="min-w-0">
            <p className="text-[15px] text-fg">
              <span className="font-semibold">{job.title}</span>
              <span className="text-muted"> · {job.company}</span>
              {job.location ? <span className="text-subtle"> · {job.location}</span> : null}
            </p>
            {job.note ? <p className="mt-0.5 text-sm text-muted">{job.note}</p> : null}
          </div>
          {job.dates ? <p className="font-mono text-xs text-subtle sm:pt-1 sm:text-right">{job.dates}</p> : null}
        </li>
      ))}
    </ul>
  );
}

export function Experience() {
  const [current, ...past] = experience;
  return (
    <Section
      id="experience"
      index="02"
      eyebrow="Experience"
      title="Where I've worked."
      intro="I lead operations at Coastal Marketing Group. Before that I was a firmware validation engineer at Western Digital and a university mathematics and physics tutor. My first jobs were in retail, restaurants, and real estate."
    >
      <div className="grid gap-5">
        <Reveal>
          <ExperienceCard item={current} featured />
        </Reveal>
        <div className="gap-5 lg:columns-2">
          {past.map((item, i) => (
            <Reveal key={item.id} delay={(i % 2) * 80} className="mb-5 break-inside-avoid">
              <ExperienceCard item={item} />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <section aria-labelledby="early-title" className="card p-5 sm:p-7">
            <h3 id="early-title" className="eyebrow">
              Earlier experience
            </h3>
            <EarlyList jobs={earlyExperience} />
            <h3 className="mt-8 eyebrow">Volunteering</h3>
            <EarlyList jobs={volunteering} />
          </section>
        </Reveal>
      </div>
    </Section>
  );
}
