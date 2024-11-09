"use client";

import Image from 'next/image';

export default function LiveCamera() {
  return (
    <div className="flex min-h-screen">
      {/* Left side content */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-white">
        <h1 className="text-4xl font-bold text-center mb-6">Mark Attendance with Live Camera</h1>
        
        <p className="text-lg text-gray-700 text-center mb-6">
          Say goodbye to manual attendance taking. With our system, you can easily mark attendance using a live camera. Our intelligent recognition system automatically detects faces and logs attendance in real time.
        </p>

        <p className="text-lg text-gray-700 text-center mb-6">
          The live camera feature ensures accuracy and efficiency, allowing you to track attendance without any hassle. Whether you're managing a classroom or a corporate environment, this feature is designed to make the process seamless and fast.
        </p>

        <p className="text-lg text-gray-700 text-center mb-6">
          This feature is fully integrated into our membership, ensuring that you can keep track of attendance while focusing on other important tasks.
        </p>

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
            src="/images/live-camera-attendance.jpg" // Replace with your actual image path
            alt="Live Camera Attendance"
            layout="fill"
            objectFit="cover"
            className="rounded-l-xl"
          />
        </div>
      </div>
    </div>
  );
}
