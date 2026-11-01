"use client";

import { useEffect, useRef } from "react";
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

const SIGNAL_PATH = "M 0 62 Q 28 38 52 56 T 100 42";

type PageAmbientFieldProps = {
  className?: string;
  variant?: "field" | "signal";
};

/** Quiet background for page headers. CSS loops only, paused off screen; the glow follows the cursor via CSS variables. */
export function PageAmbientField({ className, variant = "field" }: PageAmbientFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => {
      el.dataset.paused = String(!entry.isIntersecting);
    });
    io.observe(el);

    if (!matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) {
      return () => io.disconnect();
    }

    let frame = 0;
    let nx = 0;
    let ny = 0;
    const apply = () => {
      frame = 0;
      el.style.setProperty("--px", nx.toFixed(3));
      el.style.setProperty("--py", ny.toFixed(3));
    };
    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      nx = (event.clientX - rect.left) / rect.width - 0.5;
      ny = (event.clientY - rect.top) / rect.height - 0.5;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("hero-field ambient-field pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <div className="ambient-glow absolute inset-0" />
      <div className="hero-grid hero-layer-grid absolute inset-[-48px]" />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {variant === "signal" && (
          <>
            <path
              d={SIGNAL_PATH}
              pathLength={1}
              className="hero-orbit"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="0.18"
              strokeOpacity="0.35"
              style={{ animationDuration: "1.4s" }}
            />
            <path
              d="M 0 78 Q 36 58 64 72 T 100 60"
              pathLength={1}
              className="hero-orbit"
              fill="none"
              stroke="var(--accent-light)"
              strokeWidth="0.12"
              strokeOpacity="0.22"
              style={{ animationDuration: "1.7s", animationDelay: "0.15s" }}
            />
            <circle r="0.7" className="ambient-traveller" fill="var(--accent-light)" style={{ offsetPath: `path('${SIGNAL_PATH}')` }} />
          </>
        )}

        {NODES.map((node, i) => (
          <circle
            key={`${node.x}-${node.y}`}
            cx={node.x}
            cy={node.y}
            r={i % 3 === 0 ? 0.55 : 0.38}
            className="hero-node"
            fill="var(--accent-light)"
            style={{ animationDuration: `${3.4 + i * 0.25}s`, animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </svg>
    </div>
  );
}
