// app/api/send-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body
    const { students }: { students: { name: string; email: string }[] } = await req.json();

    const print = resend.domains.list();

    console.log("Domain :" ,print);

    // Send emails to each student
    await Promise.all(
      students.map(async (student) => {
        const { name, email } = student; // Destructure student details

        // Sending the email
        const { data, error } = await resend.emails.send({
          from: 'onboarding@resend.dev', // Your verified sender email
          to: [email], // Send to the student's email
          subject: 'Attendance Notification',
          html: `<p>Dear ${name},</p><p>Your attendance percentage is below 75%. Please ensure to attend classes regularly.</p>`, // Personalize the email
        });

        // Handle any errors in sending the email
        if (error) {
          console.error(`Error sending email to ${name}:`, error);
          throw new Error(`Failed to send email to ${name}`);
        }

        console.log(`Email sent to ${name}:`, data); // Log success for each email sent
      })
    );

    return NextResponse.json({ message: 'Emails sent successfully!' });
  } catch (error) {
    console.error('Error sending emails:', error);
    return NextResponse.json({ error: 'Failed to send emails' }, { status: 500 });
  }
}
