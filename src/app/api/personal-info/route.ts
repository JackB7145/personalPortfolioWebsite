import { NextResponse } from 'next/server';
export async function GET() {
  const personalInfo = {
    name: 'Jack Branston',
    title: 'Software Engineer',
    bio: 'Building scalable applications with modern technologies. Passionate about clean code, system design, and creating exceptional user experiences.',
    email: 'jbranston6@gmail.com',
    location: 'London, ON',
    github: 'https://github.com/JackB7145',
    linkedin: 'https://linkedin.com/in/jack-branston',
    discord: 'https://discordapp.com/users/766663343502131253',
    school: 'University of Western Ontario',
    degree: 'Bachelor of Software Engineering',
    graduationYear: '2027',
    photo: '/profilePicture.jpg'
  };

  return NextResponse.json(personalInfo);
}
