"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionChapter } from "@/components/axis/SectionChapter";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import { PROJECT_CATEGORIES, PROJECT_CATEGORY_MAP, type ProjectCategory } from "@/lib/data/project-categories";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { cn } from "@/lib/utils/cn";

type Filter = ProjectCategory | "all";

export function WorkIndex() {
  const { dict, path } = useI18n();
  const projects = dict.projects;
  const [filter, setFilter] = useState<Filter>("all");

  const count = (f: Filter) =>
    f === "all" ? projects.length : projects.filter((p) => PROJECT_CATEGORY_MAP[p.slug]?.includes(f)).length;
  const visible = filter === "all" ? projects : projects.filter((p) => PROJECT_CATEGORY_MAP[p.slug]?.includes(filter));

  return (
    <div>
      <SectionChapter theme="void" className="pt-16 pb-[var(--space-md)]">
        <div className="container-editorial py-[var(--space-md)]">
          <PageHeader label={dict.nav[0].label} title={dict.work.indexHeadline} />

          <div className="anim-rise mt-10 flex flex-wrap gap-2" role="group" aria-label={dict.common.all} style={{ animationDelay: "160ms" }}>
            {(["all", ...PROJECT_CATEGORIES] as Filter[]).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={cn(
                  "tag inline-flex items-center gap-2 transition-colors duration-200",
                  filter === f
                    ? "border-[var(--accent)] bg-[var(--accent-subtle)] text-[var(--accent-light)]"
                    : "hover:border-[var(--accent-border)] hover:text-foreground",
                )}
              >
                {dict.work.filters[f]}
                <span className="tabular-nums opacity-60">{count(f)}</span>
              </button>
            ))}
          </div>
        </div>
      </SectionChapter>

      <SectionChapter theme="frost" className="py-[var(--space-lg)]">
        <ul className="container-editorial grid gap-5 md:grid-cols-2" role="list" aria-live="polite">
          {visible.map((project, i) => {
            const num = String(projects.findIndex((p) => p.slug === project.slug) + 1).padStart(2, "0");
            return (
              <li key={`${filter}-${project.slug}`} className="anim-rise" style={{ animationDelay: `${Math.min(i, 5) * 50}ms` }}>
                <Link
                  href={path(`/work/${project.slug}`)}
                  className="project-card group flex h-full flex-col overflow-hidden"
                >
                  <div className="project-card-media relative flex aspect-[16/10] flex-col overflow-hidden bg-[color-mix(in_srgb,var(--accent)_8%,var(--ink-muted))] p-4 md:p-5">
                    <ProjectVisual
                      slug={project.slug}
                      alt={`${project.title}: ${dict.common.screenshotsAlt}`}
                      fill
                      animated={false}
                      sizes="(min-width: 768px) 34rem, 100vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col border-t border-[var(--line)] p-6 md:p-7">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="text-meta text-muted-foreground">
                        {num} — {project.period}
                      </p>
                      <ArrowUpRight
                        size={16}
                        className="shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent-light)]"
                        aria-hidden
                      />
                    </div>
                    <h2 className="text-project mt-3 font-display transition-colors group-hover:text-[var(--accent-light)]">
                      {project.title}
                    </h2>
                    <p className="text-meta mt-2 accent-text">{project.industry}</p>
                    <p className="text-body mt-4 flex-1 text-muted-foreground">{project.tagline}</p>
                    <ul className="mt-6 flex flex-wrap gap-2" role="list" lang="en">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <li key={tech} className="tag">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <ScrollReveal className="container-editorial mt-12">
          <p className="text-meta text-muted-foreground">
            {visible.length} {dict.common.projectCount}
          </p>
        </ScrollReveal>
      </SectionChapter>
    </div>
  );
}
