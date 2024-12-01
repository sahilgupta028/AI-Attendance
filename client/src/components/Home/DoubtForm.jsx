// components/DoubtForm.js
"use client";
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function DoubtForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    doubt: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("We will get back to you");
  };

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-lg shadow-2xl p-10 my-12 max-w-5xl mx-auto" id='doubt'>
      <Toaster />
      {/* Left Section - Title & Description */}
      <div className="flex flex-col justify-center items-start md:w-1/2 p-8 text-white space-y-4">
        <h2 className="text-4xl font-extrabold">Have a Question?</h2>
        <p className="text-lg leading-relaxed">
          Don’t hesitate to ask! Submit your question below, and our team will get back to you as soon as possible.
        </p>
      </div>

      {/* Right Section - Form */}
      <div className="md:w-1/2 mt-8 md:mt-0">
        {submitted ? (
          <div className="text-center text-white font-semibold text-xl">
            Thank you for submitting your question! We will get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-white font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-500 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-white font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-500 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="doubt" className="block text-white font-medium mb-2">
                Your Question
              </label>
              <textarea
                id="doubt"
                name="doubt"
                value={formData.doubt}
                onChange={handleChange}
                className="w-full p-3 h-40 rounded-lg border border-gray-500 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg hover:from-purple-500 hover:to-blue-500 transition duration-300"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
