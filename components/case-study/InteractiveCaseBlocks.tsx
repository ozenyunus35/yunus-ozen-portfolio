"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MOTION_EASE } from "@/lib/motion/constants";
import { cn } from "@/lib/utils/cn";

type RoleArea = {
  area: string;
  responsibilities: string[];
};

type ProcessStep = {
  id?: string;
  label: string;
  description: string;
};

type LearningItem = {
  id: string;
  text: string;
};

export function InteractiveRoleList({
  title,
  intro,
  areas,
}: {
  title: string;
  intro?: string;
  areas: RoleArea[];
}) {
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = useState(0);

  return (
    <div>
      <h2 className="text-meta accent-text">{title}</h2>
      {intro && <p className="text-body mt-6 text-muted-foreground">{intro}</p>}
      <ul className="mt-10 space-y-3" role="list">
        {areas.map((area, i) => {
          const selected = open === i;
          return (
            <li key={area.area}>
              <button
                type="button"
                aria-expanded={selected}
                onClick={() => setOpen(i)}
                className={cn(
                  "w-full rounded-[var(--radius-md)] border p-5 text-left transition-colors duration-300",
                  selected
                    ? "border-[var(--accent-border)] bg-[var(--accent-subtle)]"
                    : "border-[var(--line)] hover:border-[var(--accent-border)]",
                )}
              >
                <span className="text-meta text-[var(--accent-subtle)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-h2 mt-2 font-display">{area.area}</h3>
                <AnimatePresence initial={false}>
                  {selected && (
                    <motion.ul
                      role="list"
                      className="mt-3 space-y-2 overflow-hidden"
                      initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: MOTION_EASE.out }}
                    >
                      {area.responsibilities.map((item) => (
                        <li key={item} className="text-body text-muted-foreground">
                          {item}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function InteractiveProcess({
  title,
  intro,
  steps,
}: {
  title: string;
  intro?: string;
  steps: ProcessStep[];
}) {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <div>
      <h2 className="text-meta accent-text">{title}</h2>
      {intro && <p className="text-body mt-6 text-muted-foreground">{intro}</p>}
      <ol className="mt-8 space-y-0" role="list">
        {steps.map((step, i) => {
          const selected = active === i;
          return (
            <li key={step.id ?? step.label} className="border-t border-[var(--line)]">
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(i)}
                className={cn(
                  "w-full py-5 text-left transition-colors duration-300",
                  selected ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className={cn("text-meta", selected ? "text-[var(--accent)]" : "")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-h2 mt-2 font-display">{step.label}</h3>
                <AnimatePresence initial={false}>
                  {selected && (
                    <motion.p
                      className="text-body mt-2 overflow-hidden text-muted-foreground"
                      initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: MOTION_EASE.out }}
                    >
                      {step.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function InteractiveLearnings({
  title,
  items,
}: {
  title: string;
  items: LearningItem[];
}) {
  const [pinned, setPinned] = useState<string | null>(null);

  return (
    <div>
      <h2 className="text-meta accent-text">{title}</h2>
      <ul className="mt-8 grid gap-6 md:grid-cols-2" role="list">
        {items.map((item, i) => {
          const selected = pinned === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => setPinned(selected ? null : item.id)}
                className={cn(
                  "h-full w-full border-l-2 p-5 text-left transition-all duration-300",
                  selected
                    ? "border-[var(--accent)] bg-[var(--accent-subtle)]"
                    : "border-[var(--accent)]/50 hover:border-[var(--accent)] hover:bg-[var(--accent-subtle)]",
                )}
              >
                <span className="text-meta text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-body mt-2 text-muted-foreground">{item.text}</p>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
