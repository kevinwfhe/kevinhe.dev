import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { graphql, useStaticQuery } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import Title from '../Title/Title';
import PostItem from './PostItem';
import type { IPostProps } from './interface';

const Blog = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(sort: { fields: frontmatter___date, order: DESC }, limit: 3) {
        nodes {
          slug
          id
          frontmatter {
            date
            title
            intro
            cover {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  `);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 769) {
      setIsMobile(true);
    }
  }, []);

  console.log(data.allMdx.nodes);

  return (
    <section id="projects">
      <Container>
        <div className="project-wrapper">
          <Title title="Posting" />
          {data.allMdx.nodes.map((node) => {
            const {
              frontmatter: { title, date, intro, cover },
              slug,
            } = node;
            const postCover = getImage(cover);
            const postProps: IPostProps = {
              title,
              date,
              intro,
              postCover,
              slug,
              isMobile,
            };
            return (
              <Row key={node.id}>
                <PostItem {...postProps} />
              </Row>
            );
          })}
          {/* <div className="project-wrapper__btn">
            <Link className="cta-btn cta-btn--hero" to={'/'}>
              {'All Posts'}
            </Link>
          </div> */}
        </div>
      </Container>
    </section>
  );
};

export default Blog;
