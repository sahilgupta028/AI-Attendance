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
                user: process.env.NEXT_PUBLIC_NODEMAILER_USER, // Your email address
                pass: process.env.NEXT_PUBLIC_NODEMAILER_PASS, // Your email password or app-specific password
            },
        });

        // Send emails to all low-attendance students
        await Promise.all(
            lowAttendanceStudents.map(async (student: Student) => {
                const { name, email } = student;

                const mailOptions = {
                    from: 'sahil7e55gupta@gmail.com',
                    to: email,
                    subject: 'Important Notice: Low Attendance Alert',
                    text: `Dear ${name},
We hope this message finds you well. We are reaching out to inform you that your current attendance percentage has fallen below the required threshold of 75%. Regular attendance is essential to ensure your academic success and maintain a consistent learning experience.
                
We encourage you to prioritize attending classes moving forward. Consistent participation will help you stay updated with the course material, engage effectively with your peers, and clarify any doubts in real-time.
                
If there are any challenges preventing you from attending classes, please do not hesitate to contact us. We are here to support you and help you overcome any difficulties.
                
Thank you for your attention to this matter. We are confident that with regular attendance, you can achieve your academic goals.
                
Best regards,
College Management`,
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
