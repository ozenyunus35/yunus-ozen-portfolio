"use client";

import { motion } from "framer-motion";
import { productEngineeringContent } from "@/lib/data/product-engineering";
import { useMotionContext } from "@/components/motion/MotionProvider";

const PRODUCT_NODES = productEngineeringContent.product.nodes.map((n, i) => ({
  ...n,
  x: 20 + i * 30,
  y: 25,
  color: "#2563eb",
}));

const ENGINEERING_NODES = productEngineeringContent.engineering.nodes.map((n, i) => ({
  ...n,
  x: 10 + (i % 3) * 30,
  y: 65 + Math.floor(i / 3) * 20,
  color: "#06b6d4",
}));

const BRIDGE = { x: 50, y: 45, label: "BRIDGE" };

export function ProductEngineeringGraph() {
  const { reducedMotion } = useMotionContext();
  const content = productEngineeringContent;

  return (
    <div className="relative w-full">
      <svg viewBox="0 0 100 85" className="w-full" aria-hidden="true">
        <defs>
          <linearGradient id="bridgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>

        {/* Connection lines to bridge */}
        {[...PRODUCT_NODES, ...ENGINEERING_NODES].map((node, i) => (
          <motion.line
            key={`line-${node.id}`}
            x1={node.x}
            y1={node.y}
            x2={BRIDGE.x}
            y2={BRIDGE.y}
            stroke="url(#bridgeGrad)"
            strokeWidth="0.2"
            strokeOpacity="0.3"
            initial={reducedMotion ? {} : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.05 }}
          />
        ))}

        {/* Product zone label */}
        <text x="50" y="8" textAnchor="middle" fill="#60a5fa" fontSize="3" fontFamily="monospace">
          {content.product.title}
        </text>

        {/* Engineering zone label */}
        <text x="50" y="58" textAnchor="middle" fill="#22d3ee" fontSize="3" fontFamily="monospace">
          {content.engineering.title}
        </text>

        {/* Bridge node */}
        <motion.circle
          cx={BRIDGE.x}
          cy={BRIDGE.y}
          r="4"
          fill="url(#bridgeGrad)"
          initial={reducedMotion ? {} : { scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        />
        <motion.circle
          cx={BRIDGE.x}
          cy={BRIDGE.y}
          r="6"
          fill="none"
          stroke="url(#bridgeGrad)"
          strokeWidth="0.3"
          strokeOpacity="0.5"
          initial={reducedMotion ? {} : { scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="animate-pulse-glow"
        />

        {/* Product nodes */}
        {PRODUCT_NODES.map((node, i) => (
          <g key={node.id}>
            <motion.rect
              x={node.x - 8}
              y={node.y - 4}
              width="16"
              height="8"
              rx="1"
              fill="rgba(37, 99, 235, 0.15)"
              stroke="#3b82f6"
              strokeWidth="0.3"
              initial={reducedMotion ? {} : { opacity: 0, y: node.y - 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08 }}
            />
            <text
              x={node.x}
              y={node.y + 1}
              textAnchor="middle"
              fill="#93c5fd"
              fontSize="2.5"
              fontFamily="monospace"
            >
              {node.label}
            </text>
          </g>
        ))}

        {/* Engineering nodes */}
        {ENGINEERING_NODES.map((node, i) => (
          <g key={node.id}>
            <motion.rect
              x={node.x - 8}
              y={node.y - 4}
              width="16"
              height="8"
              rx="1"
              fill="rgba(6, 182, 212, 0.12)"
              stroke="#06b6d4"
              strokeWidth="0.3"
              initial={reducedMotion ? {} : { opacity: 0, y: node.y + 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.06 }}
            />
            <text
              x={node.x}
              y={node.y + 1}
              textAnchor="middle"
              fill="#67e8f9"
              fontSize="2.5"
              fontFamily="monospace"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
