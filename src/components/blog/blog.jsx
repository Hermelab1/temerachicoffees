import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { blogs } from '../data/blog';
import Contactus from '../contact/contact';
import imagescover from '../../asset/img/CoverImages/Bcover.webp';
import Footer from '../footage/footage';
import Heading from '../Home/headings';
import '../../style/blog.css';
import { motion } from 'framer-motion';

const Blog = () => {
  const [visibleSections, setVisibleSections] = useState(new Array(blogs.length).fill(false));
  const [expandedIndex] = useState(null);

  // Sort blogs by date when component mounts
  const sortedBlogs = [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleScroll = useCallback(() => {
    const newVisibleSections = sortedBlogs.map((_, index) => {
      const card = document.getElementById(`blog-details-${index}`);
      if (card) {
        const rect = card.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom >= 0;
      }
      return false;
    });
    setVisibleSections(newVisibleSections);
  }, [sortedBlogs]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on component mount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <section className="blog">
      <div className="covers">
        <div className='imgs'>
          <img src={imagescover} alt={`Cover`} />
        </div>
        <div className='slogan'>
          <Heading title="Blog" subtitle="Temerachi Coffee Export" />
        </div>
      </div>
      
      <div className="blog-container">
        {sortedBlogs.map((blog, index) => {
          const { title, detail, mediaType, mediaSrc, date } = blog;
          return (
            <motion.div
              key={index}
              id={`blog-details-${index}`}
              className="blog-details"
              initial={{ opacity: 0, y: 50 }}
              animate={visibleSections[index] ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="media">
                {mediaType === 'video' ? (
                  <video src={mediaSrc} controls />
                ) : (
                  <img src={mediaSrc} alt={title || 'Blog media'} />
                )}
              </div>
              <div className="details">
                <h3>{title || 'Title Not Available'}</h3>
                <p className="blog-date">{date}</p>
                <p 
                  dangerouslySetInnerHTML={{
                    __html: expandedIndex === index ? detail : (detail ? detail.substring(0, 100) + ' [...]' : 'Detail not available')
                  }} 
                />

                <div className='blog-status'>
                  <Link
                    to="/blogdetail"
                    state={{ 
                      mediaSrc: mediaSrc,
                      mediaType: mediaType,
                      title: title, 
                      detail: detail,
                      dates: date,
                    }}
                    className='status'
                  >
                    read more
                  </Link>
                </div>
                <div className="likes">
                  <i className="fa-regular fa-heart"></i>
                  <i className="fa-regular fa-thumbs-up"></i>
                  <i className="fa-solid fa-share"></i>
                </div>
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

export default Blog;