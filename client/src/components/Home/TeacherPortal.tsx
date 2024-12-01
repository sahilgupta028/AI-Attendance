// components/TeachersPortal.js

import Image from 'next/image';
import Link from 'next/link';

export default function TeachersPortal() {
  return (
    <div className="flex flex-col md:flex-row-reverse max-h-screen" id='teacher'>
      {/* Left Section - Text */}
      <div className="flex flex-col justify-center items-start p-10 md:w-1/2 bg-white rounded-lg  m-4 md:m-8 space-y-6">
        <h1 className="text-5xl font-extrabold text-black mb-4">Teachers Portal</h1>
        <p className="text-lg text-gray-700 mb-8">
          Manage your classes, track student attendance, and stay connected with your students.
        </p>
        
        {/* Buttons */}
        <div className="flex space-x-4">
          <Link href="/teacher/register">
            <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
              Register
            </button>
          </Link>
          <Link href="/teacher/login">
            <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
              Login
            </button>
          </Link>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="relative flex items-center justify-center md:w-1/2 h-72 md:h-auto overflow-hidden rounded-lg m-1 md:m-8">
        <Image
          src="/teacher.jpg" // Replace with your actual image path
          alt="Teacher Portal Image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
    </div>
  );
}