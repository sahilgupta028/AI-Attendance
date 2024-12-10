import { setOtp } from '@/utils/otpStore';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

import { getRedisClient} from '@/lib/redis';


export async function POST(req: Request) {
  const { email } = await req.json();

  console.log(email);

  if (!email) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // setOtp(email, otp);

  const client = await getRedisClient();

    // Store OTP with an expiry time of 5 minutes
    await client.set(email, otp, { EX: 300 });

  // Create a transporter for sending emails
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NEXT_PUBLIC_NODEMAILER_USER,
      pass: process.env.NEXT_PUBLIC_NODEMAILER_PASS, // You should use environment variables for sensitive data like this
    },
  });

  // Send OTP to the user's email
  try {
    await transporter.sendMail({
      from: 'sahil7e55gupta@gmail.com',
      to: email,
      subject: 'Verification OTP for Your Account',
      text: `Dear User,
  
We have received a request to verify your account. To complete the verification process, please use the One-Time Password (OTP) provided below:
  
Your OTP: ${otp}
  
This OTP is valid for the next 5 minutes. Please do not share this code with anyone to ensure the security of your account.
  
If you did not initiate this request, please disregard this email or contact our support team immediately for assistance.
  
Thank you for choosing our service!
  
Best regards,  
College Management`,
  });
  

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send otp' }, { status: 500 });
  }
}
