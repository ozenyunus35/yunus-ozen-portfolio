"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionChapter } from "@/components/axis/SectionChapter";
import { SectionLabel } from "@/components/prism/SectionLabel";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function HomeTechStack() {
  const { dict, path } = useI18n();
  const { tech, projects } = dict;

  return (
    <SectionChapter theme="frost" id="tech" className="py-[var(--space-xl)]">
      <div className="container-editorial">
        <ScrollReveal>
          <SectionLabel number="03" label={tech.sectionLabel} />
          <h2 className="text-section mt-6 max-w-2xl font-display">{tech.headline}</h2>
          <p className="text-body mt-6 max-w-2xl text-muted-foreground">{tech.intro}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.06} className="mt-16">
          <p className="text-meta text-muted-foreground">{tech.stackLabel}</p>
          <div className="pro-cap-grid mt-6">
            {tech.categories.map((category, index) => (
              <div key={category.label} className="pro-cap-card h-full">
                <p className="text-meta accent-text">{category.label}</p>
                <ul className="mt-6 flex flex-wrap gap-2" role="list">
                  {category.items.map((item) => (
                    <li key={item} className="tag">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-16">
          <p className="text-meta text-muted-foreground">{tech.byProjectLabel}</p>
          <ul className="mt-6 divide-y divide-[var(--line)] border-y border-[var(--line)]" role="list">
            {projects.map((project, index) => (
              <li key={project.slug}>
                <Link
                  href={path(project.href)}
                  className="group grid gap-6 py-8 transition-colors hover:bg-[var(--accent-subtle)] md:grid-cols-[1fr_auto] md:items-start md:gap-10 md:px-4"
                  data-cursor="project"
                >
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3 className="text-h1 transition-colors group-hover:text-[var(--accent-light)]">
                        {project.title}
                      </h3>
                      <span className="text-meta text-muted-foreground">{project.period}</span>
                    </div>
                    <p className="text-meta mt-2 text-[var(--accent)]">{tech.involvementLabel}</p>
                    <p className="text-body mt-2 text-muted-foreground">{project.techInvolvement}</p>
                  </div>
                  <ul className="flex max-w-xl flex-wrap gap-2 md:justify-end" role="list">
                    {project.technologies.map((item) => (
                      <li key={item} className="tag">
                        {item}
                      </li>
                    ))}
                  </ul>
                </Link>
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal className="mt-10">
          <Link href={path("/work")} className="link-form text-meta text-muted-foreground">
            {dict.common.fullWorkIndex}
            <ArrowUpRight size={13} />
          </Link>
        </ScrollReveal>
      </div>
    </SectionChapter>
  );
}
