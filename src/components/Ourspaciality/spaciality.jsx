import React from 'react';
import '../../style/speciality.css'; // Ensure the path is correct
import { uniqetech } from '../data/uniqetech'; // Ensure the path is correct
import Heading from '../Home/headings'; // Ensure the path is correct

// You could define an array of icons or create a mapping
const icons = [
  'fa-handshake',
  'fa-star',
  'fa-globe',
  'fa-circle-dollar-to-slot',
  'fa-seedling',
  'fa-people-arrows',
];

const Speciality = () => {
  return (
    <section className='special'>
      <Heading title="Unique Touch" subtitle="Beyond the ordinary" />
      
      {uniqetech.map((item, index) => (
        <div className={`container ${index % 2 === 0 ? 'left-container' : 'right-container'}`} key={index}>
          <i className={`fa-solid ${icons[index % icons.length]}`}></i>
          <div className="text-box">
            <h2>{item.title}</h2>
            <p>{item.paragraph}</p>
            <span className={`${index % 2 === 0 ? 'left-container-arrow' : 'right-container-arrow'}`}></span>
          </div>
        </div>
      ))}

    </section>
  );
};

export default Speciality;