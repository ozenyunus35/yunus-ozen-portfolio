"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils/cn";

const STOPS = ["ORDER", "DISPATCH", "COURIER", "ROUTE", "DELIVERY"];

export function EyfelRouteVisual({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => setActive((a) => (a + 1) % STOPS.length), 1600);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  const w = isMobile ? 340 : 820;
  const h = isMobile ? 260 : 220;
  const y = h * 0.55;

  return (
    <div className={cn(className)} role="img" aria-label="Eyfel Kurye dispatch route">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        <motion.line
          x1={w * 0.04}
          y1={y}
          x2={w * 0.96}
          y2={y}
          stroke="var(--continuum)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8 }}
        />
        {STOPS.map((label, i) => {
          const x = w * (0.08 + i * 0.2);
          return (
            <g key={label}>
              <circle
                cx={x}
                cy={y}
                r={isMobile ? 18 : 24}
                fill="none"
                stroke={i <= active ? "var(--continuum-bright)" : "var(--line-strong)"}
                strokeWidth={i === active ? 2 : 1}
              />
              <text
                x={x}
                y={y + (isMobile ? 40 : 44)}
                textAnchor="middle"
                style={{
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: isMobile ? 8 : 10,
                  fill: i === active ? "var(--continuum-bright)" : "var(--foreground-muted)",
                }}
              >
                {label}
              </text>
            </g>
          );
        })}
        {!reducedMotion && (
          <motion.circle
            r={isMobile ? 7 : 10}
            fill="var(--continuum-bright)"
            cy={y}
            animate={{ cx: STOPS.map((_, i) => w * (0.08 + i * 0.2)) }}
            transition={{ duration: STOPS.length * 1.6, repeat: Infinity, ease: "linear" }}
          />
        )}
      </svg>
    </div>
  );
}
