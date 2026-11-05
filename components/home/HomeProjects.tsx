"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionLabel } from "@/components/prism/SectionLabel";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import { useI18n } from "@/lib/i18n/I18nProvider";

/** A light follows the cursor across each card; the coordinates are written as CSS variables. */
const spotlight = (event: React.PointerEvent<HTMLElement>) => {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  el.style.setProperty("--my", `${event.clientY - rect.top}px`);
};

/** Every project as a card: the screenshots on top, the field, the name and one line about it below. */
export function HomeProjects() {
  const { dict, path } = useI18n();
  const { work, projects, home } = dict;

  return (
    <section id="work" className="theme-frost py-[var(--space-xl)]">
      <div className="container-editorial">
        <ScrollReveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel label={work.sectionLabel} />
            <h2 className="text-section font-display mt-6 max-w-2xl">{work.headline}</h2>
          </div>
          <Link href={path("/work")} className="btn-ghost">
            {home.projectsCta}
            <ArrowUpRight size={15} />
          </Link>
        </ScrollReveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {projects.map((project, i) => (
            <li key={project.slug}>
              <ScrollReveal delay={(i % 3) * 0.06} className="h-full">
                <Link href={path(project.href)} className="story-card group" onPointerMove={spotlight} data-cursor="project">
                  <div className="story-media">
                    <ProjectVisual slug={project.slug} alt={`${project.title}: ${dict.common.screenshotsAlt}`} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" />
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className="text-meta text-[var(--accent-light)]">{project.industry}</p>
                    <div className="mt-3 flex items-start justify-between gap-3">
                      <h3 className="text-h1">{project.title}</h3>
                      <span className="story-arrow" aria-hidden>
                        <ArrowUpRight size={16} />
                      </span>
                    </div>
                    <p className="text-small mt-2 text-muted-foreground">{project.tagline}</p>
                    <p className="text-meta mt-auto pt-6 text-muted-foreground">{project.period}</p>
                  </div>
                </Link>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
