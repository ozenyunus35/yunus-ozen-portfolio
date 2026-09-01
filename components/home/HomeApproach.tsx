"use client";

import { SectionChapter } from "@/components/axis/SectionChapter";
import { SectionLabel } from "@/components/prism/SectionLabel";
import { Reveal, StaggerReveal, StaggerItem } from "@/components/prism/Reveal";
import { ApproachCycleDiagram } from "@/components/visuals/pro/ApproachCycleDiagram";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function HomeApproach() {
  const { dict } = useI18n();
  const { approach } = dict;

  return (
    <SectionChapter theme="void" id="approach" className="py-[var(--space-xl)]">
      <div className="container-editorial">
        <Reveal>
          <SectionLabel number="02" label={approach.sectionLabel} />
          <div className="mt-8 max-w-2xl">
            <p className="text-section font-display leading-snug">{approach.statement[0]}</p>
            <p className="text-section mt-2 font-display leading-snug text-muted-foreground">
              {approach.statement[1]}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="schematic-surface p-6 md:p-10">
            <p className="text-meta mb-4 text-[var(--accent-light)]">{dict.common.processFlow}</p>
            <ApproachCycleDiagram columns={approach.columns} />
          </div>
        </Reveal>

        <StaggerReveal className="mt-16 grid gap-px bg-[var(--line)] md:grid-cols-3">
          {approach.columns.map((col) => (
            <StaggerItem key={col.title}>
              <div className="h-full bg-[var(--ink-soft)] p-8 md:p-10">
                <p className="text-meta accent-text">{col.title}</p>
                <ul className="mt-8 space-y-4" role="list">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2.5 h-0.5 w-6 shrink-0 bg-[var(--accent)]" aria-hidden="true" />
                      <span className="text-body">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </SectionChapter>
  );
}
