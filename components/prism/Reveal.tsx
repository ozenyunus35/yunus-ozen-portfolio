"use client";

import { motion, type Variants } from "framer-motion";
import { useMotionContext } from "@/components/motion/MotionProvider";
import { cn } from "@/lib/utils/cn";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
  amount?: number;
};

const getVariants = (direction: RevealProps["direction"], duration: number): Variants => {
  const offset = direction === "none" ? 0 : 32;
  const initial: Record<string, number> = { opacity: 0 };
  if (direction === "up") initial.y = offset;
  if (direction === "down") initial.y = -offset;
  if (direction === "left") initial.x = offset;
  if (direction === "right") initial.x = -offset;

  return {
    hidden: initial,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, ease: [0.22, 1, 0.36, 1] },
    },
  };
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.65,
  once = true,
  amount = 0.15,
}: RevealProps) {
  const { reducedMotion } = useMotionContext();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      variants={getVariants(direction, duration)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
};

export function StaggerReveal({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0.05,
}: StaggerProps) {
  const { reducedMotion } = useMotionContext();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
