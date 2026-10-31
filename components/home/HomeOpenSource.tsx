"use client";

import { ArrowUpRight } from "lucide-react";
import { SectionChapter } from "@/components/axis/SectionChapter";
import { SectionLabel } from "@/components/prism/SectionLabel";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { useI18n } from "@/lib/i18n/I18nProvider";
import {
  OPEN_SOURCE_ALSO,
  OPEN_SOURCE_REPOS,
  OPEN_SOURCE_TOTAL,
  mergedPrsUrl,
} from "@/lib/data/open-source";

export function HomeOpenSource() {
  const { dict } = useI18n();
  const { openSource } = dict;

  return (
    <SectionChapter theme="void" id="open-source" className="py-[var(--space-xl)]">
      <div className="container-editorial">
        <ScrollReveal>
          <SectionLabel number="03" label={openSource.sectionLabel} />
          <h2 className="text-section mt-6 max-w-2xl font-display">{openSource.headline}</h2>
          <p className="text-body mt-6 max-w-2xl text-muted-foreground">{openSource.intro}</p>
          <p className="mt-8 flex items-baseline gap-3">
            <span className="text-section font-display">{OPEN_SOURCE_TOTAL}</span>
            <span className="text-meta text-muted-foreground">{openSource.totalLabel}</span>
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.06} className="mt-12">
          <ul className="pro-cap-grid" role="list">
            {OPEN_SOURCE_REPOS.map((item) => (
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
