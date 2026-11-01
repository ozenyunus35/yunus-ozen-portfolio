"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Code2 } from "lucide-react";
import { SectionChapter } from "@/components/axis/SectionChapter";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import { PROJECT_MEDIA } from "@/lib/data/project-media";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function ProjectDetail({ slug }: { slug: string }) {
  const { dict, path } = useI18n();
  const projects = dict.projects;
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  const media = PROJECT_MEDIA[slug];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const num = String(index + 1).padStart(2, "0");

  return (
    <article>
      <SectionChapter theme="void" className="relative overflow-hidden pt-16">
        <div className="container-editorial pt-[var(--space-md)]">
          <Link href={path("/work")} className="anim-fade link-form text-meta text-muted-foreground">
            <ArrowLeft size={13} aria-hidden />
            {dict.common.backToProjects}
          </Link>

          <div className="editorial-grid mt-10 items-end gap-y-8">
            <div className="col-span-12 lg:col-span-8">
              <p className="anim-rise text-meta text-muted-foreground">
                {num} / {String(projects.length).padStart(2, "0")} — {project.industry}
              </p>
              <h1 className="anim-rise text-display mt-5 font-display" style={{ animationDelay: "60ms" }}>
                {project.title}
              </h1>
              <p className="anim-rise text-statement mt-6 max-w-2xl text-muted-foreground" style={{ animationDelay: "120ms" }}>
                {project.tagline}
              </p>
            </div>
            {media && (
              <div className="anim-rise col-span-12 flex flex-wrap gap-3 lg:col-span-4 lg:justify-end" style={{ animationDelay: "180ms" }}>
                <a href={media.demo} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1 justify-center sm:flex-none">
                  {dict.common.liveDemo}
                  <ArrowUpRight size={14} aria-hidden />
                </a>
                <a href={media.source} target="_blank" rel="noopener noreferrer" className="btn-ghost flex-1 justify-center sm:flex-none">
                  <Code2 size={14} aria-hidden />
                  {dict.common.sourceCode}
                </a>
              </div>
            )}
          </div>

          <div
            className="anim-rise-lg mt-10 flex min-h-[220px] flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--line)] bg-[color-mix(in_srgb,var(--accent)_8%,var(--ink-muted))] p-4 sm:mt-12 sm:p-6 md:p-10"
            style={{ animationDelay: "200ms" }}
          >
            <p className="text-meta mb-4 shrink-0 text-[var(--accent)]">
              {media ? dict.common.interface : dict.common.processFlow}
            </p>
            <ProjectVisual
              slug={slug}
              alt={`${project.title}: ${dict.common.screenshotsAlt}`}
              fill
              priority
              scrollOnSmall
              sizes="(min-width: 1088px) 68rem, 100vw"
            />
          </div>
        </div>
      </SectionChapter>

      <SectionChapter theme="void" className="py-[var(--space-xl)]">
        <div className="container-editorial editorial-grid gap-y-12">
          <ScrollReveal className="col-span-12 lg:col-span-7">
            <p className="text-body max-w-3xl text-[1.0625rem] leading-[1.8] text-foreground/90 md:text-lg">{project.description}</p>
            <div className="pro-quote mt-10">
              <p className="text-meta text-muted-foreground">{dict.common.whatIDid}</p>
              <p className="text-h2 mt-3">{project.techInvolvement}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08} className="col-span-12 lg:col-span-4 lg:col-start-9">
            <dl className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
              <div className="py-5">
                <dt className="text-meta text-muted-foreground">{dict.common.period}</dt>
                <dd className="text-body mt-1">{project.period}</dd>
              </div>
              <div className="py-5">
                <dt className="text-meta text-muted-foreground">{dict.common.roles}</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {project.roles.map((role) => (
                    <span key={role} className="tag">
                      {role}
                    </span>
                  ))}
                </dd>
              </div>
              <div className="py-5">
                <dt className="text-meta text-muted-foreground">{dict.common.stack}</dt>
                <dd className="mt-3 flex flex-wrap gap-2" lang="en">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tag border-[var(--accent-border)] text-[var(--accent-light)]">
                      {tech}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </ScrollReveal>
        </div>
      </SectionChapter>

      <SectionChapter theme="frost" className="py-[var(--space-lg)]">
        <nav className="container-editorial grid gap-4 md:grid-cols-2" aria-label={dict.common.backToProjects}>
          {[
            { project: prev, label: dict.common.previous, Icon: ArrowLeft },
            { project: next, label: dict.common.next, Icon: ArrowRight },
          ].map(({ project: p, label, Icon }, i) => (
            <Link
              key={label}
              href={path(`/work/${p.slug}`)}
              className={`project-card group flex min-w-0 flex-col p-5 sm:p-6 md:p-8 ${i === 1 ? "md:items-end md:text-right" : ""}`}
            >
              <span className="text-meta inline-flex items-center gap-2 text-muted-foreground">
                {i === 0 && <Icon size={13} className="transition-transform group-hover:-translate-x-1" aria-hidden />}
                {label}
                {i === 1 && <Icon size={13} className="transition-transform group-hover:translate-x-1" aria-hidden />}
              </span>
              <span className="text-project mt-3 font-display transition-colors group-hover:text-[var(--accent-light)]">
                {p.title}
              </span>
              <span className="text-meta mt-2 text-muted-foreground">{p.industry}</span>
            </Link>
          ))}
        </nav>
      </SectionChapter>
    </article>
  );
}
