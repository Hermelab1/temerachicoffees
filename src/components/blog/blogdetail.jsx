import React from 'react';
import '../../style/blogdetail.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { blogs } from '../data/blog'; // Ensure this path is correct

const BlogDetail = () => {
    const location = useLocation();
    const { mediaSrc, title, mediaType, detail , dates } = location.state || {};

    // Filter out the current blog and sort by date
    const otherBlogs = blogs
        .filter(blog => blog.title !== title) // Exclude the current blog
        .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date (most recent first)
        .slice(0, 3); // Get the 3 latest blogs

    return (
        <div className="blog-detail-container">
            <div className="blogsd">
                <div className="media">
                    {mediaType === 'video' ? (
                        <video src={mediaSrc} controls width="600" height="500" />
                    ) : (
                        <img src={mediaSrc} alt={title || 'Blog media'} width="600" height="500" />
                    )}
                </div>
                <h2>{title || 'Title Not Available'}</h2>
                <p dangerouslySetInnerHTML={{ __html: detail || 'No detail found' }} />
                <p>{dates || 'Date'}</p>
            </div>

            {/* Displaying remaining blogs */}
            <div className="titles">
                <h2>Other Blogs</h2>
            </div>
            <div className="blog-container">
                {otherBlogs.map((blog, index) => {
                    const { mediaSrc, mediaType, date, detail } = blog;
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
                                            detail: detail
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
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BlogDetail;