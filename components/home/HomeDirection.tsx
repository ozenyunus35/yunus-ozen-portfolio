"use client";

import { exploringContent } from "@/lib/data/exploring";
import { KnowledgeGraph } from "@/components/exploring/KnowledgeGraph";

export function HomeDirection() {
  return (
    <section id="direction" className="relative border-t border-line py-[var(--space-2xl)]">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-padding)]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="text-mono text-accent">04 / CURRENT DIRECTION</span>
            <h2 className="text-h2 mt-6 font-display text-foreground">{exploringContent.heading}</h2>
            <p className="text-body mt-4 text-muted-foreground">
              {exploringContent.supporting[0]} {exploringContent.supporting[1]}
            </p>
          </div>
          <div className="lg:col-span-8">
            <KnowledgeGraph />
          </div>
        </div>
      </div>
    </section>
  );
}
