"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

// Function to format date to Indian format (DD-MM-YYYY)
const formatDateToIndian = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const DetailedReport = ({ params }) => {
  const searchParams = useSearchParams();
  const subjectName = searchParams.get("subject");
  const router = useRouter();

  const [student, setStudent] = useState(null);
  const [subjectDetails, setSubjectDetails] = useState(null);
  const [filteredDates, setFilteredDates] = useState([]);
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  // Fetch student details from the backend
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await fetch(`/api/find-student?id=${params.id}`);
        const data = await response.json();

        // Set the student details
        setStudent(data);

        // Filter the subject details by subject name
        const filteredSubject = data.subjects.find(
          (subject) => subject.subjectName === subjectName
        );

        if (filteredSubject) {
          setSubjectDetails(filteredSubject);
          setFilteredDates(filteredSubject.Date); // Initially, show all dates
        } else {
          console.warn(`Subject ${subjectName} not found for the student.`);
        }
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchStudentDetails();
  }, [params.id, subjectName]);

  // Filter attendance by selected start and end dates
  const handleDateFilter = () => {
    if (!filterStartDate || !filterEndDate) return; // Don't filter if either date is empty

    // Set the start and end dates to midnight
    const startDate = new Date(filterStartDate);
    startDate.setHours(0, 0, 0, 0); // Set the time to midnight

    const endDate = new Date(filterEndDate);
    endDate.setHours(23, 59, 59, 999); // Set the time to just before midnight of the next day

    const filtered = subjectDetails.Date.filter((attendance) => {
      const attendanceDate = new Date(attendance.date);
      attendanceDate.setHours(0, 0, 0, 0); // Set the time to midnight for comparison
      return attendanceDate >= startDate && attendanceDate <= endDate;
    });

    setFilteredDates(filtered);
  };

  // Calculate the total number of classes and present days after filtering
  const getAttendanceSummary = () => {
    const totalClasses = filteredDates.length;
    const totalPresent = filteredDates.filter(
      (attendance) => attendance.status === "present"
    ).length;
    return { totalClasses, totalPresent };
  };

  if (!student || !subjectDetails) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-indigo-200">
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  const { totalClasses, totalPresent } = getAttendanceSummary();

  return (
    <div className="p-10 max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Detailed Report for {subjectName}</h1>

      {/* Student Info Section */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl mb-8">
        <h2 className="text-2xl font-semibold text-blue-800">Student: {student.name}</h2>
        <p className="text-lg text-blue-600">{student.email}</p>
        <p className="text-lg text-blue-600">Class: {student.classGroup}</p>
      </div>

      {/* Attendance Summary */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-xl mb-8">
        <h3 className="text-xl font-semibold text-green-800">Attendance Summary:</h3>
        <div className="mt-4 space-y-3">
          <p className="text-lg text-gray-700">
            Total Present: <span className="text-green-600 font-semibold">{subjectDetails.totalPresent}</span>
          </p>
          <p className="text-lg text-gray-700">
            Total Absent: <span className="text-red-600 font-semibold">{subjectDetails.totalAbsent}</span>
          </p>
          <p className="text-lg text-gray-700">
            Attendance Percentage:{" "}
            <span
              className={subjectDetails.percentage >= 75 ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}
            >
              {subjectDetails.percentage}%
            </span>
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-8 rounded-xl shadow-md mb-8">
        <h4 className="text-xl font-semibold text-gray-800">Filter by Date Range:</h4>
        <div className="flex gap-6 mt-4">
          <input
            type="date"
            value={filterStartDate}
            onChange={(e) => setFilterStartDate(e.target.value)}
            className="border-2 border-gray-300 p-4 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <input
            type="date"
            value={filterEndDate}
            onChange={(e) => setFilterEndDate(e.target.value)}
            className="border-2 border-gray-300 p-4 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <button
            onClick={handleDateFilter}
            className="px-6 py-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Apply Filter
          </button>
        </div>
      </div>

      {/* Filtered Attendance Summary */}
      <div className="bg-white p-8 rounded-xl shadow-md mb-8">
        <h4 className="text-xl font-semibold text-gray-800">Filtered Attendance Summary:</h4>
        <div className="mt-4 space-y-3">
          <p className="text-lg text-gray-700">
            Total Classes: <span className="font-semibold text-gray-900">{totalClasses}</span>
          </p>
          <p className="text-lg text-gray-700">
            Total Present: <span className="font-semibold text-green-600">{totalPresent}</span>
          </p>
        </div>
      </div>

      {/* Filtered Attendance Details */}
      <div className="bg-white p-8 rounded-xl shadow-md mb-8">
        <h4 className="text-xl font-semibold text-gray-800">Filtered Attendance Details:</h4>
        {filteredDates.length > 0 ? (
          <ul className="list-disc pl-6 mt-4 space-y-2">
            {filteredDates.map((attendance, index) => (
              <li
                key={index}
                className={`text-lg ${
                  attendance.status === "present" ? "text-green-600" : "text-red-600"
                } transition duration-200 transform hover:scale-105`}
              >
                <span className="font-semibold">{formatDateToIndian(attendance.date)}</span> {attendance.status === "present" ? "Present" : "Absent"}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-500 mt-4">No attendance records found for this date range.</p>
        )}
      </div>
    </div>
  );
};

export default DetailedReport;
