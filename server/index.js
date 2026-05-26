const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Routes
const courseRoutes = require('./routes/courses');
const aiRoutes = require('./routes/ai');

const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

// --- 🌐 CORS CONFIGURATION (MUST BE FIRST) ---
app.use(cors({
  origin: ['http://localhost:5777', 'http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5777', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// --- 🛡️ SECURITY MIDDLEWARE ---
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(morgan('dev'));
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 2000,
  message: { error: 'Too many requests. Please try again later.' }
});
app.use('/api/', limiter);

// --- 🌐 DATABASE CONNECTION ---
const MONGODB_URI = process.env.MONGODB_URI;
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err.message));
} else {
  console.warn('⚠️ MONGODB_URI not set - running without database');
}

// --- 🚦 API ROUTES ---
app.use('/api/courses', courseRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin/courses', courseRoutes);

// --- 👑 USER SYNC ---
const { User, Message, Session, Course, Application } = require('./models/Schema');

app.post('/api/auth/sync', async (req, res) => {
  const { clerkId, name, email, role } = req.body;
  console.log('🔄 Sync Request:', { clerkId, email, role });
  
  try {
    let user = await User.findOne({ clerkId });
    if (!user) {
      console.log('✨ Creating new user profile...');
      const fastId = 'FST-' + Math.floor(1000 + Math.random() * 9000);
      user = new User({ 
        clerkId, 
        fastId,
        name, 
        email, 
        role, 
        status: 'active'
      });
      await user.save();
      
      // Auto-enroll student in first available course
      if (role === 'student') {
        let firstCourse = await Course.findOne();
        if (!firstCourse) {
          firstCourse = new Course({
            name: 'FAST Core: Full Stack Development',
            description: 'Comprehensive full-stack development program covering React, Node.js, databases, and deployment.',
            teacherId: 'system_core',
            students: [clerkId],
            category: 'Engineering',
            duration: '16 Weeks',
            price: 299,
            level: 'Intermediate',
            schedule: 'Monday - Friday (09:00 - 12:00)',
            syllabus: 'React | Node.js | MongoDB | Deployment',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop'
          });
          await firstCourse.save();
        } else if (!firstCourse.students.includes(clerkId)) {
          firstCourse.students.push(clerkId);
          await firstCourse.save();
        }
        // Add to enrolledCourses on user
        if (!user.enrolledCourses.includes(firstCourse._id.toString())) {
          user.enrolledCourses.push(firstCourse._id.toString());
          await user.save();
        }
      }
    }
    res.json(user);
  } catch (err) { 
    console.error('❌ Sync Error:', err.message);
    res.status(500).json({ error: 'Sync Failed', details: err.message });
  }
});

// --- 💬 CHAT API ---
app.get('/api/chat/:channel', async (req, res) => {
  try {
    const messages = await Message.find({ channel: req.params.channel })
      .sort({ timestamp: 1 })
      .limit(100);
    res.json(messages);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/chat', async (req, res) => {
  try {
    const { senderId, senderName, text, channel } = req.body;
    if (!senderId || !text) return res.status(400).json({ error: 'senderId and text are required' });
    const msg = new Message({ senderId, senderName, text, channel: channel || 'global' });
    await msg.save();
    res.status(201).json(msg);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- 📘 COURSE ENROLLMENT ---
app.post('/api/courses/enroll', async (req, res) => {
  const { courseId, studentId } = req.body;
  if (!courseId || !studentId) return res.status(400).json({ error: 'courseId and studentId required' });
  try {
    const student = await User.findOne({ clerkId: studentId });
    if (!student) return res.status(404).json({ error: 'Student not found.' });

    if (!student.enrolledCourses) student.enrolledCourses = [];
    if (!student.enrolledCourses.includes(courseId)) {
      student.enrolledCourses.push(courseId);
      await student.save();
    }

    // Also add student to Course.students array
    const course = await Course.findById(courseId);
    if (course && !course.students.includes(studentId)) {
      course.students.push(studentId);
      await course.save();
    }

    res.json({ success: true, message: 'Enrollment successful.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 🎥 SESSIONS API ---
app.post('/api/sessions/start', async (req, res) => {
  try {
    const { roomName, teacherId, courseId } = req.body;
    if (!roomName || !teacherId) return res.status(400).json({ error: 'roomName and teacherId required' });

    let session = await Session.findOne({ roomName });
    if (!session) {
      session = new Session({ roomName, teacherId, courseId: courseId || null, isLive: true, startedAt: new Date() });
      await session.save();
    } else {
      session.isLive = true;
      session.startedAt = new Date();
      await session.save();
    }
    res.status(201).json(session);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/sessions/end', async (req, res) => {
  try {
    const { roomName } = req.body;
    if (!roomName) return res.status(400).json({ error: 'roomName required' });
    await Session.findOneAndUpdate({ roomName }, { isLive: false, endedAt: new Date() });
    res.json({ success: true, message: 'Session ended.' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/sessions/active', async (req, res) => {
  try {
    const sessions = await Session.find({ isLive: true });
    res.json(sessions);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- 📁 RESOURCE PURCHASE ---
app.post('/api/resources/purchase', async (req, res) => {
  const { resourceId, studentId } = req.body;
  try {
    const student = await User.findOne({ clerkId: studentId });
    if (!student) return res.status(404).json({ error: 'Student not found.' });

    if (!student.metadata) student.metadata = {};
    if (!student.metadata.purchases) student.metadata.purchases = [];
    if (!student.metadata.purchases.includes(resourceId)) {
      student.metadata.purchases.push(resourceId);
    }
    student.markModified('metadata');
    await student.save();
    res.json({ success: true, message: 'Resource access granted.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 🧠 FAST AI (OpenRouter Proxy) ---
app.post('/api/fast-ai/query', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt is required.' });

    if (!process.env.OPENROUTER_API_KEY) {
      // Fallback response when no API key
      return res.json({ 
        response: `[FAST AI] I'm here to help! You asked: "${prompt}". For a complete AI response, please configure the OPENROUTER_API_KEY in the server environment.`
      });
    }

    const aiResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemini-flash-1.5",
        "messages": [
          {
            "role": "system",
            "content": "You are FAST AI, the institutional intelligence of FAST Institute (Future Advance Science and Technology). Address the user as 'Scholar'. Be helpful, knowledgeable about technology, programming, and academia. Keep responses concise and educational."
          },
          { "role": "user", "content": prompt }
        ]
      })
    });

    if (!aiResponse.ok) {
      const errBody = await aiResponse.json().catch(() => ({}));
      console.error('OpenRouter Error:', errBody);
      return res.status(502).json({ error: 'AI service temporarily unavailable.' });
    }

    const data = await aiResponse.json();
    if (data.choices && data.choices[0]) {
      res.json({ response: data.choices[0].message.content });
    } else {
      res.status(502).json({ error: 'Invalid AI response format.' });
    }
  } catch (err) { 
    console.error('FAST AI Error:', err);
    res.status(500).json({ error: 'AI service error.' }); 
  }
});

// --- 🔬 LABS API ---
app.get('/api/labs', async (req, res) => {
  try {
    const labs = [
      { id: 'lab-neural', title: 'Neural Sandbox Alpha', status: 'Available', description: 'Interactive neural network playground with live visualization.' },
      { id: 'lab-fullstack', title: 'Full-Stack Container', status: 'Available', description: 'Pre-configured Docker environment for web architecture labs.' },
      { id: 'lab-crypto', title: 'Quantum Crypto Lab', status: 'Maintenance', description: 'Quantum cryptography simulation environment.' }
    ];
    res.json(labs);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- 🎓 APPLICATIONS API ---
app.post('/api/applications', ClerkExpressWithAuth(), async (req, res) => {
  try {
    const { userId, name, email, type, targetId, formData } = req.body;
    
    if (req.auth.userId !== userId) {
      return res.status(403).json({ error: 'Identity mismatch.' });
    }
    if (!userId || !email || !type) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const application = new Application({ userId, name, email, type, targetId, formData });
    await application.save();
    res.status(201).json({ message: 'Application submitted successfully.', applicationId: application._id });
  } catch (err) { 
    res.status(500).json({ error: 'Failed to process application.' }); 
  }
});

app.get('/api/applications/:userId', ClerkExpressWithAuth(), async (req, res) => {
  try {
    if (req.auth.userId !== req.params.userId) {
      return res.status(403).json({ error: 'Unauthorized.' });
    }
    const apps = await Application.find({ userId: req.params.userId }).sort({ submittedAt: -1 });
    res.json(apps);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- 📊 STATS API ---
app.get('/api/stats', async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student', status: 'active' });
    const totalTeachers = await User.countDocuments({ role: 'teacher', status: 'active' });
    const activeCourses = await Course.countDocuments({ isActive: true });
    const pendingVerifications = await User.countDocuments({ status: 'pending' });
    res.json({ totalStudents, totalTeachers, activeCourses, pendingVerifications });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- 🛡️ ADMIN USER MANAGEMENT ---
app.get('/api/admin/users', async (req, res) => {
  try {
    const status = req.query.status;
    const query = status ? { status } : {};
    const users = await User.find(query).sort({ createdAt: -1 });
    res.json(users);
  } catch (err) { 
    res.status(500).json({ error: 'Failed to fetch users' }); 
  }
});

app.post('/api/admin/verify', async (req, res) => {
  try {
    const { userId, action } = req.body;
    if (!userId || !action) return res.status(400).json({ error: 'Missing userId or action' });

    const validActions = ['approve', 'reject', 'suspend'];
    if (!validActions.includes(action)) return res.status(400).json({ error: 'Invalid action' });

    const statusMap = { approve: 'active', reject: 'suspended', suspend: 'suspended' };
    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      { status: statusMap[action] }, 
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.json({ message: `User ${action}d successfully`, user: updatedUser });
  } catch (err) { 
    res.status(500).json({ error: 'Failed to verify user' }); 
  }
});

// --- 🛡️ CENTRALIZED ERROR HANDLER ---
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]:', err.stack);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'production' ? 'An error occurred.' : err.message
  });
});

app.listen(PORT, () => {
  console.log(`🚀 FAST Server running on port ${PORT}`);
});
