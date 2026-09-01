"use client";

import { motion } from "framer-motion";
import { aboutContent } from "@/lib/data/about";
import { positioningContent } from "@/lib/data/site";
import { SectionChapter } from "@/components/continuum/SectionChapter";

export function AboutEditorial() {
  return (
    <div>
      <SectionChapter theme="warm" className="pt-24 pb-[var(--space-xl)] md:pt-28">
        <div className="container-editorial">
          <p className="text-meta text-[var(--continuum)]">About</p>
          <h1 className="text-section mt-10 max-w-4xl font-display leading-[0.9]">
            Product thinking
            <br />
            <span className="text-muted-foreground">with engineering depth.</span>
          </h1>
        </div>
      </SectionChapter>

      <SectionChapter theme="paper" className="py-[var(--space-xl)]">
        <div className="container-editorial editorial-grid">
          <blockquote className="col-span-12 lg:col-span-7">
            <p className="text-statement">{aboutContent.positioning[0]}</p>
            <p className="text-statement mt-6 text-muted-foreground">{aboutContent.positioning[1]}</p>
          </blockquote>
          <div className="col-span-12 mt-12 space-y-6 lg:col-span-4 lg:col-start-9 lg:mt-0">
            {aboutContent.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="text-body text-muted-foreground">{p}</p>
            ))}
          </div>
        </div>
      </SectionChapter>

      <SectionChapter theme="paper" className="pb-[var(--space-2xl)]">
        <div className="container-editorial">
          <p className="text-meta text-[var(--continuum)]">Three dimensions</p>
          <div className="relative mt-16 min-h-[420px]">
            <svg viewBox="0 0 900 460" className="w-full" role="img" aria-label="Product, Project, Engineering">
              {positioningContent.columns.map((col, i) => {
                const pos = [
                  { x: 450, y: 80, size: 52 },
                  { x: 160, y: 360, size: 40 },
                  { x: 740, y: 360, size: 40 },
                ][i];
                return (
                  <g key={col.title}>
                    <motion.circle
                      cx={pos.x}
                      cy={pos.y}
                      r="90"
                      fill="none"
                      stroke="var(--line-strong)"
                      strokeWidth="1"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 0.5 }}
                      viewport={{ once: true }}
                    />
                    <text
                      x={pos.x}
                      y={pos.y + 8}
                      textAnchor="middle"
                      style={{ fontFamily: "var(--font-syne)", fontSize: pos.size, fontWeight: 600, fill: "var(--foreground)" }}
                    >
                      {col.title}
                    </text>
                  </g>
                );
              })}
              <motion.path
                d="M 450 170 L 160 290 M 450 170 L 740 290 M 220 360 L 680 360"
                fill="none"
                stroke="var(--continuum)"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
              />
            </svg>
          </div>

          <dl className="mt-[var(--space-lg)] grid gap-10 sm:grid-cols-3">
            {aboutContent.meta.map((item) => (
              <div key={item.label}>
                <dt className="text-meta text-muted-foreground">{item.label}</dt>
                <dd className="text-body mt-2">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </SectionChapter>
    </div>
  );
}
