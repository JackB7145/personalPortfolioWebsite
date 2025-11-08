import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useIsMobile } from './ui/use-mobile';

interface ScrollRevealProps {
  progress: number;
}

export function ScrollReveal({ progress }: ScrollRevealProps) {
  const isVisible = progress < 1;
  const isMobile = useIsMobile();
  
  return (
    <motion.div
      className="fixed inset-0 z-50 pointer-events-none"
      style={{
        opacity: 1 - progress,
      }}
    >
      {/* Left curtain */}
      <motion.div
        className="absolute top-0 left-0 h-full w-1/2 bg-black"
        style={{
          x: `-${progress * 50}%`,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(239,68,68,0.15),transparent_70%)]" />
        {!isMobile && (
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-full bg-gradient-to-b from-transparent via-red-500 to-transparent"
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.div>

      {/* Right curtain */}
      <motion.div
        className="absolute top-0 right-0 h-full w-1/2 bg-black"
        style={{
          x: `${progress * 50}%`,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(239,68,68,0.15),transparent_70%)]" />
        {!isMobile && (
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-full bg-gradient-to-b from-transparent via-red-500 to-transparent"
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.div>

      {/* Center content */}
      {isVisible && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <motion.div
            className="text-center space-y-6 md:space-y-8"
            {...(!isMobile && {
              animate: {
                y: [0, -10, 0],
              },
              transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              },
            })}
          >
            <motion.h1
              className="text-5xl md:text-6xl lg:text-8xl tracking-wider relative px-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              <span className="relative inline-block">
                <span className="absolute inset-0 blur-xl bg-red-600 opacity-50" />
                <span className="relative text-red-500">
                    WELCOME
                </span>
              </span>
            </motion.h1>
            
            <motion.p
              className="text-gray-500 text-base md:text-xl tracking-widest px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              SCROLL TO BEGIN
            </motion.p>
          </motion.div>

          {/* Arrow moved lower */}
          <motion.div
            className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 flex justify-center"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="w-10 h-10 md:w-12 md:h-12 text-red-500" />
          </motion.div>

          {/* Particles - desktop only */}
          {!isMobile && Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-500 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
