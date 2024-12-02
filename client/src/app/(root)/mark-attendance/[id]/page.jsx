"use client";
import TeacherAttendance from '@/components/Teacher/MarkAttenadance';
import AddMarks from '@/components/Teacher/AddMarks';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';


const AttendancePage = ({ params }) => {
  const searchParams = useSearchParams();
  const [teacherDetails, setTeacherDetails] = useState(null);
  const id = params.id;

  // Fetch teacher details from backend
  useEffect(() => {
    const fetchTeacherDetails = async () => {
      try {
        const response = await fetch(`/api/get-teacher?id=${id}`);
        if (!response.ok) throw new Error('Failed to fetch teacher details');
        const data = await response.json();
        setTeacherDetails(data);
      } catch (error) {
        console.error("Error fetching teacher details:", error);
      }
    };
    
    if (id) {
      fetchTeacherDetails();
    }
  }, [id]);

  if (!teacherDetails) {
    return <p className="text-center text-gray-500 mt-4">Loading teacher details...</p>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header Section with Teacher Details */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-300 p-8 rounded-lg shadow-lg mb-10">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Teacher Attendance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-900">
          <div className="flex flex-col items-center">
            <p className="text-sm font-semibold text-blue-700">Teacher Name</p>
            <p className="text-lg font-medium">{teacherDetails.name || "N/A"}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm font-semibold text-blue-700">Subject</p>
            <p className="text-lg font-medium">{teacherDetails.subject || "N/A"}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm font-semibold text-blue-700">Class Group</p>
            <p className="text-lg font-medium">{teacherDetails.classGroup || "N/A"}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm font-semibold text-blue-700">Teacher ID</p>
            <p className="text-lg font-medium">{teacherDetails.teacherId || "N/A"}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm font-semibold text-blue-700">Email</p>
            <p className="text-lg font-medium">{teacherDetails.email || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Attendance Component */}
      <TeacherAttendance params={params} />
      <div className='mt-12' />
      <AddMarks params={params} />
    </div>
  );
};

export default AttendancePage;
