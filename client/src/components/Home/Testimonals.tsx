// components/Testimonials.js
"use client";
import React from 'react';
import Slider from 'react-slick';
import { FaStar } from 'react-icons/fa';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { testimonials } from '@/data/Testimonials';

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    loop: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto my-20 px-4">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
        What <span className='text-orange-600'>Our Students Say</span>
      </h2>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="p-4">
            <div className="bg-gradient-to-br from-white to-gray-100 shadow-lg rounded-xl p-8 flex flex-col items-center w-80 h-96 mx-auto transition transform hover:-translate-y-2 hover:shadow-2xl">
              <img
                src={testimonial.photo}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500 shadow-lg mb-6"
              />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2 text-center">
                {testimonial.name}
              </h3>
              <p className="text-gray-500 text-center text-sm leading-relaxed mb-4 px-4 overflow-hidden overflow-ellipsis h-24">
                {testimonial.review}
              </p>
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500 text-lg" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;
