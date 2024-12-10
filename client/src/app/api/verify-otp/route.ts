import connectMongo from '@/lib/mongodb';
import { getRedisClient } from '@/lib/redis'; // Utility to initialize Redis client
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Connect to MongoDB
    await connectMongo();

    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    console.log(`Verifying OTP for email: ${email}, OTP: ${otp}`);

    // Initialize Redis client
    const redisClient = await getRedisClient();

    // Retrieve the OTP from Redis
    const storedOtp = await redisClient.get(email);

    console.log(`Stored OTP for ${email}: ${storedOtp}`);

    if (!storedOtp) {
      return NextResponse.json({ message: 'OTP expired or not found' }, { status: 400 });
    }

    if (storedOtp === otp) {
      // Delete OTP after successful verification
      await redisClient.del(email);

      return NextResponse.json({ message: 'OTP verified successfully' }, { status: 200 });
    }

    return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
