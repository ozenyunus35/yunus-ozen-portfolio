"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { productJourneyContent } from "@/lib/data/journey";
import { MOTION_DURATION } from "@/lib/motion/constants";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils/cn";

const CYCLE_STEPS = [
  ...productJourneyContent.steps,
  {
    id: "measure",
    number: "08",
    title: "MEASURE",
    details: ["Metrics", "Outcomes", "Signals"],
  },
];

type ProductCycleLoopProps = {
  className?: string;
};

export function ProductCycleLoop({ className }: ProductCycleLoopProps) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % CYCLE_STEPS.length);
    }, 2200);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  const activeStep = CYCLE_STEPS[activeIndex];

  return (
    <div className={cn("relative", className)} aria-label="Product development cycle">
      <div
        className={cn(
          "grid gap-2",
          isMobile ? "grid-cols-2" : "grid-cols-4 lg:grid-cols-8",
        )}
      >
        {CYCLE_STEPS.map((step, index) => {
          const isActive = index === activeIndex;
          const isPast =
            index < activeIndex ||
            (activeIndex === 0 && index === CYCLE_STEPS.length - 1);

          return (
            <div
              key={step.id}
              className={cn(
                "border px-3 py-4 transition-colors duration-500",
                isActive
                  ? "border-accent/60 bg-surface-elevated"
                  : "border-border bg-surface",
              )}
            >
              <span
                className={cn(
                  "text-mono block transition-colors duration-500",
                  isActive ? "text-accent" : "text-muted-foreground",
                )}
              >
                {step.number}
              </span>
              <p
                className={cn(
                  "text-label mt-2 transition-colors duration-500",
                  isActive ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {step.title}
              </p>
              {!isMobile && isActive && (
                <motion.ul
                  className="mt-2 space-y-0.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: MOTION_DURATION.fast }}
                  role="list"
                >
                  {step.details.map((detail) => (
                    <li key={detail} className="text-mono text-muted-foreground">
                      {detail}
                    </li>
                  ))}
                </motion.ul>
              )}
              {!isMobile && !isActive && isPast && (
                <div
                  className="mt-3 h-px w-full bg-accent/30"
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>

      {!reducedMotion && (
        <motion.div
          className="absolute -bottom-1 left-0 h-px bg-accent"
          animate={{
            width: `${((activeIndex + 1) / CYCLE_STEPS.length) * 100}%`,
          }}
          transition={{ duration: MOTION_DURATION.base }}
          aria-hidden="true"
        />
      )}

      <p className="text-mono mt-6 text-center text-muted-foreground">
        {activeStep.title} — {activeStep.details.join(" · ")}
      </p>
    </div>
  );
}
