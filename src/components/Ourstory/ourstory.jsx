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
      <div className="container md:flex mx-auto justify-center items-center lg:my-8">
        <div ref={aboutTextRef} className="mx-6 my-8 xl:w-[33%] lg:w-[35%] md:w-[80%] text-justify">
          <p className="first-letter:text-[150px] first-letter:font-Cardo first-letter:font-semimudium first-letter:text-[#176756] first-letter:float-left first-letter:leading-[80px]">
              Founded in 2018 by two enterprising brothers who had exposure to coffee cultivation and a decade of expertise in the worldwide coffee business. Temerachi Coffee has quickly established itself as the leading coffee exporter from the renowned coffee-producing region of Ethiopia. 
              Temerachi Coffee works closely with smallholder farmers across diverse coffee-growing areas like Yirgacheffe, Gedeb, Sidama, Bonga, Jimma, and Guji.
          </p>
          <div className="mt-4">
            <button className="btn1 p-3" onClick={handleScrollToTop}>
              Learn More
            </button>
          </div>
        </div>
        <div className="flex xl:w-2/5 lg:w-[45%] gap-6 mx-8 items-center justify-center mb-4 px-4 animate-rightToLeft overflow-hidden">
          <img className="storyImg" src={photo1} alt="CompanyPhoto"
          />
          <img
            className="storyImg mt-12"
            src={photo2}
            alt="CompanyPhoto"
          />
        </div>
      </div>
    </section>
  );
};

export default OurStory;