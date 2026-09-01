"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { productEngineeringContent } from "@/lib/data/product-engineering";
import { SectionChapter } from "@/components/axis/SectionChapter";
import { MeridianBeam } from "@/components/axis/MeridianBeam";

export function ProductEngineeringBridge() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const beamProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);
  const productY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const engY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const hubScale = useTransform(beamProgress, (v) => 0.6 + v * 0.4);

  const { product, engineering } = productEngineeringContent;

  return (
    <SectionChapter ref={ref} theme="frost" id="product-engineering" className="relative overflow-hidden py-[var(--space-2xl)]">
      <div className="container-editorial relative">
        <p className="text-meta text-[var(--signal)]">Identity</p>

        <div className="editorial-grid mt-12 items-center">
          <motion.div className="col-span-12 lg:col-span-4" style={{ y: productY }}>
            <h2 className="text-massive font-display leading-[0.82] text-[var(--foreground-dark)]">
              PRO
              <br />
              DUCT
            </h2>
            <ul className="mt-10 space-y-6" role="list">
              {product.nodes.map((node) => (
                <li key={node.id}>
                  <p className="text-h2 font-display text-[var(--foreground-dark)]">{node.label}</p>
                  <p className="text-body mt-1 max-w-xs text-[var(--foreground-dark-muted)]">{node.description}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="col-span-12 flex justify-center py-12 lg:col-span-4 lg:py-0">
            <div className="relative flex h-[420px] w-full max-w-[200px] items-center justify-center">
              <MeridianBeam variant="flow-vertical" progress={1} className="absolute inset-0 h-full" />
              <motion.div
                className="absolute h-16 w-16 rounded-full border-2 border-[var(--signal)] bg-[var(--signal-dim)]"
                style={{ scale: hubScale }}
              />
              <p className="text-meta absolute -rotate-90 whitespace-nowrap text-[var(--signal)]">×</p>
            </div>
          </div>

          <motion.div className="col-span-12 lg:col-span-4 lg:text-right" style={{ y: engY }}>
            <h2 className="text-massive font-display leading-[0.82] text-[var(--foreground-dark)]">
              ENG
              <br />
              INEER
              <br />
              ING
            </h2>
            <ul className="mt-10 space-y-5 lg:ml-auto lg:max-w-sm" role="list">
              {engineering.nodes.slice(0, 4).map((node) => (
                <li key={node.id} className="lg:text-right">
                  <p className="text-h2 font-display text-[var(--foreground-dark)]">{node.label}</p>
                  <p className="text-body mt-1 text-[var(--foreground-dark-muted)]">{node.description}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="mt-16 border-t border-[var(--line-dark)] pt-10">
          <div className="editorial-grid">
            {engineering.nodes.slice(4).map((node) => (
              <div key={node.id} className="col-span-12 md:col-span-6 lg:col-span-4">
                <p className="text-meta text-[var(--signal)]">{node.label}</p>
                <p className="text-body mt-2 text-[var(--foreground-dark-muted)]">{node.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionChapter>
  );
}
