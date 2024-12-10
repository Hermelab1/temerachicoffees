import React from 'react';
import Heading from '../Home/headings';
import { testimonial } from '../data/testimonial';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; 
import 'swiper/swiper-bundle.css';

const CoworkersList = () => {
  const totalItems = testimonial.length;

  return (
    <section>
      <Heading title="Testimonial" subtitle="Our Customers Say It Best" />
      <div className="container mx-auto flex items-center justify-center mb-6">
        {totalItems > 0 ? (
          <Swiper
            className="custom-swiper 2xl:mx-16 xl:mx-8 lg:mx-12 md:mx-8 mx-6"
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
              1280:{slidesPerView:3}
            }}

          >
            {testimonial.map((item, index) => (
              <SwiperSlide key={`testimonial-${index}`}>
                <div className="border border-gray-300 shadow-md p-2 md:p-2 flex flex-col  2xl:h-[45vh] xl:h-[55vh] lg:h-[60vh]  shadow-lg text-center justify-center item-center mx-auto">
                  <div className="flex justify-center items-center mx-auto">
                    <img 
                      src={item.photo} 
                      alt="" 
                      className="border border-gray-300 w-20 h-20 rounded-full object-cover" 
                    />
                  </div>
                  <div className='my-auto'>
                      <i className="fa-solid fa-quote-left text-yellow-500"></i>
                      <p className="font-light leading-8 italic text-center">{item.paragraph || 'Description Not Available'}</p>
                      <i className="fa-solid fa-quote-right text-yellow-500"></i>
                      <h2 className="font-serif font-thin">{item.name} ({item.companyname})</h2>
                      <div className='flex justify-center items-center gap-2 md:gap-8'>
                        <img className='w-6 h-4 md:w-8 md:h-6 border' src={item.flag} alt="Flag" />
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