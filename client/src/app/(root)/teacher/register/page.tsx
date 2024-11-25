// pages/TeacherRegister.tsx

"use client";

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import toast, { ToastBar, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { verifyEmail } from '@/components/Verification/VerifyEmail';

export default function TeacherRegister() {
  const [name, setName] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [classGroup, setClassGroup] = useState<string>(''); // Using classGroup to avoid reserved keyword conflict
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validity = await verifyEmail(email);

    if(validity == "invalid"){
      return toast.error("The email address you provided appears to be invalid. Please verify and try again.");
    }
    
    const response = await fetch('/api/register-teacher', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, subject, email, classGroup, password }),
    });

    const data = await response.json();

    console.log(data.id);

    if (response.ok) {
      toast.success(`Your ID is: ${data.id}.`);
      toast.success(`Login again`);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Toaster />
      {/* Left Side - Image */}
      <div className="hidden md:flex md:w-1/2">
        <div className="relative w-full h-full">
          <Image
            src="/teacher/register.jpg"
            alt="Teacher Registration"
            layout="fill"
            objectFit="cover"
            className="rounded-r-full"
          />
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center w-full md:w-1/2 bg-white p-8 rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <h1 className="text-3xl font-bold text-center mb-6">Teacher Registration</h1>

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
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <select
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            >
              <option value="" disabled>Select your subject</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="History">History</option>
              <option value="Geography">Geography</option>
              <option value="Computer Science">Computer Science</option>
            </select>
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
              placeholder="Enter your email"
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

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300"
          >
            Register
          </button>
          {message && <p className="text-center mt-4 text-green-600">{message}</p>}
        </form>
      </div>
    </div>
  );
}
