"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { HeroBackground } from "@/components/sections/HeroBackground";
import { HeroActions } from "@/components/sections/HeroActions";
import { ScrollIndicator } from "@/components/sections/ScrollIndicator";
import { heroContent } from "@/lib/data/site";
import { MOTION_DURATION, MOTION_EASE } from "@/lib/motion/constants";
import { useMotionConfig } from "@/lib/motion/useMotionConfig";
import { cn } from "@/lib/utils/cn";

type IntroPhase = "names" | "keywords" | "done";

const INTRO_TO_KEYWORDS_MS = 380;
const INTRO_TO_DONE_MS = 1100;
const FADE_DURATION = 0.35;

export function Hero() {
  const { disabled } = useMotionConfig();
  const skipIntro = disabled;
  const [phase, setPhase] = useState<IntroPhase>("names");
  const introComplete = skipIntro || phase === "done";

  useEffect(() => {
    if (skipIntro) return;

    const toKeywords = window.setTimeout(
      () => setPhase("keywords"),
      INTRO_TO_KEYWORDS_MS,
    );
    const toDone = window.setTimeout(
      () => setPhase("done"),
      INTRO_TO_DONE_MS,
    );

    return () => {
      window.clearTimeout(toKeywords);
      window.clearTimeout(toDone);
    };
  }, [skipIntro]);

  return (
    <section id="hero" className="relative overflow-hidden">
      <HeroBackground />

      <Container className="relative">
        {/* Intro overlay — non-blocking, no pointer capture */}
        {!introComplete && (
          <div
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
            aria-hidden="true"
          >
            <AnimatePresence mode="wait">
              {phase === "names" && (
                <motion.div
                  key="names"
                  className="flex flex-col items-center gap-1 md:gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                    transition: { duration: FADE_DURATION },
                  }}
                  transition={{ duration: MOTION_DURATION.fast }}
                >
                  {heroContent.name.map((line, index) => (
                    <motion.span
                      key={line}
                      className="text-hero-intro text-foreground"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.22,
                        delay: index * 0.1,
                        ease: MOTION_EASE.out,
                      }}
                    >
                      {line}
                    </motion.span>
                  ))}
                </motion.div>
              )}

              {phase === "keywords" && (
                <motion.div
                  key="keywords"
                  className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-6 md:gap-x-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                    transition: { duration: FADE_DURATION },
                  }}
                  transition={{ duration: MOTION_DURATION.fast }}
                >
                  {heroContent.introKeywords.map((word, index) => (
                    <motion.span
                      key={word}
                      className="text-label text-accent"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: index * 0.08,
                        ease: MOTION_EASE.out,
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Final hero composition */}
        <motion.div
          className={cn(
            "relative z-10 flex min-h-[calc(100svh-4rem)] flex-col justify-between",
            "pt-20 pb-8 sm:pt-24 sm:pb-10 md:min-h-[calc(100svh-5rem)] md:pt-28 md:pb-14",
          )}
          initial={false}
          animate={{
            opacity: introComplete ? 1 : 0.15,
          }}
          transition={{
            duration: skipIntro ? 0.01 : FADE_DURATION,
            ease: MOTION_EASE.out,
          }}
        >
          {/* Metadata */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-label text-muted-foreground">
              {heroContent.meta.location}
            </p>
            <p className="text-label text-muted-foreground sm:text-right">
              {heroContent.meta.portfolio}
            </p>
          </div>

          {/* Main content */}
          <div className="my-auto py-8 md:py-12 lg:py-16">
            <div className="grid-layout items-end gap-y-8 lg:gap-y-0">
              <div className="col-span-4 md:col-span-6 lg:col-span-7">
                <h1 className="text-hero-name text-foreground">
                  {heroContent.name.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h1>
              </div>

              <div className="col-span-4 md:col-span-6 lg:col-span-5 lg:text-right">
                <p className="text-hero-statement text-foreground lg:ml-auto">
                  {heroContent.statement.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
                <p className="text-label mt-4 text-muted-foreground lg:mt-6">
                  {heroContent.secondary}
                </p>
              </div>
            </div>

            <div className="mt-10 grid-layout gap-y-8 lg:mt-16 lg:gap-y-0">
              <div className="col-span-4 md:col-span-6 lg:col-span-5">
                <p className="text-body max-w-md text-muted-foreground">
                  {heroContent.supporting}
                </p>
              </div>

              <div className="col-span-4 md:col-span-6 lg:col-span-7 lg:justify-self-end">
                <HeroActions />
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center md:justify-start">
            <ScrollIndicator />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
