"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SchematicGlowDefs, SchematicPulse } from "@/components/motion/SchematicPulse";
import { MOTION_DURATION, MOTION_EASE } from "@/lib/motion/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type BridgeDiagramProps = {
  product: Dictionary["method"]["product"];
  engineering: Dictionary["method"]["engineering"];
};

const HUB = { x: 240, y: 160 };

export function BridgeDiagram({ product, engineering }: BridgeDiagramProps) {
  const reducedMotion = useReducedMotion();

  const productNodes = product.nodes.map((node, i) => ({
    ...node,
    y: 60 + i * 52,
  }));

  const engineeringNodes = engineering.nodes.map((node, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    return {
      ...node,
      x: col === 0 ? 340 : 400,
      y: 52 + row * 44,
    };
  });

  return (
    <svg viewBox="0 0 480 320" className="h-full min-h-[320px] w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <SchematicGlowDefs />

      <text x="80" y="28" textAnchor="middle" fill="var(--accent-light)" fontSize="11" fontFamily="monospace" letterSpacing="0.1em" fontWeight="600">
        {product.title}
      </text>

      {productNodes.map((node, i) => (
        <g key={node.id}>
          <motion.rect
            x="20"
            y={node.y - 16}
            width="120"
            height="32"
            fill="var(--accent-subtle)"
            stroke="var(--accent)"
            strokeOpacity="0.5"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          />
          <text x="80" y={node.y + 4} textAnchor="middle" fill="currentColor" fontSize="12" fontFamily="monospace" letterSpacing="0.06em" fontWeight="600">
            {node.label}
          </text>
          <motion.line
            x1="140"
            y1={node.y}
            x2={HUB.x - 40}
            y2={HUB.y}
            stroke="var(--accent)"
            strokeOpacity="0.35"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.06, duration: 0.6 }}
          />
          {!reducedMotion && (
            <SchematicPulse x1={140} y1={node.y} x2={HUB.x - 40} y2={HUB.y} delay={0.2 + i * 0.5} duration={1.4} r={7} />
          )}
        </g>
      ))}

      <motion.rect
        x="200"
        y="140"
        width="80"
        height="40"
        fill="var(--accent-subtle)"
        stroke="var(--accent)"
        strokeWidth="2"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.45 }}
        animate={reducedMotion ? undefined : { strokeOpacity: [0.5, 1, 0.5], scale: [1, 1.04, 1] }}
        {...(reducedMotion
          ? {}
          : {
              transition: {
                delay: 0.3,
                duration: 0.45,
                strokeOpacity: { duration: 1.8, repeat: Infinity, ease: MOTION_EASE.inOut },
                scale: { duration: 1.8, repeat: Infinity, ease: MOTION_EASE.inOut },
              },
            })}
      />

      <text x="400" y="28" textAnchor="middle" fill="var(--accent-light)" fontSize="11" fontFamily="monospace" letterSpacing="0.1em" fontWeight="600">
        {engineering.title}
      </text>

      {engineeringNodes.map((node, i) => (
        <g key={node.id}>
          <motion.rect
            x={node.x - 28}
            y={node.y - 14}
            width="56"
            height="28"
            fill="var(--accent-subtle)"
            stroke="var(--accent)"
            strokeOpacity="0.4"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.05 }}
          />
          <text x={node.x} y={node.y + 3} textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="monospace" letterSpacing="0.04em" fontWeight="600">
            {node.label}
          </text>
          <motion.line
            x1={HUB.x + 40}
            y1={HUB.y}
            x2={node.x - 28}
            y2={node.y}
            stroke="var(--accent)"
            strokeOpacity="0.3"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 + i * 0.04, duration: 0.5 }}
          />
          {!reducedMotion && (
            <SchematicPulse x1={HUB.x + 40} y1={HUB.y} x2={node.x - 28} y2={node.y} delay={0.5 + i * 0.4} duration={1.3} r={6} />
          )}
        </g>
      ))}

      {!reducedMotion && (
        <motion.circle
          cx={HUB.x}
          cy={HUB.y}
          r="6"
          fill="var(--accent)"
          filter="url(#schematic-glow)"
          animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.4, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </svg>
  );
}
