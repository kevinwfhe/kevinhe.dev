import React, { CSSProperties } from 'react';
import Fade from 'react-reveal/Fade';

const style: CSSProperties = {
  width: '100%',
  textAlign: 'left',
  fontSize: '3.6rem'
};

const Title = ({ title }) => {
  return (
    <Fade bottom duration={1000} delay={300} distance="15px">
      <h1 style={style}>{title}</h1>
    </Fade>
  );
};

export default Title;
