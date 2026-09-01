"use client";

import { NavLink } from "@/components/ui/NavLink";
import { ArrowLeft } from "lucide-react";

export function CaseStudyNav() {
  return (
    <nav className="border-b border-border py-6" aria-label="Case study">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-padding)]">
        <NavLink
          href="/#work"
          className="text-label inline-flex min-h-11 items-center gap-2 py-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back to Work
        </NavLink>
      </div>
    </nav>
  );
}
