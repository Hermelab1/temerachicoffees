import React, { useRef, useState } from 'react';
import '../../style/contact.css';
import emailjs from '@emailjs/browser';


const Contact = () => {
  const form = useRef();
  const [setStatusMessage] = useState("");

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
    <section className='contact'>
    <div className='container'>
      <div className="contactusform">
        <form ref={form} onSubmit={sendEmail} className='form-group'>
        <input type="text" name="user_name" placeholder='Full Name' required />
          <input type="text" name="user_name" placeholder='Company Name' required />
          <input type="text" name="user_name" placeholder='Website' required />         
          <input type="email" name="user_email" placeholder='Email' required />
          <input type="text" name="subject" placeholder='Subject' required />
          <textarea name="message" cols="10" rows="3" placeholder='Leave your message here' required></textarea>
          <button type="submit">Send Message</button>
        </form>
        {/*statusMessage && <p>{statusMessage}</p>*/}
      </div>
      
      <div className="divider"></div> {/* Vertical line added here */}
      
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
      
      <div className="divider"></div> {/* Another vertical line can be added here if needed */}
      
      <div className="links">
        <div className="titles">
          <h3>Reach us</h3>
        </div>
        <div className="link">             
          <a href="https://www.facebook.com/checkpoint/1501092823525282/?next=https%3A%2F%2Fwww.facebook.com%2FTemerachixoffeeexport"><i className="fa-brands fa-facebook"></i></a>
          <a href="/"><i class="fa-brands fa-x-twitter"></i></a>
          <a href="/"><i className="fa-brands fa-instagram"></i></a>
          
        </div>
      </div>
    </div>
  </section>
  
  );
};

export default Contact;
