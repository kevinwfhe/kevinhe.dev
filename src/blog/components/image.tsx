import React, { CSSProperties } from 'react';
import Fade from 'react-reveal/Fade';
import Tilt from 'react-tilt';

const style: CSSProperties = {
  maxWidth: '100%',
  margin: '50px 0 10px',
  boxShadow: '0 6px 10px rgb(0 0 0 / 8%), 0 0 6px rgb(0 0 0 / 5%)',
};

const Image = ({ src, title }) => {
  return (
    <Fade top duration={1000} delay={300} distance="30px">
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
            <img style={style} src={src} alt={title} />
          </div>
        </Tilt>
      </div>
    </Fade>
  );
};

export default Image;
