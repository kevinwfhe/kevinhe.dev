import { IGatsbyImageData } from 'gatsby-plugin-image';

interface IPostProps {
  title: string;
  date: string;
  intro: string;
  postCover?: IGatsbyImageData;
  slug: string;
  isMobile: boolean;
}

export { IPostProps };
