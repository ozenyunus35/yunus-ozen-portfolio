"use client";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionLabel } from "@/components/prism/SectionLabel";
import { Logo } from "@/components/ui/Logo";
import { useI18n } from "@/lib/i18n/I18nProvider";

/** Ring sizes as a share of the orbit's width, and how long one turn takes. */
const RINGS = [
  { size: 0.5, seconds: 70, reverse: false },
  { size: 0.74, seconds: 95, reverse: true },
  { size: 0.98, seconds: 120, reverse: false },
];

/**
 * The stack as an orbit: one ring per category around the YO mark, turning slowly. The rings stop under the pointer
 * and with reduced motion. The list next to it says the same thing in words.
 */
export function HomeTechMap() {
  const { dict } = useI18n();
  const { tech, home } = dict;

  return (
    <section id="tech" className="theme-void overflow-hidden py-[var(--space-xl)]">
      <div className="container-editorial grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <ScrollReveal>
          <SectionLabel number="04" label={tech.sectionLabel} />
          <h2 className="text-section font-display mt-6 max-w-xl">{tech.headline}</h2>
          <p className="text-body mt-5 max-w-lg text-muted-foreground">{tech.intro}</p>
          <ul className="mt-10 space-y-5" role="list">
            {tech.categories.map((category, i) => (
              <li key={category.label} className="flex gap-4">
                <span className={`orbit-key orbit-key-${i}`} aria-hidden />
                <div>
                  <p className="text-h2">{category.label}</p>
                  <p className="text-small mt-1 text-muted-foreground" lang="en">
                    {category.items.join(" · ")}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <div className="orbit" aria-hidden>
            {tech.categories.map((category, ring) => {
              const { size, seconds, reverse } = RINGS[ring];
              return (
                <div
                  key={category.label}
                  className={`orbit-ring orbit-ring-${ring}`}
                  style={{ "--size": size, "--turn": `${seconds}s`, "--dir": reverse ? "reverse" : "normal" } as React.CSSProperties}
                >
                  {category.items.map((item, i) => (
                    <span
                      key={item}
                      className="orbit-slot"
                      style={{ "--angle": `${(360 / category.items.length) * i + ring * 23}deg` } as React.CSSProperties}
                    >
                      <span className="orbit-pill">{item}</span>
                    </span>
                  ))}
                </div>
              );
            })}
            <div className="orbit-core">
              <span className="orbit-halo" />
              <span className="orbit-halo orbit-halo-2" />
              <Logo size={84} framed className="orbit-mark" />
              <span className="orbit-caption">{home.techCenter}</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
