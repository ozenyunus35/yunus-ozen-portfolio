"use client";

import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionLabel } from "@/components/prism/SectionLabel";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { OPEN_SOURCE_ALSO, mergedPrsUrl, type OpenSourceStats } from "@/lib/data/open-source";
import { useLiveOpenSource } from "@/lib/data/use-live-open-source";

/** The one dark section on the light page: merged pull requests per repository, counted from GitHub at build time. */
export function HomeOpenSource({ stats: built }: { stats: OpenSourceStats }) {
  const stats = useLiveOpenSource(built);
  const { dict, locale } = useI18n();
  const { openSource } = dict;
  const countedAt = stats.countedAt
    ? new Date(stats.countedAt).toLocaleDateString(locale === "tr" ? "tr-TR" : "en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;
  const most = Math.max(...stats.repos.map((r) => r.merged));

  return (
    <section id="open-source" className="scheme-dark relative isolate overflow-hidden py-[var(--space-xl)]">
      <div className="os-glow" aria-hidden />
      <div className="container-editorial">
        <ScrollReveal className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <SectionLabel number="05" label={openSource.sectionLabel} />
            <h2 className="text-section font-display mt-6 max-w-2xl">{openSource.headline}</h2>
          </div>
          <div>
            <p className="text-body text-muted-foreground">{openSource.intro}</p>
            {countedAt && (
              <p className="text-small mt-4 flex items-center gap-2 text-muted-foreground">
                <span className="live-dot" aria-hidden />
                {openSource.updatedLabel.replace("{date}", countedAt)}
              </p>
            )}
          </div>
        </ScrollReveal>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {stats.repos.map((item, i) => (
            <li key={item.repo}>
              <ScrollReveal delay={(i % 3) * 0.06} className="h-full">
                <a href={mergedPrsUrl(item.repo)} target="_blank" rel="noreferrer" className="os-card group">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-h1" lang="en">
                      {item.name}
                    </h3>
                    <ArrowUpRight size={15} className="shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </div>
                  <p className="text-mono mt-1.5 text-[var(--accent-light)]" lang="en">
                    {item.language}
                  </p>
                  <p className="text-small mt-4 flex-1 text-muted-foreground">{openSource.descriptions[item.repo]}</p>
                  <div className="mt-6">
                    <div className="flex items-baseline justify-between text-small">
                      <span className="text-muted-foreground">{openSource.mergedLabel}</span>
                      <span className="font-display text-h1 tabular-nums">{item.merged}</span>
                    </div>
                    <div className="os-bar mt-2">
                      <span style={{ "--w": `${(item.merged / most) * 100}%` } as React.CSSProperties} />
                    </div>
                  </div>
                </a>
              </ScrollReveal>
            </li>
          ))}
        </ul>

        <ScrollReveal className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3">
          <p className="text-meta text-muted-foreground">{openSource.alsoLabel}</p>
          <ul className="flex flex-wrap gap-2" role="list" lang="en">
            {OPEN_SOURCE_ALSO.map((name) => (
              <li key={name} className="tag">
                {name}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
