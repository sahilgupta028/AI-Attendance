"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function TeacherRegister() {
  const [name, setName] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [classGroup, setClassGroup] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [emailVerified, setEmailVerified] = useState<boolean>(false);

  const router = useRouter();

  const handleSendOtp = async () => {
    if (!email) {
      return toast.error("Please enter your email.");
    }

    toast.loading("Loading");

    try {
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setOtpSent(true);

        toast.dismiss();
        toast.success("OTP sent to your email!");
      } else {
        toast.dismiss();
        toast.error(data.message || "Failed to send OTP.");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      return toast.error("Please enter the OTP.");
    }

    toast.loading("Loading");

    try {
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
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!emailVerified) {
      return toast.error("Please verify your email before registration.");
    }

    toast.loading("Loading");

    try {
      const response = await fetch("/api/register-teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, subject, email, classGroup, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.dismiss();
        toast.success(`Registration successful! Your ID: ${data.id}.`);
        toast.success("Login Again");
      } else {
        toast.dismiss();
        toast.error(data.message || "Failed to register.");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong. Please try again.");
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
          <h1 className="text-3xl font-bold text-center mb-6">
            Teacher Registration
          </h1>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-1">
              Subject
            </label>
            <select
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            >
              <option value="" disabled>
                Select your subject
              </option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="History">History</option>
              <option value="Geography">Geography</option>
              <option value="Computer Science">Computer Science</option>
            </select>
          </div>

          {/* Class */}
          <div>
            <label htmlFor="classGroup" className="block text-sm font-medium mb-1">
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

          {/* Email */}
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
              className={`w-full p-3 border rounded-lg focus:ring-2 ${
                emailVerified
                  ? "bg-gray-100 cursor-not-allowed border-gray-300"
                  : "border-gray-300 focus:ring-yellow-500"
              }`}
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
            {emailVerified && (
              <p className="text-green-500 text-sm mt-2">
                Email verified successfully! You cannot change it now.
              </p>
            )}
          </div>

          {/* OTP */}
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

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
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
  );
}
