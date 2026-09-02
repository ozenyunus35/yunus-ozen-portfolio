"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionChapter } from "@/components/axis/SectionChapter";
import { CaseStudyScrollVisual } from "@/components/case-study/CaseStudyScrollVisual";
import {
  InteractiveLearnings,
  InteractiveProcess,
  InteractiveRoleList,
} from "@/components/case-study/InteractiveCaseBlocks";
import { PageAmbientField } from "@/components/motion/PageAmbientField";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StickyVisualStory } from "@/components/motion/StickyVisualStory";
import type { CompactCaseStudy } from "@/lib/data/case-studies/compact-types";
import { useI18n } from "@/lib/i18n/I18nProvider";

type CompactCaseStudyPageProps = {
  study: CompactCaseStudy;
};

export function CompactCaseStudyPage({ study }: CompactCaseStudyPageProps) {
  const { dict, path } = useI18n();
  const status =
    study.hero.status === "ongoing" ? dict.common.ongoing : study.hero.period;
  const nextSlug = study.nextProject
    ? study.nextProject.slug === "eyfel"
      ? "eyfel-kurye"
      : study.nextProject.slug === "fmd"
        ? "fmd-egitim"
        : study.nextProject.slug
    : null;
  const nextHref = nextSlug ? path(`/work/${nextSlug}`) : null;

  const flowSection = study.productFlow ?? study.focus;

  const storyBeats = [
    {
      id: "problem",
      title: study.problem.title,
      body: study.problem.content,
    },
    {
      id: "overview",
      title: study.overview.title,
      body: study.overview.content,
    },
    ...(flowSection
      ? [
          {
            id: "flow",
            title: flowSection.title,
            body: flowSection.intro ?? "",
          },
        ]
      : []),
  ].map((beat, index) => ({
    ...beat,
    kicker: String(index + 1).padStart(2, "0"),
  }));

  const hasVisual = Boolean(flowSection);
  const projectMeta = dict.projects.find((p) => p.slug === study.slug);

  return (
    <article>
      <SectionChapter theme="void" className="relative overflow-hidden pt-[4.25rem] pb-[var(--space-lg)]">
        <PageAmbientField />
        <div className="container-editorial relative py-[var(--space-lg)]">
          <ScrollReveal>
            <div className="editorial-grid items-end">
              <div className="col-span-12 lg:col-span-9">
                <span className="tag">{dict.caseStudyUi.label} · {status}</span>
                <h1 className="text-display mt-6 max-w-2xl font-display">{study.hero.title}</h1>
                <p className="text-statement mt-4 max-w-xl text-muted-foreground">
                  {study.hero.subtitle}
                </p>
              </div>
              <div className="col-span-12 mt-6 flex flex-wrap gap-x-4 gap-y-1 lg:col-span-3 lg:mt-0 lg:justify-end">
                {study.hero.roles.map((role) => (
                  <span key={role} className="text-meta text-muted-foreground">{role}</span>
                ))}
              </div>
              {projectMeta && (
                <div className="col-span-12 mt-10 border-t border-[var(--line)] pt-8">
                  <p className="text-meta text-muted-foreground">{dict.tech.involvementLabel}</p>
                  <p className="text-body mt-2 max-w-2xl text-muted-foreground">
                    {projectMeta.techInvolvement}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2" role="list">
                    {projectMeta.technologies.map((item) => (
                      <li
                        key={item}
                        className="tag border-[var(--accent-border)] text-[var(--accent-light)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-subtle)]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </SectionChapter>

      {hasVisual ? (
        <SectionChapter theme="frost" className="py-0">
          <StickyVisualStory
            beats={storyBeats}
            visualLabel={dict.common.systemSchematic}
            theme="frost"
            renderVisual={(activeBeat) => (
              <CaseStudyScrollVisual study={study} activeBeat={activeBeat} />
            )}
          />
        </SectionChapter>
      ) : (
        <SectionChapter theme="frost" className="py-[var(--space-xl)]">
          <div className="container-editorial max-w-3xl space-y-[var(--space-xl)]">
            {storyBeats.map((beat, index) => (
              <ScrollReveal key={beat.id} delay={index * 0.06}>
                <div>
                  <p className="text-meta text-[var(--accent-light)]">{beat.kicker}</p>
                  <h2 className="text-project mt-4 font-display leading-[1.05]">{beat.title}</h2>
                  <p className="text-body mt-6 text-muted-foreground">{beat.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </SectionChapter>
      )}

      <SectionChapter theme="void" className="py-[var(--space-xl)]">
        <div className="container-editorial editorial-grid gap-y-16">
          <ScrollReveal className="col-span-12 md:col-span-6">
            <InteractiveRoleList
              title={study.role.title}
              intro={study.role.intro}
              areas={study.role.areas}
            />
          </ScrollReveal>
          <ScrollReveal delay={0.08} className="col-span-12 md:col-span-5 md:col-start-8">
            <InteractiveProcess
              title={study.process.title}
              intro={study.process.intro}
              steps={study.process.steps}
            />
          </ScrollReveal>
        </div>
      </SectionChapter>

      {study.outcome && (
        <SectionChapter theme="slate" className="py-[var(--space-lg)]">
          <div className="container-editorial editorial-grid">
            <ScrollReveal className="col-span-12 lg:col-span-8">
              <p className="text-meta text-[var(--accent-light)]">{study.outcome.title}</p>
              <p className="text-body mt-4 max-w-2xl text-muted-foreground">{study.outcome.content}</p>
            </ScrollReveal>
          </div>
        </SectionChapter>
      )}

      {study.learnings && (
        <SectionChapter theme="frost" className="py-[var(--space-lg)]">
          <div className="container-editorial">
            <ScrollReveal>
              <InteractiveLearnings title={study.learnings.title} items={study.learnings.items} />
              {nextHref && study.nextProject && (
                <Link
                  href={nextHref}
                  className="link-form text-meta mt-12 inline-flex"
                  data-cursor="project"
                >
                  {dict.caseStudyUi.nextProject} — {study.nextProject.label}
                  <ArrowUpRight size={14} />
                </Link>
              )}
            </ScrollReveal>
          </div>
        </SectionChapter>
      )}
    </article>
  );
}
