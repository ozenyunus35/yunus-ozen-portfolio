"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { productEngineeringContent } from "@/lib/data/product-engineering";
import { useIsMobile } from "@/hooks/useMediaQuery";

const PRODUCT_ITEMS = ["Strategy", "UX", "Data"];
const ENGINEERING_ITEMS = ["Frontend", "Backend", "Systems"];

const CONNECTIONS = [
  { from: 0, to: 0 },
  { from: 1, to: 2 },
  { from: 2, to: 1 },
];

export function ProductEngineeringBridge() {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [activeConnection, setActiveConnection] = useState(0);
  const { headline } = productEngineeringContent;

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => {
      setActiveConnection((c) => (c + 1) % CONNECTIONS.length);
    }, 4500);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  const w = 1000;
  const h = isMobile ? 520 : 400;
  const leftX = isMobile ? 120 : 160;
  const rightX = isMobile ? 880 : 840;
  const centerX = w / 2;

  return (
    <div className="relative w-full" role="img" aria-label="Product and Engineering bridge">
      {!isMobile && (
        <div className="mb-16 max-w-3xl">
          <h2 className="text-section font-display leading-[0.95] text-foreground">
            {headline[0]}
          </h2>
          <h2 className="text-section mt-2 font-display leading-[0.95] text-muted-foreground">
            {headline[1]}
          </h2>
        </div>
      )}

      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        {/* Product column label */}
        <text
          x={leftX}
          y={isMobile ? 40 : 60}
          textAnchor="middle"
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: isMobile ? 28 : 48,
            fontWeight: 600,
            fill: "var(--foreground)",
            letterSpacing: "-0.03em",
          }}
        >
          PRODUCT
        </text>

        {/* Engineering column label */}
        <text
          x={rightX}
          y={isMobile ? 40 : 60}
          textAnchor="middle"
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: isMobile ? 28 : 48,
            fontWeight: 600,
            fill: "var(--foreground)",
            letterSpacing: "-0.03em",
          }}
        >
          ENGINEERING
        </text>

        {/* Center bridge symbol */}
        <motion.text
          x={centerX}
          y={h / 2}
          textAnchor="middle"
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: isMobile ? 36 : 56,
            fill: "var(--accent)",
          }}
          animate={reducedMotion ? {} : { opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          ↔
        </motion.text>

        {/* Product items */}
        {PRODUCT_ITEMS.map((item, i) => {
          const y = isMobile ? 120 + i * 110 : 140 + i * 80;
          return (
            <g key={item}>
              <circle cx={leftX} cy={y} r={isMobile ? 36 : 28} fill="none" stroke="var(--line-strong)" strokeWidth="1" />
              <text
                x={leftX}
                y={y + 5}
                textAnchor="middle"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: isMobile ? 14 : 16,
                  fill: "var(--foreground)",
                }}
              >
                {item}
              </text>
            </g>
          );
        })}

        {/* Engineering items */}
        {ENGINEERING_ITEMS.map((item, i) => {
          const y = isMobile ? 120 + i * 110 : 140 + i * 80;
          return (
            <g key={item}>
              <circle cx={rightX} cy={y} r={isMobile ? 36 : 28} fill="none" stroke="var(--line-strong)" strokeWidth="1" />
              <text
                x={rightX}
                y={y + 5}
                textAnchor="middle"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: isMobile ? 14 : 16,
                  fill: "var(--foreground)",
                }}
              >
                {item}
              </text>
            </g>
          );
        })}

        {/* Animated connection curves */}
        {CONNECTIONS.map((conn, ci) => {
          const fromY = isMobile ? 120 + conn.from * 110 : 140 + conn.from * 80;
          const toY = isMobile ? 120 + conn.to * 110 : 140 + conn.to * 80;
          const d = `M ${leftX + 40} ${fromY} Q ${centerX} ${(fromY + toY) / 2} ${rightX - 40} ${toY}`;
          const isActive = activeConnection === ci;

          return (
            <g key={ci}>
              <motion.path
                d={d}
                fill="none"
                stroke={isActive ? "var(--accent)" : "var(--line)"}
                strokeWidth={isActive ? 2 : 1}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, opacity: isActive ? 1 : 0.3 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
              {!reducedMotion && isActive && (
                <motion.circle
                  r={8}
                  fill="var(--accent)"
                  animate={{ offsetDistance: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                  style={{ offsetPath: `path('${d}')` }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
