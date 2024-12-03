import { getOtp, deleteOtp } from '@/utils/otpStore';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  if (!email || !otp) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const storedOtp = getOtp(email);

  console.log(storedOtp);

  if (storedOtp === otp) {
    deleteOtp(email);
    return NextResponse.json({ message: 'OTP verified successfully' }, { status: 200 });
  }

  return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 });
}
