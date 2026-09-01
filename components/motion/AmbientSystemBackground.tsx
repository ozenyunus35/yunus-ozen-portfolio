"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SchematicGlowDefs } from "@/components/motion/SchematicPulse";
import { MOTION_DURATION } from "@/lib/motion/constants";
import { cn } from "@/lib/utils/cn";

type AmbientSystemBackgroundProps = {
  className?: string;
  intensity?: number;
  showCoordinates?: boolean;
};

const NODES = [
  { x: 12, y: 18 },
  { x: 28, y: 42 },
  { x: 45, y: 22 },
  { x: 62, y: 55 },
  { x: 78, y: 30 },
  { x: 88, y: 68 },
  { x: 35, y: 72 },
  { x: 55, y: 85 },
] as const;

const CONNECTIONS = [
  [0, 2],
  [1, 3],
  [2, 4],
  [3, 5],
  [1, 6],
  [4, 5],
  [6, 7],
  [0, 6],
  [2, 7],
] as const;

export function AmbientSystemBackground({
  className,
  intensity = 1,
  showCoordinates = false,
}: AmbientSystemBackgroundProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    function handleMove(event: MouseEvent) {
      const rect = container!.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      setParallax({ x: nx * 12, y: ny * 10 });
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [reducedMotion]);

  const opacity = 0.55 * intensity;

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <div
        className={cn("hero-grid absolute inset-[-40px]", !reducedMotion && "hero-grid-animate")}
        style={{
          opacity: opacity * 0.8,
          transform: reducedMotion ? undefined : `translate(${parallax.x * 0.3}px, ${parallax.y * 0.3}px)`,
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        style={{
          transform: reducedMotion ? undefined : `translate(${parallax.x * 0.5}px, ${parallax.y * 0.5}px)`,
        }}
      >
        <SchematicGlowDefs />

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
              strokeWidth="2"
              initial={{ opacity: 0.15 }}
              animate={
                reducedMotion
                  ? { opacity: 0.25 }
                  : { opacity: [0.12, 0.45, 0.12] }
              }
              transition={{
                duration: MOTION_DURATION.ambient * 0.5 + index,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          );
        })}

        {NODES.map((node, index) => (
          <motion.circle
            key={index}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r="5"
            fill="var(--accent)"
            filter="url(#schematic-glow)"
            initial={{ opacity: 0.25 }}
            animate={
              reducedMotion
                ? { opacity: 0.35 }
                : { opacity: [0.2, 0.75, 0.2], scale: [1, 1.35, 1] }
            }
            transition={{
              duration: MOTION_DURATION.ambient * 0.4 + index * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {!reducedMotion &&
          CONNECTIONS.map(([from, to], index) => {
            const a = NODES[from];
            const b = NODES[to];
            return (
              <motion.circle
                key={`pulse-${from}-${to}`}
                r="7"
                fill="var(--accent)"
                filter="url(#schematic-glow)"
                initial={{ opacity: 0 }}
                animate={{
                  cx: [`${a.x}%`, `${b.x}%`],
                  cy: [`${a.y}%`, `${b.y}%`],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + index * 0.2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.5,
                }}
              />
            );
          })}
      </svg>

      {showCoordinates && (
        <motion.span
          className="text-mono absolute right-[8%] top-[12%] text-[var(--accent-light)]"
          style={{ fontSize: "0.65rem", opacity: 0.45 * intensity }}
          animate={reducedMotion ? undefined : { opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: MOTION_DURATION.ambient, repeat: Infinity }}
        >
          38.4237° N · 27.1428° E
        </motion.span>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/85" />
    </div>
  );
}
