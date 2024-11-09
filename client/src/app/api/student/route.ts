import { NextResponse, NextRequest } from 'next/server';
import connectMongo from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import Student from '@/models/Student';

// Fetch students by classGroup
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const classGroup = url.searchParams.get('classGroup');

  if (!classGroup) {
    return NextResponse.json({ error: 'Class group is required' }, { status: 400 });
  }

  try {
    const students = await Student.find({ classGroup });
    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}