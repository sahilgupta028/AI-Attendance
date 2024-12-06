"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog } from '@headlessui/react';
import { format } from 'date-fns'; // Importing date-fns to format dates

const Attendance = ({ params }) => {
  const [id, setId] = useState(null);
  const [studentDetails, setStudentDetails] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filteredDates, setFilteredDates] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(null); // Store selected subject

  useEffect(() => {
    if (!params?.id) return; // Check if params.id exists

    setId(params.id);

    const fetchStudentDetails = async () => {
      try {
        const res = await fetch(`/api/find-student?id=${params.id}`, { method: "GET" });
        if (!res.ok) throw new Error("Failed to fetch student details");
        const data = await res.json();
        setStudentDetails(data);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchStudentDetails();
  }, [params]);

  const handleDateFilter = () => {
    if (!startDate || !endDate) return;
  
    // Format the start and end dates to just the date part (no time)
    const start = new Date(startDate).setHours(0, 0, 0, 0);
    const end = new Date(endDate).setHours(23, 59, 59, 999);
  
    // Filter the dates based on the start and end date
    const filtered = studentDetails.subjects.flatMap(subject =>
      subject.Date.filter(date => {
        const dateObj = new Date(date.date).setHours(0, 0, 0, 0); // Set time to 00:00 to ignore time
        return dateObj >= start && dateObj <= end;
      })
    );
    setFilteredDates(filtered);
  };
  

  const formatDateIndian = (date) => {
    return format(new Date(date), 'dd-MM-yyyy'); // Format date in DD-MM-YYYY
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setFilteredDates([]); // Clear filtered dates when closing dialog
  };

  const handleDialogOpen = (subject) => {
    setSelectedSubject(subject); // Set the selected subject
    setIsDialogOpen(true);
    setFilteredDates(subject.Date); // Set the dates of the selected subject
  };

  if (!studentDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading student details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-8">
          Attendance for {studentDetails.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentDetails.subjects.map((subject) => (
            <div
              key={subject.subjectName}
              className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-blue-600 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">
                {subject.subjectName}
              </h3>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-medium text-gray-900">Total Present:</span> {subject.totalPresent}
                </p>
                <p>
                  <span className="font-medium text-gray-900">Total Absent:</span> {subject.totalAbsent}
                </p>
                <p>
                  <span className="font-medium text-gray-900">Percentage:</span> {subject.percentage}%
                </p>
              </div>

              <h4 className="text-lg font-semibold text-blue-600 mt-6 mb-3">
                Attendance Dates:
              </h4>
              <button
                onClick={() => handleDialogOpen(subject)} // Pass the subject to the dialog
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                View Attendance Dates
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Date Dialog */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/2"> {/* Adjusted width to 1/4 */}
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">
              Filter Attendance Dates for {selectedSubject?.subjectName}
            </h3>

            {/* Start Date and End Date */}
            <div className="space-y-4 mb-6">
              <div className="flex gap-4">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border rounded-md px-4 py-2 w-full"
                  placeholder="Start Date"
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border rounded-md px-4 py-2 w-full"
                  placeholder="End Date"
                />
              </div>
              <button
                onClick={handleDateFilter}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg w-full"
              >
                Filter Dates
              </button>
            </div>

            {/* Filtered Dates List */}
            <div className="space-y-3 overflow-y-auto max-h-64"> {/* Added overflow and max-height */}
              {filteredDates.length > 0 ? (
                filteredDates.map((date, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-50 border rounded-md p-3 shadow-sm">
                    <span className="text-gray-800 font-medium">
                      {formatDateIndian(date.date)}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        date.status === 'present'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {date.status.charAt(0).toUpperCase() + date.status.slice(1)}
                    </span>
                  </div>
                ))
              ) : (
                <p>No dates to show</p>
              )}
            </div>

            <button
              onClick={handleDialogClose}
              className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg w-full"
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Attendance;
