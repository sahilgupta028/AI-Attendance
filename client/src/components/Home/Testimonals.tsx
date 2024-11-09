// components/Testimonials.js
"use client";
import React from 'react';
import Slider from 'react-slick';
import { FaStar } from 'react-icons/fa';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "Alice Johnson",
    review: "The attendance manager has made tracking attendance so much easier! I never miss a day.",
    photo: "/students/alice.jpg",
    rating: 5,
  },
  {
    name: "Bob Smith",
    review: "Great app for managing my attendance records. Highly recommended!",
    photo: "/students/bob.jpg",
    rating: 4,
  },
  {
    name: "Catherine Lee",
    review: "Simple to use and incredibly helpful for keeping track of everything!",
    photo: "/students/catherine.jpg",
    rating: 5,
  },
  {
    name: "David Brown",
    review: "User-friendly and accurate, it’s the best attendance tracker out there!",
    photo: "/students/david.jpg",
    rating: 4,
  },
  {
    name: "Eva White",
    review: "This has helped me stay on top of my attendance like never before.",
    photo: "/students/eva.jpg",
    rating: 5,
  },
  {
    name: "Frank Green",
    review: "Reliable and convenient. My go-to tool for managing attendance.",
    photo: "/students/frank.jpg",
    rating: 4,
  },
  {
    name: "Grace Adams",
    review: "The best solution for students and teachers. Makes attendance easy.",
    photo: "/students/grace.jpg",
    rating: 5,
  },
  {
    name: "Hannah Scott",
    review: "Using this app daily, it’s a game-changer for attendance management!",
    photo: "/students/hannah.jpg",
    rating: 5,
  },
  {
    name: "Ian Clark",
    review: "Easy to use and has all the features I need. Highly recommend it!",
    photo: "/students/ian.jpg",
    rating: 4,
  },
  {
    name: "Jane Martin",
    review: "Very helpful app with a simple interface. It’s been great for my classes.",
    photo: "/students/jane.jpg",
    rating: 5,
  },
];

const Testimonials = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: { slidesToShow: 2 },
        },
        {
          breakpoint: 600,
          settings: { slidesToShow: 1 },
        },
      ],
    };
  
    return (
      <div className="max-w-5xl mx-auto my-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Students Say</h2>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-4">
              <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center w-80 h-80 mx-auto">
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{testimonial.name}</h3>
                <p className="text-gray-600 text-center mb-4 overflow-hidden overflow-ellipsis px-2">
                  {testimonial.review}
                </p>
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
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
