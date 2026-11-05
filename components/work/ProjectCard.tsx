"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import { useI18n } from "@/lib/i18n/I18nProvider";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Project = Dictionary["projects"][number];

/** A light follows the cursor across each card; the coordinates are written as CSS variables. */
const spotlight = (event: React.PointerEvent<HTMLElement>) => {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  el.style.setProperty("--my", `${event.clientY - rect.top}px`);
};

/** Project card: screenshots on top, then the field, the name, one line about it, and optionally the stack. */
export function ProjectCard({ project, number, showStack = false }: { project: Project; number?: string; showStack?: boolean }) {
  const { dict, path } = useI18n();

  return (
    <Link href={path(project.href)} className="story-card group" onPointerMove={spotlight} data-cursor="project">
      <div className="story-media">
        <ProjectVisual slug={project.slug} alt={`${project.title}: ${dict.common.screenshotsAlt}`} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-mono flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.06em] text-[var(--accent-light)]">
          {number && <span className="text-muted-foreground">{number}</span>}
          {project.industry}
        </p>
        <div className="mt-3 flex items-start justify-between gap-3">
          <h3 className="text-h1">{project.title}</h3>
          <span className="story-arrow" aria-hidden>
            <ArrowUpRight size={16} />
          </span>
        </div>
        <p className="text-small mt-2 text-muted-foreground">{project.tagline}</p>
        {showStack && (
          <ul className="mt-5 flex flex-wrap gap-1.5" role="list" lang="en">
            {project.technologies.slice(0, 4).map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>
        )}
        <p className="text-mono mt-auto pt-6 text-[0.6875rem] uppercase tracking-[0.06em] text-muted-foreground">{project.period}</p>
      </div>
    </Link>
  );
}
