import { Award, Briefcase, GraduationCap, Sparkles } from "lucide-react";
import { profile } from "@/content/profile";
import { credentials, education } from "@/content/skills";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";

export function About() {
  const facts = [
    { icon: Briefcase, label: "Current role", value: `${profile.title}, ${profile.company}` },
    ...credentials.map((c) => ({ icon: Award, label: "Certification", value: c.title })),
    ...education.map((e) => ({ icon: GraduationCap, label: e.school, value: e.degree })),
  ];

  return (
    <Section id="about" index="01" eyebrow="About" title="Who I am.">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
        <Reveal className="space-y-5 text-[17px] leading-relaxed text-pretty text-muted">
          {profile.about.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <figure className="!mt-9 border-l-2 border-accent pl-5">
            <blockquote className="text-lg leading-relaxed font-medium text-balance text-fg">
              “{profile.ambition}”
            </blockquote>
          </figure>
        </Reveal>

        <Reveal delay={80}>
          <aside className="overflow-hidden card" aria-label="At a glance">
            <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
              <p className="eyebrow">At a glance</p>
              <Sparkles className="size-4 text-accent" aria-hidden="true" />
            </div>
            <ul className="divide-y divide-line">
              {facts.map(({ icon: Icon, label, value }) => (
                <li key={label + value} className="flex gap-3.5 px-5 py-4">
                  <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-surface-2 text-muted">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-subtle">{label}</p>
                    <p className="text-sm font-medium text-fg">{value}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-line px-5 py-4">
              <p className="mb-3 text-xs text-subtle">Outside of work</p>
              <ul className="flex flex-wrap gap-1.5">
                {profile.interests.map((i) => (
                  <li key={i} className="chip">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Reveal>
      </div>
    </Section>
  );
}
