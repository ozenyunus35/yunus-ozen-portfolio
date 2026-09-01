"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MOTION_DURATION } from "@/lib/motion/constants";
import { AnimatedNode } from "@/components/motion/AnimatedNode";
import { SignalPath } from "@/components/motion/SignalPath";
import { cn } from "@/lib/utils/cn";

const PHASES = [
  { nodes: ["visitor"], paths: [], label: "VISITOR" },
  { nodes: ["visitor", "website"], paths: [0], label: "WEBSITE" },
  { nodes: ["website", "menu"], paths: [0, 1], label: "MENU" },
  { nodes: ["menu", "qr"], paths: [1, 2], label: "QR" },
  { nodes: ["qr", "mobile"], paths: [2, 3], label: "MOBILE" },
];

const NODES = {
  visitor: { x: 50, y: 40, label: "VISITOR" },
  website: { x: 130, y: 40, label: "WEBSITE" },
  menu: { x: 210, y: 40, label: "MENU" },
  qr: { x: 210, y: 100, label: "QR" },
  mobile: { x: 290, y: 100, label: "MOBILE" },
} as const;

const PATHS = [
  { from: "visitor", to: "website" },
  { from: "website", to: "menu" },
  { from: "menu", to: "qr" },
  { from: "qr", to: "mobile" },
] as const;

type TavukDaTavukFlowProps = {
  className?: string;
  compact?: boolean;
};

export function TavukDaTavukFlow({
  className,
  compact = false,
}: TavukDaTavukFlowProps) {
  const reducedMotion = useReducedMotion();
  const [phaseIndex, setPhaseIndex] = useState(0);
  const phase = PHASES[phaseIndex % PHASES.length];

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => {
      setPhaseIndex((i) => (i + 1) % PHASES.length);
    }, 2200);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  return (
    <div
      className={cn("relative w-full", className)}
      role="img"
      aria-label="Tavuk da Tavuk visitor to mobile experience flow"
    >
      <svg viewBox="0 0 340 130" className="mx-auto h-auto w-full max-w-sm">
        {PATHS.map((path, index) => {
          const from = NODES[path.from];
          const to = NODES[path.to];
          return (
            <SignalPath
              key={path.from}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              active={phase.paths.includes(index)}
              pulse={phase.label === "MOBILE" && index === 3}
              delay={index * 0.2}
            />
          );
        })}
        {Object.entries(NODES).map(([id, node]) => (
          <AnimatedNode
            key={id}
            x={node.x}
            y={node.y}
            label={compact ? undefined : node.label}
            active={phase.nodes.includes(id)}
            size="sm"
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
