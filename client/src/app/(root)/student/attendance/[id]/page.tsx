"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Chart from "@/components/Attendance/BarChart";
import PieChart from "@/components/Attendance/PieChart";
import YourReport from "@/components/Attendance/Report";
import Image from "next/image";
import SlokaPage from "@/components/Home/SlokaPage";

interface Params {
  params: {
    id: string;
  };
}

interface SubjectDetails {
  // Define the structure of the subjects data if available
  [key: string]: any;
}

const Page: React.FC<Params> = ({ params }) => {
  const router = useRouter();
  const [id, setId] = useState<string | undefined>();
  const [studentDetails, setStudentDetails] = useState<SubjectDetails[] | null>(null);

  useEffect(() => {
    console.log(params);
    setId(params.id);

    const fetchStudentDetails = async () => {
      try {
        const res = await fetch(`/api/find-student?id=${params.id}`, { method: "GET" });
        if (!res.ok) throw new Error("Failed to fetch student details");
        const data = await res.json();
        setStudentDetails(data.subjects);
        console.log(data.subjects);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchStudentDetails();
  }, [params]);

  const handleAskAI = () => {
    router.push(`/student/chatbot/${params.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Chart Section */}
      <div className="flex justify-between flex-col space-x-6 p-6">
        <div>
          <Chart details={studentDetails} />
        </div>
        <div>
          <PieChart details={studentDetails} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row-reverse items-center p-8 mt-4 bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-lg shadow-xl mx-6">
  {/* Left Section with Heading and Points */}
  <div className="w-full md:w-1/2 space-y-6">
    <h2 className="text-2xl font-semibold text-gray-800">View Your Attendance Date Wise</h2>

    {/* Points Section */}
    <div className="space-y-4 text-gray-700 text-lg">
      <div className="flex items-start space-x-3">
        <span className="text-lg">📅</span>
        <p className="leading-relaxed">View your attendance on specific dates.</p>
      </div>
      <div className="flex items-start space-x-3">
        <span className="text-lg">🗓️</span>
        <p className="leading-relaxed">Get detailed information about each class attended.</p>
      </div>
      <div className="flex items-start space-x-3">
        <span className="text-lg">🔍</span>
        <p className="leading-relaxed">Filter attendance by date range for better tracking.</p>
      </div>
    </div>

    <div className="mt-4 flex items-center justify-center text-center">
      <button
        onClick={() => router.push(`/student/attend-date-wise/${params.id}`)}
        className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-xl shadow-md focus:outline-none transition duration-150 ease-in-out"
      >
        See Attendance Date Wise
      </button>
    </div>
  </div>

  {/* Right Section with Image */}
  <div className="w-full md:w-1/2 flex-shrink-0 mt-6 md:mt-0">
    <Image
      src="/attendance-date.jpg" // Replace with the actual image path
      alt="Attendance Illustration"
      width={500}
      height={500}
      className="rounded-lg object-cover shadow-lg"
    />
  </div>
</div>


      {/* Chatbot Section */}
      <div className="flex flex-col md:flex-row items-center p-8 mt-4 bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-lg shadow-xl mx-6">
        {/* Left Section with Heading and Points */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Chat with Our Attendance Bot</h2>

          {/* Points Section */}
          <div className="space-y-4 text-gray-700 text-lg">
            <div className="flex items-start space-x-3">
              <span className="text-lg">📝</span>
              <p className="leading-relaxed">Ask about your attendance records and reports.</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-lg">❓</span>
              <p className="leading-relaxed">Get instant answers to any questions regarding your classes.</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-lg">💬</span>
              <p className="leading-relaxed">Easily interact with the bot for updates and notifications.</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center text-center">
            <button
              onClick={handleAskAI}
              className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-xl shadow-md focus:outline-none transition duration-150 ease-in-out"
            >
              Ask AI
            </button>
          </div>
        </div>

        {/* Right Section with Image */}
        <div className="w-full md:w-1/2 flex-shrink-0 mt-6 md:mt-0">
          <Image
            src="/ai.jpg" // Replace with the actual image path
            alt="Chatbot Illustration"
            width={500}
            height={500}
            className="rounded-lg object-cover shadow-lg"
          />
        </div>
      </div>

      <YourReport params={params} />
    </div>
  );
};

export default Page;
