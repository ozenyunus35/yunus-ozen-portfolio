"use client";

import { ExternalLink, Trophy } from "lucide-react";
import { HomeCta } from "@/components/home/HomeCta";
import { InteractiveTimeline } from "@/components/journey/InteractiveTimeline";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionLabel } from "@/components/prism/SectionLabel";
import { PageHero } from "@/components/ui/PageHero";
import { isNasaGithubConfigured } from "@/lib/data/nasa";
import { useI18n } from "@/lib/i18n/I18nProvider";

const NASA_REPO = "https://github.com/ozenyunus35/WINK-TO-THE-FUTURE-INNOSOFT";

export function JourneyPath() {
  const { dict, path } = useI18n();
  const { journey, nasa, inner } = dict;

  const highlight = (
    <aside className="profile-card p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <span className="grid size-11 place-items-center rounded-xl border border-[var(--accent-border)] bg-[var(--accent-subtle)] text-[var(--accent-light)]">
          <Trophy size={20} aria-hidden />
        </span>
        <span className="text-mono text-[0.6875rem] uppercase tracking-[0.06em] text-muted-foreground">{inner.highlight}</span>
      </div>
      <h2 className="text-h1 mt-6">{nasa.title}</h2>
      <p className="text-mono mt-2 text-[0.6875rem] uppercase tracking-[0.06em] text-[var(--accent-light)]">
        {nasa.year} · {nasa.location}
      </p>
      <p className="text-small mt-4 text-muted-foreground">{nasa.description}</p>
      {isNasaGithubConfigured(NASA_REPO) && (
        <a href={NASA_REPO} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-6 h-9 px-4 text-[0.8125rem]" data-cursor="external">
          {nasa.githubLinkLabel}
          <ExternalLink size={13} aria-hidden />
        </a>
      )}
    </aside>
  );

  return (
    <div>
      <PageHero
        crumbs={[{ label: journey.sectionLabel.toLowerCase() }]}
        title={`${journey.headline[0]} ${journey.headline[1]}`}
        accent={journey.headline[2]}
        description={journey.intro}
        aside={highlight}
      />

      <section className="theme-frost py-[var(--space-xl)]">
        <div className="container-editorial grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <ScrollReveal>
            <div className="lg:sticky lg:top-28">
              <SectionLabel number="01" label={inner.milestones} />
              <p className="text-display font-display mt-6 tabular-nums">{journey.milestones.length}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
            <InteractiveTimeline milestones={journey.milestones} types={journey.types} allLabel={dict.common.all} path={path} />
          </ScrollReveal>
        </div>
      </section>

      <HomeCta />
    </div>
  );
}
