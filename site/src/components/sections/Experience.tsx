import { bullet } from "@/lib/text";
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

function RoleLadder({ item }: { item: ExperienceItem }) {
  if (item.roles.length < 2) return null;
  return (
    <ol className="relative mt-4 space-y-0" aria-label={`Roles at ${item.company}`}>
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

/** Left column of a job card: logo or initial, company, dates, and location. */
function JobMeta({
  company,
  url,
  logo,
  dates,
  location,
}: {
  company: string;
  url?: string;
  logo?: string;
  dates?: string;
  location?: string;
}) {
  return (
    <aside className="flex items-start gap-3 md:flex-col md:gap-2.5">
      <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-white p-1.5">
        {logo ? (
          <Image src={logo} alt="" width={36} height={36} className="size-full object-contain" />
        ) : (
          <span className="text-sm font-semibold text-zinc-500">{company[0]}</span>
        )}
      </span>
      <div className="min-w-0">
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 text-sm font-semibold text-fg hover:text-accent"
          >
            {company}
            <ArrowUpRight className="size-3.5 opacity-60 transition group-hover:opacity-100" aria-hidden="true" />
          </a>
        ) : (
          <p className="text-sm font-semibold text-fg">{company}</p>
        )}
        {dates ? <p className="mt-0.5 font-mono text-xs text-muted">{dates}</p> : null}
        {location ? (
          <p className="mt-0.5 flex items-center gap-1 text-xs text-subtle">
            <MapPin className="size-3" aria-hidden="true" />
            {location}
          </p>
        ) : null}
      </div>
    </aside>
  );
}

/** A full-width job card: details on the left, the work reading across on the right. */
function ExperienceCard({ item, featured }: { item: ExperienceItem; featured?: boolean }) {
  const first = item.roles[item.roles.length - 1];
  const latest = item.roles[0];
  const multi = item.roles.length > 1;

  return (
    <article
      className={`grid gap-5 card p-5 sm:p-7 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-8 ${
        featured ? "ring-1 ring-accent/20" : ""
      }`}
    >
      <JobMeta
        company={item.company}
        url={item.url}
        logo={item.logo}
        dates={item.dates ?? range(multi ? first.start : latest.start, latest.end)}
        location={item.location}
      />
      <div className="min-w-0">
        <h3 className="text-lg font-semibold tracking-tight text-fg">{latest.title}</h3>
        <RoleLadder item={item} />
        <ul className="mt-5 space-y-2.5 text-[15px] leading-relaxed text-muted">
          {item.highlights.map((h) => (
            <li key={h.slice(0, 32)} className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.6em] size-1 shrink-0 rounded-full bg-accent" />
              <span>{bullet(h)}</span>
            </li>
          ))}
        </ul>
        {item.tools?.length ? (
          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tools">
            {item.tools.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

/** A smaller full-width card for early jobs and volunteering. */
function EarlyCard({ job }: { job: EarlyRole }) {
  return (
    <article className="grid gap-3 card px-5 py-4 sm:px-7 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-8">
      <JobMeta company={job.company} dates={job.dates} location={job.location} />
      <div className="min-w-0 md:pt-0.5">
        <h3 className="font-semibold tracking-tight text-fg">{job.title}</h3>
        {job.note ? <p className="mt-1 text-[15px] text-muted">{bullet(job.note)}</p> : null}
      </div>
    </article>
  );
}

export function Experience() {
  return (
    <Section
      id="experience"
      index="02"
      eyebrow="Experience"
      title="Where I've worked."
      intro="I lead operations at Coastal Marketing Group. Before that I was a firmware validation engineer at Western Digital and a university mathematics and physics tutor. My first jobs were in retail, restaurants, and real estate."
    >
      <ol className="grid gap-4" aria-label="Jobs, newest first">
        {experience.map((item, i) => (
          <Reveal as="li" key={item.id}>
            <ExperienceCard item={item} featured={i === 0} />
          </Reveal>
        ))}
        {earlyExperience.map((job) => (
          <Reveal as="li" key={job.company}>
            <EarlyCard job={job} />
          </Reveal>
        ))}
      </ol>

      <h3 className="mt-12 mb-4 eyebrow">Volunteering</h3>
      <div className="grid gap-4">
        {volunteering.map((job) => (
          <Reveal key={job.company}>
            <EarlyCard job={job} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
