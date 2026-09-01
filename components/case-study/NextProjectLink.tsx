"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getProjectBySlug } from "@/lib/data/projects";

type NextProjectLinkProps = {
  slug: string;
  label: string;
  description: string;
};

export function NextProjectLink({ slug, label, description }: NextProjectLinkProps) {
  const project = getProjectBySlug(slug);
  const href = project?.href ?? `/work/${slug}`;

  return (
    <Link href={href} className="group flex items-end justify-between gap-8 border-t border-line pt-10">
      <div>
        <p className="text-meta text-muted-foreground">Next case study</p>
        <p className="text-project mt-4 font-display group-hover:text-[var(--continuum-bright)] transition-colors">
          {label}
        </p>
        <p className="text-body mt-3 max-w-md text-muted-foreground">{description}</p>
      </div>
      <ArrowUpRight size={28} className="shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--continuum-bright)]" />
    </Link>
  );
}
