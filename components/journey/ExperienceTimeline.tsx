"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RevealBlock } from "@/components/motion/RevealBlock";
import { experienceContent } from "@/lib/data/experience";
import { cn } from "@/lib/utils/cn";

export function ExperienceTimeline() {
  const { milestones } = experienceContent;

  return (
    <div className="relative">
      <div
        className="absolute bottom-0 left-[0.9375rem] top-0 w-px bg-border md:left-[1.4375rem]"
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 top-0 h-full w-full origin-top scale-y-100 bg-accent/40" />
      </div>

      <div className="flex flex-col">
        {milestones.map((milestone, index) => (
          <RevealBlock
            key={milestone.id}
            delay={index * 0.06}
            className={cn(index < milestones.length - 1 && "pb-2 md:pb-4")}
          >
            <div className="grid grid-cols-[2rem_1fr] gap-x-6 md:grid-cols-[3rem_1fr] md:gap-x-10">
              <div className="flex justify-center pt-2" aria-hidden="true">
                <span className="block h-2.5 w-2.5 rounded-full border border-accent bg-background" />
              </div>

              <article className="pb-8 md:pb-10">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="text-mono text-accent">{milestone.period}</span>
                  {milestone.context && (
                    <span className="text-label text-muted-foreground">
                      {milestone.context}
                    </span>
                  )}
                </div>
                <h3 className="text-h3 mt-2 text-foreground">{milestone.title}</h3>
                <p className="text-body mt-3 max-w-2xl text-muted-foreground">
                  {milestone.description}
                </p>
                {milestone.href && (
                  <Link
                    href={milestone.href}
                    className={cn(
                      "text-label mt-4 inline-flex min-h-11 items-center gap-2 py-2",
                      "text-foreground transition-colors hover:text-accent",
                    )}
                    {...(milestone.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {milestone.type === "event" ? "View Repository" : "View Project"}
                    <ArrowUpRight size={12} aria-hidden="true" />
                  </Link>
                )}
              </article>
            </div>
          </RevealBlock>
        ))}
      </div>
    </div>
  );
}
