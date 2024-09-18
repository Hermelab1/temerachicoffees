import React from 'react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Hero from './hero';
import Ourstory from '../Ourstory/ourstory';
import Gallay from '../Gallarys/gallary';
import Speciality from '../Ourspaciality/spaciality';
import Contact from '../contact/contact';
import Footage from '../footage/footage';
import Coworkerslist from '../coworkers/coworkerslist';

const sections = [
  { component: Hero, key: 1 },
  { component: Ourstory, key: 2 },
  { component: Gallay, key: 3 },
  { component: Speciality, key: 4 },
  { component: Coworkerslist, key: 5 },
  { component: () => (
      <>
        <Contact />
        <Footage />
      </>
    ), key: 6 
  }
];

const Home = () => {
  const [visibleSections, setVisibleSections] = useState(Array(sections.length).fill(false));

  const handleScroll = () => {
    const newVisibleSections = sections.map((section, index) => {
      const element = document.getElementById(`section-${section.key}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom >= 0;
      }
      return false;
    });
    setVisibleSections(newVisibleSections);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once on mount to check initial visibility

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {sections.map((section, index) => {
        const Component = section.component;
        return (
          <motion.div
            id={`section-${section.key}`}
            key={section.key}
            initial={{ opacity: 0, y: 200 }}
            animate={visibleSections[index] ? { opacity: 2, y: 0 } : { opacity: 0, y: 100 }} // Apply animation based on visibility
            transition={{ duration: 1 }}
          >
            <Component />
          </motion.div>
        );
      })}
    </>
  );
};

export default Home;