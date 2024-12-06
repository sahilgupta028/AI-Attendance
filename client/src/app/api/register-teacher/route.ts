// src/app/api/register-teacher/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid'; // Import UUID
import connectMongo from '../../../lib/mongodb';
import Teacher from '../../../models/Teacher';

const capitalizeName = (string: string): string => {
  if (!string) return string;
  return string
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export async function POST(req: Request) {
  const { name, subject, classGroup, email, password } = await req.json();

  try {
    await connectMongo();

    console.log("MongoDB Connected");

    const existingClass = await Teacher.findOne({ subject, classGroup });
    if (existingClass) {
      return NextResponse.json({ message: 'Teacher already exists with this subject and class' }, { status: 400 });
    }

    // Check if the teacher already exists
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return NextResponse.json({ message: 'Teacher already registered' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit random number
    const id = `${name.replace(/\s+/g, '').toLowerCase()}${randomSuffix}`;

    const pname = capitalizeName(name);

    // Create a new teacher document with a unique teacherId
    const teacher = new Teacher({
      teacherId: id,
      name: pname,
      subject,
      classGroup,
      email,
      password: hashedPassword,
    });

    console.log(teacher);

    // Save to MongoDB
    await teacher.save();

    return NextResponse.json({ message: 'Teacher registered successfully',  id: id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}
