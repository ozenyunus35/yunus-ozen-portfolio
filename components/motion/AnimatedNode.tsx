"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MOTION_DURATION } from "@/lib/motion/constants";

type AnimatedNodeProps = {
  x: number;
  y: number;
  label?: string;
  active?: boolean;
  size?: "sm" | "md";
  className?: string;
};

export function AnimatedNode({
  x,
  y,
  label,
  active = false,
  size = "md",
  className,
}: AnimatedNodeProps) {
  const reducedMotion = useReducedMotion();
  const r = size === "sm" ? 3 : 4;

  return (
    <g className={className}>
      <motion.circle
        cx={x}
        cy={y}
        r={r}
        fill={active ? "var(--accent)" : "var(--background)"}
        stroke={active ? "var(--accent)" : "var(--border)"}
        strokeWidth="1"
        animate={
          reducedMotion
            ? undefined
            : active
              ? { opacity: [0.7, 1, 0.7] }
              : { opacity: 0.5 }
        }
        transition={{ duration: MOTION_DURATION.diagram, repeat: Infinity }}
      />
      {label && (
        <text
          x={x}
          y={y - (size === "sm" ? 10 : 12)}
          textAnchor="middle"
          className="fill-foreground"
          style={{
            fontFamily: "var(--font-ibm-plex-mono)",
            fontSize: size === "sm" ? 7 : 8,
            letterSpacing: "0.06em",
          }}
        >
          {label}
        </text>
      )}
    </g>
  );
}
