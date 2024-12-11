import connectMongo from '@/lib/mongodb';
import Student from '@/models/Student';
import fs from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

const capitalizeName = (string: string): string => {
  if (!string) return string;
  return string
    .trim() // Remove any extra spaces at the beginning or end
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

interface RecognitionResponse {
  name: string;
}

export async function POST(req: Request): Promise<Response> {
  try {

    await connectMongo();
    
    // Parse the request body
    const { image }: { image: string } = await req.json();

    if (!image) {
      console.error("Image data is missing.");
      return new Response(JSON.stringify({ error: "Image data is required" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Define the upload directory and create it if necessary
    const uploadDir = 'uploads';
    await fs.mkdir(uploadDir, { recursive: true });

    // Create a unique file name and path
    const fileName = `${Date.now()}.png`;
    const filePath = path.join(uploadDir, fileName);

    // Process base64 data and save as a file
    const base64Data = image.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');
    await fs.writeFile(filePath, buffer);

    // Send the image filename to the backend for recognition
    const response = await fetch('http://127.0.0.1:8000/recognize', {
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

    // Parse backend response
    const result: RecognitionResponse = await response.json();

    console.log(result);

    const name = capitalizeName(result.name) || "Unknown";

    console.log(name);

    const student = await Student.find({ name: new RegExp(`^${name}$`, 'i') });

    console.log(student);

    if (!student) {
      console.error("Student not found:", name);
      return new Response(JSON.stringify({ error: "Student not found" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log("Recognized student:", student);

    await fs.unlink(filePath);

    // Return the student data to the frontend
    return NextResponse.json(student, { status: 200 });
  } catch (error) {
    console.error("Error processing image:", error);
    return new Response(JSON.stringify({ error: "Failed to recognize face" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
