import Student from '@/models/Student';
import { NextResponse, NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    const { subjectName, status } = await req.json();

    if (!id || !subjectName || !status) {
      return NextResponse.json({ error: 'Invalid request parameters' }, { status: 400 });
    }

    const updateField = status === 'present' ? 'totalPresent' : 'totalAbsent';

    try {
      // Fetch the student and update attendance
      const student = await Student.findOneAndUpdate(
        { _id: new ObjectId(id), "subjects.subjectName": subjectName },
        { $inc: { [`subjects.$.${updateField}`]: 1 } },
        { new: true } // Return the updated document
      );

      if (!student) {
        return NextResponse.json({ error: 'Student not found or update failed' }, { status: 404 });
      }

      // Find the updated subject data
      const subject = student.subjects.find((subj: { subjectName: any; }) => subj.subjectName === subjectName);
      if (!subject) {
        return NextResponse.json({ error: 'Subject not found' }, { status: 404 });
      }

      // Calculate total classes and attendance percentage
      const totalClasses = subject.totalPresent + subject.totalAbsent;
      const percentage = totalClasses > 0 ? ((subject.totalPresent / totalClasses) * 100).toFixed(2) : '0';

      // Update the subject's percentage
      await Student.updateOne(
        { _id: new ObjectId(id), "subjects.subjectName": subjectName },
        { $set: { "subjects.$.percentage": percentage } }
      );

      // Return the updated subject with percentage
      return NextResponse.json({ ...subject.toObject(), percentage }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to update attendance' }, { status: 500 });
    }
}
