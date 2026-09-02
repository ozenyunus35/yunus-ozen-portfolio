"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";
import { getExploringStatusLabel } from "@/lib/i18n/status-labels";
import { MOTION_DURATION } from "@/lib/motion/constants";
import { cn } from "@/lib/utils/cn";

type FocusAreasProps = {
  areas: Dictionary["exploring"]["areas"];
  locale: Locale;
};

export function FocusAreas({ areas, locale }: FocusAreasProps) {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <ul className="divide-y divide-[var(--line)]" role="list">
      {areas.map((area, i) => {
        const selected = active === i;
        return (
          <motion.li
            key={area.label}
            className={cn(
              "-mx-3 rounded-[var(--radius-md)] px-3 transition-colors duration-300",
              selected && "bg-[var(--accent-subtle)]",
            )}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            onMouseEnter={() => setActive(i)}
          >
            <div className="flex items-center justify-between gap-6 py-5">
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <span className="relative hidden h-px w-12 shrink-0 overflow-hidden bg-[var(--line-strong)] sm:block" aria-hidden="true">
                  {!reducedMotion && (
                    <motion.span
                      className="absolute inset-y-0 left-0 w-1/2 bg-[var(--accent)]"
                      animate={{ x: selected ? ["-100%", "250%"] : "-100%" }}
                      transition={{
                        duration: MOTION_DURATION.diagram * 0.7,
                        repeat: selected ? Infinity : 0,
                        ease: "linear",
                        delay: i * 0.35,
                      }}
                    />
                  )}
                </span>
                <span className={cn("text-h2 transition-colors", selected && "text-[var(--accent-light)]")}>
                  {area.label}
                </span>
              </div>
              <motion.span
                className={cn("tag shrink-0", selected && "border-[var(--accent)] text-[var(--accent-light)]")}
                animate={
                  reducedMotion
                    ? undefined
                    : { opacity: area.status === "Developing" ? [0.65, 1, 0.65] : [0.75, 1, 0.75] }
                }
                transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.2 }}
              >
                {getExploringStatusLabel(area.status, locale)}
              </motion.span>
            </div>
          </motion.li>
        );
      })}
    </ul>
  );
}
