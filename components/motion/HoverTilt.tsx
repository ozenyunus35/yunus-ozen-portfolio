"use client";

import { useRef, type ReactNode } from "react";
import { useMotionContext } from "@/components/motion/MotionProvider";
import { cn } from "@/lib/utils/cn";

type HoverTiltProps = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
};

export function HoverTilt({ children, className, maxTilt = 7 }: HoverTiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion, isMobile } = useMotionContext();
  const disabled = reducedMotion || isMobile;

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    if (disabled || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    ref.current.style.transform = `perspective(1000px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg) scale3d(1.012, 1.012, 1.012)`;
  }

  function handleLeave() {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[transform,box-shadow] duration-300 ease-out will-change-transform",
        !disabled && "hover:shadow-[0_24px_80px_color-mix(in_srgb,var(--accent)_18%,transparent)]",
        className,
      )}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
