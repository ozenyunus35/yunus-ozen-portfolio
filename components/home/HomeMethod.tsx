"use client";

import { SectionChapter } from "@/components/axis/SectionChapter";
import { SectionLabel } from "@/components/prism/SectionLabel";
import { Reveal } from "@/components/prism/Reveal";
import { BridgeDiagram } from "@/components/visuals/pro/BridgeDiagram";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function HomeMethod() {
  const { dict } = useI18n();
  const { method } = dict;

  return (
    <SectionChapter theme="chalk" id="method" className="py-[var(--space-xl)]">
      <div className="container-editorial">
        <Reveal>
          <SectionLabel number="03" label={method.sectionLabel} />
          <h2 className="text-section mt-6 max-w-xl font-display leading-snug text-[var(--foreground-dark)]">
            {method.headline[0]}
            <br />
            {method.headline[1]}
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <div className="schematic-surface p-6 md:p-10">
            <p className="text-meta mb-4 text-[var(--accent-mid)]">{dict.common.systemSchematic}</p>
            <BridgeDiagram product={method.product} engineering={method.engineering} />
          </div>
        </Reveal>

        <div className="editorial-grid mt-16 items-start">
          {[method.product, method.engineering].map((side, colIndex) => (
            <Reveal key={side.title} delay={0.1 + colIndex * 0.08} className="col-span-12 lg:col-span-6">
              <div>
                <p className="text-meta accent-text">{side.title}</p>
                <ul className="mt-5 space-y-5" role="list">
                  {side.nodes.map((node) => (
                    <li key={node.id}>
                      <p className="text-h2 text-[var(--foreground-dark)]">{node.label}</p>
                      <p className="text-body mt-1 text-[var(--foreground-dark-muted)]">{node.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionChapter>
  );
}
