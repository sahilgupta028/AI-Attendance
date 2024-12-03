import { setOtp } from '@/utils/otpStore';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

let otpStore: { [key: string]: string } = {}; // Temporary in-memory store for OTPs

export async function POST(req: Request) {
  const { email } = await req.json();

  console.log(email);

  if (!email) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  setOtp(email, otp);

  // Create a transporter for sending emails
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sahil7e55gupta@gmail.com',
      pass: 'lqev gytf fgmi arlg', // You should use environment variables for sensitive data like this
    },
  });

  // Send OTP to the user's email
  try {
    await transporter.sendMail({
      from: 'sahil7e55gupta@gmail.com',
      to: email,
      subject: 'Your OTP for Verification',
      text: `Your OTP is: ${otp}`,
    });

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send otp' }, { status: 500 });
  }
}
