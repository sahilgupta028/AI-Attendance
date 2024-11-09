// src/app/api/login-teacher/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectMongo from '../../../lib/mongodb';
import Teacher from '../../../models/Teacher';

export async function POST(req: Request) {
  const { userId, password } = await req.json();

  try {
    await connectMongo();

    console.log("MongoDB Connected");

    // Find the teacher by teacherId
    const teacher = await Teacher.findOne({ teacherId: userId });
    if (!teacher) {
      return NextResponse.json({ message: 'Teacher not found' }, { status: 404 });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, teacher.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // If login is successful, return teacher details
    return NextResponse.json({ message: 'Login successful', teacher }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}
