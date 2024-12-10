"use client";

import { useState } from "react";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [classGroup, setClassGroup] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const handleSendOtp = async () => {
    if (!email) {
      return toast.error("Please enter your email.");
    }

    toast.loading("Loading");

    const response = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const text = await response.json();

    if (response.ok) {
      setOtpSent(true);
      toast.dismiss();
      toast.success("OTP sent to your email!");
    } else {
      toast.dismiss();
      toast.error(text || "Failed to send OTP.");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      return toast.error("Please enter the OTP.");
    }

    toast.loading("Loading");

    const response = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();

    if (response.ok) {
      setEmailVerified(true);
      toast.dismiss();
      toast.success("Email verified successfully!");
    } else {
      toast.dismiss();
      toast.error(data.message || "Invalid OTP.");
    }
  };

  const handlePhotoChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const sendEmails = async (email, username ) => {
    toast.loading("Loading");

    console.log(username)
    console.log(email)

    try {
        // Send the lowAttendanceStudents data to the backend
        const response = await fetch('/api/send-username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, username }),
        });

        if (!response.ok) {
            throw new Error('Failed to send emails');
        }

        toast.dismiss();
        toast.success("Emails sent successfully! 😃");
    } catch (error) {
        console.error('Error sending emails:', error);
        toast.dismiss();
        toast.error("Something went wrong. Please try again.");
    }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailVerified) {
      return toast.error("Please verify your email before registration.");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("classGroup", classGroup);
    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    }

    const reader = new FileReader();
    reader.readAsDataURL(profilePhoto);
    reader.onloadend = async () => {
      const base64Image = reader.result;

      try {
        const response = await fetch("/api/register-student", {
          method: "POST",
          body: JSON.stringify({ name, email, password, classGroup, photo: base64Image }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success(`Registration successful! Your username is ${data.username}`, {
            position: "top-center",
          });

          await sendEmails(email, data.username);

          toast.success("Login Again");
        } else {
          toast.error(data.message || "Registration failed", {
            position: "top-center",
          });
        }
      } catch (error) {
        console.error("Registration error:", error);
        toast.error("Server error", {
          position: "top-center",
        });
      }
    };
  };

  return (
    <>
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
          <form onSubmit={handleSubmit} className="space-y-6 w-full" encType="multipart/form-data">
            <h1 className="text-3xl font-bold text-center mb-6">Student Register</h1>

            <div>
              <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-700 mb-1">
                Profile Photo
              </label>
              <input
                type="file"
                id="profilePhoto"
                onChange={handlePhotoChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

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
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={emailVerified}
                className={`w-full p-3 border ${
                  emailVerified ? "border-gray-400 bg-gray-200 cursor-not-allowed" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-yellow-500`}
              />
              {!otpSent && !emailVerified && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-lg"
                >
                  Send OTP
                </button>
              )}
            </div>

            {otpSent && !emailVerified && (
              <div>
                <label htmlFor="otp" className="block text-sm font-medium mb-1">
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-lg"
                >
                  Verify OTP
                </button>
              </div>
            )}

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
                <option value="" disabled>
                  Select your class
                </option>
                <option value="CS1">CS1</option>
                <option value="CS2">CS2</option>
                <option value="CS3">CS3</option>
              </select>
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
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
}
