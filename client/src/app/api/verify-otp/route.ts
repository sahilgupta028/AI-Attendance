import connectMongo from '@/lib/mongodb';
import { getOtp, deleteOtp } from '@/utils/otpStore';
import { connect } from 'http2';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {

  await connectMongo();

  const { email, otp } = await req.json();

  console.log(email);

  console.log(otp);

  if (!email || !otp) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const storedOtp = await getOtp(email);

  console.log('Stored OTP: ', storedOtp);

  if (storedOtp === otp) {
    deleteOtp(email);
    return NextResponse.json({ message: 'OTP verified successfully' }, { status: 200 });
  }

  return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 });
}
