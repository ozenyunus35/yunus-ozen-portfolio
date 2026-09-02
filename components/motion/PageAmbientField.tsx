"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

const NODES = [
  { x: 12, y: 28 },
  { x: 28, y: 62 },
  { x: 46, y: 18 },
  { x: 64, y: 54 },
  { x: 78, y: 26 },
  { x: 88, y: 70 },
  { x: 18, y: 82 },
  { x: 54, y: 88 },
] as const;

type PageAmbientFieldProps = {
  className?: string;
  variant?: "field" | "signal";
};

export function PageAmbientField({ className, variant = "field" }: PageAmbientFieldProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion) return;

    function handleMove(event: MouseEvent) {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      setParallax({ x: nx * 22, y: ny * 16 });
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [reducedMotion]);

  const glowX = 50 + (reducedMotion ? 0 : parallax.x * 0.35);
  const glowY = 38 + (reducedMotion ? 0 : parallax.y * 0.4);

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 65% 55% at ${glowX}% ${glowY}%, color-mix(in srgb, var(--accent) 16%, transparent) 0%, transparent 72%)`,
        }}
      />

      <motion.div
        className="hero-grid absolute inset-[-48px] opacity-40"
        style={{
          transform: reducedMotion
            ? undefined
            : `translate(${parallax.x * 0.2}px, ${parallax.y * 0.2}px)`,
        }}
        animate={reducedMotion ? undefined : { opacity: [0.28, 0.46, 0.28] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {variant === "signal" && (
          <>
            <motion.path
              d="M 0 62 Q 28 38 52 56 T 100 42"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="0.18"
              strokeOpacity="0.35"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.path
              d="M 0 78 Q 36 58 64 72 T 100 60"
              fill="none"
              stroke="var(--accent-light)"
              strokeWidth="0.12"
              strokeOpacity="0.22"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            />
            {!reducedMotion && (
              <motion.circle
                r="0.7"
                fill="var(--accent-light)"
                animate={{ offsetDistance: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                style={{ offsetPath: "path('M 0 62 Q 28 38 52 56 T 100 42')" }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              />
            )}
          </>
        )}

        {NODES.map((node, i) => (
          <motion.circle
            key={`${node.x}-${node.y}`}
            cx={node.x}
            cy={node.y}
            r={i % 3 === 0 ? 0.55 : 0.38}
            fill="var(--accent-light)"
            initial={{ opacity: 0 }}
            animate={
              reducedMotion
                ? { opacity: 0.35 }
                : { opacity: [0.18, 0.7, 0.18], r: [0.32, 0.55, 0.32] }
            }
            transition={{ duration: 3.4 + i * 0.25, repeat: Infinity, delay: i * 0.18 }}
            style={{
              transform: reducedMotion
                ? undefined
                : `translate(${parallax.x * 0.04}px, ${parallax.y * 0.04}px)`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
