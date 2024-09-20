import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../asset/img/Logo/Logos.png';
import { nav } from '../data/nav';
import '../../style/Navbar.css';

const Header = () => {
  const [navlist, setNavList] = useState(false);

  const navigate = useNavigate();

  const handleScrollToTopAndNavigate = (path) => {
    // Scroll to top first
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Wait for a short time to let the scroll effect happen.
    setTimeout(() => {
        navigate(path);
    }, 500);  // Delay for smooth transition
  };


  return (
    <header>
      <div className='container flex'>
        <div className="logo">
          <img 
            src={logo} 
            alt="Logo" 
            onClick={() => handleScrollToTopAndNavigate("/")} // Use the scroll function on logo click
            style={{ cursor: 'pointer' }} // Optional: add a pointer cursor for a better UX
          />
        </div>
        <div className="nav">
          <ul className={navlist ? "small" : "flex"}>
            {nav.map((list, index) => (
              <li 
                key={index}

              >
                <Link
                  to={list.path}
                  onClick={() => handleScrollToTopAndNavigate(list.path)}
                >
                  {list.text}
                </Link>

              </li>
            ))}
          </ul>
        </div>

        <div className="social-media">
          <div className="links">
            <a href="https://www.facebook.com/Temerachixoffeeexport?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/temerachicoffee?igsh=OTA3aGFocjFmbTVp" className='insta' target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>
        
        <div className="toggle">
          <button onClick={() => setNavList(!navlist)}>
            {navlist ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;