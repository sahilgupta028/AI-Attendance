import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectMongo from '../../../lib/mongodb';
import Student from '../../../models/Student';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const capitalizeName = (string: string): string => {
  if (!string) return string;
  return string
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export async function POST(req: Request) {
  const { photo, name, email, password, classGroup } = await req.json();

  try {
    await connectMongo();
    console.log("MongoDB Connected");

    const existingName = await Student.findOne({ name, classGroup });
    if (existingName) {
      return NextResponse.json({ message: 'You are already registered' }, { status: 400 });
    }

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return NextResponse.json({ message: 'Student already registered' }, { status: 400 });
    }

    if (!photo || !photo.startsWith('data:image')) {
      console.error("Invalid or missing image data.");
      return new Response(JSON.stringify({ error: "Invalid image data" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const profile = capitalizeName(name);

    const uploadDir = 'uploads';
    await fs.mkdir(uploadDir, { recursive: true });

    // Extract the base64 portion of the image data
    const base64Data = photo.split(',')[1];
    const fileExtension = 'jpg';
    const fileName = `${profile}.${fileExtension}`;
    const filePath = path.join(uploadDir, fileName);

    // Convert the base64 string to a buffer and save it
    const buffer = Buffer.from(base64Data, 'base64');
    await fs.writeFile(filePath, buffer);


    const response = await fetch('http://127.0.0.1:8000/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName }),
    });

    if (!response.ok) {
      console.error("Backend recognition failed:", response.statusText);
      return new Response(JSON.stringify({ error: "Failed to process image in backend" }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }


    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const username = `${name.replace(/\s+/g, '').toLowerCase()}${randomSuffix}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new Student({
      name: profile,
      email,
      password: hashedPassword,
      classGroup,
      username,
    });

    await student.save();

    return NextResponse.json({ message: 'Student registered successfully', username }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}
