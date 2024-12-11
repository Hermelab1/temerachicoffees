import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import img1 from '../../asset/img/HeadingImages/CompanyPhoto.webp';
import img from '../../asset/img/HeadingImages/CompanyPhoto1.webp';
import img2 from '../../asset/img/HeadingImages/CompanyPhoto2.webp';
import photo1 from '../../asset/img/ManagementImages/bothmanager.webp';
import andope from '../../asset/img/and/and.png'
import Heading from '../Home/headings';
import Footer from '../footage/footage';
import { management } from '../data/management';
import { teammembers } from '../data/teammembers';
import Contacts from '../contact/contacts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules'; 
import 'swiper/swiper-bundle.css';

const getElementRect = (id) => {
  const element = document.getElementById(id);
  return element ? element.getBoundingClientRect() : null;
};

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
  const [visibleSections, setVisibleSections] = useState({
    about: false,
    leaders: false,
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
    const leadersRect = getElementRect('leaders');
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
    handleScroll(); 

    return () => {
      window.removeEventListener('scroll', handleDebouncedScroll);
    };
  }, [handleDebouncedScroll]);

  return (
    <>
      <section className='ourstorydetail'>
        <div className='covers'>
          <div className='imgs'>
            <img src={images[currentIndex]} alt="Company Slideshow" ref={imgRef} />
          </div>
          <div className='slogan'>
            <Heading title="Our Journey" subtitle="Temerachi Coffee Export" />
          </div>
        </div>
      </section>
      
      <section>
        <div className="container md:flex mx-auto my-20">
          <motion.div
            id="ourhistory"
            initial={{ opacity: 0, y: 200 }}
            animate={visibleSections.about ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:gap-28  gap-4 justify-center items-center mx-8"
          >
            <div className='about-text w-full xl:w-[55%] 2xl:w-[40%] lg:w-[50%] md:w-[45%]'>
              <p className="first-letter:text-[150px] first-letter:font-Cardo first-letter:font-semimudium first-letter:text-[#176756] first-letter:float-left first-letter:leading-[80px] 2xl:leading-[2.4rem] md:leading-[2rem]">
                  Founded in 2018 by two enterprising brothers who had exposure to coffee cultivation and a decade of expertise in the worldwide coffee business. Temerachi Coffee, a leading Ethiopian coffee exporter, collaborates with smallholder farmers in Yirgacheffe, Gedeb, Sidama, Bonga, Jimma and Guji to ensure quality and traceability in their coffee cherries. This approach drives brand growth and value for both the company and the farming communities we work with. 
                  <br />
                  Temerachi's business model prioritizes corporate social responsibility and environmental stewardship, promoting eco-friendly practices among coffee farmers. The company aims to become a recognized specialty coffee brand globally and educate the next generation of professionals to thrive in the dynamic coffee industry.
              </p>
            </div>
            <div className='w-[80%] xl:w-[22%] xl:h-[60vh] lg:w-2/6 md:h-[95vh] h-[50vh] animate-rightToLeft flex items-center justify-center'>
              <img src={photo1} alt="Company Manager" className='shadow-custom w-full h-full' />
            </div>
          </motion.div>
        </div>
      </section>

      <section className='bg-[#f8f9fa]'>
        <div className="container mx-auto mb-8">
          <motion.div
            id="leaders"
            initial={{ opacity: 0, y: 200 }}
            animate={visibleSections.leaders ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className='custom-swiper justify-center items-center relative mx-4 lg-24'
          >
            <Heading title="Founders" subtitle="Visionary Creators" />

            <div className="lead">
              <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                loop={true}
                spaceBetween={30}
                autoplay={{
                  delay: 6000,
                  disableOnInteraction: false,
                }}
                grabCursor={true}
                breakpoints={{
                  480: { slidesPerView: 1 },
                  667: { slidesPerView: 2 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 2 },
                }}
                className="mySwiper "
              >
                {management.map((founder, index) => (
                  <SwiperSlide key={`founder-${index}`} className="flex justify-center">
                    <div className="w-full md:w-[80%]  mx-auto p-2 md:p-4">
                      <div className="flex justify-center items-center mx-auto">
                        <img src={founder.photo} alt={`Founder ${founder.name}`} className="lg:w-[55%] lg:h-[35vh] w-[70%] object-cover border-2 border-gray-200 shadow-custom" />
                      </div>
                      <div className='aboutF-text text-center p-2'>
                        <h2 className="text-2xl font-semibold tracking-wide text-[#105f4e] p-2">{founder.name}</h2>
                        <p className='mb-4'>{founder.text}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}

                <div className="absolute top-[20%] left-[50%] transform -translate-x-1/2 hidden md:block">
                  <img src={andope} alt="and operator" />
                </div>
              </Swiper>
            </div>
          </motion.div>
        </div>
      </section>

      <section>
        <div className='container mx-auto'>
          <motion.div
            id="teammembers"
            initial={{ opacity: 0, y: 200 }}
            animate={visibleSections.teamMembers ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="custom-swiper text-center mx-8 md:mx-24"
          >
            <Heading title="Meet Our Team" subtitle="The Faces Behind the Excellence" />

            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              loop={true}
              spaceBetween={20}
              autoplay={{
                delay: interval,
                disableOnInteraction: false,
              }}
              breakpoints={{
                480: { slidesPerView: 1 },
                667: { slidesPerView: 2 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
                1300: { slidesPerView: 5 },
              }}
            >
              {teammembers.map((member, index) => (
                <SwiperSlide key={`teammember-${index}`}>
                  <div className="border-2 border-gray-200 shadow-custom relative h-[45vh] 2xl:h-[45vh] xl:h-[40vh] lg:h-[52vh] md:h-[35vh] mb-16">
                    <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                    <div className="bg-[#391f11] bg-opacity-75 text-white text-center absolute bottom-0 left-0 w-full p-2 ">
                      <h2 className='font-semibold text-[1.2rem]'>{member.name}</h2>
                      <p className='text-center text-white text-[0.97rem]'>{member.position}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

          </motion.div>
        </div>
      </section>

      <section className='bg-[#f8f9fa]'>
        <motion.div
          id="contactus"
          initial={{ opacity: 0, y: 200 }}
          animate={visibleSections.contact ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="contactus"
        >
          <Contacts />
          <Footer />
        </motion.div>
      </section>
    </>
  );
};

export default OurStoryDetail;