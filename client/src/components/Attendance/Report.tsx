"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AiOutlineCheckCircle } from 'react-icons/ai'; // React Icon for the checkmark
import { useRouter } from 'next/navigation';

interface YourReportProps {
  imgSrc: string;
  title: string;
  points: string[];
}

const points = [
  "Understand the basics of the topic to build a strong foundation.",
  "Apply your knowledge to solve real-world problems effectively.",
  "Consistently practice to enhance your skills and retention."
];

const YourReport: React.FC<YourReportProps> = ({ params }: any) => {
  const router = useRouter();
  const [id, setId] = useState();

  useEffect(() => {
    setId(params.id);
  })

  return (
    <div className="flex flex-col md:flex-row items-center p-8 mt-4 bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-lg shadow-lg mx-6">
      {/* Left Side: Image */}
      <div className="flex-shrink-0 w-full md:w-1/2">
        <Image 
          src={"/membership/member.jpg"} 
          alt="Report Image" 
          width={500} 
          height={500} 
          className="rounded-lg object-cover" 
        />
      </div>

      {/* Right Side: Title and Points */}
      <div className="ml-8 w-full md:w-1/2">
        <h2 className="text-2xl font-semibold text-gray-800">See your Report</h2>
        <ul className="mt-6 text-gray-700 space-y-4">
          {points.map((point, index) => (
            <li key={index} className="flex items-center">
              <AiOutlineCheckCircle className="mr-2 text-green-500 text-xl" />
              <span className="text-lg">{point}</span>
            </li>
          ))}
        </ul>

        {/* Get my report button */}
        <div className="mt-6 text-center">
          <button onClick={() => router.push(`/student/reports/${id}`)} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            Get my report
          </button>
        </div>
      </div>
    </div>
  );
};

export default YourReport;
