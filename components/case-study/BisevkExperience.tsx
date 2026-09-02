"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionChapter } from "@/components/axis/SectionChapter";
import {
  InteractiveLearnings,
  InteractiveProcess,
  InteractiveRoleList,
} from "@/components/case-study/InteractiveCaseBlocks";
import { PageAmbientField } from "@/components/motion/PageAmbientField";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { BisevkSystemVisual, type BisevkPhase } from "@/components/visuals/BisevkSystemVisual";
import { getBisevkCaseStudy } from "@/lib/i18n/case-studies";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { cn } from "@/lib/utils/cn";

const PHASES: Record<string, BisevkPhase> = {
  problem: "shipper",
  load: "load",
  marketplace: "marketplace",
  carriers: "offers",
  match: "selected",
  transport: "transport",
  delivery: "delivered",
};

export function BisevkExperience() {
  const { locale, dict, path } = useI18n();
  const cs = getBisevkCaseStudy(locale);
  const ui = dict.caseStudyUi;

  const beats = useMemo(
    () =>
      ui.beats.map((beat) => {
        const bodies: Record<string, string> = {
          problem: cs.problem.content,
          load: cs.overview.content,
          marketplace: ui.marketplaceBody,
          carriers: cs.userTypes.intro,
          match: ui.selectionBody,
          transport: ui.transportBody,
          delivery: cs.currentStatus.content,
        };
        return {
          ...beat,
          body: bodies[beat.id] ?? "",
          phase: PHASES[beat.id] ?? "shipper",
        };
      }),
    [cs, ui],
  );

  const [activeBeat, setActiveBeat] = useState(0);
  const beatRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observers = beatRefs.current.map((el, index) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveBeat(index);
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const currentPhase = beats[activeBeat]?.phase ?? "shipper";
  const projectMeta = dict.projects.find((p) => p.slug === "bisevk");

  function scrollToBeat(index: number) {
    beatRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
    setActiveBeat(index);
  }

  return (
    <article>
      <SectionChapter theme="void" className="relative overflow-hidden pt-[4.25rem] pb-[var(--space-lg)]">
        <PageAmbientField />
        <div className="container-editorial relative py-[var(--space-lg)]">
          <div className="editorial-grid items-end">
            <div className="col-span-12 lg:col-span-8">
              <span className="tag">{ui.label} · {dict.common.ongoing}</span>
              <h1 className="text-display mt-6 font-display">{cs.hero.title}</h1>
              <p className="text-statement mt-4 max-w-xl text-muted-foreground">{cs.hero.subtitle}</p>
            </div>
            <div className="col-span-12 mt-8 lg:col-span-4 lg:mt-0 lg:text-right">
              <p className="text-meta text-muted-foreground">{cs.hero.period}</p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 lg:justify-end">
                {cs.hero.roles.map((role) => (
                  <span key={role} className="text-meta text-muted-foreground">{role}</span>
                ))}
              </div>
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
        </div>
      </SectionChapter>

      <div className="theme-void relative">
        <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-5">
            {beats.map((beat, i) => (
              <section
                key={beat.id}
                ref={(el) => {
                  beatRefs.current[i] = el;
                }}
                className={cn(
                  "container-editorial py-[var(--space-lg)] transition-opacity duration-700 lg:min-h-[58vh] lg:pr-10",
                  activeBeat === i ? "opacity-100" : "opacity-30",
                )}
              >
                <p className="text-meta text-[var(--accent-light)]">{beat.kicker}</p>
                <h2 className="text-project mt-4 whitespace-pre-line font-display leading-[1.05]">{beat.title}</h2>
                <p className="text-body mt-6 max-w-md text-muted-foreground">{beat.body}</p>
              </section>
            ))}

            <div className="container-editorial py-[var(--space-lg)]">
              <Link href={path("/work/eyfel-kurye")} className="link-axis text-meta inline-flex">
                {ui.nextProject} — {dict.common.projectNames.eyfel}
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          <div className="hidden lg:col-span-7 lg:block">
            <div className="sticky top-16 flex h-[calc(100svh-4rem)] items-stretch px-[var(--container-padding)] py-6">
              <div className="surface-card flex w-full flex-col self-center p-8 md:p-10">
                <div className="mb-6 flex shrink-0 flex-wrap items-center justify-between gap-3">
                  <p className="text-meta text-muted-foreground">{dict.common.processFlow}</p>
                  <nav className="flex flex-wrap gap-1.5" aria-label={dict.common.processFlow}>
                    {beats.map((beat, i) => (
                      <button
                        key={beat.id}
                        type="button"
                        onClick={() => scrollToBeat(i)}
                        aria-current={activeBeat === i ? "true" : undefined}
                        className={cn(
                          "tag transition-colors",
                          activeBeat === i
                            ? "border-[var(--accent)] bg-[var(--accent-subtle)] text-[var(--accent-light)]"
                            : "hover:border-[var(--accent-border)]",
                        )}
                      >
                        {beat.kicker}
                      </button>
                    ))}
                  </nav>
                </div>
                <BisevkSystemVisual phase={currentPhase} large fill />
              </div>
            </div>
          </div>
        </div>

        <div className="px-[var(--container-padding)] py-12 lg:hidden">
          <BisevkSystemVisual phase={currentPhase} large fill />
        </div>
      </div>

      <SectionChapter theme="chalk" className="py-[var(--space-2xl)]">
        <div className="container-editorial editorial-grid gap-y-16">
          <ScrollReveal className="col-span-12 lg:col-span-6">
            <p className="text-statement mb-10 text-muted-foreground">{cs.myRole.intersection}</p>
            <InteractiveRoleList title={ui.myRole} areas={cs.myRole.areas} />
          </ScrollReveal>
          <ScrollReveal delay={0.08} className="col-span-12 lg:col-span-5 lg:col-start-8">
            <InteractiveProcess
              title={ui.engineering}
              intro={cs.developmentProcess.intro}
              steps={cs.developmentProcess.steps}
            />
          </ScrollReveal>
        </div>
      </SectionChapter>

      <SectionChapter theme="void" className="py-[var(--space-xl)]">
        <div className="container-editorial">
          <ScrollReveal>
            <InteractiveLearnings title={ui.learnings} items={cs.learnings.items} />
          </ScrollReveal>
        </div>
      </SectionChapter>
    </article>
  );
}
