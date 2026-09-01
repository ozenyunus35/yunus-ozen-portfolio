"use client";

import { MagneticLink } from "@/components/motion/MagneticLink";
import { heroContent } from "@/lib/data/site";
import { cn } from "@/lib/utils/cn";

const buttonClasses = cn(
  "text-label inline-flex min-h-11 items-center border border-foreground px-6 py-3 text-foreground",
  "transition-colors duration-300 hover:bg-foreground hover:text-background",
  "focus-visible:rounded-[var(--radius-sm)]",
);

const linkClasses = cn(
  "text-label inline-flex min-h-11 items-center border border-border px-6 py-3 text-muted-foreground",
  "transition-colors duration-300 hover:border-foreground hover:text-foreground",
  "focus-visible:rounded-[var(--radius-sm)]",
);

export function HeroActions() {
  const cvAction = "cv" in heroContent.actions ? heroContent.actions.cv : null;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
      <MagneticLink href={heroContent.actions.work.href} className={buttonClasses} strength={0.15}>
        {heroContent.actions.work.label}
      </MagneticLink>
      {cvAction && (
        <a href={cvAction.href} download className={linkClasses}>
          {cvAction.label}
        </a>
      )}
    </div>
  );
}
