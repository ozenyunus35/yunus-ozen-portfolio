"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { ImmersiveHeroField } from "@/components/cinematic/ImmersiveHeroField";
import { SectionChapter } from "@/components/axis/SectionChapter";
import { useI18n } from "@/lib/i18n/I18nProvider";

const nameReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      delay: 0.15 + i * 0.12,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function HomeHero() {
  const { dict, path } = useI18n();
  const cv = dict.site.cv;
  const reducedMotion = useReducedMotion();
  const nameParts = dict.site.name.split(" ");

  return (
    <SectionChapter theme="void" id="hero" className="relative min-h-[100svh]">
      <ImmersiveHeroField />

      <div className="container-editorial relative flex min-h-[100svh] flex-col justify-end pb-[var(--space-lg)] pt-24">
        <div className="editorial-grid items-end gap-y-12">
          <div className="col-span-12 lg:col-span-9">
            <motion.p
              className="text-meta text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {dict.site.location} · {dict.site.role}
            </motion.p>

            <h1 className="mt-6 overflow-hidden">
              {nameParts.map((part, i) => (
                <motion.span
                  key={part}
                  className="text-colossal block font-display"
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={nameReveal}
                >
                  {part}
                </motion.span>
              ))}
            </h1>

            <motion.p
              className="text-statement mt-10 max-w-xl text-muted-foreground"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {dict.hero.tagline}
            </motion.p>
          </div>

          <motion.div
            className="col-span-12 lg:col-span-3 lg:text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            <ul className="space-y-2" role="list">
              {dict.site.focus.map((item, i) => (
                <motion.li
                  key={item}
                  className="text-meta text-[var(--accent-light)]"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + i * 0.08 }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="mt-14 flex flex-wrap items-center gap-4 border-t border-[var(--line)] pt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.85 }}
        >
          <Link href={path("/work")} className="btn-primary">
            {dict.hero.viewWork}
            <ArrowUpRight size={14} />
          </Link>
          <Link href={path("/about")} className="btn-ghost">
            {dict.common.footerNav.about}
          </Link>
          {cv && (
            <a href={cv} download className="btn-ghost">
              <Download size={14} />
              {dict.common.cv}
            </a>
          )}
        </motion.div>

        {!reducedMotion && (
          <motion.div
            className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            aria-hidden="true"
          >
            <span className="text-meta text-muted-foreground">Scroll</span>
            <motion.span
              className="block h-8 w-px bg-[var(--accent)]"
              animate={{ scaleY: [1, 0.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
            />
          </motion.div>
        )}
      </div>
    </SectionChapter>
  );
}
