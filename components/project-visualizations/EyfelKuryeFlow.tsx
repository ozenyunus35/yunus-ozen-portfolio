"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { MOTION_DURATION } from "@/lib/motion/constants";
import { AnimatedNode } from "@/components/motion/AnimatedNode";
import { SignalPath } from "@/components/motion/SignalPath";
import { cn } from "@/lib/utils/cn";

const PHASES = [
  { id: "order", nodes: ["order"], paths: [], label: "ORDER RECEIVED" },
  { id: "dispatch", nodes: ["order", "dispatch"], paths: [0], label: "DISPATCH" },
  {
    id: "courier",
    nodes: ["order", "dispatch", "courier"],
    paths: [0, 1],
    label: "COURIER ASSIGNED",
  },
  {
    id: "pickup",
    nodes: ["order", "courier", "pickup"],
    paths: [1, 2],
    label: "PICKUP",
  },
  {
    id: "delivery",
    nodes: ["pickup", "delivery"],
    paths: [3],
    label: "DELIVERED",
  },
];

const NODES = {
  order: { x: 60, y: 40, label: "ORDER" },
  dispatch: { x: 180, y: 40, label: "DISPATCH" },
  courier: { x: 300, y: 40, label: "COURIER" },
  pickup: { x: 180, y: 120, label: "PICKUP" },
  delivery: { x: 300, y: 120, label: "DELIVERY" },
} as const;

const MOBILE_NODES = {
  order: { x: 50, y: 30, label: "ORDER" },
  dispatch: { x: 50, y: 75, label: "DISPATCH" },
  courier: { x: 50, y: 120, label: "COURIER" },
  pickup: { x: 50, y: 165, label: "PICKUP" },
  delivery: { x: 50, y: 210, label: "DELIVERY" },
} as const;

const PATHS = [
  { from: "order", to: "dispatch" },
  { from: "dispatch", to: "courier" },
  { from: "courier", to: "pickup" },
  { from: "pickup", to: "delivery" },
] as const;

type EyfelKuryeFlowProps = {
  className?: string;
  compact?: boolean;
};

export function EyfelKuryeFlow({ className, compact = false }: EyfelKuryeFlowProps) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [phaseIndex, setPhaseIndex] = useState(0);

  const phase = PHASES[phaseIndex % PHASES.length];
  const nodes = isMobile ? MOBILE_NODES : NODES;

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => {
      setPhaseIndex((i) => (i + 1) % PHASES.length);
    }, 2400);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  const viewBox = isMobile ? "0 0 100 250" : "0 0 360 160";

  return (
    <div
      className={cn("relative w-full", className)}
      role="img"
      aria-label="Eyfel Kurye order and delivery system flow"
    >
      <svg viewBox={viewBox} className="mx-auto h-auto w-full max-w-sm">
        {PATHS.map((path, index) => {
          const from = nodes[path.from];
          const to = nodes[path.to];
          return (
            <SignalPath
              key={path.from}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              active={phase.paths.includes(index)}
              pulse={phase.id === "delivery" && index === 3}
              delay={index * 0.2}
            />
          );
        })}
        {Object.entries(nodes).map(([id, node]) => (
          <AnimatedNode
            key={id}
            x={node.x}
            y={node.y}
            label={compact ? undefined : node.label}
            active={phase.nodes.includes(id)}
            size={compact || isMobile ? "sm" : "md"}
          />
        ))}
      </svg>
      {!compact && phase.label && (
        <motion.p
          key={phase.label}
          className="text-mono mt-3 text-center text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: MOTION_DURATION.fast }}
        >
          {phase.label}
        </motion.p>
      )}
    </div>
  );
}
