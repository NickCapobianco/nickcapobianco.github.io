import Image from "next/image";
import { ArrowDown, ArrowUpRight, Command } from "lucide-react";
import { profile } from "@/content/profile";
import { GitHubIcon, LinkedInIcon } from "../ui/BrandIcons";
import { RotatingText } from "./RotatingText";
import { HeroCommandHint } from "./HeroCommandHint";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      {/* Backdrop: fine grid fading out, plus a soft accent glow. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_40%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[880px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative container-page grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
        <div className="animate-fade-up">
          <a
            href={profile.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mb-8 inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-surface/80 py-1 pr-3 pl-1 text-xs font-medium text-muted shadow-card backdrop-blur transition-colors hover:border-line-strong hover:text-fg"
          >
            <span className="relative flex size-5 items-center justify-center rounded-full bg-accent-soft">
              <span className="absolute size-2 animate-ping rounded-full bg-accent/50" />
              <span className="size-1.5 rounded-full bg-accent" />
            </span>
            <span className="truncate">
              {profile.title} · {profile.company}
            </span>
            <ArrowUpRight
              className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>

          <h1 className="text-[clamp(2.75rem,8vw,5.25rem)] leading-[0.95] font-semibold tracking-[-0.04em] text-fg">
            {profile.name}
          </h1>
          <p className="mt-5 text-[clamp(1.25rem,3vw,1.75rem)] font-medium tracking-tight text-muted">
            <RotatingText items={profile.rotatingRoles} />
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg">{profile.lead}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn-primary h-11 px-5">
              View my work
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary h-11 px-5"
            >
              <LinkedInIcon className="size-4" />
              LinkedIn
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary size-11 px-0"
              aria-label="GitHub"
            >
              <GitHubIcon className="size-[18px]" />
            </a>
          </div>

          <HeroCommandHint icon={<Command className="size-3" aria-hidden="true" />} />
        </div>

        <div className="relative mx-auto w-full max-w-[340px] animate-fade-up [animation-delay:120ms] lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-line bg-surface-2 shadow-float">
            <Image
              src="/images/profile.webp"
              alt={`Portrait of ${profile.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 380px, 340px"
              className="object-cover object-[50%_20%]"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 flex items-center rounded-2xl border border-white/15 bg-black/35 px-4 py-3 text-white backdrop-blur-md">
              <div>
                <p className="text-sm font-semibold">{profile.name}</p>
                <p className="text-xs text-white/75">IT · Finance · Operations · Engineering</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative container-page mt-16 sm:mt-20">
        <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4 [&>div]:bg-surface">
          {profile.highlights.map((h) => (
            <div key={h.label} className="flex flex-col gap-1 px-5 py-5 sm:px-6">
              <dt className="order-2 text-xs text-subtle sm:text-sm">{h.label}</dt>
              <dd className="order-1 text-xl font-semibold tracking-tight text-fg sm:text-2xl">{h.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
