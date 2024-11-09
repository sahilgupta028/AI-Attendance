"use client";
// components/FAQ.js
import { useState } from 'react';

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

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out">
              <div 
                onClick={() => toggleAnswer(index)} 
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-yellow-100 transition duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800">{faq.question}</h3>
                <span className="text-gray-600 text-lg">
                  {openIndex === index ? '-' : '+'}
                </span>
              </div>
              <div 
                className={`overflow-hidden transition-max-height duration-300 ease-in-out ${openIndex === index ? 'max-h-40' : 'max-h-0'}`}
              >
                <div className="p-4 border-t border-gray-200">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
