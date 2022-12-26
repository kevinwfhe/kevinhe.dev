import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const AboutImg = ({ filename, alt }) => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile(filter: { base: { eq: "profile.jpg" } }) {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                gatsbyImageData(layout: FIXED, width: 350)
              }
            }
          }
        }
      }
    `}
    render={(data) => {
      const image = data.images.edges.find((n) => n.node.relativePath.includes(filename));

      if (!image) return null;

      const imageFixed = getImage(image.node);
      return <GatsbyImage className="rounded shadow-lg" alt={alt} image={imageFixed} />;
    }}
  />
);

// const AboutImg = () => {
//   const query = useStaticQuery()
// }

AboutImg.propTypes = {
  filename: PropTypes.string,
  alt: PropTypes.string,
};

export default AboutImg;
