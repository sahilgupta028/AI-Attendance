"use client";

import Image from 'next/image';

export default function Membership() {
  return (
    <div className="flex h-[400px] ">
      {/* Left side content */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-white">
        <h1 className="text-4xl font-bold text-center mb-6">Join the Attendance Manager Today</h1>
        <p className="text-lg text-gray-700 text-center mb-6">
          Simplify your attendance management with a seamless, efficient system that saves you time and keeps everything organized.
        </p>

        {/* <p className="text-lg text-gray-700 text-center mb-6">
          Our platform provides an easy way to manage attendance, ensure consistency, and focus on what matters most—your team or students. Whether you're an organization, a school, or a small group, our system adapts to your needs and ensures smooth tracking of attendance across all activities.
        </p>

        <p className="text-lg text-gray-700 text-center mb-6">
          By becoming a member, you gain access to a powerful tool designed to streamline your processes and bring order to your attendance tracking efforts.
        </p> */}

        <button
          onClick={() => alert('Membership applied!')}
          className="w-full max-w-sm mx-auto bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300"
        >
          Apply Now
        </button>
      </div>

      {/* Right side image */}
      <div className="hidden md:flex md:w-1/2">
        <div className="relative w-full h-full">
          <Image
            src="/membership/member.jpg" // Replace with your actual image path
            alt="Attendance Manager"
            layout="fill"
            objectFit="cover"
            className="rounded-l-xl"
          />
        </div>
      </div>
    </div>
  );
}

