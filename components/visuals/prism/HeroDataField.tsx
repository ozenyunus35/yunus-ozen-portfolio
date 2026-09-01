"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useMotionContext } from "@/components/motion/MotionProvider";

const NODES = [
  { x: 15, y: 25, label: "UX" },
  { x: 35, y: 15, label: "API" },
  { x: 55, y: 30, label: "DATA" },
  { x: 75, y: 18, label: "PM" },
  { x: 85, y: 45, label: "SYS" },
  { x: 65, y: 55, label: "FE" },
  { x: 45, y: 65, label: "BE" },
  { x: 25, y: 55, label: "QA" },
  { x: 50, y: 42, label: "YOU" },
];

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0],
  [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8],
  [2, 5], [1, 6], [3, 7],
];

export function HeroDataField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { reducedMotion } = useMotionContext();

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };

    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.03,
      vy: (Math.random() - 0.5) * 0.03,
      size: Math.random() * 1.5 + 0.5,
    }));

    const draw = () => {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 100) p.vx *= -1;
        if (p.y < 0 || p.y > 100) p.vy *= -1;

        const px = (p.x / 100) * w;
        const py = (p.y / 100) * h;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${0.15 + Math.sin(t + p.x) * 0.1})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 18) {
            const alpha = (1 - dist / 18) * 0.12;
            ctx.beginPath();
            ctx.moveTo((particles[i].x / 100) * w, (particles[i].y / 100) * h);
            ctx.lineTo((particles[j].x / 100) * w, (particles[j].y / 100) * h);
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      t += 0.02;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {!reducedMotion && (
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      )}

      <svg
        viewBox="0 0 100 70"
        className="relative h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
          </linearGradient>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {EDGES.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke="url(#edgeGrad)"
            strokeWidth="0.15"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 1.2, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}

        {NODES.map((node, i) => (
          <g key={node.label}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.label === "YOU" ? 2.5 : 1.2}
              fill={node.label === "YOU" ? "url(#nodeGlow)" : "#3b82f6"}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: node.label === "YOU" ? 1 : 0.7 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.06, ease: [0.34, 1.56, 0.64, 1] }}
            />
            {node.label === "YOU" && (
              <motion.text
                x={node.x}
                y={node.y - 4}
                textAnchor="middle"
                fill="#60a5fa"
                fontSize="2.5"
                fontFamily="monospace"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                CORE
              </motion.text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
