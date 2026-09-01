"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/useMediaQuery";

type BisevkLargeDiagramProps = {
  className?: string;
};

export function BisevkLargeDiagram({ className }: BisevkLargeDiagramProps) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => {
      setPhase((p) => (p + 1) % 3);
    }, 4000);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  const selectedCarrier = phase >= 1 ? 1 : -1;
  const inTransit = phase === 2;

  const w = isMobile ? 360 : 900;
  const h = isMobile ? 480 : 420;
  const shipper = { x: w * 0.12, y: h * 0.12 };
  const load = { x: w * 0.35, y: h * 0.38 };
  const carriers = [
    { x: w * 0.22, y: h * 0.62, label: "C1" },
    { x: w * 0.35, y: h * 0.72, label: "C2" },
    { x: w * 0.48, y: h * 0.62, label: "C3" },
  ];
  const selected = { x: w * 0.35, y: h * 0.85 };
  const delivery = { x: w * 0.88, y: h * 0.45 };

  const nodeR = isMobile ? 14 : 22;
  const fontSize = isMobile ? 11 : 14;
  const labelFont = isMobile ? 9 : 11;

  return (
    <div
      className={className}
      role="img"
      aria-label="Bi-Sevk freight marketplace — shipper, load, carriers, transport route, delivery"
    >
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="w-full min-w-0"
        style={{ minHeight: isMobile ? 360 : 420 }}
      >
        <defs>
          <linearGradient id="bisevk-route" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Shipper → Load */}
        <motion.line
          x1={shipper.x}
          y1={shipper.y + nodeR}
          x2={load.x}
          y2={load.y - nodeR}
          stroke="var(--line-strong)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2 }}
        />

        {/* Load → Carriers fan */}
        {carriers.map((c, i) => (
          <motion.line
            key={c.label}
            x1={load.x}
            y1={load.y + nodeR}
            x2={c.x}
            y2={c.y - nodeR}
            stroke={selectedCarrier === i ? "var(--accent)" : "var(--line)"}
            strokeWidth={selectedCarrier === i ? 2 : 1}
            strokeDasharray={selectedCarrier === i ? undefined : "8 8"}
            animate={{ opacity: phase === 0 ? 1 : selectedCarrier === i ? 1 : 0.25 }}
            transition={{ duration: 0.5 }}
          />
        ))}

        {/* Carriers → Selected */}
        {selectedCarrier >= 0 && (
          <motion.line
            x1={carriers[selectedCarrier].x}
            y1={carriers[selectedCarrier].y + nodeR}
            x2={selected.x}
            y2={selected.y - nodeR}
            stroke="var(--accent)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: phase >= 1 ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          />
        )}

        {/* Long transport route */}
        <motion.path
          d={`M ${selected.x} ${selected.y} Q ${w * 0.55} ${h * 0.5} ${delivery.x - nodeR} ${delivery.y}`}
          fill="none"
          stroke="url(#bisevk-route)"
          strokeWidth="2.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: phase >= 1 ? 1 : 0.3 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Shipper node */}
        <g>
          <circle cx={shipper.x} cy={shipper.y} r={nodeR + 8} fill="none" stroke="var(--line-strong)" strokeWidth="1" />
          <circle cx={shipper.x} cy={shipper.y} r={nodeR} fill="var(--background)" stroke="var(--line-strong)" strokeWidth="1.5" />
          <text x={shipper.x} y={shipper.y + 5} textAnchor="middle" style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: labelFont, fill: "var(--foreground)" }}>
            SHIPPER
          </text>
        </g>

        {/* Load node */}
        <g>
          <motion.circle
            cx={load.x}
            cy={load.y}
            r={nodeR + 4}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
            animate={reducedMotion ? {} : { opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <circle cx={load.x} cy={load.y} r={nodeR} fill="var(--background)" stroke="var(--accent)" strokeWidth="2" />
          <text x={load.x} y={load.y + 5} textAnchor="middle" style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: labelFont, fill: "var(--foreground)" }}>
            LOAD
          </text>
        </g>

        {/* Carrier nodes */}
        {carriers.map((c, i) => (
          <g key={c.label}>
            <circle
              cx={c.x}
              cy={c.y}
              r={nodeR - 4}
              fill={selectedCarrier === i ? "var(--accent)" : "var(--background)"}
              stroke={selectedCarrier === i ? "var(--accent)" : "var(--line-strong)"}
              strokeWidth="1.5"
            />
            <text x={c.x} y={c.y + 4} textAnchor="middle" style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: fontSize, fill: selectedCarrier === i ? "var(--accent-foreground)" : "var(--muted-foreground)" }}>
              {c.label}
            </text>
          </g>
        ))}

        {/* Selected */}
        {phase >= 1 && (
          <g>
            <text x={selected.x} y={selected.y - nodeR - 8} textAnchor="middle" style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: labelFont, fill: "var(--accent)" }}>
              SELECTED
            </text>
          </g>
        )}

        {/* Delivery node */}
        <g>
          <circle cx={delivery.x} cy={delivery.y} r={nodeR + 10} fill="none" stroke={inTransit ? "var(--accent)" : "var(--line-strong)"} strokeWidth="1.5" />
          <circle cx={delivery.x} cy={delivery.y} r={nodeR} fill="var(--background)" stroke="var(--line-strong)" strokeWidth="1.5" />
          <text x={delivery.x} y={delivery.y + 5} textAnchor="middle" style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: labelFont, fill: "var(--foreground)" }}>
            DELIVERY
          </text>
        </g>

        {/* Transport signal */}
        {!reducedMotion && phase >= 1 && (
          <motion.circle
            r={isMobile ? 6 : 10}
            fill="var(--accent)"
            animate={{
              offsetDistance: inTransit ? ["0%", "100%"] : ["0%", "0%"],
              opacity: [0, 1, 1, 0],
            }}
            style={{
              offsetPath: `path('M ${selected.x} ${selected.y} Q ${w * 0.55} ${h * 0.5} ${delivery.x - nodeR} ${delivery.y}')`,
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Offer pulses in phase 0 */}
        {!reducedMotion &&
          phase === 0 &&
          carriers.map((c, i) => (
            <motion.circle
              key={`pulse-${i}`}
              r={5}
              fill="var(--accent)"
              animate={{
                cx: [load.x, c.x],
                cy: [load.y, c.y],
                opacity: [0, 0.8, 0],
              }}
              transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.35 }}
            />
          ))}
      </svg>
    </div>
  );
}
