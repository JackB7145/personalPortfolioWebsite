// src/lib/animations.ts
import type { Transition } from "framer-motion";

const baseTransition: Transition = {
  duration: 0.8,
  ease: "easeInOut", 
};

const mobileTransition: Transition = {
  duration: 0.3,
  ease: "easeInOut",
};

export const getAnimationConfig = (isMobile: boolean) => {
  const t = isMobile ? mobileTransition : baseTransition;

  return {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: t,
    },
    fadeInUp: {
      initial: { opacity: 0, y: 60 },
      animate: { opacity: 1, y: 0 },
      transition: t,
    },
    fadeInDown: {
      initial: { opacity: 0, y: -60 },
      animate: { opacity: 1, y: 0 },
      transition: t,
    },
    fadeInLeft: {
      initial: { opacity: 0, x: -60 },
      animate: { opacity: 1, x: 0 },
      transition: t,
    },
    fadeInRight: {
      initial: { opacity: 0, x: 60 },
      animate: { opacity: 1, x: 0 },
      transition: t,
    },
    scale: {
      whileHover: {
        scale: 1.05,
        transition: { duration: 0.3, ease: "easeInOut" },
      },
      whileTap: { scale: 0.98 },
    },
    scaleSubtle: {
      whileHover: {
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeInOut" },
      },
      whileTap: { scale: 0.99 },
    },
    slideUp: {
      whileHover: {
        y: -8,
        transition: { duration: 0.3, ease: "easeInOut" },
      },
    },
    glow: {
      animate: {
        textShadow: [
          "0 0 20px rgba(239, 68, 68, 0.3)",
          "0 0 40px rgba(239, 68, 68, 0.5)",
          "0 0 20px rgba(239, 68, 68, 0.3)",
        ],
      },
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    none: {
      initial: {},
      animate: {},
      transition: {},
    },
  };
};

export const staggerContainer = (isMobile: boolean, staggerChildren = 0.1) => {
  return {
    animate: {
      transition: {
        staggerChildren: isMobile ? 0 : staggerChildren,
        delayChildren: isMobile ? 0 : 0.1,
      },
    },
  };
};
