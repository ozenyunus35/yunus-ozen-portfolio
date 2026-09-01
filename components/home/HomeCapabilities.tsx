"use client";

import { SectionChapter } from "@/components/axis/SectionChapter";
import { SectionLabel } from "@/components/prism/SectionLabel";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function HomeCapabilities() {
  const { dict } = useI18n();
  const { approach } = dict;

  return (
    <SectionChapter theme="void" id="approach" className="py-[var(--space-xl)]">
      <div className="container-editorial">
        <ScrollReveal>
          <SectionLabel number="02" label={approach.sectionLabel} />
          <div className="mt-8 max-w-2xl">
            <p className="text-section font-display leading-snug">{approach.statement[0]}</p>
            <p className="text-section mt-2 font-display leading-snug text-muted-foreground">
              {approach.statement[1]}
            </p>
          </div>
        </ScrollReveal>

        <div className="pro-cap-grid mt-16">
          {approach.columns.map((col, i) => (
            <ScrollReveal key={col.title} delay={0.08 + i * 0.1} y={40}>
              <div className="pro-cap-card h-full">
                <p className="text-meta accent-text">{col.title}</p>
                <ul className="mt-8 space-y-4" role="list">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2.5 block h-px w-5 shrink-0 bg-[var(--accent)]" aria-hidden="true" />
                      <span className="text-body text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </SectionChapter>
  );
}
