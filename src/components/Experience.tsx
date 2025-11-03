import { motion } from 'motion/react';
import { Briefcase, MapPin, CheckCircle2 } from 'lucide-react';
import { ExperienceCard } from '../lib/cardTypes';
import { useIsMobile } from './ui/use-mobile';
import { getAnimationConfig } from '../lib/animations';

const experiencesData = [
  {
    id: '1',
    title: 'Software Developer',
    company: 'Scotiabank',
    location: 'Toronto, ON',
    duration: 'Jan 2024 - Present',
    description: 'Developing large-scale banking applications with focus on security and performance.',
    achievements: [
      'Reduced API response time by 45% through caching optimization',
      'Built automated testing pipeline that reduced bugs by 60%',
      'Mentored 3 junior developers on best practices',
      'Implemented security features following OWASP guidelines',
    ],
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'TechStart Inc',
    location: 'Toronto, ON',
    duration: 'May 2023 - Dec 2023',
    description: 'Built and maintained web applications for clients across various industries.',
    achievements: [
      'Developed 5+ client projects using React and Node.js',
      'Implemented CI/CD pipeline using GitHub Actions',
      'Improved application performance by 30% through optimization',
      'Collaborated with designers on UI/UX improvements',
    ],
  },
  {
    id: '3',
    title: 'Research Assistant',
    company: 'University of Toronto',
    location: 'Toronto, ON',
    duration: 'Sep 2022 - Apr 2023',
    description: 'Worked on machine learning research focusing on NLP applications.',
    achievements: [
      'Co-authored research paper on sentiment analysis published in IEEE',
      'Built ML models achieving 89% accuracy on text classification',
      'Presented research findings at 2 academic conferences',
      'Contributed to open-source NLP library with 500+ stars',
    ],
  },
];

export function Experience() {
  const isMobile = useIsMobile();
  const anim = getAnimationConfig(isMobile);

  const experiences = experiencesData.map((exp) => new ExperienceCard(
    exp.id,
    exp.title,
    exp.company,
    exp.location,
    exp.duration,
    exp.description,
    exp.achievements
  ));

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 relative bg-black">
      <div className="max-w-4xl mx-auto relative z-10 w-full">
        <motion.div
          {...anim.fadeInUp}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl mb-4 relative inline-block">
            <span className="relative text-white">
              Experience
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
            </span>
          </h2>
        </motion.div>

        {/* Timeline - Centered */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line - centered, desktop only */}
          {!isMobile && (
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-red-500/50 via-gray-700 to-transparent -translate-x-1/2" />
          )}

          {experiences.map((expCard: ExperienceCard, index) => (
            <motion.div
              key={expCard.id}
              initial={{ opacity: 0, y: isMobile ? 0 : 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: isMobile ? 0.3 : 0.8,
                delay: isMobile ? 0 : index * 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative mb-12 md:mb-16"
            >
              {/* Timeline dot - centered, desktop only */}
              {!isMobile && (
                <motion.div
                  className="absolute left-1/2 top-6 w-4 h-4 bg-red-500 rounded-full -translate-x-2 border-4 border-black z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ 
                    delay: index * 0.2 + 0.3,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                  }}
                  viewport={{ once: true }}
                />
              )}

              {/* Card - full width centered */}
              <div className="w-full">
                <motion.div
                  className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 md:p-6 hover:border-red-500/30 transition-all duration-300 mx-auto"
                  {...(!isMobile && anim.scaleSubtle)}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <Briefcase className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl text-white mb-1">{expCard.getTitle()}</h3>
                      <p className="text-red-500">{expCard.getCompany()}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-400 mb-4">
                    <span>{expCard.getDuration()}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {expCard.getLocation()}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-4 text-sm md:text-base">{expCard.getDescription()}</p>

                  <div className="space-y-2">
                    {expCard.getAchievements().map((achievement, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: isMobile ? 0 : -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: isMobile ? 0 : i * 0.1,
                          duration: isMobile ? 0.2 : 0.5,
                        }}
                        viewport={{ once: true }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs md:text-sm text-gray-400">{achievement}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
