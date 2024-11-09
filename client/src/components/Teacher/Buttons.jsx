"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast'; 
import emailjs from '@emailjs/browser';

const Buttons = ({ params, lowAttendanceStudents }) => {
    const router = useRouter();
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

    const sendEmails = async () => {

        toast.loading("Loading");

        try {
            // Send emails to each student with low attendance
            await Promise.all(lowAttendanceStudents.map(async (student) => {
                const { name, email } = student; // Assuming student has name and email fields

                console.log(name, email);

                await emailjs.send(
                    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
                    {
                        from_name: name,
                        to_name: "Attendance Manager",
                        from_email: email,
                        to_email: "sahilgupta11543@gmail.com",
                        message: `Dear ${name}, your attendance percentage is below 75%. Please ensure to attend classes regularly.`,
                    },
                    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
                );
            }));

            toast.dismiss();

            toast.success("Emails sent successfully! 😃"); // Success toast
        } catch (error) {
            console.error('EmailJS error:', error);
            toast.error("Something went wrong. Please try again."); // Error toast
        }
    };

    return (
        <div className="flex justify-center space-x-4 p-6">
            <button
                onClick={() => router.push(`/face-attendance?id=${id}&classGroup=${teacherDetails?.classGroup}&subject=${teacherDetails?.subject}`)}
                className="px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-500 hover:to-blue-700 transition duration-300 ease-in-out"
            >
                Mark Attendance by Face
            </button>
            <button
                onClick={sendEmails} // Trigger sendEmails on click
                className="px-6 py-3 bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold rounded-lg shadow-lg hover:from-red-500 hover:to-red-700 transition duration-300 ease-in-out"
            >
                Send Mail to Defaulter
            </button>
        </div>
    );
};

export default Buttons;
