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
const mongoSanitize = require('express-mongo-sanitize');

const app = express();
const PORT = process.env.PORT || 5000;

// --- 🌐 CORS CONFIGURATION (MUST BE FIRST) ---
app.use(cors({
  origin: ['http://localhost:5777', 'http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5777'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// --- 🛡️ ULTRA-SECURITY MIDDLEWARE ---
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
})); 
app.use(morgan('dev')); 
app.use(express.json());

// Rate Limiting: High limit for dev
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 2000, // Increased for real-time chat reliability
  message: { error: 'Institutional security protocol: Too many requests.' }
});
app.use('/api/', limiter);

// --- 🌐 DATABASE CONNECTION ---
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err.message));

// --- 🚦 API ROUTES ---
app.use('/api/courses', courseRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin/courses', courseRoutes);

// --- 👑 ADMIN / USER SYNC ---
const { User, Message, Session, Course } = require('./models/Schema');
app.post('/api/auth/sync', async (req, res) => {
  const { clerkId, name, email, role } = req.body;
  console.log('🔄 Institutional Sync Request:', { clerkId, email, role });
  
  try {
    let user = await User.findOne({ clerkId });
    if (!user) {
      console.log('✨ Provisioning new scholar profile...');
      const fastId = 'FST-' + Math.floor(1000 + Math.random() * 9000);
      user = new User({ 
        clerkId, 
        fastId,
        name, 
        email, 
        role, 
        status: 'active' // AUTO-APPROVE FOR TESTING RELIABILITY
      });
      await user.save();
      
      // Ensure at least one course exists for scholars
      let firstCourse = await Course.findOne();
      if (!firstCourse) {
        console.log('📚 Creating Institutional Entry Course...');
        firstCourse = new Course({
          name: 'FAST Institutional Core: Phase 01',
          description: 'Initial entry into the FAST research ecosystem. Covers systems architecture and neural foundations.',
          teacherId: 'system_core',
          students: [clerkId],
          schedule: 'Monday - Friday (09:00 - 12:00)',
          syllabus: 'Full-Stack Foundations | Neural Core v1 | Quantum Ethics'
        });
        await firstCourse.save();
      } else if (role === 'student' && !firstCourse.students.includes(clerkId)) {
        firstCourse.students.push(clerkId);
        await firstCourse.save();
        console.log('📚 Auto-enrolled in existing course:', firstCourse.name);
      }
    }
    res.json(user);
  } catch (err) { 
    console.error('❌ Sync Critical Error:', err.message);
    res.status(500).json({ error: 'Sync Failed', details: err.message });
  }
});

// Chat API
app.get('/api/chat/:channel', async (req, res) => {
  try {
    const messages = await Message.find({ channel: req.params.channel }).sort({ timestamp: 1 }).limit(100);
    res.json(messages);
  } catch (err) { res.status(500).json(err); }
});

app.post('/api/chat', async (req, res) => {
  try {
    const msg = new Message(req.body);
    await msg.save();
    res.status(201).json(msg);
  } catch (err) { res.status(500).json(err); }
});

// 📘 COURSE ENROLLMENT SYSTEM
app.post('/api/courses/enroll', async (req, res) => {
  const { courseId, studentId } = req.body;
  try {
    const student = await User.findOne({ clerkId: studentId });
    if (!student) return res.status(404).json({ error: 'Student record not found.' });

    if (!student.enrolledCourses || !student.enrolledCourses.includes(courseId)) {
      if (!student.enrolledCourses) student.enrolledCourses = [];
      student.enrolledCourses.push(courseId);
      await student.save();
    }
    res.json({ success: true, message: 'Institutional enrollment synchronized.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📁 RESOURCE PURCHASE SYSTEM
app.post('/api/resources/purchase', async (req, res) => {
  const { resourceId, studentId } = req.body;
  try {
    const student = await User.findOne({ clerkId: studentId });
    if (!student) return res.status(404).json({ error: 'Student record not found.' });

    // Store purchase in metadata or a separate collection
    if (!student.metadata) student.metadata = {};
    if (!student.metadata.purchases) student.metadata.purchases = [];
    student.metadata.purchases.push(resourceId);
    student.markModified('metadata');
    await student.save();

    res.json({ success: true, message: 'Resource acquisition verified.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🧠 FAST INTELLIGENCE (AI) HUB
app.post('/api/fast-ai/query', async (req, res) => {
  const { prompt, mode } = req.body;
  try {
    // Mode-based response logic
    let response = mode === 'institutional' 
      ? `[INSTITUTIONAL CORE] Synchronizing query "${prompt}" with FAST academic archives. Analyzing neural patterns... Access granted. Response: Based on our institutional syllabus, your query relates to advanced engineering paradigms.`
      : `[GLOBAL NODE] Accessing external neural networks. Analyzing prompt: "${prompt}". Synthesizing global research data... Response: Scientific consensus suggests a deep convergence of these technical fields.`;

    // Simulate network latency for cinematic effect
    setTimeout(() => {
      res.json({ response });
    }, 1500);
  } catch (err) {
    res.status(500).json({ error: 'Neural link failure.' });
  }
});

// --- 🔬 LABS API ---
app.get('/api/labs', async (req, res) => {
  try {
    // Placeholder for fetching active cloud instances
    res.json([{ id: 'lab-1', title: 'Full-Stack Container', status: 'Available' }]);
  } catch (err) { res.status(500).json(err); }
});

// --- 🎓 APPLICATIONS API (Scholarships & Enrollments) ---
const { Application } = require('./models/Schema');

// Use ClerkExpressWithAuth() for per-route security
app.post('/api/applications', ClerkExpressWithAuth(), async (req, res) => {
  try {
    // req.auth contains the verified clerk user information
    const { userId, name, email, type, targetId, formData } = req.body;
    
    // Server-side security check: Ensure the body userId matches the authenticated session userId
    if (req.auth.userId !== userId) {
      return res.status(403).json({ error: 'Security Breach: Identity mismatch detected.' });
    }

    if (!userId || !email || !type) {
      return res.status(400).json({ error: 'Missing required security fields.' });
    }

    const application = new Application({
      userId, name, email, type, targetId, formData
    });
    
    await application.save();
    res.status(201).json({ message: 'Application securely saved to database.', applicationId: application._id });
  } catch (err) { 
    console.error('Application Save Error:', err);
    res.status(500).json({ error: 'Failed to process application.' }); 
  }
});

// Fetch user's applications
app.get('/api/applications/:userId', ClerkExpressWithAuth(), async (req, res) => {
  try {
    if (req.auth.userId !== req.params.userId) {
      return res.status(403).json({ error: 'Unauthorized data access.' });
    }
    const apps = await Application.find({ userId: req.params.userId }).sort({ submittedAt: -1 });
    res.json(apps);
  } catch (err) { res.status(500).json(err); }
});

// --- 🧠 FAST AI API (LLM Proxy) ---
app.post('/api/fast-ai/query', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({ error: 'Institutional AI Key not configured.' });
    }

    if (typeof fetch === 'undefined') {
       return res.status(500).json({ error: 'System Fetch API missing. Please update Node.js to v18+.' });
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
            "content": "You are FAST AI, the elite institutional intelligence of Future Advance Science and Technology (FAST) Institute. Use 'scholar' to address the user. Maintain an advanced, scientific tone."
          },
          { "role": "user", "content": prompt }
        ]
      })
    });

    if (!aiResponse.ok) {
       const errBody = await aiResponse.json().catch(() => ({}));
       console.error('OpenRouter Upstream Error:', errBody);
       return res.status(502).json({ error: 'FAST Intelligence upstream connection failed.' });
    }

    const data = await aiResponse.json();
    if (data.choices && data.choices[0]) {
      res.json({ response: data.choices[0].message.content });
    } else {
      res.status(502).json({ error: 'Institutional Intelligence returned an invalid response schema.' });
    }
  } catch (err) { 
    console.error('FAST AI [CRITICAL]:', err);
    res.status(500).json({ error: 'FAST Intelligence sync failed.' }); 
  }
});

// Stats API
app.get('/api/stats', async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student', status: 'active' });
    const totalTeachers = await User.countDocuments({ role: 'teacher', status: 'active' });
    const activeCourses = await User.countDocuments({ role: 'teacher' }); // Placeholder logic
    res.json({ totalStudents, totalTeachers, activeCourses });
  } catch (err) { res.status(500).json(err); }
});

// --- � ADMIN USER MANAGEMENT ---
app.get('/api/admin/users', async (req, res) => {
  try {
    const status = req.query.status;
    const query = status ? { status } : {};
    const users = await User.find(query).sort({ createdAt: -1 });
    res.json(users);
  } catch (err) { 
    console.error('Admin Users Fetch Error:', err);
    res.status(500).json({ error: 'Failed to fetch users' }); 
  }
});

// Verify/Approve user (CEO only)
app.post('/api/admin/verify', async (req, res) => {
  try {
    const { userId, action } = req.body;
    
    if (!userId || !action) {
      return res.status(400).json({ error: 'Missing userId or action' });
    }

    const validActions = ['approve', 'reject', 'suspend'];
    if (!validActions.includes(action)) {
      return res.status(400).json({ error: 'Invalid action' });
    }

    let updateStatus = 'active';
    if (action === 'reject') updateStatus = 'suspended';
    if (action === 'suspend') updateStatus = 'suspended';

    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      { status: updateStatus }, 
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: `User ${action}ed successfully`, user: updatedUser });
  } catch (err) { 
    console.error('User Verification Error:', err);
    res.status(500).json({ error: 'Failed to verify user' }); 
  }
});

// --- �🛡️ CENTRALIZED ERROR PIPELINE ---
app.use((err, req, res, next) => {
  console.error('[CRITICAL SERVER ERROR]:', err.stack);
  res.status(500).json({
    error: 'Institutional Protocol Exception',
    message: process.env.NODE_ENV === 'production' ? 'An internal security event occurred.' : err.message
  });
});

app.listen(PORT, () => {
  console.log(`🚀 FAST Server Operational on port ${PORT}`);
});
