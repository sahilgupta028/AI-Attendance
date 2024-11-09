"use client";
import { useState } from 'react';

const initialStudents = [
  { id: 1, rollNo: '101', name: 'John Doe', email: 'john@example.com', present: 0, absent: 0, lastAttended: '-' },
  { id: 2, rollNo: '102', name: 'Jane Smith', email: 'jane@example.com', present: 0, absent: 0, lastAttended: '-' },
  { id: 3, rollNo: '103', name: 'Sam Wilson', email: 'sam@example.com', present: 0, absent: 0, lastAttended: '-' },
  // Add more students as needed
];

const TeacherAttendance = () => {
  const [students, setStudents] = useState(initialStudents);

  const markAttendance = (id, status) => {
    const currentDate = new Date().toLocaleDateString();
    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (student.id === id) {
          const updatedPresent = status === 'present' ? student.present + 1 : student.present;
          const updatedAbsent = status === 'absent' ? student.absent + 1 : student.absent;
          const totalClasses = updatedPresent + updatedAbsent;
          const attendancePercentage = totalClasses > 0 ? ((updatedPresent / totalClasses) * 100).toFixed(2) : 0;

          return {
            ...student,
            present: updatedPresent,
            absent: updatedAbsent,
            lastAttended: currentDate,
            percentage: attendancePercentage,
          };
        }
        return student;
      })
    );
  };

  const sendEmail = (email) => {
    alert(`Email sent to ${email}`);
  };

  return (
    <div className="p-8 max-w-8xl mx-auto">
      <h2 className="text-center text-2xl font-semibold text-gray-700 mb-6">Teacher Attendance</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b-2 border-gray-200">
              <th className="p-4 text-left font-medium text-gray-600">Roll No.</th>
              <th className="p-4 text-left font-medium text-gray-600">Name</th>
              <th className="p-4 text-left font-medium text-gray-600">Email</th>
              <th className="p-4 text-left font-medium text-gray-600">Email Send</th>
              <th className="p-4 text-left font-medium text-gray-600">Total Present</th>
              <th className="p-4 text-left font-medium text-gray-600">Total Absent</th>
              <th className="p-4 text-left font-medium text-gray-600">Total Classes</th>
              <th className="p-4 text-left font-medium text-gray-600">Last Attended</th>
              <th className="p-4 text-left font-medium text-gray-600">Attendance %</th>
              <th className="p-4 text-left font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b border-gray-200">
                <td className="p-4 text-gray-700">{student.rollNo}</td>
                <td className="p-4 text-gray-700">{student.name}</td>
                <td className="p-4 text-gray-700">{student.email}</td>
                <td className="p-4">
                  <button
                    onClick={() => sendEmail(student.email)}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
                  >
                    Send Email
                  </button>
                </td>
                <td className="p-4 text-gray-700">{student.present}</td>
                <td className="p-4 text-gray-700">{student.absent}</td>
                <td className="p-4 text-gray-700">{student.present + student.absent}</td>
                <td className="p-4 text-gray-700">{student.lastAttended}</td>
                <td className="p-4">
                  <span
                    className={`font-semibold ${
                      student.percentage >= 75 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {student.percentage || 0}%
                  </span>
                </td>
                <td className="p-4 space-x-2 flex items-center justify-center">
                  <button
                    onClick={() => markAttendance(student.id, 'present')}
                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
                  >
                    Present
                  </button>
                  <button
                    onClick={() => markAttendance(student.id, 'absent')}
                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
                  >
                    Absent
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherAttendance;
