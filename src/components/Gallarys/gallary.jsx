import '../../style/gallary.css'; // Ensure this path is correct
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // Import from 'swiper/modules'
import 'swiper/swiper-bundle.css';
import { coffeeprocess } from '../data/coffeeprocess';

const Gallary = () => {
  return (
    <section className='gallery'>
      <div className='container'>
        <div className="swapers">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            pagination={{ clickable: true }}
            spaceBetween={20} // Adjust space between slides for better visibility
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { // Mobile devices
                slidesPerView: 1,
              },
              768: { // Tablets
                slidesPerView: 2,
              },
              1024: { // Desktops
                slidesPerView: 3, // Adjusting to 3 for desktops to fit better
              },
            }}
          >
            {coffeeprocess.map((item, index) => (
              <SwiperSlide key={index} className="slide-item">
                <div className="slide-content">
                  <img className="circular-image" src={item.photo} alt={item.title} />
                  <div className="text-content">
                    <h2>{item.title}</h2>
                    
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
export default Gallary;