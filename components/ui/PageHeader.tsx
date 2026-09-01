"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/prism/SectionLabel";

type PageHeaderProps = {
  label: string;
  title: string;
  titleMuted?: string;
  description?: string;
  className?: string;
};

export function PageHeader({ label, title, titleMuted, description, className }: PageHeaderProps) {
  return (
    <header className={className}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionLabel label={label} />
        <h1 className="text-hero mt-8 max-w-3xl font-display">
          {title}
          {titleMuted && (
            <>
              {" "}
              <span className="text-muted-foreground">{titleMuted}</span>
            </>
          )}
        </h1>
        {description && (
          <p className="text-body mt-6 max-w-2xl text-muted-foreground">{description}</p>
        )}
      </motion.div>
    </header>
  );
}
