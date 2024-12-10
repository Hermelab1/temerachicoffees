import React from 'react';
import videobg from '../../asset/video/Movie.mp4';
import Headings from './headings';

const Hero = () => {
  return (
    <section className="relative w-full md:h-[93vh] h-[100vh]">
      <div className="absolute inset-0">
        <video className="w-full h-full object-cover" src={videobg} autoPlay loop muted></video>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Adjust opacity here */}
      </div>
      <div className="home absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-center w-4/5 max-w-[1200px] p-5">
        <Headings title="Every beans tells a story" subtitle="Temerachi Coffee Export" />
      </div>
    </section>
  );
}

export default Hero;