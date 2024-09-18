import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../asset/img/Logo/Logos.png';
import { nav } from '../data/nav';
import '../../style/Navbar.css';

const Header = () => {
  const [navlist, setNavList] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const navigate = useNavigate();

  const handleScrollToTopAndNavigate = (path) => {
    // Scroll to top first
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Wait for a short time to let the scroll effect happen.
    // You can adjust the timeout duration as necessary
    setTimeout(() => {
        navigate(path);
    }, 1000);  // 500ms is a common duration for smooth scrolling, adjust as needed
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setSubmenuOpen(null);
    }, 250);
    setTimeoutId(id);
  };

  const handleMouseEnter = (index) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setSubmenuOpen(index);
  };

  return (
    <header>
      <div className='container flex'>
        <div className="logo">
          <Link to="/"><img src={logo} alt="Logo" /></Link>
        </div>
        <div className="nav">
          <ul className={navlist ? "small" : "flex"}>
            {nav.map((list, index) => (
              <li key={index}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}>
                <Link
                  to={list.path}
                  onClick={() => handleScrollToTopAndNavigate(list.path)} // Always scroll to top
                >
                  {list.text}
                </Link>
                {/* Display submenu if available */}
                {list.submenu && submenuOpen === index && (
                  <div className="submenu">
                    <ul>
                      {list.submenu.map((submenu, subindex) => (
                        <li key={subindex}>
                          <Link 
                            to={submenu.path} 
                            onClick={() => handleScrollToTopAndNavigate(submenu.path)} // Scroll to top on submenu click
                          >
                            {submenu.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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

      {/* Add the Sample Order button below the header as part of the navbar */}
     
    </header>
  );
};

export default Header;