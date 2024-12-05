"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useTable } from "react-table";

const AddMarks = () => {
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [isEditing, setIsEditing] = useState({});
  const totalMarks = 100;

  const searchParams = useSearchParams();
  const subject = searchParams.get("subject") || "";
  const classGroup = searchParams.get("classGroup") || "";

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`/api/student?classGroup=${classGroup}`);
        const data = await response.json();
        setStudents(data);

        const initialMarks = {};
        data.forEach((student) => {
          const subjectMarks = student.subjects.find(
            (s) => s.subjectName === subject
          );
          if (subjectMarks) {
            initialMarks[student._id] = subjectMarks.Marks?.toString() || "";
          } else {
            initialMarks[student._id] = ""; // If no marks found, set empty string
          }
        });
        setMarks(initialMarks);
      } catch (error) {
        toast.error("Failed to fetch students.");
        console.error(error);
      }
    };

    fetchStudents();
  }, [classGroup, subject]);

  const handleMarksChange = (id, value) => {
    setMarks((prevMarks) => ({ ...prevMarks, [id]: value }));
  };

  const submitMarks = async (id) => {
    const currentMarks = marks[id];
    if (!currentMarks || isNaN(currentMarks) || currentMarks < 0 || currentMarks > totalMarks) {
      toast.error("Please enter valid marks (between 0 and 100).");
      return;
    }

    try {
      // Assuming backend expects the `marks` value to be an integer
      await fetch(`/api/add-marks?id=${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjectName: subject, marks: parseInt(currentMarks), totalMarks }),
      });

      toast.success("Marks added successfully!");
      setIsEditing((prev) => ({ ...prev, [id]: false }));
    } catch (error) {
      toast.error("Failed to add marks. Please try again.");
      console.error(error);
    }
  };

  const enableEditing = (id) => {
    setIsEditing((prev) => ({ ...prev, [id]: true }));
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      // {
      //   Header: "Email",
      //   accessor: "email",
      // },
      {
        Header: "Marks",
        Cell: ({ row }) => {
          const studentId = row.original._id;
          return isEditing[studentId] ? (
            <input
              type="number"
              min="0"
              max={totalMarks}
              value={marks[studentId] || ""}
              onChange={(e) => handleMarksChange(studentId, e.target.value)}
              className="p-2 border rounded-md text-center"
              placeholder="Enter Marks"
            />
          ) : (
            marks[studentId] || "N/A"
          );
        },
      },
      {
        Header: "Total Marks",
        accessor: () => totalMarks,
      },
      {
        Header: "Actions",
        Cell: ({ row }) => {
          const studentId = row.original._id;
          return isEditing[studentId] ? (
            <button
              onClick={() => submitMarks(studentId)}
              className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => enableEditing(studentId)}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
              Add Marks
            </button>
          );
        },
      },
    ],
    [marks, isEditing]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: students });

  return (
    <div className="overflow-x-auto p-4">
      <Toaster position="top-right" reverseOrder={false} />
      <table
        {...getTableProps()}
        className="min-w-full bg-white shadow-md rounded-lg border border-gray-200"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="bg-blue-100 border-b-2 border-gray-300"
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="p-4 text-center font-semibold text-gray-700"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-gray-100 transition">
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="p-4 text-gray-800 text-center"
                  >
                    {cell.render("Cell")}
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
