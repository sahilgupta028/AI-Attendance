// src/app/api/register-student/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectMongo from '../../../lib/mongodb';
import Student from '../../../models/Student';

export async function POST(req: Request) {
  const { name, email, password, classGroup } = await req.json();

  try {
    await connectMongo();

    console.log("MongoDB Connected");

    // Check if the student email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return NextResponse.json({ message: 'Student already registered' }, { status: 400 });
    }

    // Generate a unique username based on the student's name
    const randomSuffix = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit random number
    const username = `${name.replace(/\s+/g, '').toLowerCase()}${randomSuffix}`;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new student document
    const student = new Student({
      name,
      email,
      password: hashedPassword,
      classGroup,
      username,
    });

    console.log(student);

    // Save to MongoDB
    await student.save();

    return NextResponse.json({ message: 'Student registered successfully', username }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}
