"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const MODULES = [
  { id: "users", label: "USERS", x: 60, y: 40 },
  { id: "admin", label: "ADMIN", x: 60, y: 120 },
  { id: "courses", label: "COURSES", x: 200, y: 40 },
  { id: "modules", label: "MODULES", x: 200, y: 120 },
  { id: "dashboard", label: "DASHBOARD", x: 340, y: 80 },
];

const CENTER = { x: 200, y: 80, label: "CONTENT" };

const SIGNALS: [string, string][] = [
  ["admin", "content"],
  ["content", "modules"],
  ["users", "courses"],
  ["courses", "dashboard"],
];

export function FmdModularArchitecture() {
  const reducedMotion = useReducedMotion();
  const [signalIndex, setSignalIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => {
      setSignalIndex((i) => (i + 1) % SIGNALS.length);
    }, 2200);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  function getMod(id: string) {
    if (id === "content") return CENTER;
    return MODULES.find((m) => m.id === id)!;
  }

  const [fromId, toId] = SIGNALS[signalIndex];
  const from = getMod(fromId);
  const to = getMod(toId === "content" ? "content" : toId);

  return (
    <div className="w-full" role="img" aria-label="FMD education management architecture">
      <svg viewBox="0 0 400 160" className="w-full">
        {MODULES.map((m) => (
          <g key={m.id}>
            <line x1={m.x} y1={m.y} x2={CENTER.x} y2={CENTER.y} stroke="var(--line)" strokeWidth="1" opacity="0.3" />
            <rect x={m.x - 36} y={m.y - 10} width="72" height="20" fill="none" stroke="var(--line)" strokeWidth="1" />
            <text x={m.x} y={m.y + 4} textAnchor="middle" style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 7, fill: "var(--muted-foreground)" }}>
              {m.label}
            </text>
          </g>
        ))}

        <motion.rect
          x={CENTER.x - 40}
          y={CENTER.y - 14}
          width="80"
          height="28"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <text x={CENTER.x} y={CENTER.y + 4} textAnchor="middle" style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 9, fill: "var(--foreground)" }}>
          {CENTER.label}
        </text>

        {!reducedMotion && (
          <motion.circle
            r="3"
            fill="var(--accent)"
            animate={{
              cx: [from.x, to.x],
              cy: [from.y, to.y],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </svg>
    </div>
  );
}
