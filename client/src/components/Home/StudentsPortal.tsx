// components/StudentPortal.js

import Image from 'next/image';
import Link from 'next/link';

export default function StudentPortal() {
  return (
    <div className="flex flex-col md:flex-row max-h-screen bg-white">
      {/* Left Section - Text */}
      <div className="flex flex-col justify-center items-start p-10 md:w-1/2 bg-white rounded-lg m-4 md:m-8 space-y-6">
        <h1 className="text-5xl font-extrabold text-black mb-4">Student Portal</h1>
        <p className="text-lg text-gray-700 mb-8">
          Access your account to manage your attendance, view reports, and stay updated.
        </p>
        
        {/* Buttons */}
        <div className="flex space-x-4">
          <Link href="/register">
            <button className="px-8 py-3 bg-yellow-600 text-white font-semibold rounded-lg shadow-lg hover:bg-yellow-700 transition duration-300">
              Register yourself
            </button>
          </Link>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="relative w-screen md:w-1/2 h-52 md:h-auto overflow-hidden rounded-lg m-1 md:m-8">
        <Image
          src="/student.jpg" // Replace with your actual image path
          alt="Student Authentication"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
