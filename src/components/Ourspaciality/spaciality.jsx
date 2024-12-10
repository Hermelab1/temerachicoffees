import React from 'react';
import { uniqueTech } from '../data/uniqueTech'; // Ensure the path is correct
import Heading from '../Home/headings'; // Ensure the path is correct

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
    <section className="bg-gray-100 overflow-hidden flex flex-col items-center justify-center mx-auto z-10">
      <Heading title="Unique Touch" subtitle="Beyond the ordinary" />
      <div className='container mx-auto'>
        {uniqueTech.map((item, index) => {
          const isEvenIndex = index % 2 === 0;

          const iconClass = `fa-solid ${icons[index % icons.length]} bg-white text-[#176756] text-[1.5rem] py-4 px-3 absolute w-[50px] h-[50px] rounded-full top-8 ${isEvenIndex ? 'right-[-60px]' : 'left-[-60px]'}`;
          
          const itemClass = `relative 2xl:w-[37%] xl:w-[45%] lg:w-[43%] md:w-[43%] w-[80%] opacity-0 flex flex-col items-center mb-4 ${isEvenIndex ? 'animate-move-left ml-4 2xl:ml-[10%] xl:ml-[2%] lg:ml-[3%] md:ml-[10%]' : 'animate-move-right ml-16 2xl:ml-[52%] xl:ml-[52%] lg:ml-[53%] md:ml-[52%]'}`;
          
          const borderClass = `absolute top-[60px] transform -translate-y-1/2 ${isEvenIndex ? 'right-[-14px] border-l-[15px] border-l-[#176756] border-t-[15px] border-b-[15px] border-transparent' : 'left-[-13px] border-r-[15px] border-r-[#176756] border-t-[15px] border-b-[15px] border-transparent'}`;

          return (
            <div className={itemClass} key={index}>
              <i className={iconClass}></i>
              <div className="bg-white bg-opacity-40 border-2 border-[#176756] rounded-lg shadow-md p-2">
                <h2 className="font-bold text-center">{item.title}</h2>
                <p className='text-justify md:leading-[2rem] leading-[1.5rem]  font-light px-4 py-1'>{item.paragraph}</p>
              </div>
              <span className={borderClass}></span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Speciality;