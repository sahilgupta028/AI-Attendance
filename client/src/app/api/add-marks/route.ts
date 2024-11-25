import { NextApiRequest, NextApiResponse } from 'next';
import Student from '@/models/Student'; // Assuming you have a Student model schema
import connectMongo from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';


connectMongo();

export async function POST(req: NextRequest) {
  try {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

    const { subjectName, marks, totalMarks } = await req.json();

    console.log({ id, subjectName, marks, totalMarks });

    // Validate the input
    if (!id || !subjectName || !marks || !totalMarks) {
        return NextResponse.json({ error: 'Invalid request parameters' }, { status: 400 });
    }

    console.log("Done1");

    // Fetch the student by ID
    const student = await Student.findById(id);
    if (!student) {
      return NextResponse.json({ error: 'Student Not found' }, { status: 400 });
    }

    console.log("Done2");

    // Find the subject from the student's subjects array
    const subject = student.subjects.find((subject: { subjectName: any; }) => subject.subjectName === subjectName);
    if (!subject) {
      return NextResponse.json({ error: 'Subject Not found' }, { status: 404 });
    }

    console.log("Done3");
    
    // Update the Marks and TotalMarks
    subject.Marks = marks;
    subject.TotalMarks = totalMarks;

    // Save the updated student document
    await student.save();

    return NextResponse.json({ message: 'Marks added successfully!' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Invalid request parameters' }, { status: 500 });
  }
};
