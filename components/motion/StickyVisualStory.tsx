"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type StoryBeat = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  action?: ReactNode;
};

type StickyVisualStoryProps = {
  visual?: ReactNode;
  renderVisual?: (activeBeat: number) => ReactNode;
  beats: StoryBeat[];
  visualLabel?: string;
  className?: string;
  theme?: "void" | "frost" | "chalk" | "slate";
};

export function StickyVisualStory({
  visual,
  renderVisual,
  beats,
  visualLabel,
  className,
  theme = "void",
}: StickyVisualStoryProps) {
  const [activeBeat, setActiveBeat] = useState(0);
  const beatRefs = useRef<(HTMLElement | null)[]>([]);

  const visualContent = renderVisual ? renderVisual(activeBeat) : visual;

  useEffect(() => {
    const observers = beatRefs.current.map((element, index) => {
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveBeat(index);
        },
        { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
      );

      observer.observe(element);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, [beats.length]);

  return (
    <div className={cn(`theme-${theme} relative`, className)}>
      <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-5">
          {beats.map((beat, index) => (
            <section
              key={beat.id}
              ref={(element) => {
                beatRefs.current[index] = element;
              }}
              className={cn(
                "container-editorial min-h-[68vh] py-[var(--space-lg)] transition-opacity duration-700 lg:pr-10",
                activeBeat === index ? "opacity-100" : "opacity-35",
              )}
            >
              <p className="text-meta text-[var(--accent-light)]">{beat.kicker}</p>
              <h2 className="text-section mt-6 max-w-md font-display leading-[0.95]">{beat.title}</h2>
              <p className="text-body mt-8 max-w-md text-muted-foreground">{beat.body}</p>
              {beat.action}
            </section>
          ))}
        </div>

        <div className="hidden lg:col-span-7 lg:block">
          <div className="sticky top-20 flex h-[calc(100svh-5rem)] items-stretch px-[var(--container-padding)] py-6">
            <div className="schematic-surface flex w-full flex-col p-8 md:p-10 transition-opacity duration-500">
              {visualLabel && (
                <p className="text-meta mb-6 shrink-0 text-muted-foreground">{visualLabel}</p>
              )}
              {visualContent}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--line)] px-[var(--container-padding)] py-12 lg:hidden">
        <div className="schematic-surface schematic-surface-sm flex flex-col p-6">
          {visualLabel && (
            <p className="text-meta mb-4 shrink-0 text-muted-foreground">{visualLabel}</p>
          )}
          {visualContent}
        </div>
      </div>
    </div>
  );
}
