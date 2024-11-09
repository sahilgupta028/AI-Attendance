import Student from '@/models/Student';
import { NextResponse, NextRequest } from 'next/server';

// Utility function to capitalize the first letter of a string
const capitalizeFirstLetter = (string : String) => {
  if (!string) return string; // Return as-is if the string is empty or undefined
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase(); // Capitalize first letter and lowercase the rest
};

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const name = url.searchParams.get('name');
  const subjectName = url.searchParams.get('subject');
  const classGroup = url.searchParams.get('classGroup');

  console.log(subjectName);

  if (!subjectName) {
    return NextResponse.json({ error: 'Invalid request parameters' }, { status: 400 });
  }

  const updateField = 'totalPresent';

  try {
    const student = await Student.findOneAndUpdate(
      { name, "subjects.subjectName": subjectName },
      { $inc: { [`subjects.$.${updateField}`]: 1 } },

    );

    if (!student) {
      return NextResponse.json({ error: 'Student not found or update failed' }, { status: 404 });
    }

    return NextResponse.json(student, { status: 200 });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ error: 'Failed to update attendance' }, { status: 500 });
  }
}
