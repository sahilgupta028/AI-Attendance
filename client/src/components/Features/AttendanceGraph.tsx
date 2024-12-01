
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineMessage } from 'react-icons/ai';
import { FaCamera, FaChartLine, FaClock, FaLock, FaUsers } from 'react-icons/fa';

export default function AttendanceGraph() {
  return (
    <div className="flex flex-col md:flex-row-reverse max-h-screen bg-gray-100">
      {/* Left Section - Text */}
      <div className="flex flex-col justify-center items-start p-10 md:w-1/2 bg-white rounded-lg  m-4 md:m-8 space-y-6">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Attendance Graph</h1>
        
        <ul className="space-y-4 text-lg text-gray-700">
          <li className="flex items-center space-x-3 hover:bg-gray-50 p-1 rounded-lg transition duration-300">
            <FaChartLine className="text-3xl text-teal-400" />
            <span>Track attendance trends over months.</span>
          </li>
          <li className="flex items-center space-x-3 hover:bg-gray-50 p-1 rounded-lg transition duration-300">
            <FaUsers className="text-3xl text-blue-400" />
            <span>Monitor individual or group attendance data.</span>
          </li>
          <li className="flex items-center space-x-3 hover:bg-gray-50 p-1 rounded-lg transition duration-300">
            <FaChartLine className="text-3xl text-indigo-400" />
            <span>Analyze patterns and identify areas for improvement.</span>
          </li>
        </ul>
      </div>

      {/* Right Section - Image */}
      <div className="relative flex items-center justify-center md:w-1/2 h-72 md:h-auto overflow-hidden rounded-lg m-1 md:m-8">
        <Image
          src="/features/attendance.jpg" // Replace with your actual image path
          alt="Teacher Portal Image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
    </div>
  );
}