"use client";

import { useEffect, useRef, useState } from "react";
import { SectionChapter } from "@/components/axis/SectionChapter";
import { CodeVisual, FlowVisual, ReleaseVisual, RequirementsVisual } from "@/components/live/ProcessVisuals";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionLabel } from "@/components/prism/SectionLabel";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { cn } from "@/lib/utils/cn";

const VISUALS = [RequirementsVisual, FlowVisual, CodeVisual, ReleaseVisual];

/**
 * "From idea to release": the steps scroll on the left while one sticky panel on the right shows the step in view.
 * Below the large breakpoint each step carries its own panel, so nothing depends on the sticky layout.
 */
export function HomeProcess() {
  const { dict } = useI18n();
  const { process } = dict;
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    // The step crossing the middle of the viewport is the active one.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );
    for (const el of stepRefs.current) if (el) io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <SectionChapter theme="void" id="process" className="py-[var(--space-xl)]">
      <div className="container-editorial">
        <ScrollReveal>
          <SectionLabel number="02" label={process.sectionLabel} />
          <h2 className="text-section font-display mt-6 max-w-2xl">{process.headline}</h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ol className="space-y-12 lg:space-y-0" role="list">
            {process.steps.map((step, i) => {
              const Visual = VISUALS[i];
              return (
                <li key={step.title} className={cn("process-step lg:flex lg:min-h-[70vh] lg:flex-col lg:justify-center lg:pl-8", active === i && "is-active")}>
                  {/* The text block itself is observed, so the panel changes when the words reach the middle of the screen. */}
                  <div data-step={i} ref={(el) => { stepRefs.current[i] = el; }}>
                  <p className="process-num">0{i + 1}</p>
                  <h3 className={cn("text-project mt-3 font-display transition-opacity duration-500", active === i ? "opacity-100" : "lg:opacity-40")}>{step.title}</h3>
                  <p className={cn("text-body mt-4 max-w-md text-muted-foreground transition-opacity duration-500", active === i ? "opacity-100" : "lg:opacity-40")}>{step.text}</p>
                  </div>
                  <div className="mt-6 lg:hidden">
                    <Visual on />
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="relative hidden lg:block">
            <div className="sticky top-0 flex h-screen items-center">
              {/* All four panels share one grid cell, so they cross-fade in place. */}
              <div className="grid w-full">
                {VISUALS.map((Visual, i) => (
                  <div
                    key={i}
                    aria-hidden={i !== active}
                    className={cn("[grid-area:1/1] transition-[opacity,translate] duration-500 ease-out", i === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0")}
                  >
                    <Visual on={reduced || i === active} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionChapter>
  );
}
