import React, { useContext, useState, useRef, useEffect } from 'react';
import Fade from 'react-reveal/Fade';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import Title from '../Title/Title';
import AboutImg from '../Image/AboutImg';
import PortfolioContext from '../../context/context';

const About = () => {
  const { about } = useContext(PortfolioContext);
  const {
    ABOUT_ME: { img, paragraphOne, paragraphTwo, paragraphThree, resume: resumeURL },
    ABOUT_CAT: { img: catImg, paragraphOne: catP1, paragraphTwo: catP2 },
    ABOUT_DOG: { img: dogImg, paragraphOne: dogP1, paragraphTwo: dogP2 },
  } = about;

  const [isDownloading, setIsDownloading] = useState(false);
  const [isResumeHover, setResumeHover] = useState(false);
  const [index, setIndex] = useState(0);
  const [carouselHeight, setCarouselHeight] = useState('auto');
  const aboutSectionRef = useRef(null);
  const carouselItemsRef = useRef([]);

  // Reset refs array when items change
  carouselItemsRef.current = [];

  // Add to refs array
  const addToRefs = (el) => {
    if (el && !carouselItemsRef.current.includes(el)) {
      carouselItemsRef.current.push(el);
    }
  };

  // Update height based on current index
  const updateHeight = (currentIndex) => {
    if (carouselItemsRef.current[currentIndex]) {
      const height = carouselItemsRef.current[currentIndex].offsetHeight;
      setCarouselHeight(`${height}px`);
    }
  };

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
    // Update height when slide changes
    updateHeight(selectedIndex);
  };

  // Initial height setup and handle window resize
  useEffect(() => {
    updateHeight(index);

    // Also update height on window resize
    const handleResize = () => {
      updateHeight(index);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [index]);

  // Handle carousel slide events
  useEffect(() => {
    const carouselElement = document.querySelector('.carousel');
    
    if (carouselElement) {
      const observer = new MutationObserver(() => {
        updateHeight(index);
      });
      
      observer.observe(carouselElement, { 
        attributes: true, 
        attributeFilter: ['class'],
        subtree: true 
      });
      
      return () => {
        observer.disconnect();
      };
    }
  }, [index]);

  const downloadResume = async () => {
    setIsDownloading(true);
    window.open(resumeURL);
    setIsDownloading(false);
  };

  return (
    <section id="about" ref={aboutSectionRef}>
      <Container>
        <Title title="Fun Fact" />
        <Fade bottom duration={1000} delay={600} distance="30px">
          <div 
            className="carousel-container" 
            style={{ 
              height: carouselHeight, 
              transition: 'height 0.5s ease-in-out',
              overflow: 'visible'
            }}
          >
            <Carousel
              activeIndex={index}
              onSelect={handleSelect}
              interval={5000}
              className="about-carousel"
              controls={true}
              indicators={true}
              fade
            >
              {/* Cat Profile */}
              <Carousel.Item>
                <div ref={addToRefs}>
                  <Row className="about-wrapper">
                    <Col md={6} sm={12}>
                      <div className="about-wrapper__image">
                        <AboutImg alt="cat picture" filename={catImg} />
                      </div>
                    </Col>
                    <Col md={6} sm={12}>
                      <div className="about-wrapper__info">
                        <p className="about-wrapper__info-text">{catP1 || ''}</p>
                        <p className="about-wrapper__info-text">{catP2 || ''}</p>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Carousel.Item>

              {/* Dog Profile */}
              <Carousel.Item>
                <div ref={addToRefs}>
                  <Row className="about-wrapper">
                    <Col md={6} sm={12}>
                      <div className="about-wrapper__image">
                        <AboutImg alt="dog picture" filename={dogImg} />
                      </div>
                    </Col>
                    <Col md={6} sm={12}>
                      <div className="about-wrapper__info">
                        <p className="about-wrapper__info-text">{dogP1 || ''}</p>
                        <p className="about-wrapper__info-text">{dogP2 || ''}</p>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Carousel.Item>

              {/* Personal Profile */}
              <Carousel.Item>
                <div ref={addToRefs}>
                  <Row className="about-wrapper">
                    <Col md={6} sm={12}>
                      <div className="about-wrapper__image">
                        <AboutImg alt="profile picture" filename={img} />
                      </div>
                    </Col>
                    <Col md={6} sm={12}>
                      <div className="about-wrapper__info">
                        <p className="about-wrapper__info-text">{paragraphOne || ''}</p>
                        <p className="about-wrapper__info-text">{paragraphTwo || ''}</p>
                        <p className="about-wrapper__info-text">{paragraphThree || ''}</p>
                        <span className="d-flex mt-3">
                          <a
                            type="button"
                            className="cta-btn cta-btn--resume"
                            onClick={downloadResume}
                            onMouseEnter={() => setResumeHover(true)}
                            onMouseLeave={() => setResumeHover(false)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                downloadResume();
                              }
                            }}
                          >
                            Resume{' '}
                            {isDownloading ? (
                              <div className={`lds-ring${isResumeHover ? '--hover' : ''}`}>
                                <div />
                                <div />
                                <div />
                                <div />
                              </div>
                            ) : (
                              <i className="fas fa-download" />
                            )}
                          </a>
                        </span>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
        </Fade>
      </Container>
    </section>
  );
};

export default About;
