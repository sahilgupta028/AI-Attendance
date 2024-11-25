// components/Navbar.js
"use client";
import Link from 'next/link';
import { FiHome, FiUserCheck, FiClipboard, FiLogIn, FiLogOut, FiMenu } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, [isLoggedIn]);

  const handleLoginLogin = () => {
    router.push('/login');
  };

  const handleLoginLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', "false");
    router.push('/');
  };

  return (
    <nav className="bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-lg w-full z-20">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logo/logo.png" alt="logo" className="h-10 w-10 rounded-full shadow-md" />
          <span className="text-2xl font-bold tracking-wide hidden md:block">Attendance Manager</span>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none md:hidden"
        >
          <FiMenu className="w-6 h-6" />
        </button>

        {/* Menu Links */}
        <div
          className={`md:flex items-center md:space-x-8 space-y-4 md:space-y-0 bg-orange-500 md:bg-transparent absolute md:static top-16 left-0 w-full md:w-auto p-5 md:p-0 rounded-lg shadow-lg md:shadow-none transform transition-all duration-300 ease-in-out ${
            isOpen ? "block z-50" : "hidden"
          }`}
        >
          <Link href="/">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-300">
              <FiHome className="text-lg" />
              <span>Home</span>
            </button>
          </Link>

          <Link href="/about-us">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-300">
              <FiUserCheck className="text-lg" />
              <span>About Us</span>
            </button>
          </Link>

          <Link href="/features">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-300">
              <FiClipboard className="text-lg" />
              <span>Features</span>
            </button>
          </Link>

          {/* Login/Logout Button */}
          <button
            onClick={isLoggedIn ? handleLoginLogout : handleLoginLogin}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-300"
          >
            {isLoggedIn ? (
              <>
                <FiLogOut className="text-lg" />
                <span>Logout</span>
              </>
            ) : (
              <>
                <FiLogIn className="text-lg" />
                <span>Login</span>
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
