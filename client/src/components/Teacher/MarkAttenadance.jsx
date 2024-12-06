"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import toast, { Toaster } from 'react-hot-toast';
import Buttons from './Buttons';

const TeacherAttendance = ({ params }) => {
  const [students, setStudents] = useState([]);
  const searchParams = useSearchParams();
  const subject = searchParams.get('subject');
  const classGroup = searchParams.get('classGroup');

  const router = useRouter();

  // Fetch students from the backend
  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch(`/api/student?classGroup=${classGroup}`);
      const data = await response.json();
      setStudents(data);
    };
    fetchStudents();
  }, [classGroup]);

  // Mark attendance and update the backend
  const markAttendance = async (id, status) => {
    const currentDate = new Date().toLocaleDateString();
    await fetch(`/api/mark-attendance?id=${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subjectName: subject, status }),
    });

    toast.success(`Marked ${status} for student!`);

    // Update the local state after marking attendance
    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (student._id === id) {
          const updatedSubject = student.subjects.map((subj) => {
            if (subj.subjectName === subject) {
              const updatedPresent = status === 'present' ? subj.totalPresent + 1 : subj.totalPresent;
              const updatedAbsent = status === 'absent' ? subj.totalAbsent + 1 : subj.totalAbsent;
              const totalClasses = updatedPresent + updatedAbsent;
              const attendancePercentage = totalClasses > 0 ? ((updatedPresent / totalClasses) * 100).toFixed(2) : '0';

              return {
                ...subj,
                totalPresent: updatedPresent,
                totalAbsent: updatedAbsent,
                lastAttended: currentDate,
                percentage: attendancePercentage, // Update the percentage value here
              };
            }
            return subj;
          });
          return { ...student, subjects: updatedSubject };
        }
        return student;
      })
    );
  };

  // Filter students with attendance percentage less than 75%
  const lowAttendanceStudents = students.filter(student => {
    const percentage = student.subjects.find(subj => subj.subjectName === subject)?.percentage || '0';
    return Number(percentage) < 75;
  }).map(student => ({
    name: student.name,
    email: student.email,
  }));

  // Define columns for the table
  const columns = React.useMemo(
    () => [
      { Header: 'Name', accessor: 'name' },
      // { Header: 'Email', accessor: 'email' },
      {
        Header: 'Total Present',
        accessor: (row) => row.subjects.find((subj) => subj.subjectName === subject)?.totalPresent || 0,
      },
      {
        Header: 'Total Absent',
        accessor: (row) => row.subjects.find((subj) => subj.subjectName === subject)?.totalAbsent || 0,
      },
      {
        Header: 'Total Classes',
        accessor: (row) => {
          const present = row.subjects.find((subj) => subj.subjectName === subject)?.totalPresent || 0;
          const absent = row.subjects.find((subj) => subj.subjectName === subject)?.totalAbsent || 0;
          return present + absent;
        },
      },
      {
        Header: 'Attendance %',
        accessor: (row) => {
          const percentage = row.subjects.find((subj) => subj.subjectName === subject)?.percentage || '0';
          return `${percentage}%`;
        },
        Cell: ({ cell }) => (
          <span
            className={
              Number(cell.value.replace('%', '')) >= 75
                ? 'text-green-600 font-semibold'
                : 'text-red-600 font-semibold'
            }
          >
            {cell.value}
          </span>
        ),
      },
      {
        Header: 'Actions',
        accessor: (row) => (
          <div className="space-x-2 flex items-center justify-center">
            <button
              onClick={() => markAttendance(row._id, 'present')}
              className="px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-md hover:from-green-500 hover:to-green-700 transition"
            >
              Present
            </button>
            <button
              onClick={() => markAttendance(row._id, 'absent')}
              className="px-4 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold rounded-md hover:from-red-500 hover:to-red-700 transition"
            >
              Absent
            </button>
            <button
              onClick={() => router.push(`/detailed-report/${row._id}?subject=${subject}&clssGroup=${classGroup}`)}
              className="px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold rounded-md hover:from-orange-500 hover:to-orange-700 transition"
            >
              Report
            </button>
          </div>
        ),
      },
    ],
    [subject] // Recalculate columns if the subject changes
  );

  // Use the useTable hook to create the table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: students });

  return (
    <div className="overflow-x-auto p-4">
      <Buttons params={params} lowAttendanceStudents={lowAttendanceStudents} />
      <Toaster position="top-right" reverseOrder={false} />
      <table {...getTableProps()} className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="bg-blue-100 border-b-2 border-gray-300">
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="p-4 text-center font-semibold text-gray-700">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-gray-100 transition">
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="p-4 text-gray-800 text-center">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherAttendance;
