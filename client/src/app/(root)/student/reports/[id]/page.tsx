"use client";
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import DOMPurify from 'dompurify';

interface Subject {
  subjectName: string;
  totalPresent: number;
  totalAbsent: number;
  Marks: number;
  TotalMarks: number;
}

interface YourReportProps {
  params: {
    id: string;
  };
}

const Report: React.FC<YourReportProps> = ({ params }) => {
  const [studentDetails, setStudentDetails] = useState<any>(null);
  const [report, setReport] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const id = params.id;

    const fetchStudentDetails = async () => {
      try {
        const res = await fetch(`/api/find-student?id=${id}`, { method: 'GET' });
        if (!res.ok) throw new Error('Failed to fetch student details');
        const data = await res.json();
        setStudentDetails(data);
        toast.success("Data Fetched");
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
    if (!report) return;

    const blob = new Blob([report], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'attendance_report.html';
    link.click();
  };

  const generateReport = async () => {
    if (!studentDetails) return;

    setIsLoading(true);
    toast.loading("Loading...");

    try {
      const response = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentDetails }),
      });

      if (!response.ok) throw new Error('Failed to generate report');

      const result = await response.json();
      setReport(DOMPurify.sanitize(result.res));

      const safeReportHtml = DOMPurify.sanitize(report);

      toast.dismiss();
      toast.success("Report Generated");
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 min-h-screen p-8">
      <Toaster />
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
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl focus:outline-none transform hover:scale-105 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? 'Generating Report...' : 'Generate Report'}
          </button>
          <button
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-lg shadow-lg hover:shadow-xl focus:outline-none transform hover:scale-105 transition-all duration-300"
            disabled={!report}
            onClick={downloadReport}
          >
            {report ? 'Download Report' : 'No Report Available'}
          </button>
        </div>

        {/* Display the generated report if available */}
        <div className="mt-6 p-4 bg-gray-100 border-l-4 border-indigo-500">
          <h2 className="text-2xl font-semibold">Generated Report</h2>
          <div className="h-96 overflow-auto">
            {isLoading ? (
              <div className="text-center text-xl text-gray-500">Loading report...</div>
            ) : (
              report && (
                <div
             className="report-content"
            dangerouslySetInnerHTML={{ __html: report }}
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
