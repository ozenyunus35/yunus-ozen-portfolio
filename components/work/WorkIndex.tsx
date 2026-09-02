"use client";

import { SectionChapter } from "@/components/axis/SectionChapter";
import { HoverTilt } from "@/components/motion/HoverTilt";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { PageHeader } from "@/components/ui/PageHeader";
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

export function WorkIndex() {
  const { dict } = useI18n();
  const projects = dict.projects;

  return (
    <div>
      <SectionChapter theme="void" className="pt-16 pb-[var(--space-lg)]">
        <div className="container-editorial py-[var(--space-md)]">
          <PageHeader label={dict.nav[0].label} title={dict.work.indexHeadline} />
        </div>
      </SectionChapter>

      {projects.map((project, index) => {
        const num = String(index + 1).padStart(2, "0");
        const isEven = index % 2 === 0;

        return (
          <SectionChapter
            key={project.slug}
            id={project.slug}
            theme={isEven ? "frost" : "chalk"}
            className="py-[var(--space-xl)] scroll-mt-24"
          >
            <div className="container-editorial">
              <ScrollReveal>
                <HoverTilt maxTilt={4}>
                  <article className="pro-panel overflow-hidden">
                    <div className="editorial-grid items-stretch">
                      <div
                        className={`col-span-12 border-b border-[var(--line)] p-8 md:p-10 lg:col-span-5 ${
                          isEven ? "lg:border-b-0 lg:border-r" : "lg:order-2 lg:border-b-0 lg:border-l"
                        }`}
                      >
                        <p className="text-meta text-muted-foreground">{num} — {project.period}</p>
                        <h2 className="text-project mt-4 font-display">{project.title}</h2>
                        <p className="text-meta mt-3 accent-text">{project.industry}</p>
                        <p className="text-body mt-6 text-muted-foreground">{project.description}</p>
                        <ul className="mt-8 flex flex-wrap gap-2" role="list">
                          {project.roles.map((role) => (
                            <li key={role} className="tag">{role}</li>
                          ))}
                        </ul>
                        <ul className="mt-4 flex flex-wrap gap-2" role="list" aria-label="Technologies">
                          {project.technologies.map((tech) => (
                            <li
                              key={tech}
                              className="tag border-[var(--accent-border)] text-[var(--accent-light)]"
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div
                        className={`col-span-12 flex h-full min-h-0 flex-col p-6 md:p-8 lg:col-span-7 ${
                          isEven ? "" : "lg:order-1"
                        } bg-[color-mix(in_srgb,var(--accent)_8%,var(--ink-muted))]`}
                      >
                        <p className="text-meta mb-4 shrink-0 text-[var(--accent)]">{dict.common.processFlow}</p>
                        <ProjectVisual slug={project.slug} fill />
                      </div>
                    </div>
                  </article>
                </HoverTilt>
              </ScrollReveal>
            </div>
          </SectionChapter>
        );
      })}
    </div>
  );
}
