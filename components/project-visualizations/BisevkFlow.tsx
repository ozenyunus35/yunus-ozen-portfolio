"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { MOTION_DURATION } from "@/lib/motion/constants";
import { AnimatedNode } from "@/components/motion/AnimatedNode";
import { SignalPath } from "@/components/motion/SignalPath";
import { cn } from "@/lib/utils/cn";

type Phase = {
  id: string;
  label: string;
  activeNodes: string[];
  activePaths: number[];
  statusLabel?: string;
};

const DESKTOP_PHASES: Phase[] = [
  {
    id: "shipper",
    label: "shipper",
    activeNodes: ["shipper"],
    activePaths: [],
    statusLabel: "LOAD CREATED",
  },
  {
    id: "load",
    label: "load",
    activeNodes: ["shipper", "load"],
    activePaths: [0],
    statusLabel: "PUBLISHED",
  },
  {
    id: "offers",
    label: "offers",
    activeNodes: ["shipper", "load", "c1", "c2", "c3"],
    activePaths: [0, 1, 2, 3],
    statusLabel: "3 OFFERS",
  },
  {
    id: "accepted",
    label: "accepted",
    activeNodes: ["shipper", "load", "c2"],
    activePaths: [0, 2],
    statusLabel: "OFFER ACCEPTED",
  },
  {
    id: "transit",
    label: "transit",
    activeNodes: ["shipper", "c2", "dest"],
    activePaths: [4, 5],
    statusLabel: "IN TRANSIT",
  },
  {
    id: "delivered",
    label: "delivered",
    activeNodes: ["dest"],
    activePaths: [5],
    statusLabel: "DELIVERED",
  },
];

const NODES = {
  shipper: { x: 80, y: 40, label: "SHIPPER" },
  load: { x: 200, y: 40, label: "LOAD" },
  c1: { x: 140, y: 110, label: "CARRIER" },
  c2: { x: 200, y: 130, label: "CARRIER" },
  c3: { x: 260, y: 110, label: "CARRIER" },
  dest: { x: 320, y: 40, label: "DELIVERY" },
} as const;

const PATHS = [
  { from: "shipper", to: "load" },
  { from: "load", to: "c1" },
  { from: "load", to: "c2" },
  { from: "load", to: "c3" },
  { from: "c2", to: "dest" },
  { from: "load", to: "dest" },
] as const;

const MOBILE_NODES = {
  shipper: { x: 60, y: 30, label: "SHIPPER" },
  load: { x: 60, y: 80, label: "LOAD" },
  c2: { x: 60, y: 130, label: "CARRIER" },
  dest: { x: 60, y: 180, label: "DELIVERY" },
} as const;

type BisevkFlowProps = {
  className?: string;
  compact?: boolean;
};

export function BisevkFlow({ className, compact = false }: BisevkFlowProps) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [phaseIndex, setPhaseIndex] = useState(0);

  const phases = isMobile
    ? DESKTOP_PHASES.filter((p) =>
        ["shipper", "load", "accepted", "transit", "delivered"].includes(p.id),
      )
    : DESKTOP_PHASES;

  const phase = phases[phaseIndex % phases.length];
  const nodes = isMobile ? MOBILE_NODES : NODES;

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => {
      setPhaseIndex((i) => (i + 1) % phases.length);
    }, compact ? 2200 : 2800);
    return () => window.clearInterval(interval);
  }, [reducedMotion, phases.length, compact]);

  const viewBox = isMobile ? "0 0 120 220" : "0 0 400 180";
  const nodeEntries = Object.entries(nodes);

  return (
    <div
      className={cn("relative w-full", className)}
      role="img"
      aria-label="Bi-Sevk freight marketplace system flow"
    >
      <svg
        viewBox={viewBox}
        className="mx-auto h-auto w-full max-w-md"
        preserveAspectRatio="xMidYMid meet"
      >
        {(isMobile
          ? [
              { from: "shipper", to: "load" },
              { from: "load", to: "c2" },
              { from: "c2", to: "dest" },
            ]
          : PATHS
        ).map((path, index) => {
          const from = nodes[path.from as keyof typeof nodes];
          const to = nodes[path.to as keyof typeof nodes];
          if (!from || !to) return null;
          const active = phase.activePaths.includes(index);
          return (
            <SignalPath
              key={`${path.from}-${path.to}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              active={active}
              pulse={active && phase.id === "transit"}
              delay={index * 0.3}
            />
          );
        })}

        {nodeEntries.map(([id, node]) => (
          <AnimatedNode
            key={id}
            x={node.x}
            y={node.y}
            label={compact ? undefined : node.label}
            active={phase.activeNodes.includes(id)}
            size={compact || isMobile ? "sm" : "md"}
          />
        ))}
      </svg>

      {phase.statusLabel && (
        <motion.p
          key={phase.statusLabel}
          className="text-mono mt-3 text-center text-muted-foreground"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: MOTION_DURATION.fast }}
        >
          {phase.statusLabel}
        </motion.p>
      )}
    </div>
  );
}
