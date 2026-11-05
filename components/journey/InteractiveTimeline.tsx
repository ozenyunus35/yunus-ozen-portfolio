"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { cn } from "@/lib/utils/cn";

type Milestone = Dictionary["journey"]["milestones"][number];
type MilestoneType = Milestone["type"] | "all";

type InteractiveTimelineProps = {
  milestones: readonly Milestone[];
  types: Dictionary["journey"]["types"];
  allLabel: string;
  path: (href: string) => string;
};

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function InteractiveTimeline({
  milestones,
  types,
  allLabel,
  path,
}: InteractiveTimelineProps) {
  const reducedMotion = useReducedMotion();
  const [filter, setFilter] = useState<MilestoneType>("all");
  const [activeId, setActiveId] = useState(milestones[0]?.id ?? "");
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const filters: { id: MilestoneType; label: string }[] = [
    { id: "all", label: allLabel },
    { id: "education", label: types.education },
    { id: "project", label: types.project },
    { id: "event", label: types.event },
  ];

  const visible = useMemo(
    () => (filter === "all" ? milestones : milestones.filter((m) => m.type === filter)),
    [filter, milestones],
  );

  const highlightedId = visible.some((m) => m.id === activeId)
    ? activeId
    : (visible[0]?.id ?? "");

  useEffect(() => {
    const observers = itemRefs.current.map((el, index) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(visible[index].id);
        },
        { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((observer) => observer?.disconnect());
  }, [visible]);

  const activeIndex = Math.max(
    0,
    visible.findIndex((m) => m.id === highlightedId),
  );
  const progress = visible.length > 1 ? (activeIndex + 0.15) / (visible.length - 0.15) : 1;

  return (
    <div>
      <div className="seg" role="tablist" aria-label={allLabel}>
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={filter === item.id}
            onClick={() => setFilter(item.id)}
            className="seg-btn"
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="relative mt-8">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--line-strong)]" aria-hidden="true" />
        <motion.div
          className="absolute left-[7px] top-2 w-[2px] -translate-x-[0.5px] origin-top bg-gradient-to-b from-[var(--accent)] to-[var(--accent-hot)]"
          aria-hidden="true"
          animate={{ scaleY: progress }}
          transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: "calc(100% - 1rem)", transformOrigin: "top" }}
        />

        <ol className="space-y-0" role="list">
          <AnimatePresence initial={false}>
            {visible.map((milestone, i) => {
              const selected = milestone.id === highlightedId;
              const href = "href" in milestone ? milestone.href : undefined;
              const external = href ? isExternalHref(href) : false;

              return (
                <motion.li
                  key={milestone.id}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  layout
                  initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="relative grid grid-cols-[16px_1fr] gap-x-6 py-3 sm:gap-x-8"
                >
                  <div className="relative flex justify-center pt-6">
                    <span
                      className={cn(
                        "relative z-10 block size-[15px] rounded-full border-2 transition-all duration-300",
                        selected
                          ? "border-[var(--accent)] bg-[var(--ink-soft)] shadow-[0_0_0_4px_var(--accent-subtle)]"
                          : "border-[var(--line-strong)] bg-[var(--ink-soft)]",
                      )}
                    />
                  </div>

                  <div
                    onMouseEnter={() => setActiveId(milestone.id)}
                    className={cn(
                      "w-full rounded-[var(--radius-lg)] border p-5 text-left transition-all duration-300 sm:p-6",
                      selected
                        ? "border-[var(--accent-border)] bg-[var(--ink-soft)] shadow-[var(--shadow-float)]"
                        : "border-[var(--line)] bg-[color-mix(in_srgb,var(--ink-soft)_55%,transparent)] hover:border-[var(--line-strong)]",
                    )}
                  >
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span className="text-mono text-[0.6875rem] uppercase tracking-[0.06em] text-[var(--accent-light)]">{milestone.period}</span>
                      {milestone.context && (
                        <span className="text-mono text-[0.6875rem] uppercase tracking-[0.06em] text-muted-foreground">{milestone.context}</span>
                      )}
                    </div>

                    {href && milestone.type === "project" ? (
                      <Link
                        href={path(href)}
                        className="text-h1 mt-1 inline-flex items-center gap-2 py-1 hover:text-[var(--accent-light)]"
                        data-cursor="project"
                      >
                        {milestone.title}
                        <ArrowUpRight size={16} />
                      </Link>
                    ) : href && external ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-h1 mt-1 inline-flex items-center gap-2 py-1 hover:text-[var(--accent-light)]"
                        data-cursor="external"
                      >
                        {milestone.title}
                        <ExternalLink size={14} />
                      </a>
                    ) : (
                      <h3 className="text-h1 mt-2">{milestone.title}</h3>
                    )}

                    <p className="text-body mt-3 max-w-prose text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ol>
      </div>
    </div>
  );
}
