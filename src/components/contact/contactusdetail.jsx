// Import necessary libraries and components
import React, { useRef, useState } from 'react';
import '../../style/detail.css';
import img from '../../asset/img/CoverImages/Bcover.jpg';
import Heading from '../Home/headings';
import Footer from '../footage/footage';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

// Define animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

const ContactUsDetail = () => {
  const form = useRef();
  const [statusMessage, setStatusMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_w6blv2o', 'template_whcj7rk', form.current, 'Puv041KtiA_TZduH2') // Use the correct public key here.
      .then(
        () => {
          setStatusMessage('SUCCESS! Email sent.');
        },
        (error) => {
          console.error('Email send failed:', error);
          setStatusMessage(`FAILED: ${error.text}`);
        },
      );

    e.target.reset();
  };

  return (
    <>
      <section className='ourstorydetail'>
        <motion.div
          className="covers"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
        >
          <div className='imgs'>
            <img src={img} alt="Location" />
          </div>
          <div className='slogan'>
            <Heading title="Get in Touch" subtitle="Temerachi Coffee Export" />
          </div>
        </motion.div>

        <motion.div
          className="conatctA"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
        >
          <div className="contactusform">
            <form ref={form} onSubmit={sendEmail} className='form-group'>
              <input type="text" name="user_name" placeholder='Full Name' required />
              <input type="email" name="user_email" placeholder='Email' required />
              <input type="text" name="subject" placeholder='Subject' required />
              <textarea name="message" id="" cols="20" rows="10" placeholder='Leave your message here' required></textarea>
              <button type="submit">Send Message</button>
            </form>
            {statusMessage && <p>{statusMessage}</p>} {/* Displays success or error messages */}
          </div>

          <div
              className='address'
          >
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
                  <a href="/"><i className="fa-solid fa-envelope"></i></a>              
                  <a href="/"><i className="fa-brands fa-facebook"></i></a>
                  <a href="/"><i className="fa-brands fa-telegram"></i></a>
                  <a href="/"><i className="fa-brands fa-instagram"></i></a>
                  <a href="https://www.facebook.com/checkpoint/1501092823525282/?next=https%3A%2F%2Fwww.facebook.com%2FTemerachixoffeeexport"><i className="fa-brands fa-linkedin"></i></a>              
                  <a href="https://www.tumblr.com/"><i className="fa-brands fa-tumblr"></i></a> 
                  <a href="https://www.youtube.com/channel/UCaqEvlLmDRwN45ziWAmJdlg"><i className="fa-brands fa-youtube"></i></a>
              </div>
          </div>
        </motion.div>

        <motion.div
          className="mapsc"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
        >
          <div className='contact-info'>
            <iframe 
              className='maps'
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.715384400312!2d38.749434774858365!3d8.998315491061783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8790d04dc671%3A0x230d68b301aa52e3!2zVEVNRVJBQ0hJIENPRkZFRSDhibDhiJjhiKvhjK0g4Ymh4YqT!5e0!3m2!1sam!2set!4v1721947464502!5m2!1sam!2set" 
              width="700" 
              height="300" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps location of our office">
            </iframe>
          </div>
        </motion.div>

        <Footer />
      </section>
    </>
  );
};

export default ContactUsDetail;