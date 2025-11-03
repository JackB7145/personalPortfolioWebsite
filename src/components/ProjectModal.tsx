import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Github, Star, GitFork, ExternalLink, CheckCircle2 } from 'lucide-react';
import { ProjectCard } from '../lib/cardTypes';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ProjectModalProps {
  project: ProjectCard | null;
  open: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, open, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-black border-gray-800 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl text-red-500 flex flex-col md:flex-row md:items-center gap-3">
            <span>{project.getTitle()}</span>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                {project.stars}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="w-4 h-4" />
                {project.forks}
              </span>
            </div>
          </DialogTitle>
          <DialogDescription className="text-gray-300 text-base md:text-lg">
            {project.getDescription()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Tech Stack */}
          <div>
            <h3 className="text-base md:text-lg text-white mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="border-red-500/30 bg-red-500/10 text-red-400 text-xs md:text-sm"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Full Description */}
          <div>
            <h3 className="text-base md:text-lg text-white mb-2">About</h3>
            <p className="text-gray-400 text-sm md:text-base">{project.getFullDescription()}</p>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-base md:text-lg text-white mb-3">Key Features</h3>
            <ul className="space-y-2">
              {project.getFeatures().map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400 text-sm md:text-base">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Project Metrics */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
            <h3 className="text-base md:text-lg text-red-500 mb-4">Project Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {Object.entries(project.getMetrics()).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-xl md:text-2xl text-white mb-1">{value}</div>
                  <div className="text-xs md:text-sm text-gray-400 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Commit History Graph */}
            {project.getCommitHistory().length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm md:text-base text-gray-300 mb-3">Commit Activity</h4>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={project.getCommitHistory()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#9CA3AF" 
                        style={{ fontSize: '12px' }}
                      />
                      <YAxis 
                        stroke="#9CA3AF" 
                        style={{ fontSize: '12px' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                        labelStyle={{ color: '#EF4444' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="commits" 
                        stroke="#EF4444" 
                        strokeWidth={2}
                        dot={{ fill: '#EF4444', r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-3 pt-4">
            <Button
              className="flex-1 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20"
              asChild
            >
              <a href={project.getUrl()} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                View on GitHub
              </a>
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
              asChild
            >
              <a href={project.getUrl()} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
