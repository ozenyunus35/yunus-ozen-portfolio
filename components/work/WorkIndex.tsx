"use client";

import { useState } from "react";
import { HomeCta } from "@/components/home/HomeCta";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectCard } from "@/components/work/ProjectCard";
import { PROJECT_CATEGORIES, PROJECT_CATEGORY_MAP, type ProjectCategory } from "@/lib/data/project-categories";
import { useI18n } from "@/lib/i18n/I18nProvider";

type Filter = ProjectCategory | "all";

/** Every project, filterable by kind. Numbers follow the order of the full list, so a project keeps its number. */
export function WorkIndex() {
  const { dict } = useI18n();
  const projects = dict.projects;
  const [filter, setFilter] = useState<Filter>("all");

  const count = (f: Filter) =>
    f === "all" ? projects.length : projects.filter((p) => PROJECT_CATEGORY_MAP[p.slug]?.includes(f)).length;
  const visible = filter === "all" ? projects : projects.filter((p) => PROJECT_CATEGORY_MAP[p.slug]?.includes(filter));

  return (
    <div>
      <PageHero
        crumbs={[{ label: dict.nav[0].label.toLowerCase() }]}
        title={dict.work.indexHeadline}
        description={dict.pages.work.description}
      />

      <section className="theme-frost py-[var(--space-lg)]">
        <div className="container-editorial">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="seg" role="group" aria-label={dict.common.all}>
              {(["all", ...PROJECT_CATEGORIES] as Filter[]).map((f) => (
                <button key={f} type="button" onClick={() => setFilter(f)} aria-pressed={filter === f} className="seg-btn">
                  {dict.work.filters[f]}
                  <span className="seg-count tabular-nums">{count(f)}</span>
                </button>
              ))}
            </div>
            <p className="text-mono text-muted-foreground" aria-live="polite">
              {visible.length} {dict.common.projectCount}
            </p>
          </div>

          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {visible.map((project, i) => (
              <li key={`${filter}-${project.slug}`} className="anim-rise" style={{ animationDelay: `${Math.min(i, 6) * 45}ms` }}>
                <ProjectCard
                  project={project}
                  number={String(projects.findIndex((p) => p.slug === project.slug) + 1).padStart(2, "0")}
                  showStack
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HomeCta tier="theme-frost" />
    </div>
  );
}
