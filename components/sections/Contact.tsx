"use client";

import Link from "next/link";
import { RevealBlock } from "@/components/motion/RevealBlock";
import { RevealText } from "@/components/motion/RevealText";
import { MagneticLink } from "@/components/motion/MagneticLink";
import { Section } from "@/components/ui/Section";
import {
  contactContent,
  getPrimaryContactLink,
  getSecondaryContactLinks,
} from "@/lib/data/contact";
import { cn } from "@/lib/utils/cn";

export function Contact() {
  const primaryLink = getPrimaryContactLink();
  const secondaryLinks = getSecondaryContactLinks();

  return (
    <Section
      id="contact"
      number="01"
      label={contactContent.sectionLabel}
      headingId="contact-heading"
      bordered={false}
      spacing="default"
      className="relative"
    >
      <RevealText>
        <h2
          id="contact-heading"
          className="text-h1 max-w-4xl text-foreground md:text-display"
        >
          {contactContent.headline[0]}
          <br />
          <span className="text-muted-foreground">
            {contactContent.headline[1]}
          </span>
        </h2>
      </RevealText>

      <RevealBlock className="mt-12 md:mt-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          {primaryLink ? (
            <MagneticLink
              href={primaryLink.href}
              strength={0.12}
              className={cn(
                "text-label inline-flex min-h-11 items-center border border-foreground px-8 py-4 text-foreground",
                "transition-colors duration-300 hover:bg-foreground hover:text-background",
                "focus-visible:rounded-[var(--radius-sm)]",
              )}
            >
              {primaryLink.label.toUpperCase()}
            </MagneticLink>
          ) : null}

          {secondaryLinks.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {secondaryLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  download={link.download || undefined}
                  data-cursor={link.external ? "external" : undefined}
                  className={cn(
                    "text-label inline-flex min-h-11 items-center gap-2 py-2",
                    "text-muted-foreground transition-colors duration-300",
                    "hover:text-foreground",
                    "focus-visible:rounded-[var(--radius-sm)]",
                  )}
                >
                  {link.label.toUpperCase()}
                  {link.external && (
                    <span className="sr-only"> (opens in new tab)</span>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </RevealBlock>
    </Section>
  );
}
