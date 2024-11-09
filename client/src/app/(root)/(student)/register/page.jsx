"use client";

import { useState } from 'react';
import Image from 'next/image';
import Banner from '@/components/Home/Banner';
import { Toaster, toast } from 'react-hot-toast'; // Import Toaster and toast from react-hot-toast

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [classGroup, setClassGroup] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/register-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, classGroup }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`Registration successful! Your username is ${data.username}`, {
          position: 'top-center',
        });
      } else {
        toast.error(data.message || 'Registration failed', {
          position: 'top-center',
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error('Server error', {
        position: 'top-center',
      });
    }
  };

  return (
    <>
      <Banner />
      <div className="flex min-h-screen">
        <div className="hidden md:flex md:w-1/2">
          <div className="relative w-full h-full">
            <Image
              src="/student/register.jpg"
              alt="Student Registration"
              layout="fill"
              objectFit="cover"
              className="rounded-r-full"
            />
          </div>
        </div>

        <div className="flex items-center justify-center w-full md:w-1/2 bg-white p-8">
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <h1 className="text-3xl font-bold text-center mb-6">Student Register</h1>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your email address"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your password"
              />
            </div>

            <div>
              <label htmlFor="classGroup" className="block text-sm font-medium text-gray-700 mb-1">
                Class
              </label>
              <select
                id="classGroup"
                value={classGroup}
                onChange={(e) => setClassGroup(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
              >
                <option value="" disabled>Select your class</option>
                <option value="CS1">CS1</option>
                <option value="CS2">CS2</option>
                <option value="CS3">CS3</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300"
            >
              Register
            </button>
          </form>
        </div>
      </div>
      <Toaster /> {/* Toaster component to display toast notifications */}
    </>
  );
}
