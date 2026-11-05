"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionChapter } from "@/components/axis/SectionChapter";
import { AtlasDemo, RelayDemo, ScraperDemo, TallyDemo } from "@/components/live/demos";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionLabel } from "@/components/prism/SectionLabel";
import { useI18n } from "@/lib/i18n/I18nProvider";

const DEMOS = [
  { key: "tally", href: "/work/tally", Demo: TallyDemo },
  { key: "relay", href: "/work/relay", Demo: RelayDemo },
  { key: "atlas", href: "/work/atlas-portal", Demo: AtlasDemo },
  { key: "scraper", href: "/work/lead-scraper", Demo: ScraperDemo },
] as const;

/** Product demos that replay what each project does while the card is on screen. */
export function HomeLiveDemos() {
  const { dict, path } = useI18n();
  const { live } = dict;

  return (
    <SectionChapter theme="void" id="live" className="py-[var(--space-xl)]">
      <div className="container-editorial">
        <ScrollReveal>
          <SectionLabel number="02" label={live.sectionLabel} />
          <h2 className="text-section mt-6 max-w-2xl font-display">{live.headline}</h2>
          <p className="text-body mt-6 max-w-2xl text-muted-foreground">{live.intro}</p>
        </ScrollReveal>

        <ul className="mt-14 grid gap-6 lg:grid-cols-2" role="list">
          {DEMOS.map(({ key, href, Demo }, i) => {
            const card = live.cards[key];
            return (
              <li key={key}>
                <ScrollReveal delay={0.05 * (i % 2)}>
                  <article className="pro-panel p-4 sm:p-5">
                    <Demo />
                    <div className="mt-5 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-h1">{card.title}</h3>
                        <p className="text-body mt-1.5 text-muted-foreground">{card.caption}</p>
                      </div>
                      <Link href={path(href)} className="link-form text-meta shrink-0 text-muted-foreground" aria-label={`${live.open}: ${card.title}`}>
                        {live.open}
                        <ArrowUpRight size={13} />
                      </Link>
                    </div>
                  </article>
                </ScrollReveal>
              </li>
            );
          })}
        </ul>
        <p className="text-meta mt-6 text-muted-foreground/70">{live.note}</p>
      </div>
    </SectionChapter>
  );
}
