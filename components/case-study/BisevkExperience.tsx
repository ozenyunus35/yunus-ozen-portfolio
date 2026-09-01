"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionChapter } from "@/components/axis/SectionChapter";
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

  return (
    <article>
      <SectionChapter theme="void" className="pt-[4.25rem] pb-[var(--space-lg)]">
        <div className="container-editorial py-[var(--space-lg)]">
          <div className="editorial-grid items-end">
            <div className="col-span-12 lg:col-span-8">
              <span className="tag">{ui.label} · {dict.common.ongoing}</span>
              <h1 className="text-hero mt-8 font-display">{cs.hero.title}</h1>
              <p className="text-statement mt-4 text-muted-foreground">{cs.hero.subtitle}</p>
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
                      className="tag border-[var(--accent-border)] text-[var(--accent-light)]"
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

      <SectionChapter theme="frost" className="py-[var(--space-lg)]">
        <div className="container-editorial">
          <p className="text-meta text-[var(--accent)]">{ui.problem}</p>
          <p className="text-statement mt-8 max-w-4xl">{cs.problem.content}</p>
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
                  "container-editorial min-h-[72vh] py-[var(--space-lg)] transition-opacity duration-700 lg:pr-10",
                  activeBeat === i ? "opacity-100" : "opacity-30",
                )}
              >
                <p className="text-meta text-[var(--accent-light)]">{beat.kicker}</p>
                <h2 className="text-section mt-6 whitespace-pre-line font-display leading-[0.9]">{beat.title}</h2>
                <p className="text-body mt-8 max-w-md text-muted-foreground">{beat.body}</p>
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
            <div className="sticky top-0 flex h-screen items-stretch px-[var(--container-padding)] py-10">
              <div className="surface-card flex w-full flex-col self-center p-8 md:p-10">
                <p className="text-meta mb-6 shrink-0 text-muted-foreground">{dict.common.processFlow}</p>
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
          <div className="col-span-12 lg:col-span-6">
            <p className="text-meta text-[var(--accent)]">{ui.myRole}</p>
            <p className="text-statement mt-8 text-muted-foreground">{cs.myRole.intersection}</p>
            <ul className="mt-12 space-y-10" role="list">
              {cs.myRole.areas.map((area, i) => (
                <li key={area.area} className="relative pl-12">
                  <span className="text-display absolute left-0 top-0 font-display text-[var(--accent-subtle)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-h2 font-display">{area.area}</p>
                  <ul className="mt-3 space-y-2" role="list">
                    {area.responsibilities.map((r) => (
                      <li key={r} className="text-body text-muted-foreground">{r}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <p className="text-meta text-[var(--accent)]">{ui.engineering}</p>
            <p className="text-body mt-6 text-muted-foreground">{cs.developmentProcess.intro}</p>
            <ol className="mt-10 space-y-0" role="list">
              {cs.developmentProcess.steps.map((step, i) => (
                <li key={step.id} className="border-t border-[var(--line)] py-5">
                  <span className="text-meta text-[var(--accent)]">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-h2 mt-2 font-display">{step.label}</p>
                  <p className="text-body mt-1 text-muted-foreground">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </SectionChapter>

      <SectionChapter theme="void" className="py-[var(--space-xl)]">
        <div className="container-editorial">
          <p className="text-meta text-[var(--accent-light)]">{ui.learnings}</p>
          <ul className="mt-10 grid gap-8 md:grid-cols-2" role="list">
            {cs.learnings.items.map((item, i) => (
              <li key={item.id} className="border-l-2 border-[var(--accent)] pl-6">
                <span className="text-meta text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-body mt-2 text-muted-foreground">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </SectionChapter>
    </article>
  );
}
