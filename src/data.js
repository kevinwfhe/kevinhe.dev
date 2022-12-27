import { nanoid } from 'nanoid';

// META DATA
export const META_DATA = {
  title: 'Kevin He Blog', // e.g: 'Name | Developer'
  lang: 'en', // e.g: en, es, fr, jp
  description: '', // e.g: Welcome to my website
};

// HERO DATA
export const HERO_DATA = {
  title: "Hi, I'm ",
  name: 'Kevin',
  postTitle: "and I'm a",
  subtitle: 'Web Developer and Learner.',
  cta: '',
};

// ABOUT DATA
export const ABOUT_DATA = {
  img: 'profile.jpg',
  paragraphOne:
    "I'm a 2023 new grad student from the University of Ottawa, with a master degree in Computer Engineering. I've worked as Software Engineer for 5 terms in my 3 internships, and I enjoy building with delightful user experience and developer experience in my mind.",
  paragraphTwo:
    "I have experience working with TypeScript/JavaScript, React, GraphQL, Python, Django etc. I'm now actively seeking a fulltime SDE opportunity starting from Jan 2023 or later.",
  paragraphThree:
    "To know more details about me, here's my resume, and feel free to reach out to me.",
  resume: 'https://kevinhe-dev-bucket.s3.ca-central-1.amazonaws.com/resume-wenfeng-kevin-he.pdf', // if no resume, the button will not show up
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
