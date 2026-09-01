"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils/cn";

const MODULES = [
  { label: "USERS", x: 0.14, y: 0.28 },
  { label: "COURSES", x: 0.14, y: 0.72 },
  { label: "ADMIN", x: 0.86, y: 0.28 },
  { label: "REPORTS", x: 0.86, y: 0.72 },
];

export function FmdModuleVisual({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => setActive((a) => (a + 1) % MODULES.length), 2400);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  const w = isMobile ? 340 : 780;
  const h = isMobile ? 340 : 300;
  const cx = w / 2;
  const cy = h / 2;

  return (
    <div className={cn(className)} role="img" aria-label="FMD education system modules">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        <motion.rect
          x={cx - 55}
          y={cy - 55}
          width="110"
          height="110"
          fill="none"
          stroke="var(--continuum)"
          strokeWidth="2"
          animate={reducedMotion ? {} : { opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <text x={cx} y={cy + 6} textAnchor="middle" style={{ fontFamily: "var(--font-syne)", fontSize: 20, fontWeight: 600, fill: "var(--foreground)" }}>
          CORE
        </text>
        {MODULES.map((mod, i) => {
          const x = w * mod.x;
          const y = h * mod.y;
          const on = i === active;
          return (
            <g key={mod.label}>
              <line x1={cx} y1={cy} x2={x} y2={y} stroke={on ? "var(--continuum-bright)" : "var(--line-strong)"} strokeWidth={on ? 2 : 1} />
              <rect x={x - 44} y={y - 22} width="88" height="44" fill="none" stroke={on ? "var(--continuum)" : "var(--line-strong)"} strokeWidth="1.5" />
              <text x={x} y={y + 5} textAnchor="middle" style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 10, fill: on ? "var(--continuum)" : "var(--foreground-muted)" }}>
                {mod.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
