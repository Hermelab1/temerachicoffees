import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Coffeetype } from '../data/Coffeetype'; // Make sure Coffeetype is an array
import Heading from '../Home/headings';
import Footer from '../footage/footage';
import CoverIma from '../../asset/img/CoverImages/Ocover.webp';
import '../../style/sample.css';
import { motion } from 'framer-motion';
import Contacts from '../contact/contacts';



const SampleOrder = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const totalItems = Coffeetype.length; // Assuming Coffeetype is an array of coffee items
  const coffeeItems = Coffeetype; // Make sure this is the correct reference to your coffee items

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
  }, [handleScroll]);

  const handleScrollToTop = () => {
    window.scrollTo(0, 0); // Function to scroll to the top of the page
  };

  return (
    <section className='gallery-events'>
      <div className='covers'>
        <div className='imgs'>
          <img src={CoverIma} alt="Cover" />
        </div>
        <div className='slogan'>
          <Heading title="Reliable Quality" subtitle="Temerachi Coffee Export" />
        </div>
      </div>
      <div className="order-container">
        {coffeeItems.map((coffeeItem, index) => (
          <motion.div
            key={index}
            id={`order-card-${index}`}
            className="order-card"
            initial={{ opacity: 0, y: 50 }}
            animate={visibleSections[index] ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/orderd"
              onClick={handleScrollToTop}
              state={{
                image: coffeeItem.imgs,
                cname: coffeeItem.cname,
                code: coffeeItem.code,
                availability: coffeeItem.avalablity,
                description: coffeeItem.description,
                category: coffeeItem.catagory.map(c => ({
                  titles: c.titles,
                  grades: c.grades.map(g => ({
                    gname: g.gname || 'Grade Not Available',
                    price: g.price
                  }))
                })),
                titles: coffeeItem.catagory?.[0]?.titles || 'Title Not Available',
                grades: coffeeItem.catagory?.[0]?.grades.map(g => g.gname) || ['Grade Not Available'],
                price: coffeeItem.catagory?.[0]?.grades?.[0]?.price || 'Price Not Available'
              }}
              className='status'
            >
              <img src={coffeeItem.imgs} alt={`Coffee Type: ${coffeeItem?.name || 'Not Available'}`} />
            </Link>

            <div className="order-overlay">
              <h2>{coffeeItem?.cname || 'Title Not Available'}</h2>
            </div>
          </motion.div>
        ))}
      </div>
      <Contacts />
      <Footer />
    </section>
  );
};

export default SampleOrder;
