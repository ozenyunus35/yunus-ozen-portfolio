"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { LOOP_DURATION_S } from "@/lib/motion/choreography";

type ConceptCycle = {
  id: string;
  nodes: { id: string; label: string; x: number; y: number }[];
  edges: [string, string][];
  status: string;
};

const CYCLES: ConceptCycle[] = [
  {
    id: "product-flow",
    status: "PRODUCT FLOW",
    nodes: [
      { id: "problem", label: "PROBLEM", x: 60, y: 40 },
      { id: "user", label: "USER", x: 160, y: 40 },
      { id: "flow", label: "FLOW", x: 260, y: 40 },
      { id: "system", label: "SYSTEM", x: 360, y: 40 },
      { id: "product", label: "PRODUCT", x: 460, y: 40 },
    ],
    edges: [
      ["problem", "user"],
      ["user", "flow"],
      ["flow", "system"],
      ["system", "product"],
    ],
  },
  {
    id: "delivery",
    status: "DELIVERY CHAIN",
    nodes: [
      { id: "research", label: "RESEARCH", x: 80, y: 60 },
      { id: "req", label: "REQUIREMENTS", x: 200, y: 60 },
      { id: "design", label: "DESIGN", x: 320, y: 60 },
      { id: "delivery", label: "DELIVERY", x: 440, y: 60 },
    ],
    edges: [
      ["research", "req"],
      ["req", "design"],
      ["design", "delivery"],
    ],
  },
  {
    id: "bridge",
    status: "DISCIPLINE BRIDGE",
    nodes: [
      { id: "ux", label: "UX", x: 120, y: 50 },
      { id: "product", label: "PRODUCT", x: 260, y: 30 },
      { id: "eng", label: "ENGINEERING", x: 400, y: 50 },
    ],
    edges: [
      ["ux", "product"],
      ["product", "eng"],
      ["eng", "ux"],
    ],
  },
];

function getNode(cycle: ConceptCycle, id: string) {
  return cycle.nodes.find((n) => n.id === id)!;
}

export function HeroSystemMap() {
  const reducedMotion = useReducedMotion();
  const [cycleIndex, setCycleIndex] = useState(0);
  const [activeEdge, setActiveEdge] = useState(0);
  const cycle = CYCLES[cycleIndex];

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => {
      setActiveEdge((e) => {
        if (e + 1 >= cycle.edges.length) {
          setCycleIndex((c) => (c + 1) % CYCLES.length);
          return 0;
        }
        return e + 1;
      });
    }, LOOP_DURATION_S * 250);
    return () => window.clearInterval(interval);
  }, [reducedMotion, cycle.edges.length]);

  return (
    <div
      className="relative h-full min-h-[280px] w-full md:min-h-[420px]"
      role="img"
      aria-label="Animated product and system concept map"
    >
      <svg
        viewBox="0 0 520 120"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <AnimatePresence mode="wait">
          <motion.g
            key={cycle.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {cycle.edges.map(([from, to], i) => {
              const a = getNode(cycle, from);
              const b = getNode(cycle, to);
              const active = i <= activeEdge;
              return (
                <g key={`${from}-${to}`}>
                  <motion.line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="var(--line-strong)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    animate={{
                      opacity: active ? 0.5 : 0.12,
                      strokeDashoffset: reducedMotion ? 0 : [0, -8],
                    }}
                    transition={{
                      opacity: { duration: 0.4 },
                      strokeDashoffset: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      },
                    }}
                  />
                  {active && !reducedMotion && i === activeEdge && (
                    <motion.circle
                      r="3"
                      fill="var(--accent)"
                      animate={{
                        cx: [a.x, b.x],
                        cy: [a.y, b.y],
                        opacity: [0, 1, 0],
                      }}
                      transition={{ duration: 1.2, ease: "linear" }}
                    />
                  )}
                </g>
              );
            })}

            {cycle.nodes.map((node) => {
              const active = cycle.edges.some(
                ([f, t], ei) =>
                  ei <= activeEdge && (f === node.id || t === node.id),
              );
              return (
                <g key={node.id}>
                  <motion.rect
                    x={node.x - 36}
                    y={node.y - 10}
                    width="72"
                    height="20"
                    fill="none"
                    stroke={active ? "var(--accent)" : "var(--line)"}
                    strokeWidth="1"
                    animate={{ opacity: active ? 1 : 0.35 }}
                  />
                  <text
                    x={node.x}
                    y={node.y + 4}
                    textAnchor="middle"
                    className="fill-foreground"
                    style={{
                      fontFamily: "var(--font-ibm-plex-mono)",
                      fontSize: 8,
                      letterSpacing: "0.1em",
                      opacity: active ? 1 : 0.4,
                    }}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </motion.g>
        </AnimatePresence>
      </svg>

      <AnimatePresence mode="wait">
        <motion.p
          key={cycle.status}
          className="text-mono absolute bottom-0 left-0 text-accent/70"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {cycle.status}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
