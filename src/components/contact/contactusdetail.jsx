// Import necessary libraries and components
import React, { useRef} from 'react';
import '../../style/detail.css';
import img from '../../asset/img/CoverImages/Bcover.webp';
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

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_w6blv2o', 'template_whcj7rk', form.current, 'Puv041KtiA_TZduH2') // Use the correct public key here.

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
              <input type="text" name="user_companyname" placeholder='Company Name' required />
              <input type="text" name="user_website" placeholder='Website' required /> 
              <input type="email" name="user_email" placeholder='Email' required />
              <textarea name="message" id="" cols="20" rows="10" placeholder='Leave your message here' required></textarea>
              <button type="submit">Send Message</button>
            </form>
            {/* {statusMessage && <p>{statusMessage}</p>}  Displays success or error messages */}
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
              <div className="link">             
                <a href="https://www.facebook.com/Temerachixoffeeexport?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook"></i></a>
                <a href="/" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-x-twitter"></i></a>
                <a href="https://www.instagram.com/temerachicoffee?igsh=OTA3aGFocjFmbTVp" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a>
                
           </div>
          </div>
        </motion.div>
        <Footer />
      </section>
    </>
  );
};

export default ContactUsDetail;