import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { blogs } from '../data/blog';
import imagescover from '../../asset/img/CoverImages/Bcover.webp';
import Footer from '../footage/footage';
import Heading from '../Home/headings';
import { motion } from 'framer-motion';
import Contacts from '../contact/contacts';

const Blog = () => {
  /* ===================== STATES ===================== */
  const BLOGS_PER_PAGE = 6;

  const sortedBlogs = [...blogs].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(sortedBlogs.length / BLOGS_PER_PAGE);

  const [visibleSections, setVisibleSections] = useState(
    new Array(sortedBlogs.length).fill(false)
  );

  const [likeCounts, setLikeCounts] = useState(() => {
    const savedCounts = localStorage.getItem('likeCounts');
    return savedCounts
      ? JSON.parse(savedCounts)
      : new Array(sortedBlogs.length).fill(0);
  });

  const [shareCounts, setShareCounts] = useState(() => {
    const storedShares = localStorage.getItem('shareCounts');
    return storedShares
      ? JSON.parse(storedShares)
      : new Array(sortedBlogs.length).fill(0);
  });

  const [isShareVisible, setIsShareVisible] = useState(
    new Array(sortedBlogs.length).fill(false)
  );

  /* ===================== PAGINATION ===================== */
  const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
  const endIndex = startIndex + BLOGS_PER_PAGE;
  const currentBlogs = sortedBlogs.slice(startIndex, endIndex);

  /* ===================== SCROLL ANIMATION ===================== */
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
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /* ===================== ACTIONS ===================== */
  const handleLike = (index) => {
    const newLikeCounts = [...likeCounts];
    newLikeCounts[index] += 1;
    setLikeCounts(newLikeCounts);
    localStorage.setItem('likeCounts', JSON.stringify(newLikeCounts));
  };

  const handleShare = (index, title, url, platform) => {
    const newShareCounts = [...shareCounts];
    newShareCounts[index] += 1;
    setShareCounts(newShareCounts);
    localStorage.setItem('shareCounts', JSON.stringify(newShareCounts));

    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&title=${encodedTitle}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      telegram: `https://telegram.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    };

    window.open(shareUrls[platform], '_blank');
  };

  const toggleShareButtons = (index) => {
    setIsShareVisible((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const changePage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ===================== UI ===================== */
  return (
    <section className="blog">
      {/* ===== Cover ===== */}
      <div className="covers">
        <div className="imgs">
          <img src={imagescover} alt="Cover" />
        </div>
        <div className="slogan">
          <Heading title="Blog" subtitle="Temerachi Coffee Export" />
        </div>
      </div>

      {/* ===== Blog Cards ===== */}
      <section>
        <div className="container flex flex-wrap m-auto justify-center md:my-6 my-0">
          {currentBlogs.map((blog, i) => {
            const globalIndex = startIndex + i;
            const { title, detail, mediaType, mediaSrc, date } = blog;

            return (
              <motion.div
                key={globalIndex}
                id={`blog-details-${globalIndex}`}
                className="blog-details"
                initial={{ opacity: 0, y: 50 }}
                animate={
                  visibleSections[globalIndex]
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.5 }}
              >
                <div className="bmedia">
                  {mediaType === 'video' ? (
                    <video src={mediaSrc} controls />
                  ) : (
                    <img
                      src={mediaSrc}
                      alt={title}
                      className="w-full h-full"
                    />
                  )}
                </div>

                <div className="grow p-[15px]">
                  <h3 className="text-xl mb-1 text-[#105f4e] font-semibold">
                    {title}
                  </h3>
                  <p className="text-[#b9b9b9] font-light">{date}</p>

                  <p
                    className="leading-7 mb-4"
                    dangerouslySetInnerHTML={{
                      __html: detail.substring(0, 100) + ' [...]',
                    }}
                  />

                  <Link
                    to="/blogdetail"
                    state={{
                      mediaSrc,
                      mediaType,
                      title,
                      detail,
                      dates: date,
                      likeCount: likeCounts[globalIndex],
                      shareCount: shareCounts[globalIndex],
                    }}
                    className="text-[#007bff] hover:underline"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    Read more
                  </Link>

                  <div className="likes mt-3">
                    <button onClick={() => handleLike(globalIndex)}>
                      <i className="fa-regular fa-heart text-[brown]"></i>{' '}
                      {likeCounts[globalIndex]}
                    </button>

                    <button onClick={() => toggleShareButtons(globalIndex)}>
                      <i className="fa-solid fa-share-nodes text-[#0888b3]"></i>{' '}
                      {shareCounts[globalIndex]}
                    </button>

                    {isShareVisible[globalIndex] && (
                      <div className="share-buttons">
                        <button
                          onClick={() =>
                            handleShare(
                              globalIndex,
                              title,
                              window.location.href,
                              'facebook'
                            )
                          }
                        >
                          <i className="fa-brands fa-facebook"></i>
                        </button>
                        <button
                          onClick={() =>
                            handleShare(
                              globalIndex,
                              title,
                              window.location.href,
                              'twitter'
                            )
                          }
                        >
                          <i className="fa-brands fa-twitter"></i>
                        </button>
                        <button
                          onClick={() =>
                            handleShare(
                              globalIndex,
                              title,
                              window.location.href,
                              'email'
                            )
                          }
                        >
                          <i className="fa-solid fa-envelope"></i>
                        </button>
                        <button
                          onClick={() =>
                            handleShare(
                              globalIndex,
                              title,
                              window.location.href,
                              'telegram'
                            )
                          }
                        >
                          <i className="fa-brands fa-telegram"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ===== Pagination ===== */}
<div className="flex justify-center items-center my-12">
  <div className="flex items-center gap-2 bg-white shadow-md rounded-full px-4 py-2">

    {/* Previous */}
    <button
      disabled={currentPage === 1}
      onClick={() => changePage(currentPage - 1)}
      className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300
        ${currentPage === 1
          ? 'text-gray-300 cursor-not-allowed'
          : 'text-[#105f4e] hover:bg-[#105f4e] hover:text-white'}
      `}
    >
      <i className="fa-solid fa-chevron-left"></i>
    </button>

    {/* Page Numbers */}
    {Array.from({ length: totalPages }, (_, i) => {
      const page = i + 1;
      const isActive = currentPage === page;

      return (
        <button
          key={page}
          onClick={() => changePage(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-full font-medium transition-all duration-300
            ${isActive
              ? 'bg-[#105f4e] text-white shadow-lg scale-110'
              : ' bg-gray-100 text-[#105f4e] hover:bg-gray-100 hover:text-[#105f4e]'}
          `}
        >
          {page}
        </button>
      );
    })}

    {/* Next */}
    <button
      disabled={currentPage === totalPages}
      onClick={() => changePage(currentPage + 1)}
      className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300
        ${currentPage === totalPages
          ? 'text-gray-300 cursor-not-allowed'
          : 'text-[#105f4e] hover:bg-[#105f4e] hover:text-white'}
      `}
    >
      <i className="fa-solid fa-chevron-right"></i>
    </button>

  </div>
</div>

      </section>

      {/* ===== Contact ===== */}
      <motion.div
        id="contactus"
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#f8f9fa]"
      >
        <Contacts />
      </motion.div>

      <Footer />
    </section>
  );
};

export default Blog;
