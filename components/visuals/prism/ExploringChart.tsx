"use client";

import { motion } from "framer-motion";
import { exploringContent } from "@/lib/data/exploring";

const STATUS_COLORS: Record<string, { bar: string; bg: string }> = {
  Learning: { bar: "#8b5cf6", bg: "rgba(139, 92, 246, 0.12)" },
  Developing: { bar: "#10b981", bg: "rgba(16, 185, 129, 0.12)" },
};

const STATUS_PROGRESS: Record<string, number> = {
  Learning: 45,
  Developing: 65,
};

export function ExploringChart() {
  const { areas } = exploringContent;

  return (
    <div className="space-y-4">
      {areas.map((area, i) => {
        const colors = STATUS_COLORS[area.status] ?? STATUS_COLORS.Learning;
        const progress = STATUS_PROGRESS[area.status] ?? 40;

        return (
          <motion.div
            key={area.label}
            className="glass-card p-4"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.5 }}
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-meta text-foreground/90">{area.label}</span>
              <span
                className="text-meta rounded-full px-2 py-0.5"
                style={{ background: colors.bg, color: colors.bar }}
              >
                {area.status}
              </span>
            </div>
            <div className="progress-bar mt-3">
              <motion.div
                className="progress-bar-fill"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: progress / 100 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.07, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ background: colors.bar }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
