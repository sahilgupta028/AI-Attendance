import { NextResponse, NextRequest } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Student from '@/models/Student';
import Teacher from '@/models/Teacher';

// Fetch students by id
export async function GET(req: NextRequest) {
  await connectMongo(); // Ensure the database is connected

  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Class group is required' }, { status: 400 });
  }

  try {
    const teacher = await Teacher.findById(id); // Ensure query execution
    return NextResponse.json(teacher, { status: 200 });
  } catch (error) {
    console.error('Error fetching teacher:', error);
    return NextResponse.json({ error: 'Failed to fetch teacher' }, { status: 500 });
  }
}
