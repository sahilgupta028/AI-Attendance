import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { email, username } = await req.json();

        console.log(username);

        console.log(email);

        if (!username || !email) {
            return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.NEXT_PUBLIC_NODEMAILER_USER,
              pass: process.env.NEXT_PUBLIC_NODEMAILER_PASS, // You should use environment variables for sensitive data like this
            },
          });
        
            await transporter.sendMail({
              from: 'sahil7e55gupta@gmail.com',
              to: email,
              subject: 'Account Creation: Your Unique Username',
              text: `Hello,
  
Thank you for registering with us! We are excited to have you as part of our community.
  
Your unique username has been generated successfully. Please use the following username to log in to your account:
  
Your Username: ${username}
  
This username is your key to accessing your profile and all available services. Please keep it secure and do not share it with anyone to ensure the security of your account.
  
If you did not register or request an account, please disregard this email or contact our support team immediately.
  
We look forward to your active participation.
  
Best regards,  
College Management Team`,
          });

        return NextResponse.json({ message: 'Emails sent successfully!' });
    } catch (error) {
        console.error('Error sending emails:', error);
        return NextResponse.json({ error: 'Failed to send emails' }, { status: 500 });
    }
}
