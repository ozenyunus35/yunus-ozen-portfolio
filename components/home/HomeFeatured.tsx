"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionChapter } from "@/components/axis/SectionChapter";
import { SectionLabel } from "@/components/prism/SectionLabel";
import { HoverTilt } from "@/components/motion/HoverTilt";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { BisevkSystemVisual } from "@/components/visuals/BisevkSystemVisual";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function HomeFeatured() {
  const { dict, path } = useI18n();
  const projects = dict.projects;
  const featured = projects.find((p) => p.tier === "primary") ?? projects[0];
  const others = projects.filter((p) => p.slug !== featured.slug);

  return (
    <SectionChapter theme="frost" id="work" className="py-[var(--space-xl)]">
      <div className="container-editorial">
        <ScrollReveal>
          <SectionLabel number="01" label={dict.work.sectionLabel} />
          <h2 className="text-section mt-6 max-w-xl font-display">{dict.work.headline}</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.08} className="mt-14">
          <HoverTilt>
            <Link
              href={path(featured.href)}
              className="group block"
              data-cursor="project"
            >
              <article className="pro-panel overflow-hidden">
                <div className="editorial-grid items-stretch">
                  <div className="col-span-12 border-b border-[var(--line)] p-8 md:p-10 lg:col-span-5 lg:border-b-0 lg:border-r">
                    <p className="text-meta text-muted-foreground">{featured.period}</p>
                    <h3 className="text-project mt-4 font-display transition-colors group-hover:text-[var(--accent-light)]">
                      {featured.title}
                    </h3>
                    <p className="text-meta mt-3 accent-text">{featured.industry}</p>
                    <p className="text-body mt-6 text-muted-foreground">{featured.description}</p>
                    <ul className="mt-8 flex flex-wrap gap-2" role="list">
                      {featured.roles.slice(0, 4).map((role) => (
                        <li key={role} className="tag">{role}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-span-12 flex flex-col overflow-hidden bg-[color-mix(in_srgb,var(--accent)_8%,var(--ink-muted))] p-6 md:p-8 lg:col-span-7">
                    <ParallaxLayer speed={32} className="flex flex-1 flex-col">
                      <BisevkSystemVisual phase="full" animated fill />
                    </ParallaxLayer>
                  </div>
                </div>
              </article>
            </Link>
          </HoverTilt>
        </ScrollReveal>

        <ul className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]" role="list">
          {others.map((project, i) => (
            <ScrollReveal key={project.slug} delay={0.04 + i * 0.05}>
              <li>
                <Link
                  href={path(project.href)}
                  className="group grid gap-4 py-7 transition-colors hover:bg-[var(--accent-subtle)] md:grid-cols-[1fr_auto_auto] md:items-center md:gap-8 md:px-4"
                  data-cursor="project"
                >
                  <div>
                    <h3 className="text-h1 transition-colors group-hover:text-[var(--accent-light)]">
                      {project.title}
                    </h3>
                    <p className="text-body mt-1 text-muted-foreground">{project.tagline}</p>
                  </div>
                  <span className="text-meta text-muted-foreground">{project.industry}</span>
                  <span className="text-meta text-muted-foreground md:text-right">{project.period}</span>
                </Link>
              </li>
            </ScrollReveal>
          ))}
        </ul>

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
