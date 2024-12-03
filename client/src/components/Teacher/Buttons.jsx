"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

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
            // Send the lowAttendanceStudents data to the backend
            const response = await fetch('/api/send-Mail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ lowAttendanceStudents }),
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

    return (
        <div className="flex justify-center space-x-4 p-6">
            <button
                onClick={() =>
                    router.push(
                        `/face-attendance?id=${id}&classGroup=${teacherDetails?.classGroup}&subject=${teacherDetails?.subject}`
                    )
                }
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
