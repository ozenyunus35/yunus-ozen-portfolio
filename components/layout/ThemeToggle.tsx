"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { cn } from "@/lib/utils/cn";

type Theme = "light" | "dark";

const KEY = "theme";
const root = () => document.documentElement;

/** The theme lives on <html data-theme>, set before the first paint by the boot script in app/layout.tsx. */
function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(root(), { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}
const read = (): Theme => (root().dataset.theme === "dark" ? "dark" : "light");

function apply(theme: Theme) {
  root().dataset.theme = theme;
  root().style.colorScheme = theme;
}

/** Flips the theme and saves the choice, without the circle animation. */
export function switchTheme() {
  const next: Theme = read() === "dark" ? "light" : "dark";
  try {
    localStorage.setItem(KEY, next);
  } catch {}
  apply(next);
}

/** The current theme, kept in sync with the <html> attribute. */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, read, () => "light");
}

/**
 * Switches between light and dark. The new theme spreads out in a circle from the button where the browser
 * supports view transitions, and switches at once with reduced motion or without them.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useTheme();
  const { locale } = useI18n();
  const next: Theme = theme === "dark" ? "light" : "dark";
  const label = locale === "tr" ? (next === "dark" ? "Koyu temaya geç" : "Açık temaya geç") : `Switch to ${next} theme`;

  // Follow the system setting until the visitor picks a theme themselves.
  useEffect(() => {
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem(KEY);
      } catch {}
      if (saved !== "light" && saved !== "dark") apply(mq.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      localStorage.setItem(KEY, next);
    } catch {}
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !document.startViewTransition) {
      apply(next);
      return;
    }
    const x = event.clientX || window.innerWidth - 40;
    const y = event.clientY || 32;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    root().classList.add("theme-switching");
    const vt = document.startViewTransition(() => apply(next));
    vt.ready.then(() => {
      root().animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 520, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
    vt.finished.finally(() => root().classList.remove("theme-switching"));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn("theme-toggle kbd-hint h-10 w-10 justify-center px-0 lg:h-8 lg:w-8", className)}
    >
      <Sun size={14} aria-hidden className="theme-toggle-sun" />
      <Moon size={14} aria-hidden className="theme-toggle-moon" />
    </button>
  );
}
