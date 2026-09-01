"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SchematicGlowDefs } from "@/components/motion/SchematicPulse";

const NODES = [
  { x: 8, y: 22, r: 3 },
  { x: 22, y: 48, r: 4 },
  { x: 38, y: 18, r: 3 },
  { x: 52, y: 62, r: 5 },
  { x: 68, y: 28, r: 3 },
  { x: 82, y: 72, r: 4 },
  { x: 92, y: 38, r: 3 },
  { x: 15, y: 78, r: 3 },
  { x: 45, y: 88, r: 4 },
  { x: 75, y: 12, r: 3 },
] as const;

const CONNECTIONS = [
  [0, 2], [1, 3], [2, 4], [3, 5], [4, 6],
  [0, 7], [1, 8], [3, 8], [5, 9], [6, 9], [2, 7], [4, 5],
] as const;

const ORBITS = [
  "M 80 120 Q 320 40 560 180 T 920 280",
  "M 40 380 Q 280 260 520 340 T 960 220",
  "M 160 480 Q 420 320 680 400 T 1040 160",
];

export function ImmersiveHeroField() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    function handleMove(event: MouseEvent) {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      setParallax({ x: nx * 28, y: ny * 20 });
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 45%, color-mix(in srgb, var(--accent) 14%, transparent) 0%, transparent 70%)",
        }}
      />

      {/* Animated grid */}
      <motion.div
        className="hero-grid absolute inset-[-60px] opacity-60"
        style={{
          transform: reducedMotion
            ? undefined
            : `translate(${parallax.x * 0.25}px, ${parallax.y * 0.25}px)`,
        }}
        animate={reducedMotion ? undefined : { opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orbital paths */}
      <motion.svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1100 600"
        preserveAspectRatio="xMidYMid slice"
        style={{
          transform: reducedMotion
            ? undefined
            : `translate(${parallax.x * 0.6}px, ${parallax.y * 0.45}px)`,
        }}
      >
        <defs>
          <SchematicGlowDefs />
          <linearGradient id="orbit-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {ORBITS.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke={i === 0 ? "url(#orbit-gradient)" : "var(--line-strong)"}
            strokeWidth={i === 0 ? 1.5 : 1}
            strokeOpacity={i === 0 ? 1 : 0.25}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: reducedMotion ? 0 : 2.8 + i * 0.5,
              delay: i * 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}

        {CONNECTIONS.map(([from, to], index) => {
          const a = NODES[from];
          const b = NODES[to];
          return (
            <motion.line
              key={`${from}-${to}`}
              x1={`${a.x}%`}
              y1={`${a.y}%`}
              x2={`${b.x}%`}
              y2={`${b.y}%`}
              stroke="var(--accent)"
              strokeWidth="1"
              initial={{ opacity: 0.1 }}
              animate={
                reducedMotion
                  ? { opacity: 0.2 }
                  : { opacity: [0.08, 0.35, 0.08] }
              }
              transition={{
                duration: 4 + index * 0.3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          );
        })}

        {NODES.map((node, index) => (
          <g key={index}>
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.r * 4}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1"
              strokeOpacity="0.2"
              animate={
                reducedMotion
                  ? { opacity: 0.2 }
                  : { opacity: [0.1, 0.35, 0.1], scale: [1, 1.15, 1] }
              }
              transition={{
                duration: 5 + index * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.r}
              fill="var(--accent)"
              filter="url(#schematic-glow)"
              animate={
                reducedMotion
                  ? { opacity: 0.5 }
                  : { opacity: [0.35, 0.9, 0.35] }
              }
              transition={{
                duration: 3 + index * 0.25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </g>
        ))}

        {!reducedMotion &&
          CONNECTIONS.slice(0, 6).map(([from, to], index) => {
            const a = NODES[from];
            const b = NODES[to];
            return (
              <motion.circle
                key={`pulse-${from}-${to}`}
                r="4"
                fill="var(--accent)"
                filter="url(#schematic-glow)"
                animate={{
                  cx: [`${a.x}%`, `${b.x}%`],
                  cy: [`${a.y}%`, `${b.y}%`],
                  opacity: [0, 0.95, 0],
                }}
                transition={{
                  duration: 2.5 + index * 0.35,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.6,
                }}
              />
            );
          })}
      </motion.svg>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-transparent to-[var(--background)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)]/80 via-transparent to-[var(--background)]/60" />
    </div>
  );
}
