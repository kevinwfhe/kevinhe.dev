/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';
import { Container, Row, Col } from 'react-bootstrap';
import Title from '../Title/Title';
import AboutImg from '../Image/AboutImg';
import PortfolioContext from '../../context/context';

const About = () => {
  const { about } = useContext(PortfolioContext);
  const { img, paragraphOne, paragraphTwo, paragraphThree } = about;

  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isResumeHover, setResumeHover] = useState(false);

  const downloadResume = async () => {
    setIsDownloading(true);
    const resume = await fetch('http://kevinhe.tech:8000/resume', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const resumeBlob = await resume.blob();
    const resumeURL = URL.createObjectURL(resumeBlob);

    const anchor = document.createElement('a');
    anchor.href = resumeURL;
    anchor.download = 'Resume-Kevin HE.pdf';

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(resumeURL);
    setIsDownloading(false);
  };

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
    <section id="about">
      <Container>
        <Title title="About Me" />
        <Row className="about-wrapper">
          <Col md={6} sm={12}>
            <Fade bottom duration={1000} delay={600} distance="30px">
              <div className="about-wrapper__image">
                <AboutImg alt="profile picture" filename={img} />
              </div>
            </Fade>
          </Col>
          <Col md={6} sm={12}>
            <Fade left={isDesktop} bottom={isMobile} duration={1000} delay={1000} distance="30px">
              <div className="about-wrapper__info">
                <p className="about-wrapper__info-text">{paragraphOne || ''}</p>
                <p className="about-wrapper__info-text">{paragraphTwo || ''}</p>
                <p className="about-wrapper__info-text">{paragraphThree || ''}</p>
                <span className="d-flex mt-3">
                  <a
                    className="cta-btn cta-btn--resume"
                    onClick={downloadResume}
                    onMouseEnter={() => setResumeHover(true)}
                    onMouseLeave={() => setResumeHover(false)}
                  >
                    Resume{' '}
                    {isDownloading ? (
                      <div className={`lds-ring${isResumeHover ? '--hover' : ''}`}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    ) : (
                      <i className="fas fa-download"></i>
                    )}
                  </a>
                </span>
              </div>
            </Fade>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
