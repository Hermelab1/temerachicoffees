import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { blogs } from '../data/blog'; // Ensure the path is correct

const BlogDetail = () => {
    const location = useLocation();
    const { mediaSrc, title, mediaType, detail, dates, likeCount, shareCount } = location.state || {};

    const [currentLikeCount, setCurrentLikeCount] = useState(likeCount || 0);
    const [currentShareCount, setCurrentShareCount] = useState(shareCount || 0);
    
    const likeCounts = JSON.parse(localStorage.getItem('likeCounts')) || new Array(blogs.length).fill(0);
    const shareCounts = JSON.parse(localStorage.getItem('shareCounts')) || new Array(blogs.length).fill(0);
    
    useEffect(() => {
        const blogIndex = blogs.findIndex(blog => blog.title === title);
        if (blogIndex !== -1) {
            setCurrentLikeCount(likeCounts[blogIndex]);
            setCurrentShareCount(shareCounts[blogIndex]);
        }
    }, [title, likeCounts, shareCounts]);

    const handleLike = () => {
        const newLikeCount = currentLikeCount + 1;
        setCurrentLikeCount(newLikeCount);
        
        const blogIndex = blogs.findIndex(blog => blog.title === title);
        if (blogIndex !== -1) {
            likeCounts[blogIndex] = newLikeCount;
            localStorage.setItem('likeCounts', JSON.stringify(likeCounts));
        }
    };

    const handleShare = () => {
        const newShareCount = currentShareCount + 1;
        setCurrentShareCount(newShareCount);
        
        const blogIndex = blogs.findIndex(blog => blog.title === title);
        if (blogIndex !== -1) {
            shareCounts[blogIndex] = newShareCount;
            localStorage.setItem('shareCounts', JSON.stringify(shareCounts));
        }

        const encodedTitle = encodeURIComponent(title);
        const encodedUrl = encodeURIComponent(window.location.href);

        // Opening the share URL directly
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`;
        window.open(shareUrl, '_blank').focus();
    };

    const otherBlogs = blogs
        .filter(blog => blog.title !== title)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);

    return (
        <div className="container mx-auto mt-20 flex flex-col items-center mb-8">
            <div className="border border-gray-200 shadow overflow-hidden md:w-[60%] w-[90%] p-2 md:p-8 text-justify mb-5 flex flex-col">
                <h2 className='text-2xl leading-10 mb-2 font-semibold'>{title || 'Title Not Available'}</h2>
                <p className='text-gray-400 font-light'>{dates || 'Date'}</p>
                <div className="media w-full h-[55vh] mb-5 overflow-hidden flex justify-center">
                    {mediaType === 'video' ? (
                        <video src={mediaSrc} controls className="object-cover w-full h-full" />
                    ) : (
                        <img src={mediaSrc} alt={title || 'Blog media'} className="object-cover w-full h-full" />
                    )}
                </div>
                <p dangerouslySetInnerHTML={{ __html: detail || 'No detail found' }} className="" />
                <div className="flex space-x-4 mt-4">
                    <button className='text-[brown] hover:bg-transparent flex items-center bg-transparent' onClick={handleLike}>
                        <i className="fa-regular fa-heart"></i> {currentLikeCount}
                    </button>
                    <button className='text-blue-500 hover:bg-transparent flex items-center bg-transparent' onClick={handleShare}>
                        <i className="fa-solid fa-share"></i> {currentShareCount}
                    </button>
                </div>
            </div>
            <h2 className='text-gray-400 m-0 text-2xl mb-2'>Other Blogs</h2>
            <div className="flex flex-wrap justify-center md:h-[60vh] h-auto md:w-[80%] w-[95%]">
                {otherBlogs.map((blog, index) => {
                    const { mediaSrc, mediaType, date, detail } = blog;

                    return (
                        <div key={index} className="border-2 mb-4 flex flex-col items-center w-[350px] h-full mx-4 overflow-hidden">
                            <div className="media w-full h-48">
                                {mediaType === 'video' ? (
                                    <video src={mediaSrc} controls className="w-full h-full object-cover" />
                                ) : (
                                    <img src={mediaSrc} alt={blog.title || 'Blog media'} className="w-full h-full object-cover" />
                                )}
                            </div>
                            <div className="details p-4">
                                <h3 className='font-semibold'>{blog.title || 'Title Not Available'}</h3>
                                <p className="text-gray-400 font-light">{date}</p>
                                <p 
                                    dangerouslySetInnerHTML={{
                                        __html: detail ? detail.substring(0, 100) + ' [...]' : 'Detail not available'
                                    }} 
                                    className="leading-9" 
                                />
                                <div className='blog-status'>
                                    <Link
                                        to="/blogdetail"
                                        state={{
                                            mediaSrc: blog.mediaSrc,
                                            mediaType: blog.mediaType,
                                            title: blog.title,
                                            detail: blog.detail,
                                            dates: blog.date,
                                            likeCount: likeCounts[index],
                                            shareCount: shareCounts[index],
                                        }}
                                        className='status text-[#007bff] hover:px-2'
                                        onClick={() => window.scrollTo(0, 0)}
                                    >
                                        Read more
                                    </Link>
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