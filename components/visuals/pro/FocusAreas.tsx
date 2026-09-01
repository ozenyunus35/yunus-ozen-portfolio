"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";
import { getExploringStatusLabel } from "@/lib/i18n/status-labels";
import { MOTION_DURATION } from "@/lib/motion/constants";

type FocusAreasProps = {
  areas: Dictionary["exploring"]["areas"];
  locale: Locale;
};

export function FocusAreas({ areas, locale }: FocusAreasProps) {
  const reducedMotion = useReducedMotion();

  return (
    <ul className="divide-y divide-[var(--line)]" role="list">
      {areas.map((area, i) => (
        <motion.li
          key={area.label}
          className="flex items-center justify-between gap-6 py-5"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.4 }}
        >
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <span className="relative hidden h-px w-12 shrink-0 overflow-hidden bg-[var(--line-strong)] sm:block" aria-hidden="true">
              {!reducedMotion && (
                <motion.span
                  className="absolute inset-y-0 left-0 w-1/2 bg-[var(--accent)]"
                  animate={{ x: ["-100%", "250%"] }}
                  transition={{
                    duration: MOTION_DURATION.diagram * 0.7,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.35,
                  }}
                />
              )}
            </span>
            <span className="text-h2">{area.label}</span>
          </div>
          <motion.span
            className="tag shrink-0"
            animate={
              reducedMotion
                ? undefined
                : { opacity: area.status === "Developing" ? [0.65, 1, 0.65] : [0.75, 1, 0.75] }
            }
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.2 }}
          >
            {getExploringStatusLabel(area.status, locale)}
          </motion.span>
        </motion.li>
      ))}
    </ul>
  );
}
