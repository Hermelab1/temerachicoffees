import React, { useState } from 'react';
import '../../style/blogdetail.css';
import { Link, useLocation } from 'react-router-dom';
import { blogs } from '../data/blog'; // Ensure this path is correct

const BlogDetail = () => {
    const location = useLocation();
    const { mediaSrc, title, mediaType, detail, dates, likeCount, shareCount } = location.state || {};

    // Use counts passed from the Blog component
    const [currentLikeCount, setCurrentLikeCount] = useState(likeCount || 0);
    const [currentShareCount, setCurrentShareCount] = useState(shareCount || 0);

    const handleLike = () => {
        const newLikeCount = currentLikeCount + 1;
        setCurrentLikeCount(newLikeCount);
        
        // Save the updated like count to localStorage if needed
        const storedLikes = JSON.parse(localStorage.getItem('likeCounts')) || new Array(blogs.length).fill(0);
        storedLikes[blogs.findIndex(blog => blog.title === title)] = newLikeCount;
        localStorage.setItem('likeCounts', JSON.stringify(storedLikes));
    };

    const handleShare = () => {
        const newShareCount = currentShareCount + 1;
        setCurrentShareCount(newShareCount);
        
        // Save the updated share count to localStorage if needed
        const storedShares = JSON.parse(localStorage.getItem('shareCounts')) || new Array(blogs.length).fill(0);
        storedShares[blogs.findIndex(blog => blog.title === title)] = newShareCount;
        localStorage.setItem('shareCounts', JSON.stringify(storedShares));

        const encodedTitle = encodeURIComponent(title);
        const encodedUrl = encodeURIComponent(window.location.href);
        
        const shareUrl = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&title=${encodedTitle}`,
            twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
            email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
            telegram: `https://telegram.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
            instagram: `https://www.instagram.com/?url=${encodedUrl}`, // Note: Instagram does not support direct sharing of URLs
        };
      
        const shareWindow = window.open(shareUrl.facebook, '_blank');
      
        if (shareWindow) {
            shareWindow.focus();
        }
    };

    // Filter out the current blog and sort by date
    const otherBlogs = blogs
        .filter(blog => blog.title !== title) // Exclude the current blog
        .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date (most recent first)
        .slice(0, 3); // Get the 3 latest blogs

    //const currentBlogIndex = blogs.findIndex(blog => blog.title === title);

    return (
        <div className="blog-detail-container">
            <div className="blogsd">
            <h2>{title || 'Title Not Available'}</h2>
            <p>{dates || 'Date'}</p>
                <div className="media">
                    {mediaType === 'video' ? (
                        <video src={mediaSrc} controls width="600" height="500" />
                    ) : (
                        <img src={mediaSrc} alt={title || 'Blog media'} width="600" height="500" />
                    )}
                </div>

                <p dangerouslySetInnerHTML={{ __html: detail || 'No detail found' }} />

                <button onClick={handleLike}>
                        <i className="fa-regular fa-heart"></i> {currentLikeCount}
                    </button>
                    <button onClick={handleShare}>
                        <i className="fa-solid fa-share"></i> {currentShareCount}
                    </button>
                
                    

            </div>

            {/* Display other blogs */}
            <div className="titles">
                <h2>Other Blogs</h2>
            </div>
            <div className="blog-container">
                {otherBlogs.map((blog, index) => {
                    const { mediaSrc, mediaType, date, detail } = blog;
                    const otherBlogIndex = blogs.findIndex(b => b.title === blog.title);

                    return (
                        <div key={index} className="blog-details">
                            <div className="media">
                                {mediaType === 'video' ? (
                                    <video src={mediaSrc} controls />
                                ) : (
                                    <img src={mediaSrc} alt={blog.title || 'Blog media'} />
                                )}
                            </div>
                            <div className="details">
                                <h3>{blog.title || 'Title Not Available'}</h3>
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
                                            title: blog.title, 
                                            detail: detail,
                                            dates: date,
                                            likeCount: 0, // Initialize with 0 since we are not fetching likes from this context
                                            shareCount: 0 // Initialize with 0 since we are not fetching shares from this context
                                        }}
                                        className='status'
                                    >
                                        read more
                                    </Link>
                                </div>
                                <div className="likes">
                                    <button onClick={() => handleLike(otherBlogIndex)}>
                                    <i className="fa-regular fa-heart"></i> {/* Placeholder as we don't have an index for other blogs here */}
                                    </button>
                                    <button onClick={() => handleShare()}>
                                        <i className="fa-solid fa-share"></i> 
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BlogDetail;