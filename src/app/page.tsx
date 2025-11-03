'use client';

import { useState, useEffect } from 'react';
import { ScrollReveal } from '../components/ScrollReveal';
import { Hero } from '../components/Hero';
import { Projects } from '../components/Projects';
import { Experience } from '../components/Experience';
import { Skills } from '../components/Skills';
import { Chatbot } from '../components/Chatbot';
import { Contact } from '../components/Contact';

export default function Home() {
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

  return (
    <main className="bg-black min-h-screen">
      <ScrollReveal progress={scrollProgress} />
      
      <div style={{ opacity: scrollProgress }}>
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Chatbot />
        <Contact />
      </div>
    </main>
  );
}
