"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MOTION_EASE } from "@/lib/motion/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { cn } from "@/lib/utils/cn";

type MethodNode = {
  id: string;
  label: string;
  description: string;
  group: "product" | "engineering";
};

type AboutMethodMapProps = {
  method: Dictionary["method"];
};

export function AboutMethodMap({ method }: AboutMethodMapProps) {
  const reducedMotion = useReducedMotion();
  const nodes = useMemo<MethodNode[]>(
    () => [
      ...method.product.nodes.map((node) => ({ ...node, group: "product" as const })),
      ...method.engineering.nodes.map((node) => ({ ...node, group: "engineering" as const })),
    ],
    [method],
  );

  const [activeId, setActiveId] = useState(nodes[0]?.id ?? "");
  const active = nodes.find((node) => node.id === activeId) ?? nodes[0];

  return (
    <div>
      <div className="grid gap-10 lg:grid-cols-2">
        <NodeGroup
          title={method.product.title}
          nodes={nodes.filter((n) => n.group === "product")}
          activeId={activeId}
          onSelect={setActiveId}
        />
        <NodeGroup
          title={method.engineering.title}
          nodes={nodes.filter((n) => n.group === "engineering")}
          activeId={activeId}
          onSelect={setActiveId}
        />
      </div>

      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active.id}
            className="pro-panel mt-10 p-8"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: MOTION_EASE.out }}
          >
            <p className="text-meta accent-text">
              {active.group === "product" ? method.product.title : method.engineering.title}
            </p>
            <h3 className="text-h1 mt-3 font-display">{active.label}</h3>
            <p className="text-body mt-4 max-w-2xl text-muted-foreground">{active.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NodeGroup({
  title,
  nodes,
  activeId,
  onSelect,
}: {
  title: string;
  nodes: MethodNode[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <p className="text-meta text-muted-foreground">{title}</p>
      <ul className="mt-5 flex flex-wrap gap-2" role="list">
        {nodes.map((node) => {
          const selected = node.id === activeId;
          return (
            <li key={node.id}>
              <button
                type="button"
                onClick={() => onSelect(node.id)}
                aria-pressed={selected}
                className={cn(
                  "tag transition-colors duration-300",
                  selected
                    ? "border-[var(--accent)] bg-[var(--accent-subtle)] text-[var(--accent-light)]"
                    : "hover:border-[var(--accent-border)] hover:text-[var(--accent-light)]",
                )}
              >
                {node.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
