import { nanoid } from 'nanoid';

// HEAD DATA
export const headData = {
  title: 'Kevin He Blog', // e.g: 'Name | Developer'
  lang: 'en', // e.g: en, es, fr, jp
  description: '', // e.g: Welcome to my website
};

// HERO DATA
export const heroData = {
  title: "Hi, I'm ",
  name: 'Kevin',
  postTitle: "and I'm a",
  subtitle: 'Web Developer and Learner.',
  cta: '',
};

// ABOUT DATA
export const aboutData = {
  img: 'profile.jpg',
  paragraphOne:
    "Currently I'm a master student at University of Ottawa, majoring in Computer Engineering. Before this, I've been a Software Engineer in industry for about one and a half year. I enjoy crafting application with perfect user experience and developer experience is also important.",
  paragraphTwo:
    "I have experience working with React and its ecosystem, TypeScript, Sass, CI/CD etc., under agile process. Recently I'm having fun with NodeJs, GatsbyJs and RN, Electron as well. ",
  paragraphThree:
    "I'm seeking for 2022 Summer SDE intern opportunity. Here's my resume, and I'll be more than happy if you would like to take it.",
  resume: '/static/resume-dev.pdf', // if no resume, the button will not show up
};

// PROJECTS DATA
export const projectsData = [
  {
    id: nanoid(),
    img: 'project.jpg',
    title: '',
    info: '',
    info2: '',
    url: '',
    repo: '', // if no repo, the button will not show up
  },
];

// CONTACT DATA
export const contactData = {
  cta: '',
  btn: '',
  email: 'hewenfeng_kevin@outlook.com',
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
      url: 'mailto:hewenfeng_kevin@outlook.com',
      icon: 'fas fa-envelope',
    },
  ],
};
