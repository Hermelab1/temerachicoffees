import React from 'react';
import '../../style/contact.css';

const Contact = () => {
  return (
    <section className='contact'>
      <div className='container'>
        <div className='contact-info'>
          <iframe 
            className='map'
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.715384400312!2d38.749434774858365!3d8.998315491061783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8790d04dc671%3A0x230d68b301aa52e3!2zVEVNRVJBQ0hJIENPRkZFRSDhibDhiJjhiKvhjK0g4Ymh4YqT!5e0!3m2!1sam!2set!4v1721947464502!5m2!1sam!2set" 
            width="700" 
            height="1000" 
            style={{ width: '100%', height: '500px', border: 0  }}
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps location of our office">
          </iframe>
        </div>
        <div className='address'>
          <div className='icons-p'>

            <p> <b>HEAD OFFICE:</b><br />
            Kirkos Sub City Woreda 11 House No. 195/A<br />
            Addis Ababa, Ethiopia<br />
            Tell: +251911245503<br />
            <b>Warehouse:</b><br />
            Guji Coffee Export and Processing Factory<br />
            Furi, Sheger Oromia , ETHIOPIA<br />
            Email: info@temerachicoffeeexport.com<br />
            <b>Business Partner </b><br />
            Asia/ Japan<br />
            Selam Store Trading LLC<br />
            4-32-4 Asakusa,Taito-ku  Tokyo<br />
            Japan<br />


            </p>
          </div>
          <div className="button flex">
            <button className='btn1'>
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
