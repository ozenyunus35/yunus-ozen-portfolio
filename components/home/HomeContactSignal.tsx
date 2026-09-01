"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data/site";
import { getContactLinks } from "@/lib/data/contact";

export function HomeContactSignal() {
  const links = getContactLinks().filter((l) =>
    ["Email", "LinkedIn", "GitHub"].includes(l.label),
  );

  return (
    <section
      id="contact"
      className="relative min-h-[85vh] overflow-hidden py-[var(--space-2xl)]"
    >
      {/* Large background signal line */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          d="M -100 400 Q 400 200 800 350 T 1600 280"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeOpacity="0.25"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.circle
          r="12"
          fill="var(--accent)"
          animate={{
            offsetDistance: ["0%", "100%"],
            opacity: [0, 0.8, 0.8, 0],
          }}
          style={{
            offsetPath: "path('M -100 400 Q 400 200 800 350 T 1600 280')",
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-[var(--container-max)] flex-col justify-center px-[var(--container-padding)]">
        <span className="text-mono text-accent">04 / Contact</span>

        <h2 className="text-section mt-10 max-w-5xl font-display leading-[0.92] text-foreground">
          Let&apos;s build
          <br />
          something
          <br />
          <span className="text-muted-foreground">useful.</span>
        </h2>

        <nav className="mt-16 flex flex-col gap-6 sm:flex-row sm:gap-16" aria-label="Contact links">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="text-h2 font-display text-foreground transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-mono mt-20 text-muted-foreground">{siteConfig.location}</p>
      </div>
    </section>
  );
}
