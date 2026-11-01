"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { SchematicGlowDefs } from "@/components/motion/SchematicGlowDefs";

/** Node positions in percent of the 1100 × 600 view box. */
const NODES = [
  { x: 8, y: 22, r: 3 },
  { x: 22, y: 48, r: 4 },
  { x: 38, y: 18, r: 3 },
  { x: 52, y: 62, r: 5 },
  { x: 68, y: 28, r: 3 },
  { x: 82, y: 72, r: 4 },
  { x: 92, y: 38, r: 3 },
  { x: 15, y: 78, r: 3 },
  { x: 45, y: 88, r: 4 },
  { x: 75, y: 12, r: 3 },
] as const;

const CONNECTIONS = [
  [0, 2], [1, 3], [2, 4], [3, 5], [4, 6],
  [0, 7], [1, 8], [3, 8], [5, 9], [6, 9], [2, 7], [4, 5],
] as const;

const ORBITS = [
  "M 80 120 Q 320 40 560 180 T 920 280",
  "M 40 380 Q 280 260 520 340 T 960 220",
  "M 160 480 Q 420 320 680 400 T 1040 160",
];

const W = 1100;
const H = 600;
const px = (n: { x: number; y: number }) => ({ x: (n.x / 100) * W, y: (n.y / 100) * H });

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/**
 * Hero background: a grid, three orbits and a pulsing node network. All loops
 * are CSS animations; the cursor parallax writes CSS variables on the container,
 * and everything pauses while the hero is off screen.
 */
export function ImmersiveHeroField() {
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
      nx = event.clientX / window.innerWidth - 0.5;
      ny = event.clientY / window.innerHeight - 0.5;
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
    <div ref={containerRef} className="hero-field pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 45%, color-mix(in srgb, var(--accent) 14%, transparent) 0%, transparent 70%)",
        }}
      />

      <div className="hero-grid hero-layer-grid absolute inset-[-60px]" />

      <svg className="hero-layer-net absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice">
        <defs>
          <SchematicGlowDefs />
          <linearGradient id="orbit-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {ORBITS.map((d, i) => (
          <path
            key={d}
            d={d}
            pathLength={1}
            className="hero-orbit"
            fill="none"
            stroke={i === 0 ? "url(#orbit-gradient)" : "var(--line-strong)"}
            strokeWidth={i === 0 ? 1.5 : 1}
            strokeOpacity={i === 0 ? 1 : 0.25}
            style={{ animationDuration: `${1.6 + i * 0.3}s`, animationDelay: `${i * 0.15}s` }}
          />
        ))}

        {CONNECTIONS.map(([from, to], i) => {
          const a = px(NODES[from]);
          const b = px(NODES[to]);
          return (
            <line
              key={`${from}-${to}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              className="hero-link"
              stroke="var(--accent)"
              strokeWidth="1"
              style={{ animationDuration: `${4 + i * 0.3}s` }}
            />
          );
        })}

        {NODES.map((node, i) => {
          const p = px(node);
          return (
            <g key={i}>
              <circle
                cx={p.x}
                cy={p.y}
                r={node.r * 4}
                className="hero-halo"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1"
                strokeOpacity="0.2"
                style={{ animationDuration: `${5 + i * 0.4}s` }}
              />
              <circle
                cx={p.x}
                cy={p.y}
                r={node.r}
                className="hero-node"
                fill="var(--accent)"
                filter="url(#schematic-glow)"
                style={{ animationDuration: `${3 + i * 0.25}s` }}
              />
            </g>
          );
        })}

        {CONNECTIONS.slice(0, 6).map(([from, to], i) => {
          const a = px(NODES[from]);
          const b = px(NODES[to]);
          const vars: Vars = {
            "--dx": `${b.x - a.x}px`,
            "--dy": `${b.y - a.y}px`,
            animationDuration: `${2.5 + i * 0.35}s`,
            animationDelay: `${i * 0.6}s`,
          };
          return (
            <circle
              key={`pulse-${from}-${to}`}
              cx={a.x}
              cy={a.y}
              r="4"
              className="hero-pulse"
              fill="var(--accent)"
              filter="url(#schematic-glow)"
              style={vars}
            />
          );
        })}
      </svg>

      <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-transparent to-[var(--background)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)]/80 via-transparent to-[var(--background)]/60" />
    </div>
  );
}
