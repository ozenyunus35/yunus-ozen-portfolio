"use client";

import { ProductEngineeringBridge } from "@/components/cinematic/ProductEngineeringBridge";

export function HomeDependencyMap() {
  return (
    <section
      id="bridge"
      className="relative min-h-[90vh] py-[var(--space-2xl)]"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-padding)]">
        <span className="text-mono text-accent">03 / Product × Engineering</span>
        <div className="mt-[var(--space-lg)]">
          <ProductEngineeringBridge />
        </div>
      </div>
    </section>
  );
}
