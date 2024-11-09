"use client";
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const Chart = ({ details }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    toast.loading("Loading");

    if (details && Array.isArray(details)) {
      const attendanceData = details.map((item) => ({
        subject: item.subjectName,
        present: item.totalPresent,
        absent: item.totalAbsent,
      }));

      // Calculate total classes and attendance percentage for each subject
      setData(
        attendanceData.map((item) => {
          const totalClasses = item.present + item.absent;
          const Percentage = totalClasses > 0 ? (item.present / totalClasses) * 100 : 0;
          return {
            subject: item.subject,
            Percentage: Percentage.toFixed(2),
          };
        })
      );
    }

    toast.dismiss();
    
    toast.success('Students Data Fetched');
    
  }, [details]);

  if (!data) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or some other placeholder.
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <Toaster />
      <h2 className="text-center text-2xl font-semibold text-gray-700 mb-6">Subject-Wise Attendance</h2>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Percentage" fill="#4F46E5">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.Percentage >= 75 ? '#10B981' : '#EF4444'} // Green if >= 75%, Red if < 75%
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 text-center">
          <span className="font-medium text-gray-600">
            Attendance below 75% is highlighted in <span className="text-red-500">red</span>, while above 75% is <span className="text-green-500">green</span>.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Chart;
