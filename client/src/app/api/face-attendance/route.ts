import connectMongo from '@/lib/mongodb';
import Student from '@/models/Student';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {

    connectMongo();

    const url = new URL(req.url);
    const name = url.searchParams.get('name');
    const subjectName = url.searchParams.get('subject');
    const classGroup = url.searchParams.get('classGroup'); // Optional

    // Log input parameters for debugging
    console.log({ name, subjectName, classGroup });

    if (!name || !subjectName) {
      return NextResponse.json({ error: 'Missing required parameters: name or subject' }, { status: 400 });
    }

    const updateField = 'totalPresent';

    // Update query
    const student = await Student.findOneAndUpdate(
      { "name" : name, "subjects.subjectName": subjectName },
      { $inc: { [`subjects.$.totalPresent`]: 1 } },
      { new: true }
    );

    console.log(student);

    if (!student) {
      return NextResponse.json({ error: 'Student not found or update failed' }, { status: 404 });
    }

    // Log the updated student for debugging
    console.log('Updated Student:', student);

    return NextResponse.json(student, { status: 200 });
  } catch (error) {
    console.error('Error updating student attendance:', error);
    return NextResponse.json({ error: 'Failed to update attendance' }, { status: 500 });
  }
}
