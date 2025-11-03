import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate LinkedIn API delay
  await new Promise(resolve => setTimeout(resolve, 150));

  const experiences = [
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
      type: 'full-time',
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
      type: 'full-time',
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
      type: 'part-time',
    },
  ];

  return NextResponse.json(experiences);
}
