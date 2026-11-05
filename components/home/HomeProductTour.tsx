"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AtlasDemo, RelayDemo, ScraperDemo, TallyDemo } from "@/components/live/demos";
import { DemoFromStart } from "@/components/live/useStep";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionLabel } from "@/components/prism/SectionLabel";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useI18n } from "@/lib/i18n/I18nProvider";

/** Each tab stays as long as its demo takes to play once. */
const TABS = [
  { key: "tally", slug: "tally", Demo: TallyDemo, ms: 8000 },
  { key: "relay", slug: "relay", Demo: RelayDemo, ms: 9000 },
  { key: "atlas", slug: "atlas-portal", Demo: AtlasDemo, ms: 7600 },
  { key: "scraper", slug: "lead-scraper", Demo: ScraperDemo, ms: 6000 },
] as const;

/**
 * Product tour: one tab per product, each showing its demo replaying with made-up data. The tabs advance on their own
 * while the tour is on screen, pause while the pointer or focus is inside, and stay put with reduced motion.
 */
export function HomeProductTour() {
  const { dict, path } = useI18n();
  const { live, home } = dict;
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>("-20% 0px");
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const tab = TABS[active];
  const project = dict.projects.find((p) => p.slug === tab.slug);
  const card = live.cards[tab.key];
  const playing = inView && !hovered && !focused && !reduced;

  const select = (i: number) => {
    setActive(i);
    setTouched(true);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (active + step + TABS.length) % TABS.length;
    select(next);
    document.getElementById(`tour-tab-${next}`)?.focus();
  };

  return (
    <section id="live" className="theme-frost py-[var(--space-xl)]">
      <div className="container-editorial">
        <ScrollReveal className="flex flex-col items-center text-center">
          <SectionLabel label={live.sectionLabel} />
          <h2 className="text-section font-display mt-6 max-w-3xl">{live.headline}</h2>
          <p className="text-body mt-5 max-w-2xl text-muted-foreground">{live.intro}</p>
        </ScrollReveal>

        <div
          ref={ref}
          className="mt-12"
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          // Only keyboard focus holds the tour; a mouse click leaves focus on the tab and would stop it for good.
          onFocus={(e) => e.target.matches(":focus-visible") && setFocused(true)}
          onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocused(false)}
        >
          <div className="flex justify-center">
            <div role="tablist" aria-label={home.tourHint} className="tour-tabs" onKeyDown={onKeyDown}>
              {TABS.map((t, i) => (
                <button
                  key={t.key}
                  id={`tour-tab-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-controls="tour-panel"
                  tabIndex={i === active ? 0 : -1}
                  onClick={() => select(i)}
                  className="tour-tab"
                >
                  {live.cards[t.key].title}
                  <span className="tour-tab-bar" aria-hidden>
                    {i === active && !reduced && (
                      <span
                        key={`${active}-${touched}`}
                        className="tour-tab-fill"
                        style={{ animationDuration: `${t.ms}ms`, animationPlayState: playing ? "running" : "paused" }}
                        onAnimationEnd={() => {
                          setActive((n) => (n + 1) % TABS.length);
                          setTouched(true);
                        }}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div id="tour-panel" role="tabpanel" aria-labelledby={`tour-tab-${active}`} className="tour-panel mt-6">
            <div key={active} className="tour-swap grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-0">
              <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
                <div>
                  {project && <p className="text-meta text-[var(--accent-light)]">{project.industry}</p>}
                  <h3 className="text-project font-display mt-4">{card.title}</h3>
                  <p className="text-body mt-4 text-muted-foreground">{card.caption}</p>
                  {project && (
                    <ul className="mt-6 flex flex-wrap gap-2" role="list" lang="en">
                      {project.technologies.slice(0, 5).map((t) => (
                        <li key={t} className="tag">
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <Link href={path(project?.href ?? "/work")} className="btn-ghost self-start">
                  {live.open}
                  <ArrowUpRight size={15} />
                </Link>
              </div>
              <div className="tour-stage">
                <DemoFromStart.Provider value={touched}>
                  <tab.Demo />
                </DemoFromStart.Provider>
              </div>
            </div>
          </div>
          <p className="text-small mt-5 text-center text-muted-foreground">{live.note}</p>
        </div>
      </div>
    </section>
  );
}
