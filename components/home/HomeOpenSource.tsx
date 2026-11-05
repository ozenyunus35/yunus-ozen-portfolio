"use client";

import { ArrowUpRight } from "lucide-react";
import { SectionChapter } from "@/components/axis/SectionChapter";
import { SectionLabel } from "@/components/prism/SectionLabel";
import { CountUp } from "@/components/motion/CountUp";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { OPEN_SOURCE_ALSO, mergedPrsUrl, type OpenSourceStats } from "@/lib/data/open-source";

export function HomeOpenSource({ stats }: { stats: OpenSourceStats }) {
  const { dict, locale } = useI18n();
  const { openSource } = dict;
  const countedAt = stats.countedAt
    ? new Date(stats.countedAt).toLocaleDateString(locale === "tr" ? "tr-TR" : "en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <SectionChapter theme="void" id="open-source" className="py-[var(--space-xl)]">
      <div className="container-editorial">
        <ScrollReveal>
          <SectionLabel number="05" label={openSource.sectionLabel} />
          <h2 className="text-section mt-6 max-w-2xl font-display">{openSource.headline}</h2>
          <p className="text-body mt-6 max-w-2xl text-muted-foreground">{openSource.intro}</p>
          <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--line)] sm:grid-cols-3">
            {[
              { value: stats.total, label: dict.stats.merged },
              { value: stats.repoCount, label: dict.stats.repos },
              { value: dict.projects.length, label: dict.stats.products },
            ].map((item) => (
              <div key={item.label} className="flex flex-col-reverse gap-2 bg-[var(--ink-soft)] p-6">
                <dt className="text-meta text-muted-foreground">{item.label}</dt>
                <dd className="text-section font-display tabular-nums">
                  <CountUp value={item.value} />
                </dd>
              </div>
            ))}
          </dl>
          {countedAt && (
            <p className="text-meta mt-2 flex items-center gap-2 text-muted-foreground/70">
              <span className="live-dot" aria-hidden />
              {openSource.updatedLabel.replace("{date}", countedAt)}
            </p>
          )}
        </ScrollReveal>

        <ScrollReveal delay={0.06} className="mt-12">
          <ul className="pro-cap-grid" role="list">
            {stats.repos.map((item) => (
              <li key={item.repo}>
                <a
                  href={mergedPrsUrl(item.repo)}
                  target="_blank"
                  rel="noreferrer"
                  className="pro-cap-card group flex h-full flex-col"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-h1 transition-colors group-hover:text-[var(--accent-light)]" lang="en">
                      {item.name}
                    </h3>
                    <ArrowUpRight size={14} className="shrink-0 text-muted-foreground" aria-hidden />
                  </div>
                  <p className="text-meta mt-2 accent-text" lang="en">
                    {item.language}
                  </p>
                  <p className="text-body mt-4 flex-1 text-muted-foreground">
                    {openSource.descriptions[item.repo]}
                  </p>
                  <p className="text-meta mt-6 text-muted-foreground">
                    <span className="text-foreground">{item.merged}</span> {openSource.mergedLabel}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-10">
          <p className="text-meta text-muted-foreground">{openSource.alsoLabel}</p>
          <ul className="mt-4 flex flex-wrap gap-2" role="list" lang="en">
            {OPEN_SOURCE_ALSO.map((name) => (
              <li key={name} className="tag">
                {name}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </SectionChapter>
  );
}
