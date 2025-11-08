'use client';

import { createContext, useEffect, useState } from 'react';

// Create the context
export const DataContext = createContext<any>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [portfolioData, setPortfolioData] = useState({
    personalInfo: null,
    projects: [],
    experiences: [],
    skills: [],
  });

  // 🔹 Load cached data or fetch fresh on mount
  useEffect(() => {
    loadFromAPI();
  }, []);

  // 🔹 Fetch everything from API
  async function loadFromAPI() {
    try {
      const [personalInfo, projects, experiences, skills] = await Promise.all([
        fetch('/api/personal-info', { cache: 'no-store' }).then((r) => r.json()),
        fetch('/api/projects', { cache: 'no-store' }).then((r) => r.json()),
        fetch('/api/experiences', { cache: 'no-store' }).then((r) => r.json()),
        fetch('/api/skills', { cache: 'no-store' }).then((r) => r.json()),
      ]);

      const fetched = {
        personalInfo: personalInfo ?? {},
        projects: Array.isArray(projects) ? projects : [],
        experiences: Array.isArray(experiences) ? experiences : [],
        skills: Array.isArray(skills) ? skills : [],
      };

      setPortfolioData(fetched);
      localStorage.setItem('portfolioData', JSON.stringify(fetched));
      console.log('✅ Portfolio data loaded and cached');
    } catch (err) {
      console.error('❌ Failed to load portfolio data:', err);
    }
  }

  // 🔹 Keep localStorage in sync with state
  useEffect(() => {
    if (!portfolioData) return;
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
  }, [portfolioData]);

  return (
    <DataContext.Provider value={{ portfolioData, setPortfolioData }}>
      {children}
    </DataContext.Provider>
  );
}
