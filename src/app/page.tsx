'use client';

import { useContext, useEffect, useState } from 'react';
import { DataContext } from './contexts/DataContext';
import { ScrollReveal } from '../components/ScrollReveal';
import { Hero } from '../components/Hero';
import { Projects } from '../components/Projects';
import { Experience } from '../components/Experience';
import { Skills } from '../components/Skills';
import { Chatbot } from '../components/Chatbot';
import { Contact } from '../components/Contact';

export default function Home() {
  const { portfolioData } = useContext(DataContext);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 400;
      const progress = Math.min(window.scrollY / scrollThreshold, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Guard: Wait for data to load ---
  const hasData =
    portfolioData.personalInfo &&
    portfolioData.projects.length > 0 &&
    portfolioData.experiences.length > 0 &&
    portfolioData.skills.length > 0;

  if (!hasData) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-6"></div>
        <h1 className="text-xl text-gray-400">Loading portfolio...</h1>
      </main>
    );
  }

  const { personalInfo, projects, experiences, skills } = portfolioData;
  console.log(experiences)
  return (
    <main className="bg-black min-h-screen">
      <ScrollReveal progress={scrollProgress} />

      <div style={{ opacity: scrollProgress }}>
        <Hero personalInfo={personalInfo} />
        <Projects projectsData={projects} />
        <Experience experiencesData={experiences} />
        <Skills skillsData={skills} />
        <Chatbot />
        <Contact />
      </div>
    </main>
  );
}
