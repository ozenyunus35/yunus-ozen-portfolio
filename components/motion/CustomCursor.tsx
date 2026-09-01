"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion/gsap";
import { useMotionConfig } from "@/lib/motion/useMotionConfig";

type CursorMode = "default" | "project" | "external";

const CURSOR_LABELS: Record<CursorMode, string | null> = {
  default: null,
  project: "VIEW CASE",
  external: "OPEN ↗",
};

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const { customCursor } = useMotionConfig();

  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const mode = useRef<CursorMode>("default");
  const visible = useRef(false);

  useEffect(() => {
    if (!customCursor) return;

    document.documentElement.dataset.customCursor = "true";

    const cursor = cursorRef.current;
    const label = labelRef.current;
    const dot = dotRef.current;
    if (!cursor || !label || !dot) return;

    const cursorEl = cursor;
    const labelEl = label;
    const dotEl = dot;

    const xSet = gsap.quickSetter(cursorEl, "x", "px");
    const ySet = gsap.quickSetter(cursorEl, "y", "px");

    function setMode(next: CursorMode) {
      if (mode.current === next) return;
      mode.current = next;
      const text = CURSOR_LABELS[next];
      labelEl.textContent = text ?? "";
      labelEl.style.opacity = text ? "1" : "0";
      dotEl.style.transform = text ? "scale(2.5)" : "scale(1)";
    }

    function handleMouseMove(event: MouseEvent) {
      target.current = { x: event.clientX, y: event.clientY };

      if (!visible.current) {
        visible.current = true;
        cursorEl.style.opacity = "1";
      }

      const interactive = (event.target as Element | null)?.closest<HTMLElement>(
        "[data-cursor]",
      );

      if (interactive?.dataset.cursor) {
        setMode(interactive.dataset.cursor as CursorMode);
      } else {
        setMode("default");
      }
    }

    function handleMouseLeave() {
      visible.current = false;
      cursorEl.style.opacity = "0";
    }

    function handleMouseEnter() {
      visible.current = true;
      cursorEl.style.opacity = "1";
    }

    let rafId = 0;

    function tick() {
      position.current.x += (target.current.x - position.current.x) * 0.18;
      position.current.y += (target.current.y - position.current.y) * 0.18;
      xSet(position.current.x);
      ySet(position.current.y);
      rafId = requestAnimationFrame(tick);
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);
    rafId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(rafId);
      delete document.documentElement.dataset.customCursor;
    };
  }, [customCursor]);

  if (!customCursor) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9998] opacity-0"
      aria-hidden="true"
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        <span
          ref={dotRef}
          className="block h-2 w-2 rounded-full bg-accent transition-transform duration-300"
        />
        <span
          ref={labelRef}
          className="text-label absolute top-4 left-3 whitespace-nowrap text-accent opacity-0 transition-opacity duration-200"
        />
      </div>
    </div>
  );
}
