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

const SCENE_HEIGHT: Record<string, string> = {
  bisevk: "min-h-[90vh]",
  eyfel: "min-h-[75vh]",
  fmd: "min-h-[75vh]",
  "tavuk-da-tavuk": "min-h-[60vh]",
};

function ProjectVisual({ slug }: { slug: string }) {
  switch (slug) {
    case "bisevk":
      return <BisevkLargeDiagram className="w-full max-w-none lg:min-w-[700px]" />;
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

function ProjectRow({
  index,
  slug,
  displayTitle,
  industry,
  period,
  description,
  href,
}: {
  index: number;
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
  const titleY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const visualScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.96]);

  const num = String(index + 1).padStart(2, "0");
  const isFlagship = slug === "bisevk";

  return (
    <article
      ref={ref}
      className={cn(
        "editorial-row relative",
        SCENE_HEIGHT[slug] ?? "min-h-[60vh]",
      )}
    >
      <div
        className={cn(
          "mx-auto grid h-full max-w-[var(--container-max)] grid-cols-1 px-[var(--container-padding)] py-[var(--space-lg)] lg:grid-cols-12 lg:gap-16",
          isFlagship && "lg:min-h-[90vh]",
        )}
      >
        {/* Text — 35% */}
        <div className="flex flex-col justify-center lg:col-span-4">
          <span className="text-mono text-accent">{num}</span>
          <motion.h3
            className="text-project mt-4 font-display text-foreground"
            style={{ y: titleY }}
          >
            {displayTitle}
          </motion.h3>
          <p className="text-mono mt-4 text-muted-foreground">{industry}</p>
          <p className="text-mono text-muted-foreground/70">{period}</p>
          <p className="text-body mt-8 max-w-sm text-muted-foreground">{description}</p>
          <Link
            href={href}
            className="text-mono group mt-12 inline-flex items-center gap-3 text-foreground transition-colors hover:text-accent"
          >
            View Case Study
            <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Visual — 65% */}
        <motion.div
          className="flex items-center lg:col-span-8"
          style={{ scale: visualScale }}
        >
          <ProjectVisual slug={slug} />
        </motion.div>
      </div>
    </article>
  );
}

export function HomeSystems() {
  const projects = getAllSelectedProjects();

  return (
    <section id="work" className="relative">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-padding)] py-[var(--space-xl)]">
        <span className="text-mono text-accent">01 / Selected Work</span>
        <h2 className="text-section mt-6 max-w-4xl font-display leading-[0.95] text-foreground">
          Systems
          <br />
          <span className="text-muted-foreground">in production.</span>
        </h2>
      </div>

      {projects.map((project, index) => (
        <ProjectRow
          key={project.slug}
          index={index}
          slug={project.slug}
          displayTitle={project.displayTitle}
          industry={project.industry}
          period={project.period}
          description={project.description}
          href={project.href}
        />
      ))}
    </section>
  );
}
