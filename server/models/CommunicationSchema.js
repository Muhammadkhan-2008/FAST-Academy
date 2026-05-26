const mongoose = require('mongoose');

// --- 💬 CHAT MESSAGE MODEL ---
const messageSchema = new mongoose.Schema({
  senderId: { type: String, required: true }, // Clerk ID
  senderName: String,
  text: { type: String, required: true },
  channel: { type: String, default: 'global' }, // 'global' or 'course_id' or 'direct_receiverId'
  timestamp: { type: Date, default: Date.now }
});

// --- 🎥 LIVE SESSION MODEL ---
const sessionSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  teacherId: { type: String, required: true },
  roomName: { type: String, required: true, unique: true }, // For Jitsi/Zoom
  isLive: { type: Boolean, default: false },
  startedAt: Date,
  endedAt: Date
});

module.exports = {
  User: mongoose.model('User', require('./UserSchema')), // Keep existing or split files
  Course: mongoose.model('Course', require('./CourseSchema')),
  Attendance: mongoose.model('Attendance', require('./AttendanceSchema')),
  Message: mongoose.model('Message', messageSchema),
  Session: mongoose.model('Session', sessionSchema)
};
