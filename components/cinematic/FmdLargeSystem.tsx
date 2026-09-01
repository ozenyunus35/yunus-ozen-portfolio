"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/useMediaQuery";

const MODULES = [
  { id: "users", label: "USERS", x: 0.15, y: 0.25 },
  { id: "courses", label: "COURSES", x: 0.15, y: 0.75 },
  { id: "admin", label: "ADMIN", x: 0.85, y: 0.25 },
  { id: "reports", label: "REPORTS", x: 0.85, y: 0.75 },
];

type FmdLargeSystemProps = {
  className?: string;
};

export function FmdLargeSystem({ className }: FmdLargeSystemProps) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [signalIndex, setSignalIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => setSignalIndex((i) => (i + 1) % 4), 2800);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  const w = isMobile ? 360 : 800;
  const h = isMobile ? 360 : 320;
  const cx = w / 2;
  const cy = h / 2;
  const r = isMobile ? 50 : 70;

  return (
    <div className={className} role="img" aria-label="FMD education management system">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        <motion.circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          animate={reducedMotion ? {} : { opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <text
          x={cx}
          y={cy + 6}
          textAnchor="middle"
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: isMobile ? 18 : 24,
            fontWeight: 600,
            fill: "var(--foreground)",
          }}
        >
          CORE
        </text>

        {MODULES.map((mod, i) => {
          const x = w * mod.x;
          const y = h * mod.y;
          const isActive = signalIndex === i;
          return (
            <g key={mod.id}>
              <line
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke={isActive ? "var(--accent)" : "var(--line)"}
                strokeWidth={isActive ? 2 : 1}
              />
              <circle
                cx={x}
                cy={y}
                r={isMobile ? 32 : 40}
                fill="none"
                stroke={isActive ? "var(--accent)" : "var(--line-strong)"}
                strokeWidth="1.5"
              />
              <text
                x={x}
                y={y + 5}
                textAnchor="middle"
                style={{
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: isMobile ? 9 : 11,
                  fill: isActive ? "var(--accent)" : "var(--muted-foreground)",
                }}
              >
                {mod.label}
              </text>
            </g>
          );
        })}

        {!reducedMotion && (
          <motion.circle
            r={10}
            fill="var(--accent)"
            animate={{
              cx: [cx, w * MODULES[signalIndex].x],
              cy: [cy, h * MODULES[signalIndex].y],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        )}
      </svg>
    </div>
  );
}
