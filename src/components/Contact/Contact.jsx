import React, { useContext } from 'react';
import Fade from 'react-reveal/Fade';
import { Container } from 'react-bootstrap';
import { Link } from 'react-scroll';
import PortfolioContext from '../../context/context';

const Contact = () => {
  const { contact } = useContext(PortfolioContext);
  const { networks } = contact;

  return (
    <section id="contact">
      <Container>
        <Fade bottom duration={1000} delay={800} distance="30px">
          <div className="contact-wrapper">
            <span className="back-to-top">
              <Link to="hero" smooth duration={1000}>
                <i className="fa fa-angle-up fa-2x" aria-hidden="true" />
              </Link>
            </span>
            <div className="social-links">
              {networks &&
                networks.map((network) => {
                  const { id, name, url, icon } = network;
                  return (
                    <a
                      key={id}
                      href={url}
                      rel="noopener noreferrer"
                      target="_blank"
                      aria-label={name}
                    >
                      <i className={icon} />
                    </a>
                  );
                })}
            </div>
            <p className="contact__text">© {new Date().getFullYear()} - By Kevin (Wenfeng) He</p>
          </div>
        </Fade>
      </Container>
    </section>
  );
};

export default Contact;
