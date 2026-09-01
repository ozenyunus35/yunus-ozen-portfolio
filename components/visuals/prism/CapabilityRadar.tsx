"use client";

import { motion } from "framer-motion";
import { useMotionContext } from "@/components/motion/MotionProvider";

const SKILLS = [
  { label: "Product Strategy", value: 85, color: "#2563eb" },
  { label: "Project Coordination", value: 90, color: "#06b6d4" },
  { label: "UX Design", value: 78, color: "#8b5cf6" },
  { label: "Technical Depth", value: 82, color: "#10b981" },
  { label: "Systems Thinking", value: 88, color: "#f59e0b" },
];

const AXES = SKILLS.map((s) => s.label);
const CENTER = 150;
const RADIUS = 100;

function polarToCartesian(angle: number, radius: number) {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

export function CapabilityRadar() {
  const { reducedMotion } = useMotionContext();
  const angleStep = 360 / AXES.length;

  const gridLevels = [0.25, 0.5, 0.75, 1];

  const dataPoints = SKILLS.map((skill, i) => {
    const angle = i * angleStep;
    const r = (skill.value / 100) * RADIUS;
    return polarToCartesian(angle, r);
  });

  const polygonPath =
    dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <svg viewBox="0 0 300 300" className="w-full" aria-label="Capability radar chart">
        {gridLevels.map((level) => {
          const points = AXES.map((_, i) => {
            const p = polarToCartesian(i * angleStep, RADIUS * level);
            return `${p.x},${p.y}`;
          }).join(" ");
          return (
            <polygon
              key={level}
              points={points}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="0.5"
            />
          );
        })}

        {AXES.map((_, i) => {
          const p = polarToCartesian(i * angleStep, RADIUS);
          return (
            <line
              key={i}
              x1={CENTER}
              y1={CENTER}
              x2={p.x}
              y2={p.y}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="0.5"
            />
          );
        })}

        <motion.path
          d={polygonPath}
          fill="rgba(37, 99, 235, 0.15)"
          stroke="#3b82f6"
          strokeWidth="1.5"
          initial={reducedMotion ? {} : { opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
        />

        {dataPoints.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="3"
            fill={SKILLS[i].color}
            initial={reducedMotion ? {} : { scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          />
        ))}

        {AXES.map((label, i) => {
          const p = polarToCartesian(i * angleStep, RADIUS + 22);
          return (
            <text
              key={label}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="rgba(148, 163, 184, 0.9)"
              fontSize="7"
              fontFamily="monospace"
            >
              {label.split(" ").map((word, wi) => (
                <tspan key={wi} x={p.x} dy={wi === 0 ? 0 : 9}>
                  {word}
                </tspan>
              ))}
            </text>
          );
        })}
      </svg>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {SKILLS.map((skill, i) => (
          <motion.div
            key={skill.label}
            className="flex items-center gap-2"
            initial={reducedMotion ? {} : { opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.06 }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: skill.color }}
            />
            <span className="text-meta text-muted-foreground">{skill.value}%</span>
            <span className="text-meta truncate text-foreground/70">{skill.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
