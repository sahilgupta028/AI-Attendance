// components/Banner.js

import Image from 'next/image';

export default function Banner() {
  return (
    <div className="relative w-full h-[500px]">
      {/* Background Image */}
      <Image
        src="/banner.jpg" // Replace with the path to your image
        alt="Banner Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="rounded-lg"
      />

      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Our Platform</h1>
        <p className="text-lg md:text-2xl mb-6">
          Your gateway to seamless attendance and performance tracking
        </p>
        <button className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-lg hover:bg-yellow-400 transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
}
