"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils/cn";

const STEPS = [
  { label: "PHYSICAL", sub: "On-site" },
  { label: "QR", sub: "Scan" },
  { label: "DIGITAL", sub: "Menu" },
  { label: "ORDER", sub: "Select" },
];

export function TavukFlowVisual({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const w = isMobile ? 340 : 720;
  const h = isMobile ? 280 : 200;

  return (
    <div className={cn(className)} role="img" aria-label="Tavuk da Tavuk physical to digital flow">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        {STEPS.map((step, i) => {
          const x = (w / (STEPS.length + 1)) * (i + 1);
          const y = h / 2;
          return (
            <g key={step.label}>
              {i > 0 && (
                <line
                  x1={(w / (STEPS.length + 1)) * i + 36}
                  y1={y}
                  x2={x - 36}
                  y2={y}
                  stroke="var(--line-strong)"
                  strokeWidth="1.5"
                />
              )}
              <circle cx={x} cy={y} r={isMobile ? 32 : 40} fill="none" stroke="var(--line-strong)" strokeWidth="1.5" />
              <text x={x} y={y - 4} textAnchor="middle" style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 9, fill: "var(--foreground)" }}>
                {step.label}
              </text>
              <text x={x} y={y + 12} textAnchor="middle" style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, fill: "var(--foreground-muted)" }}>
                {step.sub}
              </text>
            </g>
          );
        })}
        {!reducedMotion && (
          <motion.circle
            r={6}
            fill="var(--continuum)"
            cy={h / 2}
            animate={{ cx: STEPS.map((_, i) => (w / (STEPS.length + 1)) * (i + 1)), opacity: [0, 1, 1, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
        )}
      </svg>
    </div>
  );
}
