"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { MOTION_DURATION } from "@/lib/motion/constants";

type SchematicPulseProps = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay?: number;
  duration?: number;
  r?: number;
  color?: string;
};

export function SchematicPulse({
  x1,
  y1,
  x2,
  y2,
  delay = 0,
  duration = MOTION_DURATION.diagram * 0.65,
  r = 8,
  color = "var(--accent)",
}: SchematicPulseProps) {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return null;

  const travel = {
    cx: [x1, x2],
    cy: [y1, y2],
    opacity: [0, 1, 1, 0],
  };

  return (
    <g filter="url(#schematic-glow)">
      <motion.circle
        r={r * 1.8}
        fill={color}
        initial={{ opacity: 0 }}
        animate={travel}
        transition={{ duration, repeat: Infinity, ease: "linear", delay }}
        style={{ opacity: 0.25 }}
      />
      <motion.circle
        r={r}
        fill={color}
        initial={{ opacity: 0 }}
        animate={travel}
        transition={{ duration, repeat: Infinity, ease: "linear", delay }}
      />
      <motion.circle
        r={r * 0.45}
        fill="#ffffff"
        initial={{ opacity: 0 }}
        animate={travel}
        transition={{ duration, repeat: Infinity, ease: "linear", delay }}
      />
    </g>
  );
}

export function SchematicGlowDefs() {
  return (
    <defs>
      <filter id="schematic-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

type SchematicPathTravelProps = {
  path: string;
  delay?: number;
  duration?: number;
  children: ReactNode;
};

/** Animates a glyph (truck, courier, etc.) along an SVG path */
export function SchematicPathTravel({
  path,
  delay = 0,
  duration = 3,
  children,
}: SchematicPathTravelProps) {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return null;

  return (
    <motion.g
      filter="url(#schematic-glow)"
      style={{ offsetPath: `path('${path}')`, offsetRotate: "auto" }}
      initial={{ offsetDistance: "0%", opacity: 0 }}
      animate={{
        offsetDistance: ["0%", "100%"],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay,
        times: [0, 0.08, 0.92, 1],
      }}
    >
      {children}
    </motion.g>
  );
}
