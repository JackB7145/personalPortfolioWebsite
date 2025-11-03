// Dummy data for Jack Branston's portfolio
import { ProjectCard, ExperienceCard, SkillCard } from './cardTypes';

export const personalInfo = {
  name: "Jack Branston",
  title: "Full-Stack Developer & Software Engineer",
  school: "University of Toronto",
  degree: "Bachelor of Computer Science",
  graduationYear: "2024",
  email: "jack@jackbranston.com",
  github: "https://github.com/jackbranston",
  linkedin: "https://linkedin.com/in/jackbranston",
  twitter: "https://twitter.com/jackbranston",
  bio: "Building intelligent, scalable web applications with a focus on API-driven architectures and modern frontend technologies. Passionate about creating self-sustaining systems that evolve with data.",
};

// Using ProjectCard class instances
export const projects = [
  new ProjectCard({
    id: "1",
    name: "API Gateway System",
    description: "A scalable API gateway built with Node.js that handles rate limiting, caching, and request routing for microservices architecture.",
    techStack: ["Node.js", "Redis", "Docker", "TypeScript", "Express"],
    inspiration: "Needed a robust solution for managing multiple microservices with consistent authentication and rate limiting.",
    problemStatement: "Managing authentication, rate limiting, and routing across 15+ microservices was becoming increasingly complex and error-prone.",
    initiatives: [
      "Implemented token-based authentication with JWT",
      "Built custom rate limiting using Redis",
      "Created comprehensive API documentation with Swagger",
    ],
    githubUrl: "https://github.com/jackbranston/api-gateway",
    stars: 234,
    forks: 45,
    commits: [
      { date: "2024-10", count: 23 },
      { date: "2024-09", count: 31 },
      { date: "2024-08", count: 18 },
      { date: "2024-07", count: 42 },
      { date: "2024-06", count: 35 },
      { date: "2024-05", count: 28 },
    ],
  }),
  new ProjectCard({
    id: "2",
    name: "Real-Time Analytics Dashboard",
    description: "Interactive dashboard for visualizing real-time data streams using WebSockets and React. Processes 100k+ events per minute.",
    techStack: ["React", "WebSocket", "D3.js", "PostgreSQL", "Python"],
    inspiration: "Wanted to create a beautiful, performant way to visualize high-volume streaming data.",
    problemStatement: "Traditional dashboards couldn't handle the volume of real-time data without significant lag or crashes.",
    initiatives: [
      "Optimized rendering with React.memo and virtual scrolling",
      "Implemented data aggregation pipeline in Python",
      "Created custom D3.js visualizations for time-series data",
    ],
    githubUrl: "https://github.com/jackbranston/analytics-dashboard",
    stars: 567,
    forks: 89,
    commits: [
      { date: "2024-10", count: 15 },
      { date: "2024-09", count: 22 },
      { date: "2024-08", count: 38 },
      { date: "2024-07", count: 29 },
      { date: "2024-06", count: 41 },
      { date: "2024-05", count: 33 },
    ],
  }),
  new ProjectCard({
    id: "3",
    name: "AI Code Review Assistant",
    description: "GitHub bot that automatically reviews pull requests using GPT-4, providing intelligent feedback on code quality and best practices.",
    techStack: ["Python", "OpenAI API", "GitHub API", "FastAPI", "Redis"],
    inspiration: "Code reviews were taking too much time and often missed subtle issues.",
    problemStatement: "Teams needed faster, more consistent code reviews without sacrificing quality.",
    initiatives: [
      "Integrated GPT-4 for intelligent code analysis",
      "Built custom rules engine for project-specific standards",
      "Created detailed reporting with actionable suggestions",
    ],
    githubUrl: "https://github.com/jackbranston/ai-code-reviewer",
    stars: 892,
    forks: 123,
    commits: [
      { date: "2024-10", count: 28 },
      { date: "2024-09", count: 35 },
      { date: "2024-08", count: 42 },
      { date: "2024-07", count: 31 },
      { date: "2024-06", count: 26 },
      { date: "2024-05", count: 19 },
    ],
  }),
  new ProjectCard({
    id: "4",
    name: "Blockchain Event Tracker",
    description: "Monitor and analyze blockchain events in real-time with custom alerting and pattern detection.",
    techStack: ["TypeScript", "Web3.js", "MongoDB", "Next.js", "TailwindCSS"],
    inspiration: "Crypto traders needed better tools for tracking on-chain events and whale movements.",
    problemStatement: "Existing tools were slow, expensive, and lacked customizable alerting.",
    initiatives: [
      "Built WebSocket connection to Ethereum nodes",
      "Implemented pattern matching for suspicious transactions",
      "Created mobile-responsive UI with real-time updates",
    ],
    githubUrl: "https://github.com/jackbranston/blockchain-tracker",
    stars: 421,
    forks: 67,
    commits: [
      { date: "2024-10", count: 19 },
      { date: "2024-09", count: 24 },
      { date: "2024-08", count: 31 },
      { date: "2024-07", count: 27 },
      { date: "2024-06", count: 22 },
      { date: "2024-05", count: 18 },
    ],
  }),
];

// Using ExperienceCard class instances
export const experiences = [
  new ExperienceCard({
    id: "1",
    company: "Scotiabank",
    position: "Software Developer",
    duration: "Jan 2023 - Present",
    location: "Toronto, ON",
    description: "Developed and maintained large-scale banking applications, focusing on security and performance optimization. Led migration of legacy systems to modern microservices architecture.",
    achievements: [
      "Reduced API response time by 45% through query optimization",
      "Implemented automated testing pipeline reducing bugs by 60%",
      "Mentored 3 junior developers in React and Node.js best practices",
    ],
  }),
  new ExperienceCard({
    id: "2",
    company: "Tech Startup Inc",
    position: "Full-Stack Developer Intern",
    duration: "May 2022 - Dec 2022",
    location: "Remote",
    description: "Built customer-facing features for a SaaS platform using React, Node.js, and PostgreSQL. Collaborated with design team to create responsive, accessible interfaces.",
    achievements: [
      "Developed real-time notification system handling 10k+ daily events",
      "Improved frontend performance score from 62 to 94",
      "Integrated Stripe payment processing with webhook management",
    ],
  }),
  new ExperienceCard({
    id: "3",
    company: "University of Toronto",
    position: "Research Assistant",
    duration: "Sep 2021 - Apr 2022",
    location: "Toronto, ON",
    description: "Conducted research on machine learning applications in natural language processing. Developed Python scripts for data analysis and model training.",
    achievements: [
      "Co-authored paper on sentiment analysis published in IEEE",
      "Built data visualization dashboard for research findings",
      "Trained and optimized ML models achieving 87% accuracy",
    ],
  }),
];

// Using SkillCard class instances
const skillCategories = {
  "Languages": ["TypeScript", "Python", "JavaScript", "SQL", "Go", "Java"],
  "Frontend": ["React", "Next.js", "TailwindCSS", "Motion", "D3.js", "Redux"],
  "Backend": ["Node.js", "Express", "FastAPI", "GraphQL", "REST APIs", "WebSocket"],
  "Databases": ["PostgreSQL", "MongoDB", "Redis", "MySQL"],
  "DevOps": ["Docker", "Kubernetes", "AWS", "Vercel", "CI/CD", "GitHub Actions"],
  "Tools": ["Git", "VS Code", "Figma", "Postman", "Linux"],
};

export const skills = Object.entries(skillCategories).map(([category, skillList], index) => 
  new SkillCard({
    id: `skill-${index}`,
    category,
    skills: skillList,
  })
);

export const chatbotKnowledge = {
  resume: `Jack Branston is a Full-Stack Developer currently working at Scotiabank. He graduated from University of Toronto in 2024 with a Bachelor of Computer Science. 
  
  His technical skills include TypeScript, Python, React, Next.js, Node.js, and various databases like PostgreSQL and MongoDB.
  
  At Scotiabank, he developed large-scale banking applications with focus on security and performance, reducing API response time by 45%. 
  
  Previous experience includes a Full-Stack Developer Internship at Tech Startup Inc where he built real-time notification systems, and a Research Assistant role at University of Toronto where he worked on ML applications in NLP.
  
  Notable projects include an API Gateway System, Real-Time Analytics Dashboard, AI Code Review Assistant, and Blockchain Event Tracker.`,
};

export const availableTimeSlots = [
  { id: "1", date: "2025-11-05", time: "10:00 AM", available: true },
  { id: "2", date: "2025-11-05", time: "2:00 PM", available: true },
  { id: "3", date: "2025-11-06", time: "11:00 AM", available: true },
  { id: "4", date: "2025-11-06", time: "3:00 PM", available: false },
  { id: "5", date: "2025-11-07", time: "9:00 AM", available: true },
  { id: "6", date: "2025-11-07", time: "1:00 PM", available: true },
  { id: "7", date: "2025-11-08", time: "10:00 AM", available: true },
  { id: "8", date: "2025-11-08", time: "4:00 PM", available: true },
];
