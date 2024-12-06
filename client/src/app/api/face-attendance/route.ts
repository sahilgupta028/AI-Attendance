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

    const currentDate = new Date();
    const options = {
      timeZone: 'America/New_York', // US Eastern Time
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);

    // Update query
    const student = await Student.findOneAndUpdate(
      { "name" : name, "subjects.subjectName": subjectName },
      {
        $inc: { [`subjects.$.${updateField}`]: 1 },
        $push: { 
            "subjects.$.Date": {
                date: formattedDate,
                status: 'present',
            }
        }
    },
    { new: true } // Return the updated document
    );

    console.log(student);

    if (!student) {
      return NextResponse.json({ error: 'Student not found or update failed' }, { status: 404 });
    }

    const subject = student.subjects.find((subject: any) => subject.subjectName === subjectName);
    if (subject) {
      const totalAbsent = subject.totalAbsent || 0;
      const totalPresent = subject.totalPresent || 0;

      // If totalAbsent > 0 to avoid division by zero
      if (totalAbsent > 0) {
        const percentage = (totalPresent / ( totalPresent + totalAbsent)) * 100;

        // Update the percentage field in the subject object
        subject.percentage = percentage.toFixed(2);

        // Save the updated student document
        await student.save();
      }
    }

    // Log the updated student for debugging
    console.log('Updated Student:', student);

    return NextResponse.json(student, { status: 200 });
  } catch (error) {
    console.error('Error updating student attendance:', error);
    return NextResponse.json({ error: 'Failed to update attendance' }, { status: 500 });
  }
}
