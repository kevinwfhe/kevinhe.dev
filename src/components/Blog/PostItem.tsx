import React from 'react';
import Fade from 'react-reveal/Fade';
import Tilt from 'react-tilt';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { postProps } from './interface';

const PostItem = ({ title, postCover, date, intro, slug, isMobile }: postProps) => {
  return (
    <>
      <Fade right={!isMobile} bottom={isMobile} duration={1000} delay={1000} distance="30px">
        <div className="project-wrapper__image">
          <Tilt
            options={{
              reverse: false,
              max: 8,
              perspective: 1000,
              scale: 1,
              speed: 300,
              transition: true,
              axis: null,
              reset: true,
              easing: 'cubic-bezier(.03,.98,.52,.99)',
            }}
          >
            <div data-tilt className="thumbnail rounded">
              <GatsbyImage image={postCover} alt={title} />
            </div>
          </Tilt>
        </div>
      </Fade>
      <Fade left={!isMobile} bottom={isMobile} duration={1000} delay={500} distance="30px">
        <div className="project-wrapper__text">
          <Link className="project-wrapper__text-title" to={`/blog/${slug}`}>
            {title || 'Title'}
          </Link>
          <div>
            <p>{date || ''}</p>
          </div>
          <div>
            <p>
              {intro || ''}{' '}
              <span>
                {' '}
                <Link to={`/blog/${slug}`}>Read More</Link>
              </span>
            </p>
          </div>
        </div>
      </Fade>
    </>
  );
};

export default PostItem;
