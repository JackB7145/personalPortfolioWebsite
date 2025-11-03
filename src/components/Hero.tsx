import { motion } from 'motion/react';
import { GraduationCap } from 'lucide-react';
import { useIsMobile } from './ui/use-mobile';
import { getAnimationConfig } from '../lib/animations';

const personalInfo = {
  name: 'JACK BRANSTON',
  title: 'Software Developer',
  bio: 'Building scalable applications with modern technologies. Passionate about clean code, system design, and creating exceptional user experiences.',
  school: 'University of Toronto',
  degree: 'Bachelor of Software Engineer',
  graduationYear: '2024',
  photo: '/src/components/profilePicture.jpg', // <-- replace with your real image
};

export function Hero() {
  const isMobile = useIsMobile();
  const anim = getAnimationConfig(isMobile);

  return (
    <>
      {/* --- Spacer Section (same visuals, empty content) --- */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.05),transparent_50%)]" />
      </section>

      {/* --- Main Hero Section --- */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.05),transparent_50%)]" />

        <motion.div
          className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 px-6 md:px-12 max-w-6xl w-full"
          {...anim.fadeInUp}
          viewport={{ once: true }}
        >
          {/* --- Left: Image --- */}
          <motion.div
            className="flex-shrink-0 w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(239,68,68,0.15)] border border-gray-800"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <img
              src={personalInfo.photo}
              alt="Jack Branston"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* --- Right: Text --- */}
          <div className="text-center md:text-left space-y-6 md:space-y-8 max-w-2xl">
            <motion.div {...(!isMobile && anim.glow)}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-wider text-white">
                {personalInfo.name}
              </h1>
            </motion.div>

            <motion.div
              className="h-px w-48 md:w-64 mx-auto md:mx-0 bg-gradient-to-r from-transparent via-red-500 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              viewport={{ once: true }}
            />

            <motion.p
              className="text-xl md:text-2xl lg:text-3xl text-red-500 tracking-wide"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {personalInfo.title}
            </motion.p>

            <motion.p
              className="text-gray-400 text-base md:text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {personalInfo.bio}
            </motion.p>

            <motion.div
              className="inline-flex items-center gap-3 px-4 md:px-6 py-3 bg-gray-900/50 border border-gray-800 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <GraduationCap className="w-5 h-5 text-red-500" />
              <span className="text-gray-300 text-sm md:text-base">
                {personalInfo.degree} • {personalInfo.school} • Class of {personalInfo.graduationYear}
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Particles - desktop only */}
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
                ease: 'easeInOut',
              }}
            />
          ))}
      </section>
    </>
  );
}
