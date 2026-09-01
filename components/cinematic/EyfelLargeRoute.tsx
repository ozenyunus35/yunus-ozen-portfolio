"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/useMediaQuery";

const STOPS = [
  { label: "ORDER", x: 0.08 },
  { label: "DISPATCH", x: 0.28 },
  { label: "COURIER", x: 0.48 },
  { label: "ROUTE", x: 0.68 },
  { label: "DELIVERY", x: 0.92 },
];

type EyfelLargeRouteProps = {
  className?: string;
};

export function EyfelLargeRoute({ className }: EyfelLargeRouteProps) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => setActive((a) => (a + 1) % STOPS.length), 2200);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  const w = isMobile ? 360 : 800;
  const h = isMobile ? 320 : 280;
  const routeY = h * 0.55;

  return (
    <div className={className} role="img" aria-label="Eyfel Kurye dispatch route visualization">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        <motion.line
          x1={w * 0.05}
          y1={routeY}
          x2={w * 0.95}
          y2={routeY}
          stroke="var(--line-strong)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5 }}
        />

        {STOPS.map((stop, i) => {
          const x = w * stop.x;
          const isActive = i <= active;
          return (
            <g key={stop.label}>
              <circle
                cx={x}
                cy={routeY}
                r={isMobile ? 20 : 28}
                fill="none"
                stroke={isActive ? "var(--accent)" : "var(--line)"}
                strokeWidth={i === active ? 2 : 1}
              />
              <text
                x={x}
                y={routeY + (isMobile ? 48 : 52)}
                textAnchor="middle"
                style={{
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: isMobile ? 9 : 11,
                  fill: i === active ? "var(--accent)" : "var(--muted-foreground)",
                }}
              >
                {stop.label}
              </text>
            </g>
          );
        })}

        {!reducedMotion && (
          <motion.circle
            r={isMobile ? 8 : 12}
            fill="var(--accent)"
            animate={{
              cx: STOPS.map((s) => w * s.x),
              opacity: [1, 1, 0.4],
            }}
            cy={routeY}
            transition={{ duration: STOPS.length * 2.2, repeat: Infinity, ease: "linear" }}
          />
        )}
      </svg>
    </div>
  );
}
