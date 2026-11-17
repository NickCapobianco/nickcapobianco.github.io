import { profile } from "@/content/profile";
import { sections } from "@/content/navigation";
import { GitHubIcon, LinkedInIcon } from "../ui/BrandIcons";

export function SiteFooter() {
  return (
    <footer className="no-print border-t border-line">
      <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-lg bg-fg font-mono text-[11px] font-semibold text-bg">
            {profile.initials}
          </span>
          <p className="text-sm text-subtle">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="hover:text-fg">
                  {s.label}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-1">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="GitHub"
              >
                <GitHubIcon className="size-4" />
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="size-4" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
