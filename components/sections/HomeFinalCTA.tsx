"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RevealBlock } from "@/components/motion/RevealBlock";
import { RevealText } from "@/components/motion/RevealText";
import { MagneticLink } from "@/components/motion/MagneticLink";
import { Section } from "@/components/ui/Section";
import { contactContent, getPrimaryContactLink } from "@/lib/data/contact";
import { cn } from "@/lib/utils/cn";

export function HomeFinalCTA() {
  const primaryLink = getPrimaryContactLink();

  return (
    <Section
      id="cta"
      number="06"
      label="Contact"
      headingId="cta-heading"
      bordered
      spacing="default"
      className="relative overflow-hidden"
    >
      <RevealText>
        <h2 id="cta-heading" className="text-h1 max-w-4xl text-foreground md:text-display">
          {contactContent.headline[0]}
          <br />
          <span className="text-muted-foreground">{contactContent.headline[1]}</span>
        </h2>
      </RevealText>

      <RevealBlock className="mt-10 md:mt-14">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {primaryLink && (
            <MagneticLink
              href={primaryLink.href}
              strength={0.12}
              className={cn(
                "text-label inline-flex min-h-11 items-center border border-foreground px-8 py-4 text-foreground",
                "transition-colors duration-300 hover:bg-foreground hover:text-background",
              )}
            >
              {primaryLink.label.toUpperCase()}
            </MagneticLink>
          )}
          <Link
            href="/contact"
            className="text-label inline-flex min-h-11 items-center gap-2 py-2 text-muted-foreground transition-colors hover:text-accent"
          >
            Full contact page
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </RevealBlock>
    </Section>
  );
}
