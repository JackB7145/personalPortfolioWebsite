import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));

  const skills = [
    {
      id: '1',
      category: 'Languages',
      skills: ['TypeScript', 'JavaScript', 'Python', 'Java', 'Go', 'SQL'],
    },
    {
      id: '2',
      category: 'Frontend',
      skills: ['React', 'Next.js', 'Vue.js', 'TailwindCSS', 'Redux', 'Motion'],
    },
    {
      id: '3',
      category: 'Backend',
      skills: ['Node.js', 'Express', 'FastAPI', 'Django', 'GraphQL', 'REST'],
    },
    {
      id: '4',
      category: 'Databases',
      skills: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Firebase'],
    },
    {
      id: '5',
      category: 'DevOps',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'GitHub Actions', 'Terraform'],
    },
    {
      id: '6',
      category: 'Tools',
      skills: ['Git', 'VS Code', 'Postman', 'Figma', 'Jira', 'Slack'],
    },
  ];

  return NextResponse.json(skills);
}
