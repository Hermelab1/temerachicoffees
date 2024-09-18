import React, { useEffect, useState, useCallback } from 'react';
import '../../style/ourfarms.css';
import Contact from '../contact/contact'; // Ensure the path is correct
import Footer from '../footage/footage';
import Heading from '../Home/headings';
import imagescover from '../../asset/img/CoverImages/Ecover.jpeg'; // Ensure the path is correct
import { motion } from 'framer-motion';

// Function to import all images from a directory
const importAll = (r) => {
    let images = {};
    r.keys().forEach((item) => {
        images[item.replace('./', '')] = r(item);
    });
    return images;
};

// Import images from the directory
const images = importAll(require.context('../../asset/img/Events', false, /\.(jpg|jpeg|png)$/));

// Calculate the total number of images dynamically
const totalItems = Object.keys(images).length;

const Events = () => {
    const [visibleSections, setVisibleSections] = useState(Array(totalItems).fill(false));

    const handleScroll = useCallback(() => {
        const newVisibleSections = visibleSections.slice();

        Array.from({ length: totalItems }).forEach((_, index) => {
            const card = document.getElementById(`training-card-${index}`);
            if (card) {
                const rect = card.getBoundingClientRect();
                newVisibleSections[index] = rect.top < window.innerHeight && rect.bottom >= 0;
            }
        });
        setVisibleSections(newVisibleSections);
    }, [visibleSections]); // Add visibleSections as a dependency

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check visibility on mount

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]); // Include handleScroll in the dependency array

    return (
        <section className='galary-events'>
            <div className="covers">
                <div className='imgs'>
                    <img src={imagescover} alt={`Cover`} />
                </div>
                <div className='slogan'>
                    <Heading title="Exspos" subtitle="Temerachi Coffee Export" />
                </div>
            </div>

            <div className="farm-container">
                {Array.from({ length: totalItems }, (_, index) => (
                    <motion.div
                        id={`training-card-${index}`}
                        className="farm-card"
                        key={index}
                        initial={{ opacity: 0, y: 50 }} // Initial state
                        animate={visibleSections[index] ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} // Animate on scroll
                        transition={{ duration: 0.5 }} // Duration of the animation
                    >
                        <img 
                            src={images[Object.keys(images)[index]]} 
                            alt="" 
                        />
                    </motion.div>
                ))}
            </div>
            <Contact />
            <Footer />
        </section>
    );
};

export default Events;