"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SchematicGlowDefs, SchematicPulse } from "@/components/motion/SchematicPulse";
import { MOTION_DURATION } from "@/lib/motion/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type ApproachCycleDiagramProps = {
  columns: Dictionary["approach"]["columns"];
};

const NODES = [
  { x: 90, y: 120 },
  { x: 280, y: 120 },
  { x: 470, y: 120 },
] as const;

export function ApproachCycleDiagram({ columns }: ApproachCycleDiagramProps) {
  const reducedMotion = useReducedMotion();

  return (
    <svg viewBox="0 0 560 240" className="h-full min-h-[240px] w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <SchematicGlowDefs />

      <motion.path
        d="M 90 120 H 470"
        stroke="var(--accent)"
        strokeOpacity="0.4"
        strokeWidth="3"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: MOTION_DURATION.base }}
      />

      <motion.path
        d="M 470 120 Q 520 120 520 170 Q 520 220 470 220 Q 280 250 90 220 Q 40 220 40 170 Q 40 120 90 120"
        stroke="var(--accent)"
        strokeOpacity="0.25"
        strokeWidth="2"
        strokeDasharray="8 10"
        fill="none"
        animate={reducedMotion ? undefined : { strokeDashoffset: [0, -36] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {columns.map((col, i) => {
        const { x, y } = NODES[i];
        return (
          <g key={col.title}>
            <motion.rect
              x={x - 64}
              y={y - 32}
              width="128"
              height="64"
              fill="var(--accent-subtle)"
              stroke="var(--accent)"
              strokeWidth="2"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
            />
            {!reducedMotion && (
              <motion.rect
                x={x - 64}
                y={y - 32}
                width="128"
                height="64"
                fill="none"
                stroke="var(--accent-light)"
                strokeWidth="2"
                animate={{ strokeOpacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.7 }}
              />
            )}
            <text
              x={x}
              y={y + 5}
              textAnchor="middle"
              fill="var(--accent-light)"
              fontSize="13"
              fontFamily="monospace"
              letterSpacing="0.08em"
              fontWeight="700"
            >
              {col.title}
            </text>
          </g>
        );
      })}

      {!reducedMotion && (
        <>
          <SchematicPulse x1={90} y1={120} x2={280} y2={120} delay={0} duration={1.4} r={9} />
          <SchematicPulse x1={280} y1={120} x2={470} y2={120} delay={0.7} duration={1.4} r={9} />
          <SchematicPulse x1={470} y1={120} x2={90} y2={120} delay={1.4} duration={2.2} r={9} />
        </>
      )}
    </svg>
  );
}
