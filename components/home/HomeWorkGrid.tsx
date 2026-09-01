"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionChapter } from "@/components/axis/SectionChapter";
import { SectionLabel } from "@/components/prism/SectionLabel";
import { Reveal } from "@/components/prism/Reveal";
import { BisevkSystemVisual } from "@/components/visuals/BisevkSystemVisual";
import { EyfelVelocityVisual } from "@/components/visuals/EyfelVelocityVisual";
import { FmdModularVisual } from "@/components/visuals/FmdModularVisual";
import { TavukPhysicalVisual } from "@/components/visuals/TavukPhysicalVisual";
import { useI18n } from "@/lib/i18n/I18nProvider";

function ProjectVisual({ slug, fill = false }: { slug: string; fill?: boolean }) {
  switch (slug) {
    case "bisevk":
      return <BisevkSystemVisual phase="full" animated fill={fill} />;
    case "eyfel":
      return <EyfelVelocityVisual fill={fill} />;
    case "fmd":
      return <FmdModularVisual fill={fill} />;
    case "tavuk-da-tavuk":
      return <TavukPhysicalVisual fill={fill} />;
    default:
      return null;
  }
}

export function HomeWorkGrid() {
  const { dict, path } = useI18n();
  const projects = dict.projects;

  return (
    <SectionChapter theme="frost" id="work" className="py-[var(--space-xl)]">
      <div className="container-editorial">
        <Reveal>
          <SectionLabel number="01" label={dict.work.sectionLabel} />
          <h2 className="text-section mt-6 max-w-lg font-display">{dict.work.headline}</h2>
        </Reveal>

        <ul className="mt-14 grid gap-8 md:grid-cols-2" role="list">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.08}>
              <li>
                <Link href={path(project.href)} className="group block">
                  <article className="schematic-surface schematic-surface-sm flex h-full flex-col p-5 md:p-6">
                    <div className="flex flex-1 flex-col">
                      <ProjectVisual slug={project.slug} fill />
                    </div>

                    <div className="border-t border-[var(--accent-border)] pt-5">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-meta text-[var(--foreground-dark-muted)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-h1 text-[var(--foreground-dark)] transition-colors group-hover:text-[var(--accent-mid)]">
                          {project.title}
                        </h3>
                        {project.status === "ongoing" && (
                          <span className="tag border-[var(--accent-border)] text-[var(--accent-mid)]">
                            {dict.common.ongoing}
                          </span>
                        )}
                        <ArrowUpRight
                          size={16}
                          className="ml-auto text-[var(--accent)] opacity-70 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                        />
                      </div>
                      <p className="text-body mt-2 text-[var(--foreground-dark-muted)]">{project.tagline}</p>
                      <p className="text-meta mt-3 text-[var(--foreground-dark-muted)]">
                        {project.industry} · {project.period}
                      </p>
                    </div>
                  </article>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10">
          <Link href={path("/work")} className="link-form text-meta text-[var(--foreground-dark-muted)]">
            {dict.common.fullWorkIndex}
            <ArrowUpRight size={13} />
          </Link>
        </Reveal>
      </div>
    </SectionChapter>
  );
}
