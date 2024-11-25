// components/Footer.js
"use client";
import { useRouter } from 'next/navigation';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-10">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
          {/* Logo and Slogan */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <img src="/logo/logo.png" alt="logo" className="h-12 w-12 rounded-lg shadow-md" />
              <h2 className="text-3xl font-semibold">Attendance Manager</h2>
            </div>
            <p className="text-lg mt-2 text-gray-200">Simplifying Attendance, Empowering Success</p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 text-lg">
            <button
              className="hover:text-yellow-200 transition duration-300"
              onClick={() => router.push("/")}
            >
              Home
            </button>
            <button
              className="hover:text-yellow-200 transition duration-300"
              onClick={() => router.push("/features")}
            >
              Features
            </button>
            <button
              className="hover:text-yellow-200 transition duration-300"
              onClick={() => router.push("/")}
            >
              Support
            </button>
          </div>

          {/* Contact Information */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-xl">Contact Us</h3>
            <p className="text-sm mt-2">Email: <a href="mailto:support@attendancemanager.com" className="hover:text-yellow-200">support@attendancemanager.com</a></p>
            <p className="text-sm">Phone: <span className="text-yellow-200">+1 (234) 567-890</span></p>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-6 justify-center md:justify-start">
            <FaFacebook className="w-6 h-6 hover:text-gray-300 cursor-pointer transition duration-300" />
            <FaTwitter className="w-6 h-6 hover:text-gray-300 cursor-pointer transition duration-300" />
            <FaInstagram className="w-6 h-6 hover:text-gray-300 cursor-pointer transition duration-300" />
            <FaLinkedin className="w-6 h-6 hover:text-gray-300 cursor-pointer transition duration-300" />
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-8 text-center border-t border-yellow-300 pt-4">
          <p className="text-sm">© {new Date().getFullYear()} Attendance Manager. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
