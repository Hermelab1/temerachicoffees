import React from 'react';
import Heading from '../Home/headings';
import '../../style/coworkers.css';
import { testimonial } from '../data/testimonial';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; 
import 'swiper/swiper-bundle.css';

const CoworkersList = () => {
  const totalItems = testimonial.length;

  return (
    <section className='gallary'>
      <Heading title="Testimonial" subtitle="Our Customers Say It Best" />
      <div className="test-containers">
        {totalItems > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            pagination={{ clickable: true }}
            spaceBetween={50}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonial.map((item, index) => (
              <SwiperSlide key={`testimonial-${index}`}>
                <div className="test-cards">
                  <div className="overlays">
                    <div className='iconp'>
                      <i className="fa-solid fa-quote-left"></i>
                      <p>{item.paragraph || 'Description Not Available'}</p>
                      <i className="fa-solid fa-quote-right"></i>
                      <h2>{item.name + ' (' + item.companyname + ')' || 'Title Not Available'}</h2>
                      <div className='flags'>
                        <img className='flage' src={item.flag} alt="Flag" />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p>No testimonials available.</p>
        )}
      </div>
    </section>
  );
}

export default CoworkersList;