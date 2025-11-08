import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Github, Star, GitFork } from 'lucide-react';
import { ProjectModal } from './ProjectModal';
import { ProjectCard } from '../lib/cardTypes';
import { useIsMobile } from './ui/use-mobile';
import { getAnimationConfig } from '../lib/animations';

export function Projects({projectsData}: {projectsData: any[]}) {
  const [selectedProject, setSelectedProject] = useState<ProjectCard | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const isMobile = useIsMobile();
  const anim = getAnimationConfig(isMobile);

  if (!projectsData || projectsData.length === 0) {
    return <div>Loading...</div>;
  }
  
  const projects = projectsData.map((proj) => new ProjectCard(
    proj.id,
    proj.name,
    proj.description,
    proj.techStack,
    proj.stars,
    proj.forks,
    proj.url,
    proj.fullDescription,
    proj.features,
    proj.metrics,
    proj.commitHistory
  ));

  const openProject = (project: ProjectCard) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

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
              Projects
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
            </span>
          </h2>
          <p className="text-gray-400 mt-6 text-sm md:text-base">
            Showcase repositories automatically synced from GitHub
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((projectCard: ProjectCard, index) => (
            <motion.div
              key={projectCard.id}
              initial={{ opacity: 0, y: isMobile ? 0 : 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: isMobile ? 0 : index * 0.1,
                duration: isMobile ? 0.3 : 0.6,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              viewport={{ once: true, margin: "-50px" }}
              {...(!isMobile && anim.slideUp)}
              className="group cursor-pointer"
              onClick={() => openProject(projectCard)}
            >
              <Card className="bg-gray-900/50 border-gray-800 hover:border-red-500/50 transition-all duration-300 h-full">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <motion.div
                      {...(!isMobile && {
                        whileHover: { rotate: 360 },
                        transition: { duration: 0.6 },
                      })}
                    >
                      <Github className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
                    </motion.div>
                    <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 md:w-4 md:h-4" />
                        {projectCard.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3 md:w-4 md:h-4" />
                        {projectCard.forks}
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-red-500 text-xl md:text-2xl group-hover:text-red-400 transition-colors">
                    {projectCard.getTitle()}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-sm md:text-base">
                    {projectCard.getDescription()}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {projectCard.getTechStackPreview().map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="border-gray-700 bg-gray-800/50 text-gray-300 text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {projectCard.hasMoreTech() && (
                      <Badge
                        variant="outline"
                        className="border-gray-700 bg-gray-800/50 text-gray-400 text-xs"
                      >
                        +{projectCard.getMoreTechCount()} more
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-xs md:text-sm text-gray-500 group-hover:text-red-500/70 transition-colors">
                    Click to view details →
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
