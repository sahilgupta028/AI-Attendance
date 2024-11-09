// src/app/api/login-student/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectMongo from '../../../lib/mongodb';
import Student from '../../../models/Student';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  try {
    await connectMongo();

    console.log("MongoDB Connected");

    // Check if the student exists
    const student = await Student.findOne({ username });
    if (!student) {
      return NextResponse.json({ message: 'Username not found' }, { status: 404 });
    }

    // Check if the password matches
    const isPasswordCorrect = await bcrypt.compare(password, student.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    // Successful login, return student ID for redirection
    return NextResponse.json({ message: 'Login successful', studentId: student._id }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}
