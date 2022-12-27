import React from 'react';
import Hero from './Hero/Hero';
import About from './About/About';
import Blog from './Blog/index.tsx';
import Contact from './Contact/Contact';

import { PortfolioProvider } from '../context/context';

import { HERO_DATA, ABOUT_DATA, CONTACT_DATA } from '../data';

function App() {
  return (
    <PortfolioProvider value={{ hero: HERO_DATA, about: ABOUT_DATA, contact: CONTACT_DATA }}>
      <Hero />
      <About />
      <Blog />
      <Contact />
    </PortfolioProvider>
  );
}

export default App;
