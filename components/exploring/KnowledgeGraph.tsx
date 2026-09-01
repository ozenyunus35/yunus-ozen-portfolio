"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { exploringContent } from "@/lib/data/exploring";
import { MOTION_DURATION } from "@/lib/motion/constants";
import { cn } from "@/lib/utils/cn";

const CONNECTIONS: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [0, 3],
  [3, 4],
];

type KnowledgeGraphProps = {
  className?: string;
};

export function KnowledgeGraph({ className }: KnowledgeGraphProps) {
  const reducedMotion = useReducedMotion();
  const [pulseIndex, setPulseIndex] = useState(0);
  const areas = exploringContent.areas;

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => {
      setPulseIndex((i) => (i + 1) % CONNECTIONS.length);
    }, 2800);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  return (
    <div className={cn("relative", className)}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {areas.map((area, index) => {
          const isLearning = area.status === "Learning";
          const isConnected = CONNECTIONS[pulseIndex].includes(index);

          return (
            <motion.div
              key={area.label}
              className={cn(
                "relative border bg-surface px-5 py-4 transition-colors duration-500",
                isConnected
                  ? "border-accent/40 bg-surface-elevated"
                  : "border-border",
              )}
              animate={
                !reducedMotion && isConnected ? { scale: [1, 1.01, 1] } : {}
              }
              transition={{
                duration: MOTION_DURATION.diagram,
                repeat: isConnected ? Infinity : 0,
              }}
            >
              <p className="text-label text-foreground">{area.label}</p>
              <p
                className={cn(
                  "text-mono mt-2",
                  isLearning ? "text-muted-foreground" : "text-accent",
                )}
              >
                {area.status}
              </p>
              {!isLearning && (
                <span
                  className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-accent/60"
                  aria-hidden="true"
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
