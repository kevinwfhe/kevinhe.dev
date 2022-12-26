import React, { useState, useEffect } from 'react';
import Hero from './Hero/Hero';
import About from './About/About';
import Blog from './Blog/index.tsx';
import Contact from './Contact/Contact';

import { PortfolioProvider } from '../context/context';

import { heroData, aboutData, projectsData, contactData } from '../mock/data';

function App() {
  const [hero, setHero] = useState({});
  const [about, setAbout] = useState({});
  const [projects, setProjects] = useState([]);
  const [contact, setContact] = useState({});

  useEffect(() => {
    setHero({ ...heroData });
    setAbout({ ...aboutData });
    setProjects([...projectsData]);
    setContact({ ...contactData });
  }, []);

  return (
    <PortfolioProvider value={{ hero, about, projects, contact }}>
      <Hero />
      <About />
      <Blog />
      <Contact />
    </PortfolioProvider>
  );
}

export default App;
