import { motion } from "framer-motion";
import { GraduationCap, ArrowDown, Mail } from "lucide-react";
import { useIsMobile } from "./ui/use-mobile";
import { getAnimationConfig } from "../lib/animations";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero({ personalInfo }: { personalInfo: any }) {
  const isMobile = useIsMobile();
  const anim = getAnimationConfig(isMobile);
  if (!personalInfo) {
    return <div>Loading...</div>;
  }

  const goto = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Soft accent wash; particles render behind via ParticleField */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.06),transparent_60%)]" />

      <div className="container-pro relative z-10 px-4 md:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* === Left: Profile Image === */}
          <motion.div
            className="order-1 flex justify-center md:justify-end"
            initial={{ opacity: 0, x: isMobile ? 0 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: isMobile ? 0.3 : 0.8, delay: isMobile ? 0 : 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 opacity-30 blur-2xl"
                animate={
                  !isMobile ? { scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] } : {}
                }
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative">
                <div className="h-64 w-64 overflow-hidden rounded-full border-4 border-red-500/40 shadow-2xl shadow-red-500/20 md:h-80 md:w-80 lg:h-96 lg:w-96">
                  <ImageWithFallback
                    src={personalInfo.photo}
                    alt={personalInfo.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                {!isMobile && (
                  <>
                    <motion.div
                      className="absolute -right-4 -top-4 h-24 w-24 rounded-full border-2 border-red-500/30"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full border-2 border-red-500/20"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    />
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* === Right: Text Content === */}
          <motion.div
            className="order-2 space-y-6 text-center md:text-left"
            initial={{ opacity: 0, x: isMobile ? 0 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: isMobile ? 0.3 : 0.8, delay: isMobile ? 0.1 : 0.4 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="eyebrow justify-center md:justify-start"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: isMobile ? 0.1 : 0.5, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {personalInfo.title}
            </motion.span>

            <motion.h1
              className="text-5xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl"
              style={{ letterSpacing: "-0.02em" }}
              {...(!isMobile && anim.glow)}
            >
              {personalInfo.name}
            </motion.h1>

            <motion.div
              className="mx-auto h-px w-48 bg-gradient-to-r from-transparent via-red-500 to-transparent md:mx-0 md:w-64"
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
              className="mx-auto max-w-xl text-base leading-relaxed text-zinc-400 md:mx-0 md:text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: isMobile ? 0.25 : 1.0, duration: isMobile ? 0.3 : 0.8 }}
              viewport={{ once: true }}
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-3 md:justify-start"
              initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: isMobile ? 0.3 : 1.1, duration: isMobile ? 0.3 : 0.8 }}
              viewport={{ once: true }}
            >
              <button onClick={() => goto("projects")} className="btn btn-primary">
                View my work
                <ArrowDown className="h-4 w-4" />
              </button>
              <button onClick={() => goto("contact")} className="btn btn-ghost">
                <Mail className="h-4 w-4" />
                Get in touch
              </button>
            </motion.div>

            {/* Education chip */}
            <motion.div
              className="inline-flex items-center gap-3 rounded-lg border border-white/10 bg-zinc-900/40 px-4 py-3 backdrop-blur-sm md:px-6"
              initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: isMobile ? 0.35 : 1.3, duration: isMobile ? 0.3 : 0.8 }}
              viewport={{ once: true }}
            >
              <GraduationCap className="h-5 w-5 text-red-500" />
              <span className="text-sm text-zinc-300 md:text-base">
                {personalInfo.degree} • {personalInfo.school} • Class of{" "}
                {personalInfo.graduationYear}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => goto("experience")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-500 transition-colors hover:text-red-500"
        aria-label="Scroll to content"
        animate={!isMobile ? { y: [0, 8, 0] } : {}}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="h-6 w-6" />
      </motion.button>
    </section>
  );
}
