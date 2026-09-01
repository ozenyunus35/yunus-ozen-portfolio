"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const STEPS = [
  { id: "qr", label: "QR", y: 30 },
  { id: "mobile", label: "MOBILE", y: 80 },
  { id: "menu", label: "MENU", y: 130 },
  { id: "content", label: "CONTENT", y: 180 },
];

export function TavukScanFlow() {
  const reducedMotion = useReducedMotion();
  const [scanY, setScanY] = useState(30);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => {
      setScanY((y) => {
        const idx = STEPS.findIndex((s) => s.y === y);
        return STEPS[(idx + 1) % STEPS.length].y;
      });
    }, 2000);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  return (
    <div className="w-full" role="img" aria-label="Tavuk da Tavuk QR to mobile content flow">
      <svg viewBox="0 0 160 220" className="mx-auto w-full max-w-[160px]">
        {/* Device frame */}
        <rect x="40" y="10" width="80" height="200" fill="none" stroke="var(--line)" strokeWidth="1" rx="2" />

        {STEPS.map((step, i) => (
          <g key={step.id}>
            {i > 0 && (
              <line x1="80" y1={STEPS[i - 1].y + 12} x2="80" y2={step.y - 8} stroke="var(--line)" strokeWidth="1" />
            )}
            <text x="80" y={step.y} textAnchor="middle" style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 7, fill: "var(--foreground)" }}>
              {step.label}
            </text>
          </g>
        ))}

        {!reducedMotion && (
          <motion.line
            x1="45"
            x2="115"
            stroke="var(--accent)"
            strokeWidth="1"
            animate={{ y1: scanY, y2: scanY }}
            transition={{ duration: 0.6 }}
            opacity="0.7"
          />
        )}
      </svg>
    </div>
  );
}
