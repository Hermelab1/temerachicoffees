import React, { useRef } from 'react';
import '../../style/ahout.css';
import photo1 from '../../asset/img/HeadingImages/CompanyPhoto.webp';
import photo2 from '../../asset/img/HeadingImages/CompanyPhoto1.webp';
import Heading from '../Home/headings';
import { useNavigate } from 'react-router-dom';

const OurStory = () => {
  const navigate = useNavigate(); // useNavigate allows for navigation without Link

  // Create a ref to the element you want to measure
  const aboutTextRef = useRef(null);

  const handleScrollToTop = () => {
    navigate("/OurStory");

    // Optionally, add a timeout to ensure the scroll happens after the navigation
    setTimeout(() => {
      window.scrollTo({ top: 0 });

      // Example of using getBoundingClientRect
      if (aboutTextRef.current) {
        const rect = aboutTextRef.current.getBoundingClientRect();
        console.log(rect); // Log or use rect as needed
      }
    }, 0); // Adjust the timeout as necessary
  };

  return (
    <section className='ourstory'>
      <Heading title="Our Story" subtitle="A Journey with Beans"/>
      <div className='container'>
        <div className='about-text' ref={aboutTextRef}>
          <p>
            Founded in 2018 by two enterprising brothers who had exposure to coffee cultivation and a decade of expertise in the worldwide coffee business. Temerachi Coffee has quickly established itself as the leading coffee exporter from the renowned coffee-producing region of Ethiopia. Temerachi Coffee works closely with smallholder farmers across diverse coffee-growing areas like Yirgacheffe, Gedeb, Sidama, and Guji.
          </p>
          <div className="button flex">
            <button className='btn1' onClick={handleScrollToTop}>
              Learn More
            </button>
          </div>
        </div>
        <div className='images'>
          <img src={photo1} alt="CompanyPhoto" />
          <img src={photo2} alt="CompanyPhoto" className='photo2' />
        </div>
      </div>
    </section>
  );
};

export default OurStory;
