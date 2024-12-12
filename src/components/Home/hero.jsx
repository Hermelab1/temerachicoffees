import React from 'react';
import videobg from '../../asset/video/Movie.mp4';
import Heading from './headings';

const Hero = () => {
  return (
    <section className="hero w-full h-screen flex justify-center items-center">
      <div className="absolute inset-0">
        <video className="w-full h-full object-cover" src={videobg} autoPlay loop muted></video>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div className="slogan">
        <Heading title="Every beans tells a story" subtitle="Temerachi Coffee Export" />
      </div>
    </section>
  );
}

export default Hero;