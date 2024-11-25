// components/FAQ.js
"use client";
import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

export default function FAQ() {
  const faqs = [
    {
      question: "What is the purpose of the attendance manager?",
      answer: "The attendance manager helps track student attendance seamlessly, allowing both students and teachers to monitor attendance records efficiently."
    },
    {
      question: "How can I register for an account?",
      answer: "To register for an account, click on the 'Register' button on the homepage and fill in the required details. You'll receive a confirmation email upon successful registration."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Currently, we offer a web-based platform. However, our website is optimized for mobile devices, allowing you to access it from your smartphone or tablet."
    },
    {
      question: "What features does the platform offer?",
      answer: "Our platform offers features like voice login, camera-based attendance marking, performance insights, and automated alerts to enhance your experience."
    },
    {
      question: "Who can access the attendance manager?",
      answer: "The attendance manager is accessible to students, teachers, and administrators, providing tailored functionalities for each user role."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-200 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg transition-all duration-300"
            >
              <div 
                onClick={() => toggleAnswer(index)} 
                className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-100 transition duration-300 rounded-lg"
              >
                <h3 className="text-xl font-semibold text-gray-800">{faq.question}</h3>
                <span className="text-gray-600 text-2xl">
                  {openIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                </span>
              </div>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-6 border-t border-gray-200 text-gray-600">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
