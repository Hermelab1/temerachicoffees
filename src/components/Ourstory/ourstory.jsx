import React, { useRef } from 'react';
import photo1 from '../../asset/img/HeadingImages/CompanyPhoto.webp';
import photo2 from '../../asset/img/HeadingImages/CompanyPhoto1.webp';
import Heading from '../Home/headings';
import { useNavigate } from 'react-router-dom';

const OurStory = () => {
  const navigate = useNavigate(); // useNavigate allows for navigation without Link
  const aboutTextRef = useRef(null);

  const handleScrollToTop = () => {
    navigate("/OurStory");
    setTimeout(() => {
      window.scrollTo({ top: 0 });
      if (aboutTextRef.current) {
        const rect = aboutTextRef.current.getBoundingClientRect();
        console.log(rect);
      }
    }, 0);
  };

  return (
    <section className="ourstory">
      <Heading title="Our Story" subtitle="A Journey with Beans" />
      <div className="container lg:flex mx-auto justify-center items-center lg:mt-8 lg:mb-12">
        <div ref={aboutTextRef} className="mx-6 xl:w-4/12 lg:w-1/2 text-justify">
          <p className='first-letter:text-9xl first-letter:font-semibold first-letter:text-[#105f4e] first-letter:mr-2 first-letter:float-left font-light'>
            <span style={{ fontFamily: "Cardo, serif" }}>F</span>ounded in 2018 by two enterprising brothers who had exposure to coffee cultivation and a decade of expertise in the worldwide coffee business. Temerachi Coffee has quickly established itself as the leading coffee exporter from the renowned coffee-producing region of Ethiopia. Temerachi Coffee works closely with smallholder farmers across diverse coffee-growing areas like Yirgacheffe, Gedeb, Sidama, Bonga, Jimma and Guji.
          </p>
          <div className="mt-4">
            <button className="btn1" onClick={handleScrollToTop}>
              Learn More
            </button>
          </div>
        </div>
        <div className="flex lg:w-2/5 gap-4 mx-8 items-center justify-center mb-4 animate-rightToLeft overflow-hidden">
          <img className="storyImg" src={photo1} alt="CompanyPhoto"
          />
          <img
            className="storyImg mt-8"
            src={photo2}
            alt="CompanyPhoto"
          />
        </div>
      </div>
    </section>
  );
};

export default OurStory;