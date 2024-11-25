

import Image from 'next/image';
import Link from 'next/link';
import { FaCamera, FaClock, FaLock } from 'react-icons/fa';

export default function CameraAttendance() {
  return (
    <div className="flex flex-col md:flex-row-reverse max-h-screen bg-gray-100">
      {/* Left Section - Text */}
      <div className="flex flex-col justify-center items-start p-10 md:w-1/2 bg-white rounded-lg  m-4 md:m-8 space-y-6">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Camera Based Attendance</h1>
        
                 <ul className="space-y-5 text-lg text-gray-700">
          <li className="flex items-center space-x-4 p-1 rounded-lg hover:shadow-md transition duration-300 bg-white hover:bg-gray-50">
            <FaCamera className="text-2xl text-blue-500" />
            <span>AI-powered facial recognition for effortless attendance.</span>
          </li>
          <li className="flex items-center space-x-4 p-1 rounded-lg hover:shadow-md transition duration-300 bg-white hover:bg-gray-50">
            <FaClock className="text-2xl text-teal-500" />
            <span>Fast, efficient, and fully automated system.</span>
          </li>
          <li className="flex items-center space-x-4 p-1 rounded-lg hover:shadow-md transition duration-300 bg-white hover:bg-gray-50">
            <FaLock className="text-2xl text-indigo-500" />
            <span>Secure and private, ensuring 100% accuracy.</span>
          </li>
        </ul>
      </div>

      {/* Right Section - Image */}
      <div className="relative flex items-center justify-center md:w-1/2 h-72 md:h-auto overflow-hidden rounded-lg m-1 md:m-8">
        <Image
          src="/features/face-attendance.jpg" // Replace with your actual image path
          alt="Teacher Portal Image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
