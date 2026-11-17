import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <div className="border-t border-line">
          <About />
        </div>
        <div className="border-t border-line bg-surface-2/40">
          <Experience />
        </div>
        <div className="border-t border-line">
          <Projects />
        </div>
        <div className="border-t border-line bg-surface-2/40">
          <Skills />
        </div>
        <div className="border-t border-line">
          <Education />
        </div>
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
