import React from 'react';
import '../../style/contact.css';
const Contacts = () => {
  return (
    <section className='contact'>
    <div className='container'>    
      <div className='icons-p'>
        <p>
          <b>HEAD OFFICE:</b><br />
          Kirkos Sub City Woreda 11 House No. 195/A<br />
          Addis Ababa, Ethiopia<br />
          Tell: +251911245503<br />
          <b>Warehouse:</b><br />
          Hirut Processing Factory<br />
          Alem Gena, Sheger Oromia, ETHIOPIA<br />
          Email: info@temerachicoffeeexport.com<br />
          <b>Business Partner</b><br />
          Asia/Japan<br />
          Selam Store Trading LLC<br />
          4-32-4 Asakusa, Taito-ku Tokyo<br />
          Japan<br />
        </p>
      </div>
      <div className="links">
        <div className="titles">
          <h3>Reach us</h3>
        </div>
        <div className="link">             
          <a href="https://www.facebook.com/Temerachixoffeeexport?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook"></i></a>
          <a href="/" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-x-twitter"></i></a>
          <a href="https://www.instagram.com/temerachicoffee?igsh=OTA3aGFocjFmbTVp" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a>
          
        </div>
      </div>
    </div>
  </section>
  
  );
};

export default Contacts;
