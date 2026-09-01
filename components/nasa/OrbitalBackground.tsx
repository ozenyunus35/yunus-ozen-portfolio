"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils/cn";

export function OrbitalBackground() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Atmospheric gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />

      {/* Orbital rings */}
      <svg
        className={cn(
          "absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 opacity-20",
          !reducedMotion && "nasa-orbit-slow",
        )}
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle
          cx="200"
          cy="200"
          r="160"
          stroke="var(--accent)"
          strokeWidth="0.5"
          strokeOpacity="0.4"
        />
        <circle
          cx="200"
          cy="200"
          r="120"
          stroke="var(--border)"
          strokeWidth="0.5"
        />
        <circle
          cx="200"
          cy="200"
          r="80"
          stroke="var(--accent)"
          strokeWidth="0.5"
          strokeOpacity="0.3"
        />
        <ellipse
          cx="200"
          cy="200"
          rx="180"
          ry="60"
          stroke="var(--border)"
          strokeWidth="0.5"
          transform="rotate(-20 200 200)"
        />
      </svg>

      <svg
        className={cn(
          "absolute right-0 top-0 h-full w-1/2 opacity-10",
          !reducedMotion && "nasa-orbit-reverse",
        )}
        viewBox="0 0 200 400"
        fill="none"
        aria-hidden="true"
      >
        <line x1="0" y1="0" x2="200" y2="400" stroke="var(--border)" strokeWidth="0.5" />
        <line x1="50" y1="0" x2="200" y2="350" stroke="var(--border)" strokeWidth="0.5" />
        <line x1="100" y1="0" x2="200" y2="300" stroke="var(--border)" strokeWidth="0.5" />
      </svg>

      {/* Subtle particles */}
      <div className="nasa-particles absolute inset-0 opacity-30" />
    </div>
  );
}
