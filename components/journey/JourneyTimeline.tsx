"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { experienceContent } from "@/lib/data/experience";
import { nasaContent } from "@/lib/data/nasa";
import { SectionChapter } from "@/components/continuum/SectionChapter";

export function JourneyTimeline() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const lineRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);

  useEffect(() => {
    const observers = refs.current.map((el, i) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i); },
        { rootMargin: "-35% 0px -35% 0px" },
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const { milestones, headline } = experienceContent;

  return (
    <div>
      <SectionChapter theme="paper" className="pt-24 pb-[var(--space-xl)] md:pt-28">
        <div className="container-editorial">
          <p className="text-meta text-[var(--continuum)]">Journey</p>
          <h1 className="text-section mt-8 font-display leading-[0.92]">
            {headline[0]}
            <br />
            <span className="text-muted-foreground">{headline[1]}</span>
          </h1>
        </div>
      </SectionChapter>

      <SectionChapter theme="paper" className="pb-[var(--space-2xl)]" ref={lineRef}>
        <div className="container-editorial relative">
          <div className="absolute bottom-0 left-4 top-0 w-px bg-[var(--line)] md:left-[28%]" aria-hidden="true">
            <motion.div className="w-full bg-[var(--continuum)]" style={{ height: lineHeight }} />
          </div>

          <div className="space-y-[var(--space-xl)]">
            {milestones.map((m, i) => (
              <article
                key={m.id}
                ref={(el) => { refs.current[i] = el; }}
                className="editorial-grid items-start gap-y-6"
              >
                <div className="col-span-12 md:col-span-3">
                  <p
                    className={`text-display font-display transition-colors duration-500 ${
                      active === i ? "text-[var(--continuum)]" : "text-muted-foreground/40"
                    }`}
                  >
                    {m.period.split(" ")[0]}
                  </p>
                </div>
                <div
                  className={`col-span-12 md:col-span-8 md:col-start-5 transition-opacity duration-500 ${
                    active === i ? "opacity-100" : "opacity-40"
                  }`}
                >
                  <p className="text-meta text-muted-foreground">{m.context ?? m.type}</p>
                  <h2 className="text-h1 mt-3 font-display">{m.title}</h2>
                  <p className="text-body mt-4 max-w-xl text-muted-foreground">{m.description}</p>
                  {m.href && (
                    <Link href={m.href} className="link-flow text-meta mt-6 inline-flex" target={m.href.startsWith("http") ? "_blank" : undefined}>
                      {m.href.startsWith("http") ? "View repository" : "View project"}
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </SectionChapter>

      {/* NASA milestone — distinct chapter */}
      <SectionChapter theme="ink" className="py-[var(--space-xl)]">
        <div className="container-editorial editorial-grid items-center">
          <div className="col-span-12 lg:col-span-5">
            <p className="text-meta text-[var(--continuum-bright)]">{nasaContent.year} · {nasaContent.location}</p>
            <h2 className="text-section mt-6 font-display leading-[0.92]">{nasaContent.title}</h2>
            <p className="text-h2 mt-4 font-display text-muted-foreground">{nasaContent.projectName}</p>
          </div>
          <div className="col-span-12 mt-10 lg:col-span-6 lg:col-start-7 lg:mt-0">
            <p className="text-body text-muted-foreground">{nasaContent.description}</p>
            {nasaContent.github && (
              <a href={nasaContent.github} target="_blank" rel="noopener noreferrer" className="link-flow text-meta mt-8 inline-flex">
                GitHub repository
              </a>
            )}
          </div>
        </div>
      </SectionChapter>
    </div>
  );
}
