import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import img1 from '../../asset/img/HeadingImages/CompanyPhoto.webp';
import img from '../../asset/img/HeadingImages/CompanyPhoto1.webp';
import img2 from '../../asset/img/HeadingImages/CompanyPhoto2.webp';
import photo1 from '../../asset/img/ManagementImages/bothmanager.webp';
import Heading from '../Home/headings';
import Footer from '../footage/footage';
import '../../style/storydetail.css';
import { management } from '../data/management';
import { teammembers } from '../data/teammembers';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules'; 
import 'swiper/swiper-bundle.css';
import Contacts from '../contact/contacts';

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
    leaders: false, // Corrected spelling
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

    const currentImgRef = imgRef.current;

    if (currentImgRef) {
      observer.observe(currentImgRef);
    }

    return () => {
      if (currentImgRef) {
        observer.unobserve(currentImgRef);
      }
    };
  }, []);

  const handleScroll = () => {
    const aboutRect = getElementRect('ourhistory');
    const leadersRect = getElementRect('leaders'); // Corrected spelling
    const teamMembersRect = getElementRect('teammembers');
    const contactRect = getElementRect('contactus');
    const footerRect = getElementRect('footer');

    setVisibleSections({
      about: aboutRect && aboutRect.top < window.innerHeight && aboutRect.bottom >= 0,
      leaders: leadersRect && leadersRect.top < window.innerHeight && leadersRect.bottom >= 0,
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
          <img src={images[currentIndex]} alt="Slideshow" />
        </div>
        <div className='slogan'>
          <Heading title="Our Journey" subtitle="Temerachi Coffee Export" />
        </div>
      </div>

      <motion.div
        id="ourhistory"
        initial={{ opacity: 0, y: 200 }}
        animate={visibleSections.about ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="ourhistory"
      >
        <div className='about-text'>
          <p>
            <b className='SizeBig'>F</b>ounded in 2019 by two enterprising brothers who had exposure to coffee cultivation and a decade of expertise in the worldwide coffee business. Temerachi Coffee, a leading Ethiopian coffee exporter, collaborates with smallholder farmers in Yirgacheffe, Gedeb, Sidama, and Guji to ensure quality and traceability in their coffee cherries. This approach drives brand growth and value for both the company and the farming communities we work with. 
            <br />
            Temerachi's business model prioritizes corporate social responsibility and environmental stewardship, promoting eco-friendly practices among coffee farmers. The company aims to become a recognized specialty coffee brand globally and educate the next generation of professionals to thrive in the dynamic coffee industry.
          </p>
        </div>
        <div className='image'>
          <img src={photo1} alt="Company Photos" className={isVisible ? 'slide-in-right' : ''} />
        </div>
      </motion.div>

      <motion.div
        id="leaders"
        initial={{ opacity: 0, y: 200 }}
        animate={visibleSections.leaders ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className='leaders'
      >
        <Heading title="Founders" subtitle="Visionary Creators" />
      <div className="lead">
      <Swiper
          className="custom-swiper"
          modules={[Pagination, Autoplay]} // Ensure these are imported correctly
          pagination={{ clickable: true }}
          loop={true}
          spaceBetween={30}
          autoplay={{
            delay: 6000, // Set your desired autoplay delay
            disableOnInteraction: false,
          }}
          breakpoints={{
            480: { slidesPerView: 1 },
            667:{slidesPerView:2},
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
          }}
        >
          {management.map((founder, index) => (
            <SwiperSlide key={`founder-${index}`}>
              <div className="our">
                <div className='imagesF'>
                  <img src={founder.photo} alt={`Founder ${founder.name}`} />
                </div>
                <div className='aboutF-text'>
                  <h2>{founder.name}</h2>
                  <p>{founder.text}</p>
                </div>
              </div>

              {/* Icon in the middle */}
              {index < management.length - 1 && ( // Avoid rendering icon after the last founder
                <div className="icon-container">
                <i class="fa-brands fa-d-and-d"></i>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      </motion.div>

      <motion.div
        id="teammembers"
        initial={{ opacity: 0, y: 200 }}
        animate={visibleSections.teamMembers ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="teammembers"
      >
        <Heading title="Meet Our Team" subtitle="The Faces Behind the Excellence" />
        <Swiper
            className="custom-swiper"
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            loop={true}
            spaceBetween={20} // Ensure there's no space between slides
            autoplay={{
              delay: interval,
              disableOnInteraction: false,
            }}
            breakpoints={{
              480: { slidesPerView: 1 },
              667:{slidesPerView:3},
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 3 },
              1300: { slidesPerView: 5 },
            }}
          >
            {teammembers.map((member, index) => (
              <SwiperSlide key={`teammember-${index}`}>
                <div className="card1">
                  <img src={member.photo} alt={member.name} />
                  <div className="cont">
                    <h2>{member.name}</h2>
                    <p>{member.position}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
      </motion.div>

      <motion.div
        id="contactus"
        initial={{ opacity: 0, y: 200 }}
        animate={visibleSections.contact ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="contactus"
      >
        <Contacts/>
        <Footer />
      </motion.div>
    </section>
  );
};

export default OurStoryDetail;