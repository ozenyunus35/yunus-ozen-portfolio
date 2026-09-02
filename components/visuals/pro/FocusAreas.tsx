"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";
import { getExploringStatusLabel } from "@/lib/i18n/status-labels";
import { cn } from "@/lib/utils/cn";

type FocusAreasProps = {
  areas: Dictionary["exploring"]["areas"];
  locale: Locale;
};

const LINE_S = 2.4;
const STAGGER_S = 0.55;

export function FocusAreas({ areas, locale }: FocusAreasProps) {
  const reducedMotion = useReducedMotion();

  return (
    <ul className="space-y-3">
      {areas.map((area, i) => (
        <motion.li
          key={area.label}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.4 }}
        >
          <div className="rounded-[var(--radius-md)] border border-[var(--accent-border)] px-4 py-4 sm:px-5">
            <div className="flex items-center justify-between gap-6">
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <span
                  className="relative hidden h-px w-12 shrink-0 overflow-hidden bg-[var(--line-strong)] sm:block"
                  aria-hidden="true"
                >
                  {!reducedMotion && (
                    <motion.span
                      className="absolute inset-y-0 left-0 w-1/2 bg-[var(--accent)]"
                      animate={{ x: ["-100%", "250%"] }}
                      transition={{
                        duration: LINE_S,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * STAGGER_S,
                      }}
                    />
                  )}
                </span>
                <span className="text-h2 text-foreground">{area.label}</span>
              </div>
              <span
                className={cn(
                  "tag shrink-0 border-[var(--line)] text-muted-foreground",
                  area.status === "Developing" &&
                    "border-[var(--accent-border)] text-[var(--accent-light)]",
                )}
              >
                {getExploringStatusLabel(area.status, locale)}
              </span>
            </div>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}
