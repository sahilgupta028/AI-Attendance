
import { FaCamera, FaComments, FaFileAlt, FaBell, FaChartBar, FaFingerprint } from 'react-icons/fa';

export default function Features() {
  return (
    <div className="py-16 text-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 - Camera-Based Attendance */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <FaCamera className="text-indigo-500 text-5xl mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Camera-Based Attendance</h3>
            <p className="text-gray-600">
              Use AI-powered facial recognition to mark attendance with just a glance.
            </p>
          </div>
          
          {/* Feature 2 - Student Chatbot */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <FaComments className="text-indigo-500 text-5xl mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Student Chatbot</h3>
            <p className="text-gray-600">
              A helpful chatbot for students to get assistance and information anytime.
            </p>
          </div>

          {/* Feature 3 - Report Generation */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <FaFileAlt className="text-indigo-500 text-5xl mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Report Generation</h3>
            <p className="text-gray-600">
              Generate detailed reports on student performance and attendance.
            </p>
          </div>

          {/* Feature 4 - Attendance Alerts */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <FaBell className="text-indigo-500 text-5xl mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Attendance Alerts</h3>
            <p className="text-gray-600">
              Automated alerts for students with attendance below 75%.
            </p>
          </div>

          {/* Feature 5 - Attendance Graph */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <FaChartBar className="text-indigo-500 text-5xl mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Attendance Graph</h3>
            <p className="text-gray-600">
              Visual graphs to represent students' attendance over time.
            </p>
          </div>

          {/* Feature 6 - Camera-Based Authentication */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <FaFingerprint className="text-indigo-500 text-5xl mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Camera-Based Authentication</h3>
            <p className="text-gray-600">
              Secure login through camera-based facial authentication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
