"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Milestone = Dictionary["journey"]["milestones"][number];

type TimelineProProps = {
  milestones: readonly Milestone[];
  path: (href: string) => string;
};

export function TimelinePro({ milestones, path }: TimelineProProps) {
  return (
    <div className="relative">
      <div className="absolute left-[5px] top-2 bottom-2 w-px bg-[var(--line)]" aria-hidden="true" />
      <ol className="space-y-0" role="list">
        {milestones.map((m, i) => (
          <motion.li
            key={m.id}
            className="relative grid grid-cols-[12px_1fr] gap-x-8 py-8 first:pt-0 last:pb-0"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.06, duration: 0.45 }}
          >
            <div className="relative flex justify-center pt-1.5">
              <span
                className="relative z-10 block h-[9px] w-[9px] rounded-full border border-[var(--line-strong)] bg-[var(--ink-muted)]"
                style={{
                  background: m.type === "project" ? "var(--accent)" : undefined,
                  borderColor: m.type === "project" ? "var(--accent)" : undefined,
                }}
              />
            </div>
            <div>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-meta text-muted-foreground">{m.period}</span>
                {m.context && (
                  <span className="text-meta text-muted-foreground/70">{m.context}</span>
                )}
              </div>
              {"href" in m && m.href && m.type === "project" ? (
                <Link href={path(m.href)} className="text-h1 mt-2 inline-block hover:text-[var(--accent-light)]">
                  {m.title}
                </Link>
              ) : (
                <h3 className="text-h1 mt-2">{m.title}</h3>
              )}
              <p className="text-body mt-3 max-w-prose text-muted-foreground">{m.description}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
