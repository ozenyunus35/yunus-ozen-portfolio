"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { productJourneyContent } from "@/lib/data/journey";

const STEPS = [
  ...productJourneyContent.steps,
  { id: "measure", number: "08", title: "MEASURE", details: ["Metrics", "Outcomes"] },
];

export function ProductCycleRing() {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const cx = 200;
  const cy = 200;
  const r = 140;

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => {
      setActive((a) => (a + 1) % STEPS.length);
    }, 2200);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  return (
    <div className="mx-auto w-full max-w-md" role="img" aria-label="Product development cycle">
      <svg viewBox="0 0 400 400" className="w-full">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--line)" strokeWidth="1" opacity="0.3" />

        {STEPS.map((step, i) => {
          const angle = (i / STEPS.length) * 360 - 90;
          const rad = (angle * Math.PI) / 180;
          const x = cx + r * Math.cos(rad);
          const y = cy + r * Math.sin(rad);
          const isActive = i === active;
          const nextAngle = (((i + 1) % STEPS.length) / STEPS.length) * 360 - 90;
          const nx = cx + r * Math.cos((nextAngle * Math.PI) / 180);
          const ny = cy + r * Math.sin((nextAngle * Math.PI) / 180);

          return (
            <g key={step.id}>
              <line
                x1={x}
                y1={y}
                x2={nx}
                y2={ny}
                stroke={isActive ? "var(--accent)" : "var(--line)"}
                strokeWidth="1"
                opacity={isActive ? 0.8 : 0.2}
              />
              <motion.circle
                cx={x}
                cy={y}
                r={isActive ? 6 : 4}
                fill={isActive ? "var(--accent)" : "var(--background)"}
                stroke="var(--line)"
                strokeWidth="1"
              />
              <text
                x={x}
                y={y - 12}
                textAnchor="middle"
                style={{
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: 6,
                  fill: isActive ? "var(--foreground)" : "var(--muted-foreground)",
                }}
              >
                {step.title}
              </text>
            </g>
          );
        })}

        {!reducedMotion && (
          <motion.circle
            r="3"
            fill="var(--accent)"
            animate={{
              cx: STEPS.map((_, i) => {
                const angle = (i / STEPS.length) * 360 - 90;
                return cx + r * Math.cos((angle * Math.PI) / 180);
              }),
              cy: STEPS.map((_, i) => {
                const angle = (i / STEPS.length) * 360 - 90;
                return cy + r * Math.sin((angle * Math.PI) / 180);
              }),
            }}
            transition={{ duration: STEPS.length * 2.2, repeat: Infinity, ease: "linear" }}
          />
        )}

        <text
          x={cx}
          y={cy + 4}
          textAnchor="middle"
          style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 8, fill: "var(--accent)" }}
        >
          {STEPS[active].title}
        </text>
      </svg>
    </div>
  );
}
