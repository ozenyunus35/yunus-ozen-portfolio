"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/useMediaQuery";

const STEPS = ["SCAN", "MENU", "ORDER"];

type TavukLargeFlowProps = {
  className?: string;
};

export function TavukLargeFlow({ className }: TavukLargeFlowProps) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const w = isMobile ? 360 : 700;
  const h = isMobile ? 280 : 240;

  return (
    <div className={className} role="img" aria-label="Tavuk da Tavuk QR menu flow">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        {STEPS.map((step, i) => {
          const x = (w / (STEPS.length + 1)) * (i + 1);
          const y = h / 2;
          return (
            <g key={step}>
              {i > 0 && (
                <motion.line
                  x1={(w / (STEPS.length + 1)) * i + 40}
                  y1={y}
                  x2={x - 40}
                  y2={y}
                  stroke="var(--line-strong)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.3, duration: 0.8 }}
                />
              )}
              <circle
                cx={x}
                cy={y}
                r={isMobile ? 36 : 48}
                fill="none"
                stroke="var(--line-strong)"
                strokeWidth="1.5"
              />
              <text
                x={x}
                y={y + 5}
                textAnchor="middle"
                style={{
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: isMobile ? 10 : 12,
                  fill: "var(--foreground)",
                }}
              >
                {step}
              </text>
            </g>
          );
        })}

        {!reducedMotion && (
          <motion.circle
            r={8}
            fill="var(--accent)"
            animate={{
              cx: STEPS.map((_, i) => (w / (STEPS.length + 1)) * (i + 1)),
              opacity: [0, 1, 1, 0],
            }}
            cy={h / 2}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        )}
      </svg>
    </div>
  );
}
