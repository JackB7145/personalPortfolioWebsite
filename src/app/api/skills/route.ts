import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));

const skills = [
  {
    id: '1',
    category: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'Python', 'Java', 'SQL', 'HTML'],
  },
  {
    id: '2',
    category: 'Frontend',
    skills: ['React', 'Next.js', 'TailwindCSS', 'ShadCN/UI', 'Framer Motion', 'CSS Modules'],
  },
  {
    id: '3',
    category: 'Backend',
    skills: ['Node.js', 'Express', 'FastAPI', 'Spring Boot', 'Spring', 'REST APIs'],
  },
  {
    id: '4',
    category: 'Databases',
    skills: ['PostgreSQL', 'Supabase', 'MySQL', 'Cloud SQL', 'GCP BigQuery'],
  },
  {
    id: '5',
    category: 'DevOps',
    skills: ['Docker', 'Kubernetes', 'ArgoCD', 'GCP Composer', 'AWS', 'CI/CD Pipelines'],
  },
  {
    id: '6',
    category: 'Tools',
    skills: ['Git', 'VS Code', 'Postman', 'Figma', 'Jira', 'Slack'],
  },
];


  return NextResponse.json(skills);
}
