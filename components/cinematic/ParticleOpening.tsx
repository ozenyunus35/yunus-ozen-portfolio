"use client";

import { useEffect, useRef } from "react";

type Dot = { sx: number; sy: number; hx: number; hy: number; r: number; a: number; delay: number; phase: number; ox: number; oy: number };

const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;

/**
 * Hero opening: a cloud of dots bursts from one point and settles into a field that is denser on the right,
 * away from the name, in a band from the lower left to the upper right. The cursor pushes dots aside. It pauses off screen and draws the settled field once,
 * without any movement, when reduced motion is on.
 */
export function ParticleOpening() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    let w = 0;
    let h = 0;
    let dots: Dot[] = [];
    let born = performance.now();
    let frame = 0;
    let running = false;
    const mouse = { x: -1e4, y: -1e4 };

    let opened = false;
    // The burst plays once; a later resize (fonts loading, a phone's address bar) only re-lays the settled field.
    const build = () => {
      const count = Math.min(2400, Math.round((w * h) / (w < 640 ? 1500 : 700)));
      dots = [];
      while (dots.length < count) {
        // A band that sweeps from the lower left to the upper right, thicker and denser on the right.
        const u = Math.random();
        if (Math.random() > 0.05 + 0.95 * u * u) continue;
        const hx = u * w;
        const hy = h * (0.97 - 0.62 * u) + gauss() * h * (0.04 + 0.16 * u);
        if (hy < 0 || hy > h) continue;
        dots.push({ sx: opened ? hx : w * 0.72 + gauss() * 50, sy: opened ? hy : h * 0.5 + gauss() * 50, hx, hy, r: 0.6 + Math.random() * 1.2, a: (0.3 + Math.random() * 0.6) * (0.35 + 0.65 * u), delay: Math.random() * 600, phase: Math.random() * Math.PI * 2, ox: 0, oy: 0 });
      }
      if (!opened) born = performance.now();
      opened = true;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (opened && rect.width === w && Math.abs(rect.height - h) < 120) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      if (reduced) draw(born + 1e5);
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      const t = now - born;
      for (const d of dots) {
        const p = Math.min(1, Math.max(0, (t - d.delay) / 1700));
        const e = 1 - Math.pow(1 - p, 4);
        let x = d.sx + (d.hx - d.sx) * e + (reduced ? 0 : Math.sin(now * 0.0003 + d.phase) * 3 * e);
        let y = d.sy + (d.hy - d.sy) * e + (reduced ? 0 : Math.cos(now * 0.00025 + d.phase) * 3 * e);
        if (fine && !reduced) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.hypot(dx, dy);
          const push = dist < 110 ? (110 - dist) / 110 : 0;
          d.ox += ((dx / (dist || 1)) * push * 28 - d.ox) * 0.12;
          d.oy += ((dy / (dist || 1)) * push * 28 - d.oy) * 0.12;
          x += d.ox;
          y += d.oy;
        }
        ctx.globalAlpha = d.a * (0.35 + 0.65 * e);
        ctx.fillStyle = d.r > 1.2 ? "#93c5fd" : "#60a5fa";
        ctx.beginPath();
        ctx.arc(x, y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      draw(now);
      frame = requestAnimationFrame(loop);
    };
    const play = (on: boolean) => {
      if (reduced || on === running) return;
      running = on;
      if (on) frame = requestAnimationFrame(loop);
      else cancelAnimationFrame(frame);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => play(entry.isIntersecting && !document.hidden));
    io.observe(canvas);
    const onVisibility = () => play(!document.hidden);
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -1e4;
    };
    document.addEventListener("visibilitychange", onVisibility);
    if (fine) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
    }
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}
