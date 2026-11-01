"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { openCommandMenu } from "@/components/layout/CommandMenu";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { cn } from "@/lib/utils/cn";

export function Header() {
  const { dict, path } = useI18n();
  const pathname = usePathname();
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  /** Menu closes on its own when navigation changes the pathname. */
  const open = openedAt === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpenedAt(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => {
    const target = path(href).replace(/\/$/, "");
    const current = pathname.replace(/\/$/, "");
    return current === target || current.startsWith(`${target}/`);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300",
        scrolled || open
          ? "border-[var(--line)] bg-[var(--background)]/85 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="container-editorial flex h-16 items-center justify-between gap-6">
        <Link href={path("/")} className="group -my-2 flex items-baseline gap-2 py-3" aria-label={`${dict.site.name} — Home`}>
          <span className="text-meta text-[var(--accent)]">{dict.site.initials}</span>
          <span className="hidden text-meta text-muted-foreground transition-colors group-hover:text-foreground sm:inline">
            {dict.site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {dict.nav.map((item) => (
            <Link
              key={item.href}
              href={path(item.href)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "nav-link rounded-sm px-3 py-2 text-meta transition-colors",
                isActive(item.href) ? "text-[var(--accent-light)]" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCommandMenu}
            className="kbd-hint h-10 w-10 justify-center px-0 lg:h-8 lg:w-auto lg:px-2.5"
            aria-label={dict.command.open}
          >
            <Search size={13} aria-hidden />
            <span className="hidden lg:inline">⌘K</span>
          </button>
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <button
            type="button"
            className="relative -mr-2 flex h-10 w-10 items-center justify-center md:hidden"
            onClick={() => setOpenedAt(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span
              aria-hidden
              className={cn(
                "absolute h-px w-5 bg-foreground transition-transform duration-300",
                open ? "rotate-45" : "-translate-y-[4px]",
              )}
            />
            <span
              aria-hidden
              className={cn(
                "absolute h-px w-5 bg-foreground transition-transform duration-300",
                open ? "-rotate-45" : "translate-y-[4px]",
              )}
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "mobile-nav grid border-t border-[var(--line)] md:hidden",
          open ? "is-open" : "border-transparent",
        )}
        inert={!open}
      >
        <nav className="container-editorial flex min-h-0 flex-col gap-1 overflow-hidden" aria-label="Mobile navigation">
          <div className="py-4">
            {dict.nav.map((item, i) => (
              <Link
                key={item.href}
                href={path(item.href)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "mobile-nav-item flex items-baseline gap-4 rounded-sm px-2 py-3 text-h2",
                  isActive(item.href) ? "text-[var(--accent-light)]" : "text-foreground",
                )}
                style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }}
              >
                <span className="text-meta text-muted-foreground">0{i + 1}</span>
                {item.label}
              </Link>
            ))}
            <div className="mt-4 border-t border-[var(--line)] pt-4">
              <LanguageSwitcher />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
