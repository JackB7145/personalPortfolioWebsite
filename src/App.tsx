import { useState, useEffect, useRef } from 'react';
import { Toaster } from './components/ui/sonner';
import { ScrollReveal } from './components/ScrollReveal';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Chatbot } from './components/Chatbot';
import { Contact } from './components/Contact';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const hasRestoredScroll = useRef(false);

  useEffect(() => {
    const updateScroll = () => {
      const scroll = window.scrollY;
      const maxScroll = 800;
      const progress = Math.min(scroll / maxScroll, 1);
      setScrollProgress(progress);
      
      // Save scroll position to sessionStorage
      sessionStorage.setItem('scrollPosition', scroll.toString());
    };

    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  // Restore scroll position on mount with smooth scrolling
  useEffect(() => {
    if (hasRestoredScroll.current) return;
    
    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition) {
      const targetScroll = parseInt(savedPosition, 10);
      
      // Small delay to ensure page is rendered
      setTimeout(() => {
        // Smooth scroll to the saved position
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
        
        // Update scroll progress immediately
        const maxScroll = 800;
        const progress = Math.min(targetScroll / maxScroll, 1);
        setScrollProgress(progress);
        
        hasRestoredScroll.current = true;
      }, 100);
    }
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <ScrollReveal progress={scrollProgress} />
      
      <div className="relative z-10">
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Chatbot />
        <Contact />
      </div>

      <Toaster position="top-right" />
    </div>
  );
}
