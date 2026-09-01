"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { productEngineeringContent } from "@/lib/data/product-engineering";
import { MOTION_DURATION } from "@/lib/motion/constants";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils/cn";

const HIGHLIGHT_CHAINS: string[][] = [
  ["business", "api", "backend", "database"],
  ["ux", "ui-ux", "frontend"],
  ["data", "backend", "database"],
];

type ConceptNodeButtonProps = {
  id: string;
  label: string;
  description: string;
  isActive: boolean;
  isMobile: boolean;
  onToggle: (id: string) => void;
};

function ConceptNodeButton({
  id,
  label,
  description,
  isActive,
  isMobile,
  onToggle,
}: ConceptNodeButtonProps) {
  return (
    <button
      type="button"
      id={`concept-${id}`}
      aria-expanded={isMobile ? isActive : undefined}
      aria-controls={`concept-desc-${id}`}
      onClick={() => isMobile && onToggle(id)}
      className={cn(
        "group/concept w-full border border-border bg-surface px-4 py-3 text-left",
        "transition-all duration-300 hover:border-accent/50 hover:bg-surface-elevated",
        isMobile && isActive && "border-accent/60 bg-surface-elevated",
      )}
    >
      <span className="text-label text-foreground">{label}</span>
      <p
        id={`concept-desc-${id}`}
        className={cn(
          "text-small mt-2 text-muted-foreground transition-all duration-300",
          isMobile
            ? cn("grid", isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")
            : "max-h-0 overflow-hidden opacity-0 group-hover/concept:max-h-28 group-hover/concept:opacity-100",
        )}
      >
        <span className={cn(isMobile && "overflow-hidden")}>{description}</span>
      </p>
    </button>
  );
}

export function ConceptMap() {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [chainIndex, setChainIndex] = useState(0);

  const { product, engineering, headline } = productEngineeringContent;
  const activeChain = HIGHLIGHT_CHAINS[chainIndex];

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => {
      setChainIndex((i) => (i + 1) % HIGHLIGHT_CHAINS.length);
    }, 4000);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  function isInChain(id: string) {
    return activeChain.includes(id);
  }

  return (
    <div className="relative">
      <div className="mb-12 text-center md:mb-16">
        <h2 id="product-engineering-heading" className="text-h2 text-foreground">
          {headline[0]}
        </h2>
        <p className="text-h2 mt-1 text-muted-foreground">{headline[1]}</p>
      </div>

      <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
        <div>
          <h3 className="text-label mb-6 border-b border-border pb-4 text-accent">
            {product.title}
          </h3>
          <div className="flex flex-col gap-3">
            {product.nodes.map((node) => (
              <motion.div
                key={node.id}
                animate={
                  !reducedMotion && isInChain(node.id)
                    ? { borderColor: "rgba(196, 184, 150, 0.5)" }
                    : {}
                }
              >
                <ConceptNodeButton
                  {...node}
                  isMobile={isMobile}
                  isActive={activeNode === node.id}
                  onToggle={(id) =>
                    setActiveNode((prev) => (prev === id ? null : id))
                  }
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-label mb-6 border-b border-border pb-4 text-accent">
            {engineering.title}
          </h3>
          <div className="flex flex-col gap-3">
            {engineering.nodes.map((node) => (
              <motion.div
                key={node.id}
                animate={
                  !reducedMotion && isInChain(node.id)
                    ? { borderColor: "rgba(196, 184, 150, 0.5)" }
                    : {}
                }
              >
                <ConceptNodeButton
                  {...node}
                  isMobile={isMobile}
                  isActive={activeNode === node.id}
                  onToggle={(id) =>
                    setActiveNode((prev) => (prev === id ? null : id))
                  }
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {!reducedMotion && (
        <motion.p
          key={chainIndex}
          className="text-mono mt-8 text-center text-muted-foreground md:mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: MOTION_DURATION.fast }}
        >
          {activeChain
            .map((id) => {
              const all = [...product.nodes, ...engineering.nodes];
              return all.find((n) => n.id === id)?.label ?? id;
            })
            .join(" → ")}
        </motion.p>
      )}

      <p className="text-mono mt-4 text-center text-muted-foreground">
        Product decisions inform engineering. Engineering constraints shape product.
      </p>
    </div>
  );
}
