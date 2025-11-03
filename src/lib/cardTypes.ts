// Abstract base class for all card types
export abstract class BaseCard {
  id: string;
  
  constructor(id: string) {
    this.id = id;
  }
  
  abstract getTitle(): string;
  abstract getDescription(): string;
  abstract getType(): 'project' | 'experience' | 'skill';
}

// Project Card Class
export class ProjectCard extends BaseCard {
  name: string;
  description: string;
  techStack: string[];
  stars: number;
  forks: number;
  url: string;
  fullDescription: string;
  features: string[];
  metrics: {
    [key: string]: string;
  };
  commitHistory: Array<{ date: string; commits: number }>;
  
  constructor(
    id: string,
    name: string,
    description: string,
    techStack: string[],
    stars: number,
    forks: number,
    url: string,
    fullDescription: string,
    features: string[],
    metrics: { [key: string]: string },
    commitHistory: Array<{ date: string; commits: number }> = []
  ) {
    super(id);
    this.name = name;
    this.description = description;
    this.techStack = techStack;
    this.stars = stars;
    this.forks = forks;
    this.url = url;
    this.fullDescription = fullDescription;
    this.features = features;
    this.metrics = metrics;
    this.commitHistory = commitHistory;
  }
  
  getTitle(): string {
    return this.name;
  }
  
  getDescription(): string {
    return this.description;
  }
  
  getType(): 'project' | 'experience' | 'skill' {
    return 'project';
  }
  
  getTechStackPreview(limit: number = 4): string[] {
    return this.techStack.slice(0, limit);
  }
  
  hasMoreTech(limit: number = 4): boolean {
    return this.techStack.length > limit;
  }
  
  getMoreTechCount(limit: number = 4): number {
    return this.techStack.length - limit;
  }

  getFullDescription(): string {
    return this.fullDescription;
  }

  getFeatures(): string[] {
    return this.features;
  }

  getMetrics(): { [key: string]: string } {
    return this.metrics;
  }

  getUrl(): string {
    return this.url;
  }

  getCommitHistory(): Array<{ date: string; commits: number }> {
    return this.commitHistory;
  }
}

// Experience Card Class
export class ExperienceCard extends BaseCard {
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
  
  constructor(
    id: string,
    title: string,
    company: string,
    location: string,
    duration: string,
    description: string,
    achievements: string[]
  ) {
    super(id);
    this.title = title;
    this.company = company;
    this.duration = duration;
    this.location = location;
    this.description = description;
    this.achievements = achievements;
  }
  
  getTitle(): string {
    return this.title;
  }
  
  getDescription(): string {
    return this.description;
  }
  
  getType(): 'project' | 'experience' | 'skill' {
    return 'experience';
  }
  
  getCompany(): string {
    return this.company;
  }
  
  getDuration(): string {
    return this.duration;
  }
  
  getLocation(): string {
    return this.location;
  }
  
  getAchievements(): string[] {
    return this.achievements;
  }
}

// Skill Category Card Class
export class SkillCard extends BaseCard {
  category: string;
  skills: string[];
  
  constructor(
    id: string,
    category: string,
    skills: string[]
  ) {
    super(id);
    this.category = category;
    this.skills = skills;
  }
  
  getTitle(): string {
    return this.category;
  }
  
  getDescription(): string {
    return `${this.skills.length} skills`;
  }
  
  getType(): 'project' | 'experience' | 'skill' {
    return 'skill';
  }
  
  getSkills(): string[] {
    return this.skills;
  }
}
