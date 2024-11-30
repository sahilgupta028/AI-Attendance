import { NextResponse, NextRequest } from 'next/server';
import connectMongo from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import Student from '@/models/Student';

// Fetch students by id
export async function GET(req: NextRequest) {
  connectMongo();
  
  const url = new URL(req.url);

  console.log(url);
  
  const id = url.searchParams.get('id');

  console.log(id);

  if (!id) {
    return NextResponse.json({ error: 'Td is required' }, { status: 400 });
  }

  try {
    const students = await Student.findById(id);
    console.log(students);

    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}