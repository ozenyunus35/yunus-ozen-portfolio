"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function GlobalSystemField() {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion) return;
    function onMove(e: MouseEvent) {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      setOffset({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 8,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 6,
      });
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Layer 1: large subtle grid */}
      <motion.div
        className="absolute inset-[-5%] opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)
          `,
          backgroundSize: "160px 160px",
        }}
        animate={reducedMotion ? undefined : { x: [0, 80, 0], y: [0, 60, 0] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* Layer 2–3: large architectural paths */}
      <motion.svg
        className="absolute inset-0 h-full w-full opacity-40"
        preserveAspectRatio="none"
        style={{
          transform: reducedMotion
            ? undefined
            : `translate(${offset.x}px, ${offset.y}px)`,
        }}
      >
        <motion.path
          d="M -5% 30% Q 30% 20% 60% 35% T 105% 25%"
          fill="none"
          stroke="var(--line-strong)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M -5% 70% Q 40% 55% 70% 65% T 105% 50%"
          fill="none"
          stroke="var(--line)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.svg>

      {/* Layer 4: vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/80" />
    </div>
  );
}
