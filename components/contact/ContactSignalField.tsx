"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { contactContent, getContactLinks } from "@/lib/data/contact";
import { siteConfig } from "@/lib/data/site";

export function ContactSignalField() {
  const links = getContactLinks().filter((l) =>
    ["Email", "LinkedIn", "GitHub"].includes(l.label),
  );

  return (
    <div className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden px-[var(--container-padding)] py-[var(--space-xl)]">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          d="M 0 500 Q 500 300 1000 450 T 2000 350"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeOpacity="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.circle
          r="14"
          fill="var(--accent)"
          animate={{
            offsetDistance: ["0%", "100%"],
            opacity: [0, 0.7, 0.7, 0],
          }}
          style={{
            offsetPath: "path('M 0 500 Q 500 300 1000 450 T 2000 350')",
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-[var(--container-max)]">
        <span className="text-mono text-accent">04 / Contact</span>

        <h1 className="text-section mt-10 max-w-5xl font-display leading-[0.92] text-foreground">
          {contactContent.headline[0]}
          <br />
          something
          <br />
          <span className="text-muted-foreground">useful.</span>
        </h1>

        <nav className="mt-16 flex flex-col gap-8 sm:flex-row sm:gap-16" aria-label="Contact links">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="text-h1 font-display text-foreground transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-mono mt-24 text-muted-foreground">{siteConfig.location}</p>
      </div>
    </div>
  );
}
