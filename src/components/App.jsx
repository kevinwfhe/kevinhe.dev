import React from 'react';
import Hero from './Hero/Hero';
import About from './About/About';
import Blog from './Blog/index.tsx';
import Contact from './Contact/Contact';

import { PortfolioProvider } from '../context/context';

import { HERO_DATA, ABOUT_ME, ABOUT_CAT, ABOUT_DOG, CONTACT_DATA } from '../data';

function App() {
  return (
    <PortfolioProvider
      value={{ hero: HERO_DATA, about: { ABOUT_ME, ABOUT_CAT, ABOUT_DOG }, contact: CONTACT_DATA }}
    >
      <Hero />
      <About />
      <Blog />
      <Contact />
    </PortfolioProvider>
  );
}

export default App;
