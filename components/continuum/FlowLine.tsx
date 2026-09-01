"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type FlowLineProps = {
  variant?: "hero" | "section" | "horizontal" | "vertical" | "arc" | "route";
  className?: string;
  animate?: boolean;
  progress?: number;
  strokeWidth?: number;
};

const PATHS: Record<NonNullable<FlowLineProps["variant"]>, string> = {
  hero: "M -40 420 Q 200 180 480 320 T 920 280",
  section: "M 0 50 Q 250 10 500 50 T 1000 50",
  horizontal: "M 0 0 L 1000 0",
  vertical: "M 0 0 L 0 1000",
  arc: "M 80 400 Q 450 120 820 380",
  route: "M 40 300 Q 300 100 550 280 T 960 200",
};

export function FlowLine({
  variant = "section",
  className,
  animate = true,
  progress = 1,
  strokeWidth = 1.5,
}: FlowLineProps) {
  const reducedMotion = useReducedMotion();

  return (
    <svg
      className={cn("pointer-events-none", className)}
      viewBox="0 0 1000 500"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        d={PATHS[variant]}
        fill="none"
        stroke="var(--continuum)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.4 }}
        animate={{
          pathLength: animate && !reducedMotion ? progress : 1,
          opacity: 0.5,
        }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      />
      {animate && !reducedMotion && (
        <motion.circle
          r={6}
          fill="var(--continuum-bright)"
          style={{ offsetPath: `path('${PATHS[variant]}')` }}
          animate={{
            offsetDistance: ["0%", "100%"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      )}
    </svg>
  );
}

type FlowPulseProps = {
  path: string;
  duration?: number;
  className?: string;
};

export function FlowPulse({ path, duration = 4, className }: FlowPulseProps) {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return null;

  return (
    <motion.circle
      className={className}
      r={8}
      fill="var(--continuum-bright)"
      style={{ offsetPath: `path('${path}')` }}
      animate={{
        offsetDistance: ["0%", "100%"],
        opacity: [0, 0.9, 0.9, 0],
      }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    />
  );
}
