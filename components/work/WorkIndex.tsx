"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, LayoutGrid, List } from "lucide-react";
import { HomeCta } from "@/components/home/HomeCta";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectCard } from "@/components/work/ProjectCard";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import { PROJECT_CATEGORIES, PROJECT_CATEGORY_MAP, type ProjectCategory } from "@/lib/data/project-categories";
import { useI18n } from "@/lib/i18n/I18nProvider";

type Filter = ProjectCategory | "all";

/** Every project: the flagship first, then a filterable grid or a compact list. Numbers follow the full list. */
export function WorkIndex() {
  const { dict, path } = useI18n();
  const { inner } = dict;
  const projects = dict.projects;
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const featured = projects.find((p) => p.tier === "primary") ?? projects[0];

  const count = (f: Filter) =>
    f === "all" ? projects.length : projects.filter((p) => PROJECT_CATEGORY_MAP[p.slug]?.includes(f)).length;
  const visible = filter === "all" ? projects : projects.filter((p) => PROJECT_CATEGORY_MAP[p.slug]?.includes(filter));
  const numberOf = (slug: string) => String(projects.findIndex((p) => p.slug === slug) + 1).padStart(2, "0");
  const most = Math.max(...PROJECT_CATEGORIES.map(count));

  const kinds = (
    <div className="spec">
      <p className="spec-row spec-label">{inner.byKind}</p>
      {PROJECT_CATEGORIES.map((c) => (
        <button key={c} type="button" onClick={() => setFilter(c)} className="spec-row kind-row w-full text-left">
          <span className="flex items-center justify-between text-small">
            {dict.work.filters[c]}
            <span className="text-mono tabular-nums text-muted-foreground">{count(c)}</span>
          </span>
          <span className="eng-bar" aria-hidden>
            <span style={{ width: `${(count(c) / most) * 100}%` }} />
          </span>
        </button>
      ))}
    </div>
  );

  return (
    <div>
      <PageHero crumbs={[{ label: dict.nav[0].label.toLowerCase() }]} title={dict.work.indexHeadline} description={dict.pages.work.description} aside={kinds} />

      <section className="theme-void pt-[var(--space-lg)]">
        <div className="container-editorial">
          <ScrollReveal>
            <Link href={path(featured.href)} className="featured group" data-cursor="project">
              <div className="featured-media">
                <ProjectVisual slug={featured.slug} alt={`${featured.title}: ${dict.common.screenshotsAlt}`} sizes="(min-width: 1024px) 50vw, 100vw" />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-10">
                <p className="text-mono flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.06em] text-[var(--accent-light)]">
                  <span className="text-muted-foreground">{numberOf(featured.slug)}</span>
                  {inner.highlight} · {featured.industry}
                </p>
                <h2 className="text-section font-display mt-4">{featured.title}</h2>
                <p className="text-body mt-4 text-muted-foreground">{featured.description}</p>
                <ul className="mt-6 flex flex-wrap gap-1.5" role="list">
                  {featured.roles.map((r) => (
                    <li key={r} className="tag">
                      {r}
                    </li>
                  ))}
                </ul>
                <span className="btn-ghost mt-8 self-start">
                  {dict.common.caseStudy}
                  <ArrowUpRight size={15} />
                </span>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="theme-void py-[var(--space-lg)]">
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
            <div className="flex items-center gap-3">
              <p className="text-mono text-muted-foreground" aria-live="polite">
                {visible.length} {dict.common.projectCount}
              </p>
              <div className="seg" role="group" aria-label={`${inner.viewGrid} / ${inner.viewList}`}>
                <button type="button" className="seg-btn !px-2.5" aria-pressed={view === "grid"} onClick={() => setView("grid")} aria-label={inner.viewGrid} title={inner.viewGrid}>
                  <LayoutGrid size={15} aria-hidden />
                </button>
                <button type="button" className="seg-btn !px-2.5" aria-pressed={view === "list"} onClick={() => setView("list")} aria-label={inner.viewList} title={inner.viewList}>
                  <List size={15} aria-hidden />
                </button>
              </div>
            </div>
          </div>

          {view === "grid" ? (
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" role="list">
              {visible.map((project, i) => (
                <li key={`${filter}-${project.slug}`} className="anim-rise" style={{ animationDelay: `${Math.min(i, 6) * 45}ms` }}>
                  <ProjectCard project={project} number={numberOf(project.slug)} showStack />
                </li>
              ))}
            </ul>
          ) : (
            <ul className="project-table mt-8" role="list">
              {visible.map((project, i) => (
                <li key={`${filter}-${project.slug}`} className="anim-rise" style={{ animationDelay: `${Math.min(i, 8) * 30}ms` }}>
                  <Link href={path(project.href)} className="project-row group">
                    <span className="text-mono text-muted-foreground">{numberOf(project.slug)}</span>
                    <span className="min-w-0">
                      <span className="text-h2 block">{project.title}</span>
                      <span className="text-small block truncate text-muted-foreground">{project.tagline}</span>
                    </span>
                    <span className="text-mono hidden text-[0.6875rem] uppercase tracking-[0.06em] text-muted-foreground md:block">{project.industry}</span>
                    <span className="text-mono hidden text-[0.6875rem] uppercase tracking-[0.06em] text-muted-foreground sm:block">{project.period}</span>
                    <span className="story-arrow" aria-hidden>
                      <ArrowUpRight size={16} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <HomeCta />
    </div>
  );
}
