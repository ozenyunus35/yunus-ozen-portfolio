"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { MOTION_DURATION } from "@/lib/motion/constants";
import { AnimatedNode } from "@/components/motion/AnimatedNode";
import { SignalPath } from "@/components/motion/SignalPath";
import { cn } from "@/lib/utils/cn";

const PHASES = [
  { nodes: ["admin"], paths: [], label: "ADMIN" },
  { nodes: ["admin", "content"], paths: [0], label: "CONTENT" },
  { nodes: ["content", "modules"], paths: [0, 1], label: "MODULES" },
  { nodes: ["users", "courses"], paths: [2], label: "COURSES" },
  { nodes: ["courses", "dashboard"], paths: [3], label: "DASHBOARD" },
];

const NODES = {
  admin: { x: 80, y: 50, label: "ADMIN" },
  content: { x: 200, y: 30, label: "CONTENT" },
  modules: { x: 320, y: 50, label: "MODULES" },
  users: { x: 80, y: 120, label: "USERS" },
  courses: { x: 200, y: 120, label: "COURSES" },
  dashboard: { x: 320, y: 120, label: "DASHBOARD" },
} as const;

const MOBILE_NODES = {
  admin: { x: 50, y: 30, label: "ADMIN" },
  content: { x: 50, y: 75, label: "CONTENT" },
  modules: { x: 50, y: 120, label: "MODULES" },
  users: { x: 50, y: 165, label: "USERS" },
  courses: { x: 50, y: 210, label: "COURSES" },
  dashboard: { x: 50, y: 255, label: "DASHBOARD" },
} as const;

const PATHS = [
  { from: "admin", to: "content" },
  { from: "content", to: "modules" },
  { from: "users", to: "courses" },
  { from: "courses", to: "dashboard" },
  { from: "admin", to: "users" },
] as const;

type FmdSystemProps = {
  className?: string;
  compact?: boolean;
};

export function FmdSystem({ className, compact = false }: FmdSystemProps) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [phaseIndex, setPhaseIndex] = useState(0);

  const phase = PHASES[phaseIndex % PHASES.length];
  const nodes = isMobile ? MOBILE_NODES : NODES;

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => {
      setPhaseIndex((i) => (i + 1) % PHASES.length);
    }, 2600);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  const viewBox = isMobile ? "0 0 100 290" : "0 0 400 160";
  const visiblePaths = isMobile
    ? PATHS.filter((p) => p.from !== "admin" || p.to !== "users")
    : PATHS;

  return (
    <div
      className={cn("relative w-full", className)}
      role="img"
      aria-label="FMD education management system architecture"
    >
      <svg viewBox={viewBox} className="mx-auto h-auto w-full max-w-md">
        {visiblePaths.map((path, index) => {
          const from = nodes[path.from];
          const to = nodes[path.to];
          return (
            <SignalPath
              key={`${path.from}-${path.to}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              active={phase.paths.includes(index)}
              pulse={phase.paths.includes(index)}
              delay={index * 0.25}
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
      {!compact && (
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
