import { IGatsbyImageData } from "gatsby-plugin-image";

interface postProps {
  title: string;
  date: string;
  intro: string;
  postCover: IGatsbyImageData;
  slug: string;
  isMobile: boolean;
}

export { postProps };
