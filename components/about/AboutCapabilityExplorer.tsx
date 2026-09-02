"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MOTION_DURATION, MOTION_EASE } from "@/lib/motion/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { cn } from "@/lib/utils/cn";

type AboutCapabilityExplorerProps = {
  columns: Dictionary["approach"]["columns"];
};

const POSITIONS = [
  { x: 450, y: 86 },
  { x: 148, y: 328 },
  { x: 752, y: 328 },
] as const;

export function AboutCapabilityExplorer({ columns }: AboutCapabilityExplorerProps) {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const current = columns[active];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center">
      <svg
        viewBox="0 0 900 430"
        className="w-full"
        role="img"
        aria-label={columns.map((c) => c.title).join(" · ")}
      >
        <motion.path
          d="M 450 170 L 148 270 M 450 170 L 752 270 M 210 328 L 690 328"
          fill="none"
          stroke="var(--accent)"
          strokeOpacity="0.35"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: MOTION_DURATION.diagram }}
        />

        {columns.map((column, i) => {
          const pos = POSITIONS[i];
          const selected = active === i;
          return (
            <g key={column.title}>
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={selected ? 78 : 64}
                fill={selected ? "var(--accent-subtle)" : "transparent"}
                stroke={selected ? "var(--accent)" : "var(--line-strong)"}
                strokeWidth={selected ? 2 : 1}
                className="cursor-pointer"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                animate={{
                  r: selected ? 78 : 64,
                  opacity: selected ? 1 : 0.55,
                }}
                transition={{ duration: MOTION_DURATION.base, ease: MOTION_EASE.out }}
              />
              {!reducedMotion && selected && (
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r={92}
                  fill="none"
                  stroke="var(--accent-light)"
                  strokeWidth="1"
                  animate={{ opacity: [0.15, 0.55, 0.15], r: [86, 98, 86] }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                />
              )}
              <text
                x={pos.x}
                y={pos.y + 6}
                textAnchor="middle"
                className="cursor-pointer"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: 15,
                  letterSpacing: "0.08em",
                  fill: selected ? "var(--accent-light)" : "var(--foreground)",
                  fontWeight: 600,
                }}
              >
                {column.title}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="pro-panel min-h-[220px] p-8">
        <p className="text-meta accent-text">{current.title}</p>
        <AnimatePresence mode="wait">
          <motion.ul
            key={current.title}
            className="mt-8 space-y-4"
            role="list"
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: MOTION_EASE.out }}
          >
            {current.items.map((item, i) => (
              <motion.li
                key={item}
                className="flex items-center gap-3"
                initial={reducedMotion ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
              >
                <span className="block h-px w-6 shrink-0 bg-[var(--accent)]" aria-hidden="true" />
                <span className="text-h2">{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
        <div className="mt-8 flex gap-2" role="tablist" aria-label={columns.map((c) => c.title).join(" / ")}>
          {columns.map((column, i) => (
            <button
              key={column.title}
              type="button"
              role="tab"
              aria-selected={active === i}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                active === i ? "bg-[var(--accent)]" : "bg-[var(--line-strong)] hover:bg-[var(--accent-border)]",
              )}
              onClick={() => setActive(i)}
            >
              <span className="sr-only">{column.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
