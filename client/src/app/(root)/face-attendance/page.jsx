"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

const capitalizeName = (string) => {
  if (!string) return string;
  return string
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(' ');
};

export default function Camera({ params }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [recognizedName, setRecognizedName] = useState("Unknown");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const searchParams = useSearchParams();
  const [teacherDetails, setTeacherDetails] = useState(null);
  const id = params.id;

  // Fetch teacher details from backend
  useEffect(() => {
    const fetchTeacherDetails = async () => {
      try {
        const response = await fetch(`/api/get-teacher?id=${id}`);
        if (!response.ok) throw new Error('Failed to fetch teacher details');
        const data = await response.json();
        setTeacherDetails(data);
      } catch (error) {
        console.error("Error fetching teacher details:", error);
      }
    };
    
    if (id) {
      fetchTeacherDetails();
    }
  }, [id]);

  useEffect(() => {
   const subject = searchParams.get('subject');
   const classGroup = searchParams.get('classGroup');

    const fetchTeacherDetails = async () => {
      try {
        const response = await fetch(`/api/face-attendance?name=${recognizedName}&classGroup=${classGroup}&subject=${subject}`, { method: 'POST'});
        if (!response.ok) throw new Error('Failed to fetch teacher details');
        const data = await response.json();
        setTeacherDetails(data);
      } catch (error) {
        console.error("Error fetching teacher details:", error);
      }
    };
    
    if (recognizedName) {
      fetchTeacherDetails();
    }

    toast.success(`Marked Present for student!`);

  }, [ recognizedName ]);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Error accessing camera:", err);
        setErrorMessage("Could not access the camera. Please check your permissions.");
      }
    };

    startCamera();

    return () => {
      const stream = videoRef.current.srcObject;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL("image/png");

    setLoading(true);
    setErrorMessage(""); // Clear previous errors
    fetch("/api/recognize", {
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
        if (data.name) {
          setRecognizedName(capitalizeName(data.name));
        } else {
          throw new Error("Name not found in response");
        }
      })
      .catch((error) => {
        console.error("Error recognizing face:", error);
        setErrorMessage("Recognition failed. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-2xl font-bold mb-4">Face Recognition</h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <video
        ref={videoRef}
        autoPlay
        className="border rounded-md mb-4"
        width="640"
        height="480"
      />
      <canvas ref={canvasRef} width="640" height="480" className="hidden"></canvas>
      <button
        onClick={captureImage}
        className={`bg-blue-500 text-white px-4 py-2 rounded-md mb-2 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Recognizing..." : "Capture & Recognize"}
      </button>
      <p className="text-xl" aria-live="polite">
        Recognized Name: {recognizedName}
      </p>
    </div>
  );
}
