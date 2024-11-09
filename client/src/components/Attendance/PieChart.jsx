// components/StudentAttendanceChart.js
"use client";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// Colors for Present and Absent segments
const COLORS = ["#4CAF50", "#F44336"]; // Green for Present, Red for Absent

const StudentAttendanceChart = ({ details }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(details);
  }, [details])
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {data && data.map((data, index) => {
        const chartData = [
          { name: "Present", value: data.totalPresent },
          { name: "Absent", value: data.totalAbsent },
        ];

        // Calculate the attendance percentage
        const totalClasses = data.totalPresent + data.totalAbsent;
        const attendancePercentage = totalClasses > 0 
          ? ((data.totalPresent / totalClasses) * 100).toFixed(2) 
          : "0.00";

        return (
          <div
            key={index}
            className="border rounded-lg p-4 shadow-lg bg-white text-center"
          >
            <h3 className="text-lg font-semibold mb-2">{data.subjectName}</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  fill="#8884d8"
                  label
                >
                  {chartData.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <p
              className={`mt-2 font-semibold ${
                attendancePercentage < 75 ? "text-red-500" : "text-green-500"
              }`}
            >
              Attendance: {attendancePercentage}%
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default StudentAttendanceChart;
