import {
  MOTION_DISTANCE,
  MOTION_DURATION,
  MOTION_EASE,
  MOTION_STAGGER,
} from "./constants";

export const revealVariants = {
  hidden: {
    opacity: 0,
    y: MOTION_DISTANCE.md,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATION.base,
      ease: MOTION_EASE.out,
    },
  },
};

export const revealMaskVariants = {
  hidden: {
    opacity: 0,
    y: MOTION_DISTANCE.lg,
    clipPath: "inset(100% 0 0 0)",
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0 0 0)",
    transition: {
      duration: MOTION_DURATION.slow,
      ease: MOTION_EASE.out,
    },
  },
};

export const fadeVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: MOTION_DURATION.base,
      ease: MOTION_EASE.out,
    },
  },
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: MOTION_STAGGER.base,
      delayChildren: 0.1,
    },
  },
};

export const pageTransitionVariants = {
  initial: {
    opacity: 0,
    y: MOTION_DISTANCE.sm,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATION.base,
      ease: MOTION_EASE.out,
    },
  },
  exit: {
    opacity: 0,
    y: -MOTION_DISTANCE.sm,
    transition: {
      duration: MOTION_DURATION.fast,
      ease: MOTION_EASE.inOut,
    },
  },
};

export const reducedMotionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: MOTION_DURATION.instant },
  },
};
