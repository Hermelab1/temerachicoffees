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
  const [likeCounts, setLikeCounts] = useState(new Array(blogs.length).fill(0)); // Array to hold like counts
  const [shareCounts, setShareCounts] = useState(new Array(blogs.length).fill(0)); // Array to hold share counts

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
    // Load like counts and share counts from localStorage
    const storedLikes = JSON.parse(localStorage.getItem('likeCounts')) || new Array(blogs.length).fill(0);
    const storedShares = JSON.parse(localStorage.getItem('shareCounts')) || new Array(blogs.length).fill(0);
    
    setLikeCounts(storedLikes);
    setShareCounts(storedShares);

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on component mount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const handleLike = (index) => {
    const newLikeCounts = [...likeCounts];
    newLikeCounts[index] += 1;
    setLikeCounts(newLikeCounts);
    
    // Save the updated counts to localStorage
    localStorage.setItem('likeCounts', JSON.stringify(newLikeCounts));
  };

  const handleShare = (index, title, url) => {
    const newShareCounts = [...shareCounts];
    newShareCounts[index] += 1; // Increment share count for the specific blog
    setShareCounts(newShareCounts);
    
    // Save the updated counts to localStorage
    localStorage.setItem('shareCounts', JSON.stringify(newShareCounts));

    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);
    
    const shareUrl = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&title=${encodedTitle}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      email: `mailto:?subject=${encodedTitle}&body=${url}`,
      telegram: `https://telegram.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      instagram: `https://www.instagram.com/?url=${encodedUrl}`, // Note: Instagram does not support direct sharing of URLs
    };
  
    const shareWindow = window.open(shareUrl.facebook, '_blank');
  
    if (shareWindow) {
      shareWindow.focus();
    }
  };

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
                    __html: detail ? detail.substring(0, 100) + ' [...]' : 'Detail not available'
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
                      likeCount: likeCounts[index],  // Pass the current like count
                      shareCount: shareCounts[index]  // Pass the current share count
                    }}
                    className='status'
                    onClick={() => window.scrollTo(0, 0)} // Scroll to the top before navigating
                  >
                    read more
                  </Link>
                </div>
                <div className="likes">
                  <button onClick={() => handleLike(index)}>
                    <i className="fa-regular fa-heart"></i> {likeCounts[index]}
                  </button>
                  <button onClick={() => handleShare(index, title, window.location.href)}>
                    <i className="fa-solid fa-share"></i> {shareCounts[index]}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <Footer />
    </section>
  );
};

export default Blog;