// components/DoubtForm.js
"use client";
import { useState } from 'react';

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
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-600 rounded-lg shadow-lg p-8 my-8 max-w-4xl mx-auto">
      {/* Left Section - Title & Description */}
      <div className="flex flex-col justify-center items-start md:w-1/2 p-6 text-white">
        <h2 className="text-3xl font-bold mb-4">Have a Question?</h2>
        <p className="text-lg mb-6">
          Don’t hesitate to ask! Submit your question below, and our team will get back to you as soon as possible.
        </p>
      </div>

      {/* Right Section - Form */}
      <div className="md:w-1/2">
        {submitted ? (
          <div className="text-center text-white font-semibold">
            Thank you for submitting your question! We will get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-white font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-white font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div>
              <label htmlFor="doubt" className="block text-white font-medium mb-1">
                Your Question
              </label>
              <textarea
                id="doubt"
                name="doubt"
                value={formData.doubt}
                onChange={handleChange}
                className="w-full p-2 h-32 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
