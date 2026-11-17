import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { education } from "@/content/skills";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";

export function Education() {
  return (
    <Section id="education" index="05" eyebrow="Education" title="Education.">
      <div className="grid gap-5 md:grid-cols-2">
        {education.map((e, i) => (
          <Reveal key={e.id} delay={i * 80} className="h-full">
            <article className="flex h-full flex-col card p-6 sm:p-7">
              <div className="flex items-start gap-4">
                <span className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-white p-1.5">
                  <Image src={e.logo} alt="" width={48} height={48} className="size-full object-contain" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold tracking-tight text-fg">{e.degree}</h3>
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-accent"
                  >
                    {e.school}
                    <ArrowUpRight className="size-3.5 opacity-60 group-hover:opacity-100" aria-hidden="true" />
                  </a>
                  <p className="mt-1 flex items-center gap-1 text-xs text-subtle">
                    <MapPin className="size-3" aria-hidden="true" />
                    {e.location}
                  </p>
                </div>
              </div>
              {e.focus ? (
                <p className="mt-5 rounded-xl bg-surface-2 px-4 py-3 text-sm text-muted">
                  <span className="font-medium text-fg">Focus:</span> {e.focus}
                </p>
              ) : null}
              <div className="mt-5">
                <p className="mb-3 eyebrow">Relevant coursework</p>
                <ul className="flex flex-wrap gap-1.5">
                  {e.coursework.map((c) => (
                    <li key={c} className="chip">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
