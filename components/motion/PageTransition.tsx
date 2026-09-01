"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { getRouteFromPathname } from "@/lib/i18n/helpers";
import { cn } from "@/lib/utils/cn";

type PageTransitionProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageTransition({ children, className }: PageTransitionProps) {
  const pathname = usePathname();
  const { dict } = useI18n();
  const reducedMotion = useReducedMotion();
  const route = getRouteFromPathname(pathname, dict);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className={cn("relative", className)}>
        <motion.div
          className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-px bg-[var(--accent)]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "left" }}
          aria-hidden="true"
        />
        <motion.p
          className="pointer-events-none fixed bottom-6 right-[var(--container-padding)] z-[100] text-meta text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          aria-hidden="true"
        >
          {route.index} / {route.label}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
