'use client';

import { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { DataContext } from './contexts/DataContext';
import { ScrollReveal } from '../components/ScrollReveal';
import { NavBar } from '../components/NavBar';
import { Hero } from '../components/Hero';
import { Projects } from '../components/Projects';
import { Experience } from '../components/Experience';
import { Skills } from '../components/Skills';
import { Chatbot } from '../components/Chatbot';
import { Contact } from '../components/Contact';
import { useIsMobile } from '../components/ui/use-mobile';

// three.js background is client-only; load it without SSR to avoid
// touching window/WebGL during server render.
const ParticleField = dynamic(
  () => import('../components/ParticleField').then((m) => m.ParticleField),
  { ssr: false }
);

export default function Home() {
  const { portfolioData } = useContext(DataContext);
  const [introProgress, setIntroProgress] = useState(0);
  const isMobile = useIsMobile();

  // Drives the opening curtain reveal only (first ~250px of scroll).
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 250;
      const progress = Math.min(window.scrollY / scrollThreshold, 1);
      setIntroProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
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

  return (
    <main className="relative min-h-screen">
      {/* three.js particle background (fixed, behind everything) */}
      <ParticleField isMobile={isMobile} />

      {/* Opening curtain intro */}
      <ScrollReveal progress={introProgress} />

      {/* Persistent navigation */}
      <NavBar />

      <div style={{ opacity: introProgress }}>
        <Hero personalInfo={personalInfo} />
        <Experience experiencesData={experiences} />
        <Projects projectsData={projects} />
        <Skills skillsData={skills} />
        <Chatbot />
        <Contact />
      </div>
    </main>
  );
}
