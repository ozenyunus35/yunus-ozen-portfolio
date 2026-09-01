"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils/cn";

export type BisevkFlowPhase =
  | "shipper"
  | "load"
  | "carriers"
  | "selected"
  | "transport"
  | "delivered"
  | "full";

type BisevkFlowVisualProps = {
  phase?: BisevkFlowPhase;
  className?: string;
  /** 0–1 scroll progress for animated sequences */
  progress?: number;
};

export function BisevkFlowVisual({
  phase = "full",
  className,
  progress,
}: BisevkFlowVisualProps) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [autoPhase, setAutoPhase] = useState(0);

  useEffect(() => {
    if (reducedMotion || phase !== "full") return;
    const interval = window.setInterval(() => setAutoPhase((p) => (p + 1) % 6), 3500);
    return () => window.clearInterval(interval);
  }, [reducedMotion, phase]);

  const w = isMobile ? 340 : 880;
  const h = isMobile ? 400 : 380;

  const phases: BisevkFlowPhase[] = ["shipper", "load", "carriers", "selected", "transport", "delivered"];
  const activePhase =
    phase === "full"
      ? phases[autoPhase]
      : phase;

  const showLoad = ["load", "carriers", "selected", "transport", "delivered"].includes(activePhase);
  const showCarriers = ["carriers", "selected", "transport", "delivered"].includes(activePhase);
  const showSelected = ["selected", "transport", "delivered"].includes(activePhase);
  const showTransport = ["transport", "delivered"].includes(activePhase);
  const delivered = activePhase === "delivered";

  const shipper = { x: w * 0.1, y: h * 0.15 };
  const load = { x: w * 0.32, y: h * 0.42 };
  const carriers = [
    { x: w * 0.18, y: h * 0.68 },
    { x: w * 0.32, y: h * 0.78 },
    { x: w * 0.46, y: h * 0.68 },
  ];
  const delivery = { x: w * 0.88, y: h * 0.4 };
  const routePath = `M ${load.x} ${load.y + 20} Q ${w * 0.6} ${h * 0.35} ${delivery.x - 30} ${delivery.y}`;

  const nodeR = isMobile ? 12 : 18;
  const labelStyle = {
    fontFamily: "var(--font-ibm-plex-mono)",
    fontSize: isMobile ? 9 : 11,
    letterSpacing: "0.06em",
  };

  return (
    <div
      className={cn(className)}
      role="img"
      aria-label="Bi-Sevk marketplace flow: shipper, load, carriers, transport, delivery"
    >
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        {/* Shipper */}
        <g opacity={activePhase === "shipper" ? 1 : 0.9}>
          <circle cx={shipper.x} cy={shipper.y} r={nodeR + 16} fill="none" stroke="var(--line-strong)" strokeWidth="1" />
          <circle cx={shipper.x} cy={shipper.y} r={nodeR} fill="none" stroke="var(--foreground)" strokeWidth="1.5" opacity="0.8" />
          <text x={shipper.x} y={shipper.y + 4} textAnchor="middle" fill="var(--foreground)" style={labelStyle}>SHIPPER</text>
        </g>

        {/* Shipper → Load */}
        {showLoad && (
          <motion.line
            x1={shipper.x}
            y1={shipper.y + nodeR}
            x2={load.x}
            y2={load.y - nodeR}
            stroke="var(--continuum)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
          />
        )}

        {/* Load */}
        <g opacity={showLoad ? 1 : 0.2}>
          <motion.circle
            cx={load.x}
            cy={load.y}
            r={nodeR + 8}
            fill="none"
            stroke="var(--continuum-bright)"
            strokeWidth="1.5"
            animate={reducedMotion ? {} : { opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <text x={load.x} y={load.y + 4} textAnchor="middle" fill="var(--foreground)" style={labelStyle}>LOAD</text>
        </g>

        {/* Carriers fan */}
        {showCarriers &&
          carriers.map((c, i) => (
            <g key={i} opacity={showSelected && i !== 1 ? 0.35 : 1}>
              <line
                x1={load.x}
                y1={load.y + nodeR}
                x2={c.x}
                y2={c.y - nodeR}
                stroke={showSelected && i === 1 ? "var(--continuum-bright)" : "var(--line-strong)"}
                strokeWidth={showSelected && i === 1 ? 2 : 1}
                strokeDasharray={showSelected ? undefined : "6 6"}
              />
              <circle
                cx={c.x}
                cy={c.y}
                r={nodeR - 4}
                fill={showSelected && i === 1 ? "var(--continuum)" : "transparent"}
                stroke="var(--foreground)"
                strokeWidth="1.5"
                opacity="0.85"
              />
              <text
                x={c.x}
                y={c.y + 4}
                textAnchor="middle"
                fill={showSelected && i === 1 ? "var(--accent-foreground)" : "var(--foreground-muted)"}
                style={labelStyle}
              >
                C{i + 1}
              </text>
            </g>
          ))}

        {/* Transport route — long horizontal sweep */}
        {(showTransport || delivered) && (
          <motion.path
            d={routePath}
            fill="none"
            stroke="var(--continuum-bright)"
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
        )}

        {/* Delivery */}
        <g opacity={showTransport || delivered ? 1 : 0.15}>
          <circle cx={delivery.x} cy={delivery.y} r={nodeR + 20} fill="none" stroke={delivered ? "var(--continuum-bright)" : "var(--line-strong)"} strokeWidth="1.5" />
          <text x={delivery.x} y={delivery.y + 4} textAnchor="middle" fill="var(--foreground)" style={labelStyle}>
            {delivered ? "DELIVERED" : "DELIVERY"}
          </text>
        </g>

        {/* Traveling signal */}
        {!reducedMotion && showTransport && !delivered && (
          <motion.circle
            r={isMobile ? 7 : 10}
            fill="var(--continuum-bright)"
            style={{ offsetPath: `path('${routePath}')` }}
            animate={{ offsetDistance: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Offer pulses */}
        {!reducedMotion && activePhase === "carriers" &&
          carriers.map((c, i) => (
            <motion.circle
              key={`pulse-${i}`}
              r={5}
              fill="var(--continuum-bright)"
              animate={{ cx: [load.x, c.x], cy: [load.y, c.y], opacity: [0, 0.9, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.25 }}
            />
          ))}
      </svg>
    </div>
  );
}

/** Scroll-driven phase from 0–1 progress */
export function phaseFromProgress(p: number): BisevkFlowPhase {
  if (p < 0.12) return "shipper";
  if (p < 0.25) return "load";
  if (p < 0.42) return "carriers";
  if (p < 0.55) return "selected";
  if (p < 0.78) return "transport";
  return "delivered";
}
