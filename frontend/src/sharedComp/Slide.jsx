import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Business from "../assets/Business.png"
import Mix from "../assets/Mix.png";
import Elect from "../assets/Elect.png";
import Tit from "../assets/Tit.png";
import Mob from "../assets/Mob.png";

const Slide = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000, // Set the interval (in milliseconds)
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="overflow-hidden w-full">
      <Slider {...settings}>
        <div className="flex justify-center items-center">
          <img src={Business} alt="Electronic Item" className='w-full h-auto' />
        </div>
        <div className="flex justify-center items-center">
          <img src={Elect} alt="Electronic Item" className='w-full h-auto' />
        </div>
        <div className="flex justify-center items-center">
          <img src={Tit} alt="Electronic Item" className='w-full h-auto' />
        </div>
        <div className="flex justify-center items-center">
          <img src={Mix} alt="Electronic Item" className='w-full h-auto' />
        </div>
        <div className="flex justify-center items-center">
          <img src={Mob} alt="Electronic Item" className='w-full h-auto' />
        </div>
      </Slider>
    </div>
  );
};

export default Slide;
