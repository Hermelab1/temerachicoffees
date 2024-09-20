import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import img1 from '../../asset/img/HeadingImages/CompanyPhoto.jpg';
import img from '../../asset/img/HeadingImages/CompanyPhoto1.jpg';
import img2 from '../../asset/img/HeadingImages/CompanyPhoto2.jpg';
import photo1 from '../../asset/img/ManagementImages/bothmanager.png';

import Heading from '../Home/headings';
import Contactus from '../contact/contact';
import Footer from '../footage/footage';
import '../../style/storydetail.css';
import { management } from '../data/management';
import { teammembers } from '../data/teammembers';

// Utility function to get element rect safely
const getElementRect = (id) => {
  const element = document.getElementById(id);
  return element ? element.getBoundingClientRect() : null;
};

// Debounce utility function
const useDebounce = (callback, delay) => {
  const timerRef = useRef(null);
  const debouncedCallback = (...args) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => callback(...args), delay);
  };
  return debouncedCallback;
};

const images = [img1, img, img2];

const OurStoryDetail = ({ interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    about: false,
    leders: false,
    teamMembers: false,
    contact: false,
    footer: false,
  });
  const imgRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);
    return () => clearInterval(intervalId);
  }, [interval]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    });
    
    // Store `imgRef.current` in a variable immediately
    const currentImgRef = imgRef.current;

    if (currentImgRef) {
      observer.observe(currentImgRef);
    }
    
    return () => {
      if (currentImgRef) {
        observer.unobserve(currentImgRef);
      }
    };
  }, []); // No dependencies to ensure this effect runs only on mount

  const handleScroll = () => {
    const aboutRect = getElementRect('ourhistory');
    const ledersRect = getElementRect('leders');
    const teamMembersRect = getElementRect('teammembers');
    const contactRect = getElementRect('contactus');
    const footerRect = getElementRect('footer');

    setVisibleSections({
      about: aboutRect && aboutRect.top < window.innerHeight && aboutRect.bottom >= 0,
      leders: ledersRect && ledersRect.top < window.innerHeight && ledersRect.bottom >= 0,
      teamMembers: teamMembersRect && teamMembersRect.top < window.innerHeight && teamMembersRect.bottom >= 0,
      contact: contactRect && contactRect.top < window.innerHeight && contactRect.bottom >= 0,
      footer: footerRect && footerRect.top < window.innerHeight && footerRect.bottom >= 0,
    });
  };

  const handleDebouncedScroll = useDebounce(handleScroll, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleDebouncedScroll);
    handleScroll(); // Check on mount

    return () => {
      window.removeEventListener('scroll', handleDebouncedScroll);
    };
  }, [handleDebouncedScroll]);

  return (
    <section className='ourstorydetail'>
      <div id="top" className='covers'>
        <div className='imgs' ref={imgRef}>
          <img src={images[currentIndex]} alt="" />
        </div>
        <div className='slogan'>
          <Heading title="Our Journey Our Story" subtitle="Temerachi Coffee Export" />
        </div>
      </div>

      <motion.div
        id="ourhistory"
        initial={{ opacity: 0, y: 200 }}
        animate={visibleSections.about ? { opacity: 10, y: 0 } : { opacity: 0, y: 50 }} // Apply animation based on visibility
        transition={{ duration: 0.5 }}
        className="ourhistory"
      >
        <div className='about-text'>
          <p>
            <b className='SizeBig'>F</b>ounded in 2019 by two enterprising brothers who had exposure to coffee cultivation and a decade of expertise in the worldwide coffee business. Temerachi Coffee, a leading Ethiopian coffee exporter, collaborates with smallholder farmers in Yirgacheffe, Gedeb, Sidama, and Guji to ensure quality and traceability in their coffee cherries. This approach drives brand growth and value for both the company and the farming communities we work with. <br />
            Temerachi's business model prioritizes corporate social responsibility and environmental stewardship, promoting eco-friendly practices among coffee farmers. The company aims to become a recognized specialty coffee brand globally and educate the next generation of professionals to thrive in the dynamic coffee industry.
          </p>
        </div>
        <div className='images'>
          <img src={photo1} alt="Company Photos" className={isVisible ? 'slide-in-right' : ''} />
        </div>
      </motion.div>

      <motion.div
        id="leders"
        initial={{ opacity: 0, y: 200 }}
        animate={visibleSections.leders ? { opacity: 10, y: 0 } : { opacity: 0, y: 50 }} // Apply animation based on visibility
        transition={{ duration: 0.5 }}
        className='leders'
      >
        <Heading title="Founders" subtitle="Visionary Creators" />
        {management.map((founder, index) => (
          <div className="our" key={index} style={{ display: 'flex', flexDirection: index % 2 === 0 ? 'row' : 'row-reverse', alignItems: 'center', marginBottom: '20px' }}>
            <div className='imagesF' style={{ flex: '1' }}>
              <img src={founder.photo} alt={`Founder ${founder.name}`} className={isVisible ? 'fade-in' : 'fade-out'} />
            </div>
            <div className='aboutF-text' style={{ flex: '2', padding: '0 20px' }}>
              <p>{founder.text}</p>
              <h2>{founder.name}</h2>
              {/* <h2>{founder.position}</h2> */}
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        id="teammembers"
        initial={{ opacity: 0, y: 200 }}
        animate={visibleSections.teamMembers ? { opacity: 10, y: 0 } : { opacity: 0, y: 50 }} // Apply animation based on visibility
        transition={{ duration: 0.5 }}
        className="teammembers"
      >
        <Heading title="Meet Our Team" subtitle="The Faces Behind the Excellence"/>
        <div className="card">
          {teammembers.map((member, index) => (
            <div className="card1" key={index}>
              <img src={member.photo} alt={member.name} />
              <div className="cont">
                <h2>{member.name}</h2>
                <p>{member.position}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        id="contactus"
        initial={{ opacity: 0, y: 200 }}
        animate={visibleSections.contact ? { opacity: 10, y: 0 } : { opacity: 0, y: 50 }} // Apply animation based on visibility
        transition={{ duration: 0.5 }}
        className="contactus"
      >
        <Contactus />
        <Footer />
      </motion.div>
    </section>
  );
};

export default OurStoryDetail;