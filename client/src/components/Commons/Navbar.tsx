"use client";
import Link from 'next/link';
import { FiHome, FiUserCheck, FiClipboard, FiFileText, FiLogIn, FiLogOut } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Load initial login status from localStorage
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, [ isLoggedIn]);

  const handleLoginLogin = () => {
    router.push('/login');
  };

  const handleLoginLogout = () => {
    const newStatus = !isLoggedIn;
    setIsLoggedIn(newStatus);
    localStorage.setItem('isLoggedIn', "false");
    router.push('/');
  };

  return (
    <nav className="bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-lg z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <img src="/logo/logo.jpg" alt="logo" className="h-12 w-12 rounded-full" />
        
        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Menu Links */}
        <div className={`md:flex items-center space-x-8 ${isOpen ? "block" : "hidden"} md:block`}>
          <Link href="/">
            <button className="flex items-center space-x-2 hover:text-gray-200 transition duration-300">
              <FiHome className="text-xl" />
              <span>Home</span>
            </button>
          </Link>

          {/* Login/Logout Button */}
          <button
            className="flex items-center space-x-2 hover:text-gray-200 transition duration-300"
          >
            {isLoggedIn ? (
              <div onClick={handleLoginLogout} className='flex items-center justify-center gap-2'>
                <FiLogOut className="text-xl" />
                <span>Logout</span>
              </div>
            ) : (
              <span onClick={handleLoginLogin} className='flex items-center justify-center gap-2'>
                <FiLogIn className="text-xl" />
                <span>Login</span>
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
