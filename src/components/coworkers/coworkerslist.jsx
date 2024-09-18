import React from 'react';
import Heading from '../Home/headings';
import '../../style/coworkers.css';
import co from '../../asset/img/Coworkers/Co.png';
import co1 from '../../asset/img/Coworkers/Screenshot 2024-08-04 131109.png';
import { testimonial } from '../data/testimonial';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // Import from 'swiper/modules'
import 'swiper/swiper-bundle.css';

const CoworkersList = () => {
  // Determine the total number of items
  const totalItems = testimonial.length;

  return (
    <section className='gallary'>
      <Heading title="Testimonial" subtitle="Our Customers Say It Best" />
      <div className="wrapper">
        <div className="item item1"><img src={co} alt="Co" /></div>
        <div className="item item2"><img src={co1} alt="Co1" /></div>
        <div className="item item3"><img src={co} alt="Co" /></div>
      </div>

      <div className="test-containers">
        {totalItems > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            pagination={{ clickable: true }}
            spaceBetween={30}
            autoplay={{
              delay: 3000,
            }}
            breakpoints={{
              640: { // Mobile devices
                slidesPerView: 1,
              },
              768: { // Tablets
                slidesPerView: 2,
              },
              1024: { // Desktops
                slidesPerView: 3,
              },
            }}
          >
            {testimonial.map((item, index) => (
              <SwiperSlide key={`testimonial-${index}`}>
                <div className="test-cards">
                  <img src={item.photo} alt="customer-photo" />
                  <div className="overlays">
                    <div className='iconp'>
                      <i className="fa-solid fa-quote-left"></i>
                      <p>{item.paragraph || 'Description Not Available'}</p>
                      <i className="fa-solid fa-quote-right"></i>
                      <h3>{item.name || 'Title Not Available'}</h3>
                      <div className='flags'>
                        <p className='companyname'>{item.companyname || 'Not Available'}</p>
                        <img className='flage'src={item.flag} alt="Flag" />
                      </div>
                    </div>
                    
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p>No testimonials available.</p> // Handle empty testimonials
        )}
      </div>
    </section>
  );
}

export default CoworkersList;