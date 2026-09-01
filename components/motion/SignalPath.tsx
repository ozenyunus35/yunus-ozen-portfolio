"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MOTION_DURATION } from "@/lib/motion/constants";

type SignalPathProps = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  active?: boolean;
  pulse?: boolean;
  delay?: number;
};

export function SignalPath({
  x1,
  y1,
  x2,
  y2,
  active = false,
  pulse = false,
  delay = 0,
}: SignalPathProps) {
  const reducedMotion = useReducedMotion();

  return (
    <g>
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={active ? "var(--accent)" : "var(--border)"}
        strokeWidth="1"
        strokeOpacity={active ? 0.5 : 0.25}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reducedMotion ? 0 : MOTION_DURATION.base }}
      />
      {pulse && !reducedMotion && (
        <motion.circle
          r="2"
          fill="var(--accent)"
          initial={{ opacity: 0 }}
          animate={{
            cx: [x1, x2],
            cy: [y1, y2],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: MOTION_DURATION.diagram * 0.8,
            repeat: Infinity,
            ease: "linear",
            delay,
          }}
        />
      )}
    </g>
  );
}
