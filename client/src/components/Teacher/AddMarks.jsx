"use client";
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import toast, { Toaster } from 'react-hot-toast';

const AddMarks = ({ params }) => {
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const totalMarks = 100;
  const [isEditing, setIsEditing] = useState({});
  const searchParams = useSearchParams();
  const subject = searchParams.get('subject');
  const classGroup = searchParams.get('classGroup');

  // Fetch students from the backend and initialize marks state
  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch(`/api/student?classGroup=${classGroup}`);
      const data = await response.json();
      setStudents(data);

      // Initialize marks state with the existing marks for each student
      const initialMarks = {};
      data.forEach(student => {
        const subjectMarks = student.subjects.find(s => s.subjectName === subject);
        if (subjectMarks) {
          initialMarks[student._id] = subjectMarks.Marks || ''; // Set existing marks or empty
        }
      });
      setMarks(initialMarks);
    };
    fetchStudents();
  }, [classGroup, subject]);

  // Update marks input
  const handleMarksChange = (id, value) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [id]: value,
    }));
  };

  // Save marks for a student
  const submitMarks = async (id) => {
    const currentMarks = marks[id];
    if (!currentMarks) {
      toast.error("Please enter marks before submitting.");
      return;
    }

    try {
      await fetch(`/api/add-marks?id=${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subjectName: subject, marks: currentMarks, totalMarks }),
      });

      toast.success("Marks added successfully!");
      setIsEditing((prev) => ({ ...prev, [id]: false }));
      setMarks((prevMarks) => ({ ...prevMarks, [id]: "" }));
    } catch (error) {
      toast.error("Failed to add marks. Please try again.");
    }
  };

  // Enable editing for a specific student
  const enableEditing = (id) => {
    setIsEditing((prev) => ({ ...prev, [id]: true }));
  };

  // Define columns for the table
  const columns = React.useMemo(
    () => [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Email', accessor: 'email' },
      {
        Header: 'Marks',
        accessor: (row) => (
          isEditing[row._id] ? (
            <input
              type="number"
              min="0"
              max={totalMarks}
              value={marks[row._id] || ""}
              onChange={(e) => handleMarksChange(row._id, e.target.value)}
              className="p-2 border rounded-md text-center"
              placeholder="Enter Marks"
            />
          ) : (
            marks[row._id] || "N/A" // Show existing marks or "N/A" if not available
          )
        ),
      },
      {
        Header: 'Total Marks',
        accessor: () => totalMarks, // Static value, could also fetch dynamically if needed
      },
      {
        Header: 'Actions',
        accessor: (row) => (
          isEditing[row._id] ? (
            <button
              onClick={() => submitMarks(row._id)}
              className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => enableEditing(row._id)}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
              Add Marks
            </button>
          )
        ),
      },
    ],
    [marks, isEditing, subject]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: students });

  return (
    <div className="overflow-x-auto p-4">
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

export default AddMarks;
