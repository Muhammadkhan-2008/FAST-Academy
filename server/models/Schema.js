const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  fastId: { type: String, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['ceo', 'teacher', 'student'], default: 'student' },
  status: { type: String, enum: ['pending', 'active', 'suspended'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  teacherId: { type: String, required: true },
  students: [{ type: String }],
  schedule: String,
  syllabus: String,
  resources: [{ 
    title: String, 
    type: { type: String, enum: ['pdf', 'video', 'link', 'assignment'], default: 'pdf' },
    url: String, 
    dateAdded: { type: Date, default: Date.now } 
  }],
  isActive: { type: Boolean, default: true }
});

const attendanceSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  studentId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['present', 'absent'], default: 'present' },
  duration: Number
});

const messageSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  senderName: String,
  text: { type: String, required: true },
  channel: { type: String, default: 'global' },
  timestamp: { type: Date, default: Date.now }
});

const sessionSchema = new mongoose.Schema({
  courseId: { type: String },
  teacherId: { type: String, required: true },
  roomName: { type: String, required: true },
  isLive: { type: Boolean, default: false },
  startedAt: Date
});

const applicationSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Clerk User ID
  name: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, enum: ['scholarship', 'course_enrollment'], required: true },
  targetId: { type: String }, // e.g. Course ID or Scholarship Type
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  formData: { type: Object, required: true }, // Store dynamic form fields
  submittedAt: { type: Date, default: Date.now }
});

module.exports = {
  User: mongoose.model('User', userSchema),
  Course: mongoose.model('Course', courseSchema),
  Attendance: mongoose.model('Attendance', attendanceSchema),
  Message: mongoose.model('Message', messageSchema),
  Session: mongoose.model('Session', sessionSchema),
  Application: mongoose.model('Application', applicationSchema)
};
