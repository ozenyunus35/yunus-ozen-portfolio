"use client";

import { CountUp } from "@/components/motion/CountUp";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { useI18n } from "@/lib/i18n/I18nProvider";
import type { OpenSourceStats } from "@/lib/data/open-source";

/** Three numbers, all counted from real data: merged PRs and repositories from GitHub, products from the project list. */
export function HomeStats({ stats }: { stats: OpenSourceStats }) {
  const { dict } = useI18n();
  const { home } = dict;
  const items = [
    { value: stats.total, label: dict.stats.merged, note: home.statsNotes.merged },
    { value: stats.repoCount, label: dict.stats.repos, note: home.statsNotes.repos },
    { value: dict.projects.length, label: dict.stats.products, note: home.statsNotes.products },
  ];

  return (
    <section aria-label={home.statsLabel} className="theme-void pb-[var(--space-xl)]">
      <div className="container-editorial">
        <ul className="grid gap-4 md:grid-cols-3" role="list">
          {items.map((item, i) => (
            <li key={item.label}>
              <ScrollReveal delay={i * 0.07} className="h-full">
                <div className="stat-card">
                  <p className="stat-value font-display tabular-nums">
                    <CountUp value={item.value} />
                  </p>
                  <p className="mt-3 text-h2">{item.label}</p>
                  <p className="mt-2 text-small text-muted-foreground">{item.note}</p>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
