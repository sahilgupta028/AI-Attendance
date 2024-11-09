"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/login-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful!", { position: 'top-center' });
        setSuccess(true);
        console.log("User Logged In:", data);
        localStorage.setItem('isLoggedIn', 'true');
        router.push(`/student/attendance/${data.studentId}`);
      } else {
        toast.error(data.message || 'Login failed', { position: 'top-center' });
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error('Server error', { position: 'top-center' });
      setError('Server error');
    }
  };

  const openCamera = () => {
    setIsCameraOpen(true);
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL("image/png");

    fetch("/api/face-authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to recognize face");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          console.log(data[0]._id);
          toast.success("Face recognized");
          setIsCameraOpen(false);

          router.push(`/student/attendance/${data[0]._id}`);
        } else {
          toast.error("Face Not recognized");
        }
      })
      .catch((error) => {
        console.error("Error recognizing face:", error);
        toast.error("Face Not recognized");
      })
  };


  useEffect(() => {
    return () => {
      const stream = videoRef.current?.srcObject;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <>
      <div className="flex flex-row-reverse min-h-screen bg-white mt-2">
        {/* Left Side - Image */}
        <div className="hidden md:flex md:w-1/2">
          <div className="relative w-full h-full">
            <Image
              src="/student/login.jpg"
              alt="Student Login"
              layout="fill"
              objectFit="cover"
              className="rounded-l-full"
            />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex items-center justify-center w-full md:w-1/2 bg-white p-8 rounded-md">
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <h1 className="text-3xl font-bold text-center mb-6">Student Login</h1>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your username"
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
              Login
            </button>

            <button
              type="button"
              onClick={openCamera}
              className="w-full mt-4 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
            >
              Login with Face
            </button>
          </form>
        </div>
      </div>

      {/* Camera Modal */}
      {isCameraOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <video ref={videoRef} autoPlay className="w-full h-auto rounded-md mb-4" />
            <canvas ref={canvasRef} width={640} height={480} className="hidden"></canvas>
            <button
              onClick={captureImage}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
            >
              Detect Face
            </button>
          </div>
        </div>
      )}

      <Toaster /> {/* Toaster component for notifications */}
    </>
  );
}
