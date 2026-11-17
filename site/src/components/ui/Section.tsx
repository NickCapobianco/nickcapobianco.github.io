import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionProps = {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

/** Standard page section: numbered eyebrow, title, optional intro/actions, body. */
export function Section({ id, index, eyebrow, title, intro, actions, children, className }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`py-20 sm:py-28 ${className ?? ""}`}>
      <div className="container-page">
        <Reveal>
          <div className="mb-10 flex flex-col gap-6 sm:mb-14 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-4 flex items-center gap-3 eyebrow">
                <span className="text-accent">{index}</span>
                <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
                {eyebrow}
              </p>
              <h2 id={`${id}-title`} className="text-3xl font-semibold tracking-tight text-balance text-fg sm:text-4xl">
                {title}
              </h2>
              {intro ? (
                <p className="mt-4 text-base leading-relaxed text-pretty text-muted sm:text-lg">{intro}</p>
              ) : null}
            </div>
            {actions ? <div className="no-print shrink-0">{actions}</div> : null}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
