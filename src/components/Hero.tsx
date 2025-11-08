import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useIsMobile } from "./ui/use-mobile";
import { getAnimationConfig } from "../lib/animations";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useContext, useEffect, useState } from "react";

export function Hero({personalInfo}: {personalInfo: any}) {
  const isMobile = useIsMobile();
  const anim = getAnimationConfig(isMobile);
  if (!personalInfo) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
      {/* === Spacer Section === */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.05),transparent_50%)]" />
        <div className="relative z-10 text-center text-transparent select-none">
          <h1 className="text-6xl md:text-8xl opacity-0">Spacer</h1>
        </div>
      </section>

      {/* === Main Hero Section === */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.05),transparent_50%)]" />

        <div className="relative z-10 w-full max-w-6xl px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* === Left: Profile Image === */}
            <motion.div
              className="flex justify-center md:justify-end order-1"
              initial={{ opacity: 0, x: isMobile ? 0 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: isMobile ? 0.3 : 0.8,
                delay: isMobile ? 0 : 0.2,
              }}
              viewport={{ once: true }}
            >
              <div className="relative">
                {/* Glowing border pulse */}
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-full opacity-30 blur-2xl"
                  animate={
                    !isMobile
                      ? {
                          scale: [1, 1.1, 1],
                          opacity: [0.3, 0.5, 0.3],
                        }
                      : {}
                  }
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Actual Image */}
                <div className="relative">
                  <div className="w-70 h-70 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-red-500/50 shadow-2xl shadow-red-500/20">
                    <ImageWithFallback
                      src={personalInfo.photo} //'/src/public/profilePicture.jpg'
                      alt={personalInfo.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Rotating accent rings */}
                  {!isMobile && (
                    <>
                      <motion.div
                        className="absolute -top-4 -right-4 w-24 h-24 border-2 border-red-500/30 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <motion.div
                        className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-red-500/20 rounded-full"
                        animate={{ rotate: -360 }}
                        transition={{
                          duration: 25,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            {/* === Right: Text Content === */}
            <motion.div
              className="space-y-6 md:space-y-8 text-center md:text-left order-2"
              initial={{ opacity: 0, x: isMobile ? 0 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: isMobile ? 0.3 : 0.8,
                delay: isMobile ? 0.1 : 0.4,
              }}
              viewport={{ once: true }}
            >
              <motion.div {...(!isMobile && anim.glow)}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-wider text-white">
                  {personalInfo.name}
                </h1>
              </motion.div>

              <motion.div
                className="h-px w-48 md:w-64 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto md:mx-0"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{
                  duration: isMobile ? 0.5 : 1.5,
                  delay: isMobile ? 0.15 : 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                viewport={{ once: true }}
              />

              <motion.p
                className="text-xl md:text-2xl lg:text-3xl text-red-500 tracking-wide"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  delay: isMobile ? 0.2 : 0.8,
                  duration: isMobile ? 0.3 : 0.8,
                }}
                viewport={{ once: true }}
              >
                {personalInfo.title}
              </motion.p>

              <motion.p
                className="text-gray-400 max-w-2xl text-base md:text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  delay: isMobile ? 0.25 : 1.0,
                  duration: isMobile ? 0.3 : 0.8,
                }}
                viewport={{ once: true }}
              >
                {personalInfo.bio}
              </motion.p>

              <motion.div
                className="inline-flex items-center gap-3 px-4 md:px-6 py-3 bg-gray-900/50 border border-gray-800 rounded-lg"
                initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: isMobile ? 0.3 : 1.2,
                  duration: isMobile ? 0.3 : 0.8,
                }}
                viewport={{ once: true }}
              >
                <GraduationCap className="w-5 h-5 text-red-500" />
                <span className="text-gray-300 text-sm md:text-base">
                  {personalInfo.degree} • {personalInfo.school} • Class of{" "}
                  {personalInfo.graduationYear}
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* === Floating particles === */}
        {!isMobile &&
          Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-500/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}
      </section>
    </>
  );
}
