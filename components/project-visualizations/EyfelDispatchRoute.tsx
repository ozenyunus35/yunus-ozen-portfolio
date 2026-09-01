"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/useMediaQuery";

const CHECKPOINTS = [
  { id: "order", label: "ORDER", x: 40 },
  { id: "dispatch", label: "DISPATCH", x: 120 },
  { id: "match", label: "COURIER MATCH", x: 200 },
  { id: "pickup", label: "PICKUP", x: 280 },
  { id: "route", label: "ROUTE", x: 360 },
  { id: "delivery", label: "DELIVERY", x: 440 },
];

export function EyfelDispatchRoute() {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % CHECKPOINTS.length);
    }, 1800);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  if (isMobile) {
    return (
      <div className="w-full px-4" role="img" aria-label="Eyfel Kurye dispatch route">
        <svg viewBox="0 0 100 240" className="mx-auto w-full max-w-[120px]">
          {CHECKPOINTS.map((cp, i) => (
            <g key={cp.id}>
              {i > 0 && (
                <line
                  x1="50"
                  y1={20 + (i - 1) * 38 + 8}
                  x2="50"
                  y2={20 + i * 38 - 8}
                  stroke={i <= activeIndex ? "var(--accent)" : "var(--line)"}
                  strokeWidth="1"
                />
              )}
              <circle
                cx="50"
                cy={20 + i * 38}
                r="4"
                fill={i === activeIndex ? "var(--accent)" : "var(--background)"}
                stroke="var(--line)"
                strokeWidth="1"
              />
              <text x="62" y={24 + i * 38} style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 6, fill: "var(--foreground)" }}>
                {cp.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  }

  const y = 60;
  const active = CHECKPOINTS[activeIndex];

  return (
    <div className="w-full" role="img" aria-label="Eyfel Kurye dispatch control flow">
      <svg viewBox="0 0 480 120" className="w-full">
        <line x1="40" y1={y} x2="440" y2={y} stroke="var(--line)" strokeWidth="1" />
        {CHECKPOINTS.map((cp, i) => (
          <g key={cp.id}>
            <motion.circle
              cx={cp.x}
              cy={y}
              r="5"
              fill={i <= activeIndex ? "var(--accent)" : "var(--background)"}
              stroke="var(--line)"
              strokeWidth="1"
              animate={i === activeIndex ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.6, repeat: i === activeIndex ? Infinity : 0 }}
            />
            <text
              x={cp.x}
              y={y + 24}
              textAnchor="middle"
              style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: 7,
                fill: i === activeIndex ? "var(--foreground)" : "var(--muted-foreground)",
              }}
            >
              {cp.label}
            </text>
          </g>
        ))}
        {!reducedMotion && (
          <motion.circle
            r="4"
            fill="var(--accent)"
            animate={{
              cx: CHECKPOINTS.map((c) => c.x),
              opacity: [1, 1, 0.3],
            }}
            cy={y}
            transition={{ duration: CHECKPOINTS.length * 1.8, repeat: Infinity, ease: "linear" }}
          />
        )}
      </svg>
      <p className="text-mono mt-4 text-center text-muted-foreground">{active.label}</p>
    </div>
  );
}
