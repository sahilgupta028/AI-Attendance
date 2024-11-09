"use client";
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Subject {
  subjectName: string;
  totalPresent: number;
  totalAbsent: number;
  Marks: number;
  TotalMarks: number;
}

const Report = ({ params }: any) => {
  const [studentDetails, setStudentDetails] = useState<any>(null); // Store student details from API
  const [report, setReport] = useState<any>(null); // Store the report generated from the backend
  const [isLoading, setIsLoading] = useState(false); // Loading state for report generation

  useEffect(() => {
    const id = params.id;

    // Fetch student details based on ID
    const fetchStudentDetails = async () => {
      try {
        const res = await fetch(`/api/find-student?id=${id}`, { method: 'GET' });
        if (!res.ok) throw new Error('Failed to fetch student details');
        const data = await res.json();
        setStudentDetails(data);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    fetchStudentDetails();
  }, [params.id]);

  const getAttendancePercentage = (present: number, absent: number) => {
    const totalClasses = present + absent;
    return totalClasses > 0 ? ((present / totalClasses) * 100).toFixed(2) : '0.00';
  };

  const downloadReport = () => {
    if (!report) return; // If no report, prevent download

    // Create a Blob object from the report HTML
    const blob = new Blob([report], { type: 'text/html' });

    // Create a download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'attendance_report.html'; // File name for the download

    // Trigger the download by simulating a click
    link.click();
  };

  const generateReport = async () => {
    if (!studentDetails) return; // If no student details, do nothing

    setIsLoading(true); // Start loading state

    toast.loading("Loading...");

    try {
      // Send student details to the backend API for report generation
      const response = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentDetails }), // Send the student details
      });

      if (!response.ok) throw new Error('Failed to generate report');

      const result = await response.json();
      setReport(result.res);

      toast.dismiss();

      toast.success("Report Generated");

      console.log(result.res);
       // Set the generated report
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 min-h-screen p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-lg p-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          Report for {studentDetails?.name}
        </h1>
        <div className="mb-6 text-xl text-gray-600">Class: {studentDetails?.classGroup}</div>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
          <table className="min-w-full table-auto border-separate border-spacing-2">
            <thead className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white rounded-t-lg">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Subject</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Attendance</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Marks</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Total Marks</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Attendance %</th>
              </tr>
            </thead>
            <tbody>
              {studentDetails?.subjects?.map((subject: Subject, index: number) => (
                <tr
                  key={index}
                  className="hover:bg-blue-50 transition-colors duration-300 ease-in-out rounded-lg"
                >
                  <td className="px-6 py-4 text-gray-800">{subject.subjectName}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {subject.totalPresent} / {subject.totalPresent + subject.totalAbsent}
                  </td>
                  <td className="px-6 py-4 text-gray-800">{subject.Marks}</td>
                  <td className="px-6 py-4 text-gray-800">{subject.TotalMarks}</td>
                  <td className="px-6 py-4 text-gray-800">
                    {getAttendancePercentage(subject.totalPresent, subject.totalAbsent)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={generateReport}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg focus:outline-none transform hover:scale-105 transition-all duration-300"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? 'Generating Report...' : 'Generate Report'}
          </button>
          <button
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-lg shadow-md hover:shadow-lg focus:outline-none transform hover:scale-105 transition-all duration-300"
            disabled={!report}
            onClick={downloadReport}
          >
            {report ? 'Download Report' : 'No Report Available'}
          </button>
        </div>

        {/* Display the generated report if available */}
        <div className="mt-6 p-4 bg-gray-100 border-l-4 border-indigo-500">
          <h2 className="text-2xl font-semibold">Generated Report</h2>
          <div className="h-96 overflow-auto"> {/* Fixed height to prevent layout shifts */}
            {isLoading ? (
              <div className="text-center text-xl text-gray-500">Loading report...</div>
            ) : (
              report && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: report, // Inject HTML content from the backend
                  }}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
