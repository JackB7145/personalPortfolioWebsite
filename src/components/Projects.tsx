import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Github, Star, GitFork } from 'lucide-react';
import { ProjectModal } from './ProjectModal';
import { ProjectCard } from '../lib/cardTypes';
import { useIsMobile } from './ui/use-mobile';
import { getAnimationConfig } from '../lib/animations';

const projectsData = [
  {
    id: '1',
    name: 'API Gateway System',
    description: 'Microservices API gateway with authentication, rate limiting, and routing',
    fullDescription: 'Built a comprehensive API gateway system that handles authentication, rate limiting, and intelligent routing across 15+ microservices. Implemented JWT-based authentication, Redis caching for optimal performance, and comprehensive API documentation using Swagger.',
    techStack: ['Node.js', 'Express', 'Redis', 'Docker', 'JWT', 'Swagger'],
    stars: 234,
    forks: 45,
    url: 'https://github.com/jackbranston/api-gateway',
    features: [
      'JWT-based authentication with refresh tokens',
      'Rate limiting with Redis (1000 req/min per user)',
      'Smart routing across 15+ microservices',
      'Comprehensive Swagger documentation',
      'Docker containerization for easy deployment',
      'Real-time monitoring dashboard',
    ],
    metrics: {
      uptime: '99.9%',
      avgResponseTime: '45ms',
      requestsPerDay: '500K+',
    },
    commitHistory: [
      { date: 'Jan 15', commits: 8 },
      { date: 'Feb 1', commits: 12 },
      { date: 'Feb 15', commits: 15 },
      { date: 'Mar 1', commits: 20 },
      { date: 'Mar 15', commits: 18 },
      { date: 'Apr 1', commits: 25 },
      { date: 'Apr 15', commits: 22 },
      { date: 'May 1', commits: 30 },
      { date: 'May 15', commits: 28 },
      { date: 'Jun 1', commits: 35 },
    ],
  },
  {
    id: '2',
    name: 'Real-Time Analytics Dashboard',
    description: 'WebSocket-powered dashboard processing 100k+ events per minute',
    fullDescription: 'Developed a high-performance real-time analytics dashboard that processes over 100,000 events per minute using WebSockets and React. Features optimized rendering with React.memo, virtual scrolling for large datasets, and custom D3.js visualizations.',
    techStack: ['React', 'WebSocket', 'D3.js', 'Node.js', 'MongoDB', 'Redis'],
    stars: 189,
    forks: 32,
    url: 'https://github.com/jackbranston/analytics-dashboard',
    features: [
      'Real-time event processing (100K+ events/min)',
      'WebSocket connections with auto-reconnect',
      'Optimized rendering with React.memo',
      'Virtual scrolling for large datasets',
      'Custom D3.js visualizations for time-series data',
      'MongoDB aggregation for historical analytics',
    ],
    metrics: {
      eventsPerMinute: '100K+',
      concurrentUsers: '5000+',
      dataRetention: '90 days',
    },
    commitHistory: [
      { date: 'Jan 20', commits: 5 },
      { date: 'Feb 5', commits: 10 },
      { date: 'Feb 20', commits: 14 },
      { date: 'Mar 5', commits: 18 },
      { date: 'Mar 20', commits: 16 },
      { date: 'Apr 5', commits: 22 },
      { date: 'Apr 20', commits: 20 },
      { date: 'May 5', commits: 26 },
      { date: 'May 20', commits: 24 },
      { date: 'Jun 5', commits: 30 },
    ],
  },
  {
    id: '3',
    name: 'AI Code Review Assistant',
    description: 'GPT-4 powered code review tool with context-aware suggestions',
    fullDescription: 'Created an AI-powered code review assistant that uses GPT-4 to provide intelligent, context-aware code suggestions. Integrates with GitHub PRs, analyzes code patterns, and provides actionable feedback on code quality, security, and best practices.',
    techStack: ['Python', 'GPT-4', 'FastAPI', 'GitHub API', 'PostgreSQL', 'Docker'],
    stars: 567,
    forks: 89,
    url: 'https://github.com/jackbranston/ai-code-reviewer',
    features: [
      'GPT-4 integration for intelligent code analysis',
      'GitHub PR integration with webhooks',
      'Security vulnerability detection',
      'Code style and best practice suggestions',
      'Learning from team coding patterns',
      'Customizable review templates',
    ],
    metrics: {
      accuracy: '92%',
      prsReviewed: '10K+',
      avgReviewTime: '30 seconds',
    },
    commitHistory: [
      { date: 'Jan 10', commits: 12 },
      { date: 'Jan 25', commits: 18 },
      { date: 'Feb 10', commits: 22 },
      { date: 'Feb 25', commits: 28 },
      { date: 'Mar 10', commits: 25 },
      { date: 'Mar 25', commits: 32 },
      { date: 'Apr 10', commits: 30 },
      { date: 'Apr 25', commits: 38 },
      { date: 'May 10', commits: 35 },
      { date: 'May 25', commits: 42 },
    ],
  },
  {
    id: '4',
    name: 'Blockchain Event Tracker',
    description: 'Track and analyze on-chain events with real-time notifications',
    fullDescription: 'Built a comprehensive blockchain event tracking system that monitors smart contract events in real-time. Features include custom event filters, webhook notifications, historical data analysis, and support for multiple blockchain networks.',
    techStack: ['TypeScript', 'Ethers.js', 'Next.js', 'PostgreSQL', 'WebSocket', 'Redis'],
    stars: 312,
    forks: 67,
    url: 'https://github.com/jackbranston/blockchain-tracker',
    features: [
      'Real-time blockchain event monitoring',
      'Support for Ethereum, Polygon, BSC',
      'Custom event filters and alerts',
      'Webhook notifications for critical events',
      'Historical data analysis and charts',
      'Smart contract interaction interface',
    ],
    metrics: {
      networks: '3',
      eventsTracked: '1M+',
      alertLatency: '<3s',
    },
    commitHistory: [
      { date: 'Jan 5', commits: 6 },
      { date: 'Jan 20', commits: 11 },
      { date: 'Feb 5', commits: 16 },
      { date: 'Feb 20', commits: 20 },
      { date: 'Mar 5', commits: 18 },
      { date: 'Mar 20', commits: 24 },
      { date: 'Apr 5', commits: 22 },
      { date: 'Apr 20', commits: 28 },
      { date: 'May 5', commits: 26 },
      { date: 'May 20', commits: 32 },
    ],
  },
];

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectCard | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const isMobile = useIsMobile();
  const anim = getAnimationConfig(isMobile);

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
