import React, { useContext, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import { Link as ScrollTo } from 'react-scroll';
import PortfolioContext from '../../context/context';

const Header = () => {
  const { hero, contact } = useContext(PortfolioContext);
  const { title, name, postTitle, subtitle, cta } = hero;
  const { networks } = contact;

  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 769) {
      setIsDesktop(true);
      setIsMobile(false);
    } else {
      setIsMobile(true);
      setIsDesktop(false);
    }
  }, []);

  return (
    <section id="hero" className="jumbotron">
      <span className="hero-social-links">
        {networks &&
          networks.map((network) => {
            const { id, url, name, icon } = network;
            return (
              <a key={id} href={url} rel="noopener noreferrer" target="_blank" aria-label={name}>
                <i className={icon}></i>
              </a>
            );
          })}
      </span>
      <Container>
        <Fade left={isDesktop} bottom={isMobile} duration={1000} delay={500} distance="30px">
          <h1 className="hero-title">
            {title || 'Hi, my name is'} <span className="text-color-main">{name} </span>
            {postTitle}
            <span className={'hero-location'}>
              {' '}
              <i className={'fas fa-map-marker-alt'}></i>
              <span>Toronto, Canada</span>
            </span>
            <br />
            {subtitle}
          </h1>
        </Fade>
        <Fade left={isDesktop} bottom={isMobile} duration={1000} delay={1000} distance="30px">
          <p className="hero-cta">
            <span className="cta-btn cta-btn--hero">
              <ScrollTo to="about" smooth duration={1000}>
                {cta || 'Know more'}
              </ScrollTo>
            </span>
          </p>
        </Fade>
      </Container>
    </section>
  );
};

export default Header;
