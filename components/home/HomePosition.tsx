"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { positioningContent } from "@/lib/data/site";

export function HomePosition() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 0.6], ["0%", "100%"]);

  return (
    <section id="position" ref={ref} className="relative py-[var(--space-2xl)]">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-padding)]">
        <span className="text-mono text-accent">02 / Position</span>

        <div className="mt-12 grid grid-cols-1 gap-16 lg:grid-cols-12">
          <h2 className="text-section font-display leading-[0.92] text-foreground lg:col-span-8">
            I don&apos;t just
            <br />
            build products.
            <br />
            <span className="text-muted-foreground">I design how they work.</span>
          </h2>

          <p className="text-body self-end text-muted-foreground lg:col-span-4">
            {positioningContent.statement[0]}{" "}
            {positioningContent.statement[1]}
          </p>
        </div>

        {/* Large domain words */}
        <div className="relative mt-[var(--space-xl)] flex min-h-[40vh] items-center justify-center overflow-hidden">
          <svg
            viewBox="0 0 900 400"
            className="w-full max-w-5xl"
            role="img"
            aria-label="Product, Project, and Engineering intersection"
          >
            <motion.path
              d="M 150 200 Q 450 80 750 200 Q 450 320 150 200"
              fill="none"
              stroke="var(--line-strong)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.path
              d="M 300 100 L 600 300"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, delay: 0.4 }}
            />
            <motion.path
              d="M 600 100 L 300 300"
              fill="none"
              stroke="var(--line)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, delay: 0.6 }}
            />

            {positioningContent.columns.map((col, i) => {
              const positions = [
                { x: 450, y: 70 },
                { x: 130, y: 280 },
                { x: 770, y: 280 },
              ];
              const pos = positions[i];
              return (
                <text
                  key={col.title}
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontSize: i === 0 ? 52 : 40,
                    fontWeight: 600,
                    fill: i === 0 ? "var(--foreground)" : "var(--muted-foreground)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {col.title}
                </text>
              );
            })}
          </svg>
        </div>

        <motion.div
          className="mt-12 h-px bg-accent"
          style={{ width: lineWidth }}
        />
      </div>
    </section>
  );
}
