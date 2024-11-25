"use client";
// pages/index.tsx
import { useEffect, useState } from 'react';
import toast, { ToastBar, Toaster } from 'react-hot-toast';

export default function Chatbot({ params }: any) {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [studentDetails, setStudentDetails] = useState(null);

  useEffect(() => {
    const id = params.id;

    const fetchStudentDetails = async () => {
      try {
        const res = await fetch(`/api/find-student?id=${id}`, { method: 'GET' });
        if (!res.ok) throw new Error('Failed to fetch student details');
        const data = await res.json();
        setStudentDetails(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    toast.success(`Welcome to the chatbot!`);

    fetchStudentDetails();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const res = await fetch('/api/chatbot-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, studentDetails }),
      });
      const data = await res.json();

      setResponse(data.res);
      setQuery('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <Toaster />
      <div className="max-w-xl w-full p-6 bg-white rounded-xl shadow-lg space-y-4">
        <h1 className="text-3xl font-semibold text-center text-gray-800">Chat with Our Attendance Bot</h1>
        
        <div className="space-y-4 h-72 overflow-y-scroll p-4 bg-gray-50 rounded-lg shadow-inner">
          {/* Display query and response chat bubbles */}
          <div className="space-y-2">
            {response && (
              <div className="flex justify-start">
                <div className="bg-blue-100 text-gray-800 p-2 rounded-lg max-w-xs">
                  <p className="font-medium">Bot:</p>
                  <p>{response}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex items-center space-x-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question..."
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none">
            Ask
          </button>
        </form>
      </div>
    </div>
  );
}
