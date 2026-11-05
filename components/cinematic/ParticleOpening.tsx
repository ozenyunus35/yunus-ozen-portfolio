"use client";

import { useEffect, useRef } from "react";

type Dot = { sx: number; sy: number; hx: number; hy: number; r: number; a: number; c: number; delay: number; phase: number; ox: number; oy: number };

const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;

/**
 * Hero opening: dots burst out from behind the headline and settle into two soft clouds at the left and right edges,
 * leaving the text clear. The cursor pushes dots aside. Colours come from the theme (--dot-a/b/c) and follow a theme
 * switch. It pauses off screen, and with reduced motion it draws the settled field once, without movement.
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
    let colours = ["#9b98f2", "#8db2ff", "#e2a7da"];
    let dark = false;
    const mouse = { x: -1e4, y: -1e4 };

    const readColours = () => {
      const cs = getComputedStyle(canvas);
      colours = ["--dot-a", "--dot-b", "--dot-c"].map((v, i) => cs.getPropertyValue(v).trim() || colours[i]);
      dark = document.documentElement.dataset.theme === "dark";
    };

    let opened = false;
    // The burst plays once; a later resize (fonts loading, a phone's address bar) only re-lays the settled field.
    const build = () => {
      const narrow = w < 640;
      const count = Math.min(2200, Math.round((w * h) / (narrow ? 1700 : 820)));
      dots = [];
      while (dots.length < count) {
        // Distance from the nearer edge, mostly small: two clouds that thin out towards the middle. The right one is fuller.
        const right = Math.random() < 0.62;
        const d = Math.abs(gauss()) * (narrow ? 0.2 : 0.3);
        if (d > 0.48) continue;
        const hx = (right ? 1 - d : d) * w;
        const hy = h * (right ? 0.45 : 0.6) + gauss() * h * 0.42;
        if (hy < 0 || hy > h) continue;
        const edge = 1 - d / 0.48;
        dots.push({
          sx: opened ? hx : w * 0.5 + gauss() * w * 0.08,
          sy: opened ? hy : h * 0.42 + gauss() * h * 0.08,
          hx,
          hy,
          r: 0.6 + Math.random() * 1.4,
          a: (0.35 + Math.random() * 0.65) * (0.3 + 0.7 * edge),
          c: Math.random() < 0.12 ? 2 : Math.random() < 0.55 ? 0 : 1,
          delay: Math.random() * 380,
          phase: Math.random() * Math.PI * 2,
          ox: 0,
          oy: 0,
        });
      }
      if (!opened) born = performance.now();
      opened = true;
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      const t = now - born;
      const boost = dark ? 1 : 1.15;
      for (const d of dots) {
        const p = Math.min(1, Math.max(0, (t - d.delay) / 1200));
        const e = 1 - Math.pow(1 - p, 4);
        let x = d.sx + (d.hx - d.sx) * e + (reduced ? 0 : Math.sin(now * 0.0004 + d.phase) * 4 * e);
        let y = d.sy + (d.hy - d.sy) * e + (reduced ? 0 : Math.cos(now * 0.00032 + d.phase) * 4 * e);
        if (fine && !reduced) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.hypot(dx, dy);
          const push = dist < 120 ? (120 - dist) / 120 : 0;
          d.ox += ((dx / (dist || 1)) * push * 30 - d.ox) * 0.12;
          d.oy += ((dy / (dist || 1)) * push * 30 - d.oy) * 0.12;
          x += d.ox;
          y += d.oy;
        }
        ctx.globalAlpha = Math.min(1, d.a * boost * (0.4 + 0.6 * e));
        ctx.fillStyle = colours[d.c];
        ctx.beginPath();
        ctx.arc(x, y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
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

    readColours();
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => play(entry.isIntersecting && !document.hidden));
    io.observe(canvas);
    const mo = new MutationObserver(() => {
      readColours();
      if (reduced) draw(born + 1e5);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
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
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}
