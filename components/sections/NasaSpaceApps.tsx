"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { RevealBlock } from "@/components/motion/RevealBlock";
import { RevealText } from "@/components/motion/RevealText";
import { OrbitalBackground } from "@/components/nasa/OrbitalBackground";
import { Section } from "@/components/ui/Section";
import { nasaContent, isNasaGithubConfigured } from "@/lib/data/nasa";
import { cn } from "@/lib/utils/cn";

export function NasaSpaceApps() {
  const showGithub = isNasaGithubConfigured(nasaContent.github);
  const showAward = Boolean(nasaContent.award);

  return (
    <Section
      id="nasa"
      number={nasaContent.sectionNumber}
      label={nasaContent.sectionLabel}
      headingId="nasa-heading"
      bordered
      spacing="default"
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-surface/80" aria-hidden="true" />
      <OrbitalBackground />

      <div className="relative">
        <RevealText className="mb-10 md:mb-14">
          <p className="text-label text-accent">{nasaContent.participationLabel}</p>
          <h2 id="nasa-heading" className="text-h2 mt-4 max-w-3xl text-foreground">
            {nasaContent.title}
          </h2>
        </RevealText>

        <RevealBlock>
          <div className="grid-layout items-end gap-y-8">
            <div className="col-span-4 md:col-span-6 lg:col-span-7">
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                <span className="text-h3 text-foreground">{nasaContent.year}</span>
                <span className="text-label text-muted-foreground">
                  {nasaContent.location}
                </span>
              </div>

              <p className="text-body mt-6 max-w-xl text-muted-foreground">
                {nasaContent.description}
              </p>

              {showAward && (
                <p className="text-label mt-4 text-accent">{nasaContent.award}</p>
              )}

              {showGithub && (
                <Link
                  href={nasaContent.github!}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="external"
                  className={cn(
                    "text-label mt-8 inline-flex min-h-11 items-center gap-2 py-2",
                    "text-foreground transition-colors hover:text-accent",
                    "focus-visible:rounded-[var(--radius-sm)]",
                  )}
                >
                  {nasaContent.githubLinkLabel}
                  <ExternalLink size={12} aria-hidden="true" />
                  <span className="sr-only"> (opens in new tab)</span>
                </Link>
              )}
            </div>

            <div className="col-span-4 md:col-span-6 lg:col-span-5">
              <div className="border border-border bg-background/50 p-6 md:p-8">
                <p className="text-label text-muted-foreground">Event</p>
                <p className="text-body mt-2 text-foreground">
                  Space Apps Challenge
                </p>
                <div className="mt-6 space-y-4 border-t border-border pt-6">
                  <div>
                    <p className="text-mono text-muted-foreground">Year</p>
                    <p className="text-small mt-1 text-foreground">
                      {nasaContent.year}
                    </p>
                  </div>
                  <div>
                    <p className="text-mono text-muted-foreground">Location</p>
                    <p className="text-small mt-1 text-foreground">
                      {nasaContent.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealBlock>
      </div>
    </Section>
  );
}
