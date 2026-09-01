"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionChapter } from "@/components/axis/SectionChapter";
import { CaseStudyScrollVisual } from "@/components/case-study/CaseStudyScrollVisual";
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

  const storyBeats = [
    {
      id: "problem",
      kicker: study.problem.title,
      title: study.hero.title,
      body: study.problem.content,
    },
    {
      id: "overview",
      kicker: study.overview.title,
      title: study.hero.subtitle,
      body: study.overview.content,
    },
    ...(study.productFlow || study.focus
      ? [
          {
            id: "flow",
            kicker: study.productFlow?.title ?? study.focus!.title,
            title: dict.common.processFlow,
            body: study.productFlow?.intro ?? study.focus!.intro,
          },
        ]
      : []),
  ];

  const hasVisual = study.productFlow || study.focus;
  const projectMeta = dict.projects.find((p) => p.slug === study.slug);

  return (
    <article>
      <SectionChapter theme="void" className="pt-[4.25rem] pb-[var(--space-lg)]">
        <div className="container-editorial py-[var(--space-lg)]">
          <ScrollReveal>
            <div className="editorial-grid items-end">
              <div className="col-span-12 lg:col-span-9">
                <span className="tag">{dict.caseStudyUi.label} · {status}</span>
                <h1 className="text-hero mt-8 font-display">{study.hero.title}</h1>
                <p className="text-display mt-4 text-muted-foreground">{study.hero.subtitle}</p>
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
                        className="tag border-[var(--accent-border)] text-[var(--accent-light)]"
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
                  <h2 className="text-section mt-6 font-display leading-[0.95]">{beat.title}</h2>
                  <p className="text-body mt-8 text-muted-foreground">{beat.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </SectionChapter>
      )}

      <SectionChapter theme="void" className="py-[var(--space-xl)]">
        <div className="container-editorial editorial-grid gap-y-16">
          <ScrollReveal className="col-span-12 md:col-span-6">
            <p className="text-meta accent-text">{study.role.title}</p>
            <p className="text-body mt-6 text-muted-foreground">{study.role.intro}</p>
            <ul className="mt-10 space-y-8" role="list">
              {study.role.areas.map((area, i) => (
                <li key={area.area}>
                  <span className="text-meta text-[var(--accent-subtle)]">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-h2 mt-2 font-display">{area.area}</p>
                  <ul className="mt-2 space-y-1" role="list">
                    {area.responsibilities.map((item) => (
                      <li key={item} className="text-body text-muted-foreground">{item}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </ScrollReveal>
          <ScrollReveal delay={0.08} className="col-span-12 md:col-span-5 md:col-start-8">
            <p className="text-meta accent-text">{study.process.title}</p>
            <ol className="mt-8 space-y-0" role="list">
              {study.process.steps.map((step, i) => (
                <li key={step.label} className="border-t border-[var(--line)] py-5">
                  <span className="text-meta text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-h2 mt-1 font-display">{step.label}</p>
                  <p className="text-body mt-1 text-muted-foreground">{step.description}</p>
                </li>
              ))}
            </ol>
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
              <p className="text-meta accent-text">{study.learnings.title}</p>
              <ul className="mt-8 grid gap-6 md:grid-cols-2" role="list">
                {study.learnings.items.map((item) => (
                  <li key={item.id} className="border-l-2 border-[var(--accent)] pl-5">
                    <p className="text-body text-muted-foreground">{item.text}</p>
                  </li>
                ))}
              </ul>
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
