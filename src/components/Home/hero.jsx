import React from 'react'
import '../../style/hero.css'
import videobg from '../../asset/video/Movie.mp4'
import Headings from './headings'


const hero = () => {
  return (
    <>
      <section className='hero'>

          <div className='video'>
            <video src={videobg} autoPlay loop muted></video>
          </div>
          <div className='slogan'>
            <Headings title="Every beans tells story" subtitle="Temerachi Coffee Export"/>

          </div>



      </section>
    </>
  )
}

export default hero
