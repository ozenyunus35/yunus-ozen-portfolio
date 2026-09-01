"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { cn } from "@/lib/utils/cn";

export function Header() {
  const { dict, path } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500",
        scrolled
          ? "border-[var(--line)] bg-[var(--background)]/90 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="container-editorial flex h-16 items-center justify-between gap-6">
        <Link
          href={path("/")}
          className="group flex items-baseline gap-2"
          aria-label={`${dict.site.name} — Home`}
        >
          <span className="text-meta text-[var(--accent)]">{dict.site.initials}</span>
          <span className="hidden text-meta text-muted-foreground transition-colors group-hover:text-foreground sm:inline">
            {dict.site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {dict.nav.map((item) => {
            const href = path(item.href);
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={item.href}
                href={href}
                className={cn(
                  "rounded-sm px-3 py-2 text-meta transition-colors",
                  active
                    ? "bg-[var(--accent-subtle)] text-[var(--accent)]"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center text-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="border-t border-[var(--line)] bg-[var(--background)]/95 backdrop-blur-md md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <nav className="container-editorial flex flex-col gap-1 py-4" aria-label="Mobile navigation">
              {dict.nav.map((item) => {
                const href = path(item.href);
                const active = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <Link
                    key={item.href}
                    href={href}
                    className={cn(
                      "rounded-sm px-2 py-3 text-h2",
                      active ? "text-[var(--accent)]" : "text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="mt-4 border-t border-[var(--line)] pt-4">
                <LanguageSwitcher />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
