// models/Student.js

import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  subjectName: { type: String, required: true },
  totalPresent: { type: Number, default: 0 },
  totalAbsent: { type: Number, default: 0 },
  Marks: { type: Number, default: 0},
  TotalMarks: { type: Number, default: 0},
  percentage: { type: Number, default: 0}
});

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  classGroup: { type: String, required: true, enum: ['CS1', 'CS2', 'CS3'] },
  subjects: {
    type: [subjectSchema],
    default: [
      { subjectName: 'Mathematics' },
      { subjectName: 'Science' },
      { subjectName: 'English' },
      { subjectName: 'History' },
      { subjectName: 'Geography' },
      { subjectName: 'Computer Science' },
    ],
  },
});

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);
export default Student;
