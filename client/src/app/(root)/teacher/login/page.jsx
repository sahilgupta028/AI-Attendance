// pages/login.js

"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/login-teacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, password }),
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        console.log("Login successful:", data.teacher._id);
        router.push(`/mark-attendance/${data.teacher._id}?classGroup=${data.teacher.classGroup}&subject=${data.teacher.subject}`);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row min-h-screen bg-gray-50">
      {/* Left Side - Image */}
      <div className="relative w-full md:w-1/2 h-64 md:h-auto">
        <Image
          src="/teacher/login.jpg"
          alt="Login"
          layout="fill"
          objectFit="cover"
          className="rounded-b-lg md:rounded-l-lg md:rounded-r-none"
        />
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center w-full md:w-1/2 p-8 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Teacher Login</h1>

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
              Teacher ID
            </label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your user ID"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
