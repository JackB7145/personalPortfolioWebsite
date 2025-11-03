import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));

  const personalInfo = {
    name: 'JACK BRANSTON',
    title: 'Software Developer',
    bio: 'Building scalable applications with modern technologies. Passionate about clean code, system design, and creating exceptional user experiences.',
    email: 'jack@jackbranston.com',
    phone: '+1 (555) 123-4567',
    location: 'Toronto, ON',
    github: 'https://github.com/jackbranston',
    linkedin: 'https://linkedin.com/in/jackbranston',
    twitter: 'https://twitter.com/jackbranston',
    school: 'University of Toronto',
    degree: 'Bachelor of Computer Science',
    graduationYear: '2024',
  };

  return NextResponse.json(personalInfo);
}
