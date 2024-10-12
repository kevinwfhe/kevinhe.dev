import { nanoid } from 'nanoid';

// META DATA
export const META_DATA = {
  title: 'Kevin He Blog', // e.g: 'Name | Developer'
  lang: 'en', // e.g: en, es, fr, jp
  description: '', // e.g: Welcome to my website
};

// HERO DATA
export const HERO_DATA = {
  title: 'Hey, this is ',
  name: 'Kevin',
  postTitle: "and I'm a",
  subtitle: 'Learner and Builder.',
  cta: '',
};

// ABOUT DATA
export const ABOUT_ME = {
  img: 'profile.jpg',
  paragraphOne:
    'I am Kevin, a Software Engineer with over 3 years experience who enjoy building delightful user experience and developer experience.',
  paragraphTwo:
    'In most of my experience I am working with TypeScript/JavaScript, React, Electron, Node.js, GraphQL, Python, Django etc.',
  paragraphThree: 'Grab a resume of mine (might not up-to-date) and feel free to reach out.',
  resume: 'https://kevinhe-dev.s3.ca-central-1.amazonaws.com/kevin-he-resume.pdf', // if no resume, the button will not show up
};

export const ABOUT_CAT = {
  img: 'chewy.jpg',
  paragraphOne:
    "I'm Chewy (Chuyi-初一), a Sleep Specialist with 1 year experience who is extreamly good at falling sleep amid noise and chaos.",
  paragraphTwo:
    'My most familiar setting is whenever dramas are on, or when there is a keyboard ASMR.',
};

export const ABOUT_DOG = {
  img: 'fifteen.jpg',
  paragraphOne:
    "I'm Fifteen (Shiwu-十五), a Human-food Expert with over 2 years experience of smuggling left over on the table.",
  paragraphTwo:
    'I specialize in rating cuisine with a particular fondness for butter chicken, steak and pork bones.',
};

// CONTACT DATA
export const CONTACT_DATA = {
  cta: '',
  btn: '',
  email: 'kevinwfhe@gmail.com',
  networks: [
    {
      id: nanoid(),
      name: 'linkedin',
      url: 'https://www.linkedin.com/in/kevin-wenfeng-he/',
      icon: 'fab fa-linkedin',
    },
    {
      id: nanoid(),
      name: 'github',
      url: 'https://github.com/kevinwfhe/',
      icon: 'fab fa-github',
    },
    {
      id: nanoid(),
      name: 'email',
      url: 'mailto:kevinwfhe@gmail.com',
      icon: 'fas fa-envelope',
    },
  ],
};
