// Animation configurations for the portfolio
// Smooth animations for desktop, minimal/no animations for mobile

export const getAnimationConfig = (isMobile: boolean) => {
  if (isMobile) {
    return {
      // Minimal animations for mobile
      fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3 },
      },
      fadeInUp: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3 },
      },
      scale: {
        whileHover: {},
        whileTap: { scale: 0.98 },
      },
      none: {
        initial: {},
        animate: {},
        transition: {},
      },
    };
  }

  // Smooth, polished animations for desktop
  return {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier
      },
    },
    fadeInUp: {
      initial: { opacity: 0, y: 60 },
      animate: { opacity: 1, y: 0 },
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    fadeInDown: {
      initial: { opacity: 0, y: -60 },
      animate: { opacity: 1, y: 0 },
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    fadeInLeft: {
      initial: { opacity: 0, x: -60 },
      animate: { opacity: 1, x: 0 },
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    fadeInRight: {
      initial: { opacity: 0, x: 60 },
      animate: { opacity: 1, x: 0 },
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    scale: {
      whileHover: { 
        scale: 1.05,
        transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
      },
      whileTap: { scale: 0.98 },
    },
    scaleSubtle: {
      whileHover: { 
        scale: 1.02,
        transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
      },
      whileTap: { scale: 0.99 },
    },
    slideUp: {
      whileHover: { 
        y: -8,
        transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
      },
    },
    glow: {
      animate: {
        textShadow: [
          '0 0 20px rgba(239, 68, 68, 0.3)',
          '0 0 40px rgba(239, 68, 68, 0.5)',
          '0 0 20px rgba(239, 68, 68, 0.3)',
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

export const staggerContainer = (isMobile: boolean, staggerChildren: number = 0.1) => {
  if (isMobile) {
    return {
      animate: {
        transition: {
          staggerChildren: 0,
        },
      },
    };
  }

  return {
    animate: {
      transition: {
        staggerChildren,
        delayChildren: 0.1,
      },
    },
  };
};
