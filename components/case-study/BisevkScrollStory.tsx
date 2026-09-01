"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  BisevkScrollDiagram,
  type BisevkDiagramState,
} from "@/components/project-visualizations/BisevkScrollDiagram";
import { bisevkCaseStudy } from "@/lib/data/case-studies/bisevk";
import { cn } from "@/lib/utils/cn";

type Chapter = {
  id: string;
  number: string;
  title: string;
  content: string;
  state: BisevkDiagramState;
};

const CHAPTERS: Chapter[] = [
  {
    id: "overview",
    number: "00",
    title: "Overview",
    content: bisevkCaseStudy.overview.content,
    state: "load",
  },
  {
    id: "problem",
    number: "01",
    title: "Problem",
    content: bisevkCaseStudy.problem.content,
    state: "problem",
  },
  {
    id: "marketplace",
    number: "02",
    title: "Marketplace",
    content: bisevkCaseStudy.userTypes.intro,
    state: "load",
  },
  {
    id: "offers",
    number: "03",
    title: "Offers",
    content: bisevkCaseStudy.coreFlow.intro,
    state: "offers",
  },
  {
    id: "match",
    number: "04",
    title: "Match",
    content: "Carriers submit offers on posted loads. One offer is selected, establishing the shipper–carrier connection for transport.",
    state: "match",
  },
  {
    id: "transport",
    number: "05",
    title: "Transport",
    content: "Once matched, the load moves through transport coordination toward delivery completion.",
    state: "transport",
  },
  {
    id: "delivery",
    number: "06",
    title: "Delivery",
    content: "The workflow completes when freight reaches its destination through the platform's structured process.",
    state: "delivery",
  },
  {
    id: "architecture",
    number: "07",
    title: "Architecture",
    content: "The product spans client interfaces, frontend application logic, API layer, backend services, and database — structured as a layered system.",
    state: "architecture",
  },
];

export function BisevkScrollStory() {
  const [activeChapter, setActiveChapter] = useState(0);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observers = chapterRefs.current.map((el, index) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveChapter(index);
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const cs = bisevkCaseStudy;
  const currentState = CHAPTERS[activeChapter]?.state ?? "load";

  return (
    <article className="pb-[var(--space-2xl)]">
      {/* Hero strip */}
      <header className="border-b border-line px-[var(--container-padding)] py-16 md:py-24">
        <div className="mx-auto max-w-[var(--container-max)]">
          <p className="text-mono text-muted-foreground">CASE STUDY · ONGOING</p>
          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <span className="text-mega font-display leading-none text-foreground/15 lg:col-span-3">01</span>
            <div className="lg:col-span-9">
              <h1 className="text-giant font-display leading-[0.9] text-foreground">{cs.hero.title}</h1>
              <p className="text-h3 mt-4 text-muted-foreground">{cs.hero.subtitle}</p>
              <ul className="mt-6 flex flex-wrap gap-2" role="list">
                {cs.hero.roles.map((role) => (
                  <li key={role} className="text-mono border border-line px-2 py-1 text-muted-foreground">
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Sticky scroll narrative */}
      <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 px-[var(--container-padding)] lg:grid-cols-2 lg:gap-16">
        {/* Left: scrolling chapters */}
        <div className="py-12 lg:py-20">
          {CHAPTERS.map((chapter, index) => (
            <section
              key={chapter.id}
              ref={(el) => {
                chapterRefs.current[index] = el;
              }}
              className={cn(
                "min-h-[60vh] border-l border-line py-12 pl-8 transition-opacity duration-500",
                activeChapter === index ? "opacity-100" : "opacity-40",
              )}
              id={chapter.id}
            >
              <span className="text-mono text-accent">
                CHAPTER {chapter.number} — {chapter.title.toUpperCase()}
              </span>
              <h2 className="text-h2 mt-4 font-display text-foreground">{chapter.title}</h2>
              <p className="text-body mt-6 max-w-lg text-muted-foreground">{chapter.content}</p>
            </section>
          ))}

          <div className="border-l border-line py-12 pl-8">
            <Link
              href="/work/eyfel-kurye"
              className="text-mono group inline-flex items-center gap-2 text-foreground hover:text-accent"
            >
              NEXT — EYFEL KURYE
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Right: sticky diagram */}
        <div className="hidden lg:block">
          <div className="sticky top-24 flex min-h-[calc(100vh-6rem)] items-center py-20">
            <div className="w-full border border-line bg-surface-soft/40 p-8">
              <p className="text-mono mb-6 text-muted-foreground">SYSTEM STATE</p>
              <BisevkScrollDiagram state={currentState} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile diagram inline */}
      <div className="border-t border-line px-[var(--container-padding)] py-12 lg:hidden">
        <BisevkScrollDiagram state={currentState} />
      </div>
    </article>
  );
}
