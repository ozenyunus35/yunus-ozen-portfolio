"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useSchematicPhase } from "@/lib/motion/useSchematicPhase";
import { SchematicPulse } from "@/components/motion/SchematicPulse";
import { MOTION_DURATION } from "@/lib/motion/constants";

type ProjectMiniVisualProps = {
  slug: string;
  className?: string;
};

const FMD_MODULES = ["overview", "users", "content", "modules", "reports"] as const;

export function ProjectMiniVisual({ slug, className }: ProjectMiniVisualProps) {
  const reducedMotion = useReducedMotion();
  const fmdActive = useSchematicPhase(FMD_MODULES, 1800);
  const bisevkStep = useSchematicPhase([0, 1, 2, 3, 4, 5] as const, 1600);

  return (
    <svg
      viewBox="0 0 120 48"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      {slug === "bisevk" && (
        <>
          {[12, 32, 52, 72, 92, 108].map((x, i) => (
            <motion.rect
              key={x}
              x={x - 6}
              y="18"
              width="12"
              height="12"
              stroke="currentColor"
              strokeOpacity={i <= bisevkStep ? 0.55 : 0.2}
              strokeWidth="1"
              fill={i <= bisevkStep ? "var(--accent-subtle)" : "transparent"}
              animate={reducedMotion ? undefined : { opacity: i === bisevkStep ? 1 : 0.6 }}
              transition={{ duration: 0.35 }}
            />
          ))}
          {!reducedMotion && (
            <SchematicPulse
              x1={12}
              y1={24}
              x2={108}
              y2={24}
              duration={2.8}
              r={2}
            />
          )}
        </>
      )}

      {slug === "eyfel" && (
        <>
          {[16, 44, 72, 100].map((x, i) => (
            <g key={x}>
              {i > 0 && (
                <line
                  x1={x - 20}
                  y1="24"
                  x2={x - 8}
                  y2="24"
                  stroke="currentColor"
                  strokeOpacity="0.2"
                  strokeWidth="1"
                />
              )}
              <rect
                x={x - 6}
                y="16"
                width="12"
                height="16"
                stroke="currentColor"
                strokeOpacity="0.35"
                strokeWidth="1"
              />
            </g>
          ))}
          {!reducedMotion && (
            <SchematicPulse x1={16} y1={24} x2={100} y2={24} duration={2.4} r={2} />
          )}
        </>
      )}

      {slug === "fmd" && (
        <>
          {[
            { id: "overview", x: 8, w: 36 },
            { id: "users", x: 48, w: 18 },
            { id: "content", x: 8, y: 28, w: 18, h: 16 },
            { id: "modules", x: 30, y: 28, w: 36, h: 16 },
            { id: "reports", x: 30, y: 28, w: 36, h: 16 },
          ].map((mod) => {
            const active = fmdActive === mod.id;
            const y = mod.y ?? 8;
            const h = mod.h ?? 14;
            return (
              <motion.rect
                key={mod.id}
                x={mod.x}
                y={y}
                width={mod.w}
                height={h}
                stroke={active ? "var(--accent)" : "currentColor"}
                strokeOpacity={active ? 1 : 0.25}
                strokeWidth="1"
                fill={active ? "var(--accent-subtle)" : "transparent"}
                animate={reducedMotion ? undefined : { opacity: active ? 1 : 0.55 }}
                transition={{ duration: 0.3 }}
              />
            );
          })}
        </>
      )}

      {slug === "tavuk-da-tavuk" && (
        <>
          <rect x="6" y="12" width="18" height="18" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" />
          <motion.rect
            x="9"
            y="15"
            width="4"
            height="4"
            fill="var(--accent)"
            animate={reducedMotion ? undefined : { opacity: [0.3, 1, 0.3] }}
            transition={{ duration: MOTION_DURATION.diagram * 0.5, repeat: Infinity }}
          />
          <line x1="26" y1="21" x2="42" y2="21" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
          <rect x="42" y="8" width="28" height="32" rx="4" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" />
          {!reducedMotion && (
            <SchematicPulse x1={26} y1={21} x2={42} y2={21} duration={1.8} delay={0.6} r={2} />
          )}
        </>
      )}
    </svg>
  );
}
