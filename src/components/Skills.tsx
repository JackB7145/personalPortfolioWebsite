import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { SkillCard } from '../lib/cardTypes';
import { useIsMobile } from './ui/use-mobile';
import { getAnimationConfig } from '../lib/animations';

export function Skills({skillsData}: {skillsData: any[]}) {
  const isMobile = useIsMobile();
  const anim = getAnimationConfig(isMobile);
  if (!skillsData || skillsData.length === 0) {
    return <div>Loading...</div>;
  }
  
  const skills = skillsData.map((skill) => new SkillCard(
    skill.id,
    skill.category,
    skill.skills
  ));

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 relative bg-black">
      <div className="max-w-6xl mx-auto relative z-10 w-full">
        <motion.div
          {...anim.fadeInUp}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl mb-4 relative inline-block">
            <span className="relative text-white">
              Skills
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skills.map((skillCard: SkillCard, categoryIndex) => (
            <motion.div
              key={skillCard.id}
              initial={{ opacity: 0, y: isMobile ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: isMobile ? 0 : categoryIndex * 0.1,
                duration: isMobile ? 0.3 : 0.6,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative group"
            >
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 md:p-6 h-full hover:border-red-500/30 transition-all duration-300">
                <h3 className="text-xl md:text-2xl text-red-500 mb-4 md:mb-6">
                  {skillCard.getTitle()}
                </h3>
                
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {skillCard.getSkills().map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: isMobile ? 1 : 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: isMobile ? 0 : categoryIndex * 0.1 + skillIndex * 0.05,
                        duration: isMobile ? 0.2 : 0.4,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      viewport={{ once: true }}
                      {...(!isMobile && {
                        whileHover: { 
                          scale: 1.1,
                          transition: { duration: 0.2 },
                        },
                      })}
                    >
                      <Badge 
                        variant="outline" 
                        className="border-gray-700 bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300 cursor-default text-xs md:text-sm"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
