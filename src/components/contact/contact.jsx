import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../style/contact.css';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_w6blv2o', 'template_whcj7rk', form.current, 'Puv041KtiA_TZduH2')
      .then((result) => {
        setStatusMessage('Message sent successfully!');
        e.target.reset();
      })
      .catch((error) => {
        setStatusMessage('Failed to send message, please try again.');
        console.error('Email sending error:', error);
      });
  };

  const handleScrollToTopAndNavigate = (path) => {
    window.scrollTo({ top: 0});
    
    setTimeout(() => {
      navigate(path);
    }, 500);  // Delay for smooth transition
  };

  return (
    <section className='contact'>
      <div className='container'> 
        <div className="contactusform">
          <form ref={form} onSubmit={sendEmail} className='form-group'>
            <input type="text" name="user_name" placeholder='Full Name' required />
            <input type="text" name="user_companyname" placeholder='Company Name' required />
            <input type="text" name="user_website" placeholder='Website' required /> 
            <input type="email" name="user_email" placeholder='Email' required />
            <textarea name="message" cols="20" rows="2" placeholder='Leave your message here' required></textarea>
            <button type="submit">Send Message</button>
          </form>
          {statusMessage && <p>{statusMessage}</p>} {/* Displays success or error messages */}
        </div>
        
        <div className="divider"></div> {/* Vertical line */}
        

        
        <div className='icons-p'>
          <p>
            <b>HEAD OFFICE:</b><br />
            Kirkos Sub City Woreda 11 House No. 195/A<br />
            Addis Ababa, Ethiopia<br />
            Tell: +251911245503<br />
            <b>Warehouse:</b><br />
            Guji Coffee Export and Processing Factory<br />
            Furi, Sheger Oromia, ETHIOPIA<br />
            Email: info@temerachicoffeeexport.com<br />

          </p>
        </div>
        
        <div className="divider"></div> {/* Another vertical line */}
        
        <div className="links">
          <p>            <b>Business Partner</b><br />
            Asia/Japan<br />
            Selam Store Trading LLC<br />
            4-32-4 Asakusa, Taito-ku Tokyo<br />
            Japan<br /></p>
          <div className="titles">
            <h3>Reach us</h3>
          </div>
          <div className="link">             
            <a href="https://www.facebook.com/Temerachixoffeeexport?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a href="https://www.instagram.com/temerachicoffee?igsh=OTA3aGFocjFmbTVp" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="divider"></div> {/* Vertical line */}
        <div className="pages">
        <div className="titles">
            <h3>Navigation</h3>
        </div>
        <div className="lin"> 
            <Link onClick={() => handleScrollToTopAndNavigate('/ourstory')}>Our Story</Link>
            <Link onClick={() => handleScrollToTopAndNavigate('/blog')}>Blog</Link>
            <Link onClick={() => handleScrollToTopAndNavigate('/sampleorder')}>Order Sample</Link>
        </div>
    </div>

      </div>
    </section>
  );
};

export default Contact;
