"use client";

import { motion } from "framer-motion";
import type { ExperienceMilestone } from "@/lib/data/experience";

type TimelineChartProps = {
  milestones: readonly ExperienceMilestone[];
};

const TYPE_COLORS: Record<string, string> = {
  education: "#2563eb",
  project: "#06b6d4",
  event: "#8b5cf6",
};

export function TimelineChart({ milestones }: TimelineChartProps) {
  const years = milestones.map((m) => {
    const match = m.period.match(/\d{4}/);
    return match ? parseInt(match[0], 10) : 2025;
  });
  const minYear = Math.min(...years) - 1;
  const maxYear = Math.max(...years) + 1;
  const range = maxYear - minYear;

  return (
    <div className="relative">
      <div className="mb-8 flex justify-between">
        {Array.from({ length: range + 1 }, (_, i) => minYear + i).map((year) => (
          <span key={year} className="text-meta text-muted-foreground">
            {year}
          </span>
        ))}
      </div>

      <div className="relative h-1 w-full rounded-full bg-[var(--line)]">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--cyan)]"
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="relative mt-6 space-y-0">
        {milestones.map((milestone, i) => {
          const yearMatch = milestone.period.match(/\d{4}/);
          const year = yearMatch ? parseInt(yearMatch[0], 10) : maxYear;
          const position = ((year - minYear) / range) * 100;
          const color = TYPE_COLORS[milestone.type] ?? "#2563eb";

          return (
            <motion.div
              key={milestone.id}
              className="relative flex items-start gap-6 pb-10 last:pb-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <div className="relative flex w-8 shrink-0 flex-col items-center">
                <motion.div
                  className="relative z-10 h-3 w-3 rounded-full border-2 border-[var(--background)]"
                  style={{ background: color }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08, type: "spring", stiffness: 300 }}
                />
                {i < milestones.length - 1 && (
                  <div className="absolute top-3 h-full w-px bg-[var(--line)]" />
                )}
              </div>

              <div className="flex-1 pt-[-2px]">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-meta" style={{ color }}>
                    {milestone.period}
                  </span>
                  <span className="metric-badge">{milestone.type}</span>
                </div>
                <h3 className="text-h2 mt-2 font-display">{milestone.title}</h3>
                {milestone.context && (
                  <p className="text-meta mt-1 text-muted-foreground">{milestone.context}</p>
                )}
                <p className="text-body mt-3 max-w-xl text-muted-foreground">
                  {milestone.description}
                </p>
              </div>

              <div
                className="absolute top-0 hidden h-full w-px md:block"
                style={{ left: `${Math.min(Math.max(position, 5), 95)}%` }}
                aria-hidden="true"
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
