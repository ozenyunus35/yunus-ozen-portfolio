"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { getAllSelectedProjects } from "@/lib/data/projects";
import { BisevkLargeDiagram } from "@/components/cinematic/BisevkLargeDiagram";
import { EyfelLargeRoute } from "@/components/cinematic/EyfelLargeRoute";
import { FmdLargeSystem } from "@/components/cinematic/FmdLargeSystem";
import { TavukLargeFlow } from "@/components/cinematic/TavukLargeFlow";
import { cn } from "@/lib/utils/cn";

function CatalogueVisual({ slug }: { slug: string }) {
  switch (slug) {
    case "bisevk":
      return <BisevkLargeDiagram className="w-full lg:min-w-[700px]" />;
    case "eyfel":
      return <EyfelLargeRoute className="w-full" />;
    case "fmd":
      return <FmdLargeSystem className="w-full" />;
    case "tavuk-da-tavuk":
      return <TavukLargeFlow className="w-full" />;
    default:
      return null;
  }
}

const SCENE_HEIGHT: Record<string, string> = {
  bisevk: "min-h-[90vh]",
  eyfel: "min-h-[75vh]",
  fmd: "min-h-[75vh]",
  "tavuk-da-tavuk": "min-h-[60vh]",
};

export function WorkSystemCatalogue() {
  const projects = getAllSelectedProjects();

  return (
    <div className="pb-[var(--space-2xl)]">
      <header className="px-[var(--container-padding)] py-[var(--space-xl)]">
        <div className="mx-auto max-w-[var(--container-max)]">
          <span className="text-mono text-accent">01 / Work</span>
          <h1 className="text-section mt-8 max-w-4xl font-display leading-[0.92] text-foreground">
            Selected
            <br />
            <span className="text-muted-foreground">systems.</span>
          </h1>
        </div>
      </header>

      {projects.map((project, index) => {
        const num = String(index + 1).padStart(2, "0");
        return (
          <ProjectRow
            key={project.slug}
            num={num}
            slug={project.slug}
            displayTitle={project.displayTitle}
            industry={project.industry}
            period={project.period}
            description={project.description}
            href={project.href}
          />
        );
      })}
    </div>
  );
}

function ProjectRow({
  num,
  slug,
  displayTitle,
  industry,
  period,
  description,
  href,
}: {
  num: string;
  slug: string;
  displayTitle: string;
  industry: string;
  period: string;
  description: string;
  href: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <article
      ref={ref}
      className={cn("editorial-row relative", SCENE_HEIGHT[slug] ?? "min-h-[60vh]")}
    >
      <div className="mx-auto grid h-full max-w-[var(--container-max)] grid-cols-1 gap-12 px-[var(--container-padding)] py-[var(--space-lg)] lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col justify-center lg:col-span-4">
          <span className="text-mono text-accent">{num}</span>
          <motion.h2
            className="text-project mt-4 font-display text-foreground"
            style={{ y: titleY }}
          >
            {displayTitle}
          </motion.h2>
          <p className="text-mono mt-4 text-muted-foreground">{industry}</p>
          <p className="text-mono text-muted-foreground/70">{period}</p>
          <p className="text-body mt-8 max-w-sm text-muted-foreground">{description}</p>
          <Link
            href={href}
            className="text-mono group mt-12 inline-flex items-center gap-3 text-foreground transition-colors hover:text-accent"
          >
            View Case Study
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="flex items-center lg:col-span-8">
          <CatalogueVisual slug={slug} />
        </div>
      </div>
    </article>
  );
}
