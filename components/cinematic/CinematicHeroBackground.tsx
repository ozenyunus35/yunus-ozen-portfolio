"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const ANCHORS = [
  { id: "a", x: 72, y: 28, r: 28 },
  { id: "b", x: 88, y: 55, r: 22 },
  { id: "c", x: 58, y: 68, r: 32 },
  { id: "d", x: 35, y: 42, r: 20 },
  { id: "e", x: 48, y: 18, r: 18 },
];

const PATHS = [
  "M 120 180 Q 280 80 420 200 T 780 320",
  "M 60 400 Q 300 280 520 360 T 920 240",
  "M 200 500 Q 450 350 650 420 T 1000 180",
  "M 100 300 L 900 300",
];

export function CinematicHeroBackground() {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion) return;
    function onMove(e: MouseEvent) {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      setOffset({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 24,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 16,
      });
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Layer 1: large subtle grid */}
      <motion.div
        className="absolute inset-[-10%] opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "120px 120px",
        }}
        animate={reducedMotion ? undefined : { x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
      />

      {/* Layer 2–4: architectural geometry */}
      <motion.svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
        style={{
          transform: reducedMotion
            ? undefined
            : `translate(${offset.x * 0.5}px, ${offset.y * 0.5}px)`,
        }}
      >
        <defs>
          <linearGradient id="hero-path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {PATHS.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke={i === 3 ? "url(#hero-path-gradient)" : "var(--line-strong)"}
            strokeWidth={i === 3 ? 1.5 : 1}
            strokeOpacity={i === 3 ? 1 : 0.35}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: reducedMotion ? 0 : 2.4 + i * 0.4,
              delay: i * 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}

        {ANCHORS.map((node, i) => (
          <g key={node.id}>
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.r}
              fill="none"
              stroke="var(--line-strong)"
              strokeWidth="1"
              animate={
                reducedMotion
                  ? { opacity: 0.25 }
                  : { opacity: [0.15, 0.4, 0.15], scale: [1, 1.02, 1] }
              }
              transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
            />
            <circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={4}
              fill="var(--accent)"
              opacity={0.5}
            />
          </g>
        ))}

        {!reducedMotion && (
          <motion.circle
            r="6"
            fill="var(--accent)"
            animate={{
              offsetDistance: ["0%", "100%"],
              opacity: [0, 0.9, 0.9, 0],
            }}
            style={{
              offsetPath: `path('${PATHS[3]}')`,
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
        )}
      </motion.svg>

      {/* Layer 5: vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
    </div>
  );
}
