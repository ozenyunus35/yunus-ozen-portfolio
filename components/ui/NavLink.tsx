"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { cn } from "@/lib/utils/cn";

type NavLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  onClick?: () => void;
};

function isHashLink(href: string): boolean {
  return href.startsWith("/#") || href.startsWith("#");
}

function getHashTarget(href: string): string {
  return href.includes("#") ? href.slice(href.indexOf("#")) : href;
}

function isActiveRoute(pathname: string, href: string): boolean {
  if (isHashLink(href)) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLink({
  href,
  children,
  className,
  external = false,
  onClick,
}: NavLinkProps) {
  const pathname = usePathname();
  const { scrollTo } = useSmoothScroll();
  const active = isActiveRoute(pathname, href);

  const classes = cn(
    "text-small relative inline-flex min-h-11 items-center text-muted-foreground transition-colors duration-300",
    "hover:text-foreground",
    "focus-visible:rounded-[var(--radius-sm)]",
    active && "text-foreground",
    className,
  );

  const indicator = active ? (
    <span
      className="absolute -bottom-1 left-0 h-px w-full bg-accent"
      aria-hidden="true"
    />
  ) : null;

  function handleAnchorClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!isHashLink(href)) return;
    event.preventDefault();
    scrollTo(getHashTarget(href));
    onClick?.();
  }

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="external"
        onClick={onClick}
      >
        {children}
        {indicator}
        <span className="sr-only"> (opens in new tab)</span>
      </a>
    );
  }

  if (isHashLink(href)) {
    return (
      <a href={href} className={classes} onClick={handleAnchorClick}>
        {children}
        {indicator}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
      {indicator}
    </Link>
  );
}
