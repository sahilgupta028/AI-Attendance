import Student from '@/models/Student';
import { NextResponse, NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    console.log(id);

    const { subjectName, status } = await req.json();

    console.log(subjectName);
    console.log(status);
  
    if (!id || !subjectName || !status) {
      return NextResponse.json({ error: 'Invalid request parameters' }, { status: 400 });
    }
  
    const updateField = status === 'present' ? 'totalPresent' : 'totalAbsent';
  
    try {
      const student = await Student.findOneAndUpdate(
        { _id: new ObjectId(id), "subjects.subjectName": subjectName },
        { $inc: { [`subjects.$.${updateField}`]: 1 } },
      );
  
      if (!student) {
        return NextResponse.json({ error: 'Student not found or update failed' }, { status: 404 });
      }
  
      return NextResponse.json(student, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to update attendance' }, { status: 500 });
    }
  }