"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/useMediaQuery";

export type BisevkDiagramState =
  | "problem"
  | "load"
  | "offers"
  | "match"
  | "transport"
  | "delivery"
  | "architecture";

const STATE_LABELS: Record<BisevkDiagramState, string> = {
  problem: "FRAGMENTED NETWORK",
  load: "LOAD CREATED",
  offers: "3 OFFERS",
  match: "OFFER ACCEPTED",
  transport: "IN TRANSIT",
  delivery: "DELIVERED",
  architecture: "SYSTEM LAYERS",
};

type BisevkScrollDiagramProps = {
  state: BisevkDiagramState;
  className?: string;
};

export function BisevkScrollDiagram({ state, className }: BisevkScrollDiagramProps) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    if (reducedMotion || state !== "transport") return;
    const interval = window.setInterval(() => setPulse((p) => p + 1), 1200);
    return () => window.clearInterval(interval);
  }, [reducedMotion, state]);

  if (state === "architecture") {
    const layers = ["CLIENT", "FRONTEND", "API", "BACKEND", "DATABASE"];
    return (
      <div className={className} role="img" aria-label="Technical architecture layers">
        <svg viewBox="0 0 200 280" className="mx-auto w-full max-w-[200px]">
          {layers.map((layer, i) => (
            <g key={layer}>
              <motion.rect
                x="20"
                y={20 + i * 48}
                width="160"
                height="36"
                fill="none"
                stroke={i === 2 ? "var(--accent)" : "var(--line)"}
                strokeWidth="1"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
              />
              <text
                x="100"
                y={42 + i * 48}
                textAnchor="middle"
                style={{
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: 9,
                  fill: "var(--foreground)",
                }}
              >
                {layer}
              </text>
              {i < layers.length - 1 && (
                <line
                  x1="100"
                  y1={56 + i * 48}
                  x2="100"
                  y2={68 + i * 48}
                  stroke="var(--line-strong)"
                  strokeWidth="1"
                />
              )}
            </g>
          ))}
        </svg>
        <p className="text-mono mt-4 text-center text-accent">{STATE_LABELS[state]}</p>
      </div>
    );
  }

  const showShipper = state !== "problem";
  const showLoad = ["load", "offers", "match", "transport", "delivery"].includes(state);
  const showCarriers = ["offers", "match", "transport"].includes(state);
  const showDest = ["transport", "delivery"].includes(state);
  const selectedCarrier = state === "match" || state === "transport" || state === "delivery";

  const cx = isMobile ? 100 : 200;
  const shipperY = 30;
  const loadY = 80;
  const carrierYs = [130, 155, 180];
  const destY = 230;

  return (
    <div className={className} role="img" aria-label={`Bi-Sevk system: ${STATE_LABELS[state]}`}>
      <svg viewBox="0 0 400 260" className="w-full">
        {/* Shipper */}
        <motion.g animate={{ opacity: showShipper ? 1 : state === "problem" ? 0.3 : 0 }}>
          <rect x={cx - 40} y={shipperY - 12} width="80" height="24" fill="none" stroke="var(--line)" strokeWidth="1" />
          <text x={cx} y={shipperY + 4} textAnchor="middle" style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 8, fill: "var(--foreground)" }}>SHIPPER</text>
        </motion.g>

        {/* Load */}
        <motion.g animate={{ opacity: showLoad ? 1 : 0.15 }}>
          {showShipper && showLoad && (
            <line x1={cx} y1={shipperY + 12} x2={cx} y2={loadY - 12} stroke="var(--line-strong)" strokeWidth="1" />
          )}
          <rect x={cx - 36} y={loadY - 12} width="72" height="24" fill="none" stroke={state === "load" ? "var(--accent)" : "var(--line)"} strokeWidth="1" />
          <text x={cx} y={loadY + 4} textAnchor="middle" style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 8, fill: "var(--foreground)" }}>
            {state === "offers" ? "LOAD #024" : "LOAD"}
          </text>
        </motion.g>

        {/* Carriers */}
        {carrierYs.map((cy, i) => {
          const active = showCarriers && (selectedCarrier ? i === 1 : true);
          const selected = selectedCarrier && i === 1;
          return (
            <motion.g key={i} animate={{ opacity: active ? 1 : 0.1 }}>
              {showLoad && active && (
                <line x1={cx} y1={loadY + 12} x2={cx - 60 + i * 60} y2={cy - 12} stroke={selected ? "var(--accent)" : "var(--line)"} strokeWidth="1" strokeDasharray={selected ? undefined : "3 3"} />
              )}
              <circle cx={cx - 60 + i * 60} cy={cy} r="4" fill={selected ? "var(--accent)" : "var(--background)"} stroke="var(--line)" strokeWidth="1" />
              <text x={cx - 60 + i * 60} y={cy + 18} textAnchor="middle" style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 6, fill: "var(--muted-foreground)" }}>
                C{i + 1}
              </text>
              {!reducedMotion && showCarriers && !selectedCarrier && state === "offers" && (
                <motion.circle
                  r="2"
                  fill="var(--accent)"
                  animate={{
                    cx: [cx, cx - 60 + i * 60],
                    cy: [loadY, cy],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
                />
              )}
            </motion.g>
          );
        })}

        {/* Destination */}
        <motion.g animate={{ opacity: showDest ? 1 : 0.1 }}>
          {selectedCarrier && (
            <line x1={cx} y1={carrierYs[1] + 8} x2={cx} y2={destY - 12} stroke="var(--accent)" strokeWidth="1" />
          )}
          {!reducedMotion && state === "transport" && (
            <motion.circle
              key={pulse}
              r="3"
              fill="var(--accent)"
              animate={{ cx: [cx, cx], cy: [carrierYs[1] + 8, destY - 12], opacity: [1, 0] }}
              transition={{ duration: 1.2 }}
            />
          )}
          <rect x={cx - 40} y={destY - 12} width="80" height="24" fill="none" stroke={state === "delivery" ? "var(--accent)" : "var(--line)"} strokeWidth="1" />
          <text x={cx} y={destY + 4} textAnchor="middle" style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 8, fill: "var(--foreground)" }}>DELIVERY</text>
        </motion.g>

        {/* Problem: disconnected nodes */}
        {state === "problem" && (
          <>
            <circle cx="80" cy="100" r="3" fill="var(--muted-foreground)" opacity="0.4" />
            <circle cx="320" cy="140" r="3" fill="var(--muted-foreground)" opacity="0.4" />
            <circle cx="120" cy="200" r="3" fill="var(--muted-foreground)" opacity="0.4" />
            <circle cx="280" cy="80" r="3" fill="var(--muted-foreground)" opacity="0.4" />
          </>
        )}
      </svg>
      <motion.p
        key={state}
        className="text-mono mt-4 text-center text-accent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {STATE_LABELS[state]}
      </motion.p>
    </div>
  );
}
