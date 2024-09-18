import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Coffeetype } from '../data/Coffetype';
import Heading from '../Home/headings';
import Contactus from '../contact/contact';
import Footer from '../footage/footage';
import CoverIma from '../../asset/img/CoverImages/Ocover.jpg';
import '../../style/sample.css';
import { motion } from 'framer-motion';

// Function to import all images from a specific directory
const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
};

const images = importAll(require.context('../../asset/img/CoffeType', false, /\.(webp|jpg|jpeg|png)$/));

const SampleOrder = () => {
  const totalItems = Math.min(Coffeetype.length, Object.keys(images).length);
  const [visibleSections, setVisibleSections] = useState(Array(totalItems).fill(false));

  const handleScrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0 });
    }, 0);
  };

  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      const newVisibleSections = visibleSections.slice();

      for (let index = 0; index < totalItems; index++) {
        const card = document.getElementById(`order-card-${index}`);
        if (card) {
          const rect = card.getBoundingClientRect();
          newVisibleSections[index] = rect.top < window.innerHeight && rect.bottom >= 0;
        }
      }
      setVisibleSections(newVisibleSections);
    });
  }, [visibleSections, totalItems]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, totalItems]);

  return (
    <section className='gallery-events'>
      <div className='covers'>
        <div className='imgs'>
          <img src={CoverIma} alt="Cover" />
        </div>
        <div className='slogan'>
          <Heading title="Quick Orders Quality Promised" subtitle="" />
        </div>
      </div>

      <div className="order-container">
        {Array.from({ length: totalItems }, (_, index) => {
          const coffeeItem = Coffeetype[index];
          const imageKey = Object.keys(images)[index];
          const imageUrl = images[imageKey] || ''; // Handle potential missing images

          return (
            <motion.div
              id={`order-card-${index}`}
              className="order-card"
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={visibleSections[index] ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              {imageUrl && <img src={imageUrl} alt={`Coffee Type: ${coffeeItem?.name || 'Not Available'}`} />}
              <div className="order-overlay">
                <h2>{coffeeItem?.cname || 'Title Not Available'}</h2>
              </div>
              <div className='order-status'>
                <Link to="/orderd"
                  onClick={handleScrollToTop}
                  state={{ 
                    image: imageUrl,
                    cname: coffeeItem.cname, 
                    code: coffeeItem.code,
                    availability: coffeeItem.avalablity, 
                    description: coffeeItem.description, 
                    category: coffeeItem.catagory.map(c => ({
                      imgs: c.imgs,
                      titles: c.titles,
                      grades: c.grades.map(g => ({
                        gname: g.gname || 'Grade Not Available', 
                        price: g.price
                      }))
                    })),
                    titles: coffeeItem.catagory?.[0]?.titles || 'Title Not Available',
                    grades: coffeeItem.catagory?.[0]?.grades?.map(g => g.gname) || ['Grade Not Available'],
                    price: coffeeItem.catagory?.[0]?.grades?.[0]?.price || 'Price Not Available'
                  }}
                  className='status'
                >
                  See More
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      <Contactus />
      <Footer />
    </section>
  );
};

export default SampleOrder;