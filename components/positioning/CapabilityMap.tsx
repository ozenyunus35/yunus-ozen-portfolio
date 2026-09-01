"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { positioningContent } from "@/lib/data/site";
import { MOTION_DURATION } from "@/lib/motion/constants";
import { cn } from "@/lib/utils/cn";

const RELATIONS = [
  { from: 0, to: 1, itemFrom: 0, itemTo: 1 },
  { from: 1, to: 2, itemFrom: 1, itemTo: 2 },
  { from: 0, to: 2, itemFrom: 2, itemTo: 0 },
] as const;

type CapabilityMapProps = {
  className?: string;
};

export function CapabilityMap({ className }: CapabilityMapProps) {
  const reducedMotion = useReducedMotion();
  const [activeRelation, setActiveRelation] = useState(0);
  const columns = positioningContent.columns;

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => {
      setActiveRelation((r) => (r + 1) % RELATIONS.length);
    }, 3200);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  const relation = RELATIONS[activeRelation];

  return (
    <div className={cn("relative", className)}>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
        {columns.map((column, colIndex) => (
          <div key={column.title} className="relative flex flex-col gap-6">
            <h3 className="text-label text-accent">{column.title}</h3>
            <ul className="flex flex-col gap-3" role="list">
              {column.items.map((item, itemIndex) => {
                const isHighlighted =
                  (colIndex === relation.from &&
                    itemIndex === relation.itemFrom) ||
                  (colIndex === relation.to && itemIndex === relation.itemTo);

                return (
                  <motion.li
                    key={item}
                    className={cn(
                      "text-body border-b border-border pb-3 transition-colors duration-500",
                      isHighlighted
                        ? "border-accent/40 text-foreground"
                        : "text-foreground",
                    )}
                    animate={
                      isHighlighted && !reducedMotion
                        ? { x: [0, 2, 0] }
                        : { x: 0 }
                    }
                    transition={{
                      duration: MOTION_DURATION.diagram,
                      repeat: isHighlighted ? Infinity : 0,
                    }}
                  >
                    {item}
                  </motion.li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {!reducedMotion && (
        <motion.p
          key={activeRelation}
          className="text-mono mt-8 text-center text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: MOTION_DURATION.fast }}
        >
          {columns[relation.from].items[relation.itemFrom]} →{" "}
          {columns[relation.to].items[relation.itemTo]} →{" "}
          {columns[(relation.to + 1) % 3].items[relation.itemTo]}
        </motion.p>
      )}
    </div>
  );
}
