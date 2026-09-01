"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type MeridianVariant =
  | "hero-diagonal"
  | "hero-vertical"
  | "section-divider"
  | "flow-horizontal"
  | "flow-vertical"
  | "closing";

type MeridianBeamProps = {
  variant?: MeridianVariant;
  className?: string;
  animated?: boolean;
  progress?: number;
};

export function MeridianBeam({
  variant = "hero-diagonal",
  className,
  animated = false,
  progress = 1,
}: MeridianBeamProps) {
  const reduced = useReducedMotion();

  if (variant === "hero-diagonal") {
    return (
      <svg
        viewBox="0 0 800 900"
        fill="none"
        className={cn("h-full w-full", className)}
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <motion.line
          x1="680"
          y1="-20"
          x2="120"
          y2="920"
          stroke="var(--signal)"
          strokeWidth="var(--beam-width)"
          strokeLinecap="square"
          initial={animated && !reduced ? { pathLength: 0, opacity: 0 } : false}
          animate={animated && !reduced ? { pathLength: 1, opacity: 1 } : false}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{ pathLength: progress }}
        />
        <motion.line
          x1="680"
          y1="-20"
          x2="120"
          y2="920"
          stroke="var(--signal)"
          strokeWidth="48"
          strokeLinecap="square"
          opacity="0.06"
          initial={animated && !reduced ? { pathLength: 0 } : false}
          animate={animated && !reduced ? { pathLength: 1 } : false}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{ pathLength: progress }}
        />
        <circle cx="680" cy="-20" r="6" fill="var(--signal)" opacity="0.8" />
        <circle cx="120" cy="920" r="4" fill="var(--signal)" opacity="0.5" />
      </svg>
    );
  }

  if (variant === "hero-vertical") {
    return (
      <svg viewBox="0 0 120 800" fill="none" className={cn("h-full w-full", className)} aria-hidden="true">
        <line x1="60" y1="0" x2="60" y2="800" stroke="var(--signal)" strokeWidth="var(--beam-width)" />
        <line x1="60" y1="0" x2="60" y2={800 * progress} stroke="var(--signal-soft)" strokeWidth="2" opacity="0.4" />
      </svg>
    );
  }

  if (variant === "section-divider") {
    return (
      <div className={cn("relative w-full", className)} aria-hidden="true">
        <div className="h-[var(--beam-width)] w-full bg-[var(--signal)]" style={{ transform: `scaleX(${progress})`, transformOrigin: "left" }} />
      </div>
    );
  }

  if (variant === "flow-horizontal") {
    return (
      <svg viewBox="0 0 1200 80" fill="none" className={cn("w-full", className)} aria-hidden="true">
        <line x1="0" y1="40" x2="1200" y2="40" stroke="var(--line)" strokeWidth="1" />
        <motion.line
          x1="0"
          y1="40"
          x2={1200 * progress}
          y2="40"
          stroke="var(--signal)"
          strokeWidth="var(--beam-width)"
          strokeLinecap="square"
        />
      </svg>
    );
  }

  if (variant === "flow-vertical") {
    return (
      <svg viewBox="0 0 80 600" fill="none" className={cn("h-full", className)} aria-hidden="true">
        <line x1="40" y1="0" x2="40" y2="600" stroke="var(--line)" strokeWidth="1" />
        <line x1="40" y1="0" x2="40" y2={600 * progress} stroke="var(--signal)" strokeWidth="var(--beam-width)" strokeLinecap="square" />
      </svg>
    );
  }

  if (variant === "closing") {
    return (
      <svg viewBox="0 0 600 400" fill="none" className={cn("w-full", className)} aria-hidden="true">
        <motion.path
          d="M 0 200 Q 300 80 600 200"
          stroke="var(--signal)"
          strokeWidth="var(--beam-width)"
          fill="none"
          strokeLinecap="square"
          style={{ pathLength: progress }}
        />
        <motion.path
          d="M 0 200 Q 300 320 600 200"
          stroke="var(--signal)"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
          style={{ pathLength: progress }}
        />
      </svg>
    );
  }

  return null;
}
