import React from 'react';
import '../../style/ourfarms.css';
import Footer from '../footage/footage';
import Heading from '../Home/headings';
import imagescover from '../../asset/img/CoverImages/Ecover.webp'; // Ensure the path is correct
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules'; 
import 'swiper/swiper-bundle.css';


// Function to import all images from a directory
const importAll = (r) => {
    let images = {};
    r.keys().forEach((item) => {
        images[item.replace('./', '')] = r(item);
    });
    return images;
};

// Import images from the directory
const imagesE = importAll(require.context('../../asset/img/Events', false, /\.(webp|jpg|jpeg|png)$/));
const imagesO = importAll(require.context('../../asset/img/Farms', false, /\.(webp|jpg|jpeg|png)$/));

// Calculate the total number of images dynamically
const totalItemsE = Object.keys(imagesE).length;
const totalItemsO = Object.keys(imagesO).length;

const Events = () => {
    return (
        <section className='gallery-events'>
            <div className="covers">
                <div className='imgs'>
                    <img src={imagescover} alt='Cover' />
                </div>
                <div className='slogan'>
                    <Heading title="Gallery" subtitle="Temerachi Coffee Export" />
                </div>
            </div>

            <div className="farm-container">
                <Heading title="Events" subtitle="Connect with fellow coffee lovers!"/>
                <Swiper
                    modules={[Navigation, Autoplay]} // Removed Pagination
                    spaceBetween={30}
                    loop={true}
                    autoplay={{ delay: 5000 }} // Fixed to lowercase
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {Array.from({ length: totalItemsE }, (_, index) => (
                        <SwiperSlide key={index}>
                            <motion.div
                                id={`training-card-${index}`}
                                className="farm-card"
                                transition={{ duration: 0.2 }}
                            >
                                <img 
                                    src={imagesE[Object.keys(imagesE)[index]]} 
                                    alt={`Event ${index}`}
                                />
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="farm-container">
                <Heading title="Our Farm" subtitle="Discover the Essence of Our Farm"/>
                <Swiper
                    modules={[Navigation, Autoplay]} // Removed Pagination
                    spaceBetween={30}
                    loop={true}
                    autoplay={{ delay: 6000 }} // Fixed to lowercase
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {Array.from({ length: totalItemsO }, (_, index) => (
                        <SwiperSlide key={index}>
                            <motion.div
                                id={`training-card-${index}`}
                                className="farm-card"
                                transition={{ duration: 0.2 }}
                            >
                                <img 
                                    src={imagesO[Object.keys(imagesO)[index]]} 
                                    alt={`Farm ${index}`} // Changed alt to reflect the correct context
                                />
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <Footer />
        </section>
    );
};

export default Events;