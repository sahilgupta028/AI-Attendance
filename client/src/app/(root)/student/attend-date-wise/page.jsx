import React from 'react';

const Attendance = () => {
  const { name, subjects } = student;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-8">
          Attendance for {name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <div
              key={subject.subjectName}
              className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-blue-600 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">
                {subject.subjectName}
              </h3>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-medium text-gray-900">
                    Total Present:
                  </span>{' '}
                  {subject.totalPresent}
                </p>
                <p>
                  <span className="font-medium text-gray-900">
                    Total Absent:
                  </span>{' '}
                  {subject.totalAbsent}
                </p>
                <p>
                  <span className="font-medium text-gray-900">Percentage:</span>{' '}
                  {subject.percentage}%
                </p>
              </div>

              <h4 className="text-lg font-semibold text-blue-600 mt-6 mb-3">
                Attendance Dates:
              </h4>
              <ul className="space-y-3">
                {subject.Date.map((date, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-50 border rounded-md p-3 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <span className="text-gray-800 font-medium">
                      {new Date(date.date).toLocaleDateString()}
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
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Sample student data
const student = {
  name: 'John Doe',
  subjects: [
    {
      subjectName: 'Mathematics',
      totalPresent: 10,
      totalAbsent: 5,
      percentage: 66.67,
      Date: [
        { date: new Date('2023-11-20'), status: 'present' },
        { date: new Date('2023-11-21'), status: 'absent' },
        { date: new Date('2023-11-22'), status: 'present' },
      ],
    },
    {
      subjectName: 'Science',
      totalPresent: 8,
      totalAbsent: 7,
      percentage: 53.33,
      Date: [
        { date: new Date('2023-11-23'), status: 'present' },
        { date: new Date('2023-11-24'), status: 'absent' },
        { date: new Date('2023-11-25'), status: 'absent' },
      ],
    },
  ],
};

export default Attendance;
