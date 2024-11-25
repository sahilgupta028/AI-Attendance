// components/Banner.js

import Image from 'next/image';

export default function Banner3() {
  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <Image
        src="/banner-3.jpg" // Replace with the path to your image
        alt="Banner Background"
        layout="fill"
        objectFit="cover"
        // quality={100}
        className="rounded-lg"
      />

      {/* Text Overlay */}
      {/* <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-center text-white">
        <p className="text-lg md:text-4xl mb-6 font-extrabold">
           Stay Present, Honor Your Path.
        </p>
      </div> */}
    </div>
  );
}
