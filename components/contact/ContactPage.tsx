"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FlowLine } from "@/components/continuum/FlowLine";
import { SectionChapter } from "@/components/continuum/SectionChapter";
import { getContactLinks } from "@/lib/data/contact";
import { siteConfig } from "@/lib/data/site";

export function ContactPage() {
  const links = getContactLinks().filter((l) =>
    ["Email", "LinkedIn", "GitHub"].includes(l.label),
  );

  return (
    <SectionChapter theme="ink" className="relative min-h-[92vh] overflow-hidden pt-24 md:pt-28">
      <FlowLine variant="route" className="absolute inset-0 h-full w-full opacity-40" />

      <div className="container-editorial relative z-10 flex min-h-[80vh] flex-col justify-center py-[var(--space-xl)]">
        <p className="text-meta text-[var(--continuum-bright)]">Contact</p>
        <h1 className="text-colossal mt-10 max-w-5xl font-display leading-[0.88]">
          Let&apos;s
          <br />
          connect.
        </h1>
        <p className="text-statement mt-10 max-w-lg text-muted-foreground">
          Open to conversations about product, project work, and building useful systems.
        </p>

        <nav className="mt-16 flex flex-col gap-8 sm:flex-row sm:gap-16" aria-label="Contact links">
          {links.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <Link
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-display link-flow font-display"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        <p className="text-meta mt-24 text-muted-foreground">{siteConfig.location}</p>
      </div>
    </SectionChapter>
  );
}
