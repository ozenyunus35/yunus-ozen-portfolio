"use client";

import { motion } from "framer-motion";
import { aboutContent } from "@/lib/data/about";
import { positioningContent } from "@/lib/data/site";

export function AboutVisualMap() {
  const domains = positioningContent.columns;

  return (
    <div>
      <header className="px-[var(--container-padding)] py-[var(--space-xl)]">
        <div className="mx-auto max-w-[var(--container-max)]">
          <span className="text-mono text-accent">02 / About</span>
          <h1 className="text-section mt-8 font-display leading-[0.92] text-foreground">
            Who I am
          </h1>
        </div>
      </header>

      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-padding)] pb-[var(--space-2xl)]">
        <blockquote className="max-w-4xl">
          <p className="text-statement font-display leading-[1.02] text-foreground">
            {aboutContent.positioning[0]}
          </p>
          <p className="text-statement mt-4 font-display leading-[1.02] text-muted-foreground">
            {aboutContent.positioning[1]}
          </p>
        </blockquote>

        <div className="mt-12 max-w-2xl space-y-6">
          {aboutContent.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="text-body text-muted-foreground">
              {p}
            </p>
          ))}
        </div>

        {/* Large spatial capability map */}
        <div className="relative mt-[var(--space-xl)] min-h-[50vh]">
          <svg
            viewBox="0 0 900 500"
            className="w-full"
            role="img"
            aria-label="Product, Project, and Engineering capability map"
          >
            {domains.map((domain, i) => {
              const positions = [
                { x: 450, y: 100, size: 56 },
                { x: 180, y: 380, size: 44 },
                { x: 720, y: 380, size: 44 },
              ];
              const pos = positions[i];
              return (
                <g key={domain.title}>
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r={80}
                    fill="none"
                    stroke="var(--line-strong)"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.4 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.2 }}
                  />
                  <text
                    x={pos.x}
                    y={pos.y + 8}
                    textAnchor="middle"
                    style={{
                      fontFamily: "var(--font-syne)",
                      fontSize: pos.size,
                      fontWeight: 600,
                      fill: "var(--foreground)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {domain.title}
                  </text>
                </g>
              );
            })}

            <motion.line
              x1="450"
              y1="180"
              x2="180"
              y2="300"
              stroke="var(--accent)"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <motion.line
              x1="450"
              y1="180"
              x2="720"
              y2="300"
              stroke="var(--line-strong)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.7 }}
            />
            <motion.line
              x1="260"
              y1="380"
              x2="640"
              y2="380"
              stroke="var(--line)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.9 }}
            />
          </svg>
        </div>

        <dl className="mt-[var(--space-lg)] grid grid-cols-1 gap-10 sm:grid-cols-3">
          {aboutContent.meta.map((item) => (
            <div key={item.label}>
              <dt className="text-mono text-muted-foreground">{item.label}</dt>
              <dd className="text-body mt-2 text-foreground">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
