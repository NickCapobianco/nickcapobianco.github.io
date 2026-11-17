import { ArrowUpRight, Printer } from "lucide-react";
import { profile } from "@/content/profile";
import { GitHubIcon, LinkedInIcon } from "../ui/BrandIcons";
import { Reveal } from "../ui/Reveal";
import { PrintButton } from "./PrintButton";

const channels = [
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    detail: "linkedin.com/in/nickacapobianco",
    href: profile.links.linkedin,
  },
  {
    icon: GitHubIcon,
    label: "GitHub",
    detail: "github.com/NickCapobianco",
    href: profile.links.github,
  },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <div className="print-plain relative overflow-hidden rounded-[28px] border border-line bg-fg px-6 py-14 text-bg shadow-float sm:px-12 sm:py-20">
            <div
              aria-hidden="true"
              className="no-print pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-accent/40 blur-3xl"
            />
            <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
              <div>
                <p className="flex items-center gap-3 eyebrow text-bg/60">
                  <span className="text-accent">06</span>
                  <span className="h-px w-8 bg-bg/30" aria-hidden="true" />
                  Contact
                </p>
                <h2 id="contact-title" className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
                  Let&rsquo;s talk.
                </h2>
                <p className="mt-5 max-w-lg text-pretty text-bg/70 sm:text-lg">
                  I&rsquo;m open to conversations about operations, engineering, and product work. LinkedIn is the best
                  way to reach me.
                </p>
              </div>
              <div className="grid gap-3">
                {channels.map(({ icon: Icon, label, detail, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl border border-bg/15 bg-bg/5 p-4 transition-colors hover:border-bg/30 hover:bg-bg/10"
                  >
                    <span className="grid size-11 place-items-center rounded-xl bg-bg text-fg">
                      <Icon className="size-5" />
                    </span>
                    <span className="flex-1">
                      <span className="block font-semibold">{label}</span>
                      <span className="block text-sm text-bg/60">{detail}</span>
                    </span>
                    <ArrowUpRight
                      className="size-5 opacity-60 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </a>
                ))}
                <PrintButton icon={<Printer className="size-4" aria-hidden="true" />} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
