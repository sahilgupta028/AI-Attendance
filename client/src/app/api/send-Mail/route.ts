import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

type Student = {
    name: string;
    email: string;
};

export async function POST(req: Request) {
    try {
        const { lowAttendanceStudents }: { lowAttendanceStudents: Student[] } = await req.json();

        if (!lowAttendanceStudents || !Array.isArray(lowAttendanceStudents)) {
            return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
        }

        // Configure the transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Replace with your email service provider
            auth: {
                user: 'sahil7e55gupta@gmail.com', // Your email address
                pass: 'lqev gytf fgmi arlg', // Your email password or app-specific password
            },
        });

        // Send emails to all low-attendance students
        await Promise.all(
            lowAttendanceStudents.map(async (student: Student) => {
                const { name, email } = student;

                const mailOptions = {
                    from: 'sahil7e55gupta@gmail.com',
                    to: email,
                    subject: 'Low Attendance Alert',
                    text: `Dear ${name}, your attendance percentage is below 75%. Please ensure to attend classes regularly.`,
                };

                await transporter.sendMail(mailOptions);
            })
        );

        return NextResponse.json({ message: 'Emails sent successfully!' });
    } catch (error) {
        console.error('Error sending emails:', error);
        return NextResponse.json({ error: 'Failed to send emails' }, { status: 500 });
    }
}
