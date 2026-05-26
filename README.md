# FAST Institute - Advanced Learning Management System

A comprehensive, AI-powered educational platform built with React and Node.js that provides a complete ecosystem for students, teachers, and administrators.

## 🎓 Overview

FAST Institute is a sophisticated Learning Management System (LMS) designed to revolutionize education through intelligent automation and intuitive user interfaces. It caters to multiple user roles including students, teachers, and institutional administrators with specialized dashboards and features for each.

## ✨ Key Features

### For Students
- **Student LMS Dashboard**: Centralized hub for course management, assignments, and progress tracking
- **Enrolled Courses**: Browse and manage enrolled courses with detailed syllabus information
- **Schedule Management**: View and organize class schedules and calendar events
- **Assignment Tracking**: Submit and track assignment progress with real-time feedback
- **Resource Library**: Access comprehensive course materials, lecture notes, and study resources
- **Community Chat**: Peer-to-peer messaging and community engagement
- **Social Hub**: Connect with fellow students and build academic networks
- **Scholar Profile**: Showcase academic achievements and skills

### For Teachers
- **Teacher Dashboard**: Comprehensive teaching analytics and course management
- **Lesson Planner**: Curriculum architect for organizing course content and lessons
- **Live Classroom Control Room**: Interactive live teaching environment with real-time control
- **Attendance Book**: Track and manage student attendance
- **Gradebook & Analytics**: Neural analytics for comprehensive student performance analysis
- **Course Management**: Create, edit, and manage multiple courses

### For Administrators (CEO/Staff)
- **Global Analytics**: Institution-wide performance metrics and insights
- **Staff Management**: User role and permission management
- **Verification Center**: Authentication and compliance verification
- **Audit Logs**: Complete system activity logging and audit trails
- **Financial Management**: Scholarship and grant application processing

### For All Users
- **AI Search Overlay**: Intelligent search with natural language processing
- **Command Palette**: Quick access to system features and commands
- **Real-Time Notifications**: Instant updates on academic activities
- **Privacy Controls**: Comprehensive privacy policy and data protection

## 🏗️ Project Structure

```
FAST Institute/
├── src/
│   ├── pages/              # Route pages (Student, Teacher, CEO, Public)
│   │   ├── student/        # Student-specific pages
│   │   ├── teacher/        # Teacher-specific pages
│   │   ├── ceo/            # Administrator pages
│   │   └── shared/         # Common pages
│   ├── components/         # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── CommandPalette.jsx
│   │   ├── AISearchOverlay.jsx
│   │   └── Layout.jsx
│   ├── context/            # React Context for state management
│   │   └── SchoolContext.jsx
│   ├── assets/             # Images and static assets
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Entry point
│   └── styles/             # CSS files
├── server/
│   ├── index.js            # Express server entry point
│   ├── models/             # Database schemas
│   │   ├── Schema.js       # Main data models
│   │   └── CommunicationSchema.js
│   ├── routes/             # API endpoints
│   │   ├── courses.js
│   │   └── ai.js
│   ├── middleware/         # Express middleware
│   │   └── auth.js         # Authentication middleware
│   └── db.json             # Local database
├── public/                 # Static public files
├── fast academy design/    # Design templates and prototypes
├── vite.config.js          # Vite configuration
├── package.json            # Frontend dependencies
└── eslint.config.js        # ESLint configuration
```

## 🛠️ Tech Stack

### Frontend
- **React 19.2.5**: Modern UI library with concurrent features
- **Vite 8.0.10**: Lightning-fast build tool
- **React Router DOM 7.15.0**: Client-side routing
- **Framer Motion 12.38.0**: Smooth animations
- **Lucide React 1.14.0**: Beautiful icon library
- **Clerk Auth 5.61.6**: Authentication and user management

### Backend
- **Node.js**: JavaScript runtime
- **Express 5.2.1**: Web framework
- **MongoDB/Mongoose**: Database
- **JWT**: Token-based authentication
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing
- **Helmet**: Security headers
- **Morgan**: HTTP request logging
- **LowDB**: JSON database support

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/fast-institute.git
cd fast-institute
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd server
npm install
cd ..
```

4. **Configure environment variables**

Create a `.env` file in the project root:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
```

Create a `.env` file in the server directory:
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLERK_SECRET_KEY=your_clerk_secret
PORT=5000
```

### Running the Application

**Development Mode:**
```bash
# Terminal 1 - Frontend (Vite dev server)
npm run dev

# Terminal 2 - Backend (Node server)
cd server && npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

**Production Build:**
```bash
npm run build
npm run preview
```

## 📋 Available Scripts

### Frontend
- `npm run dev`: Start development server with HMR
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint validation

### Backend
- `npm run start`: Start production server
- `npm run dev`: Start development server

## 🔐 Authentication

The platform uses **Clerk** for authentication, providing:
- Social login integration (Google, GitHub, etc.)
- Email/password authentication
- Multi-factor authentication
- User profile management
- Session management

## 📊 Key Features In Detail

### AI-Powered Search
Intelligent search system that understands natural language queries and provides contextual results across courses, resources, and user profiles.

### Command Palette
Quick command execution interface similar to VS Code, allowing users to rapidly access features and navigate the application.

### Real-time Notifications
WebSocket-based notification system for:
- Assignment deadline reminders
- Grade updates
- Class schedule changes
- Peer messages
- System announcements

### Analytics Engine
- Student performance metrics
- Course engagement tracking
- Learning outcome analysis
- Attendance patterns
- Resource utilization statistics

## 🎨 Design System

The platform follows a modern, accessible design philosophy:
- Responsive design for all screen sizes
- Dark mode support
- Accessible color contrasts
- Smooth animations with Framer Motion
- Intuitive navigation patterns

## 📁 Design Assets

Comprehensive design templates available in `/fast academy design/`:
- Assessment center quiz portal
- Chatbook messaging hub
- Course creation wizard
- Live classroom interface
- Student and teacher dashboards
- Peer project gallery
- Research resources marketplace

## 🔗 API Routes

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create course (teacher/admin)
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### AI Services
- `POST /api/ai/search` - AI-powered search
- `POST /api/ai/analyze` - Content analysis
- `GET /api/ai/suggestions` - Smart recommendations

### Communications
- `GET /api/messages` - Get messages
- `POST /api/messages` - Send message
- `GET /api/notifications` - Get notifications

## 🧪 Testing

```bash
# Backend tests (when implemented)
cd server && npm test

# Frontend tests (when implemented)
npm test
```

## 📦 Deployment

### Frontend (Vite)
1. Build the application: `npm run build`
2. Deploy the `dist` folder to:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3 + CloudFront

### Backend (Node.js)
1. Deploy to:
   - Railway
   - Render
   - Heroku
   - AWS EC2
   - DigitalOcean

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Code Style

- **Frontend**: ESLint + React best practices
- **Backend**: Express.js conventions
- **Naming**: camelCase for variables and functions, PascalCase for components

## 🐛 Bug Reporting

Found a bug? Please create an issue with:
- Description of the bug
- Steps to reproduce
- Expected behavior
- Current behavior
- Screenshots (if applicable)

## 📄 License

This project is licensed under the ISC License.

## 👥 Team

FAST Institute Development Team

## 📞 Support

For support and inquiries:
- Email: support@fastinstitute.com
- Documentation: [Wiki](./wiki)
- Issues: [GitHub Issues](../../issues)

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Core LMS functionality
- ✅ Student and teacher portals
- ✅ Course management system
- ✅ Authentication system

### Phase 2
- 🔄 Mobile application (React Native)
- 🔄 Advanced analytics dashboard
- 🔄 Video streaming integration
- 🔄 AI tutoring system

### Phase 3
- 📋 Blockchain-based certificates
- 📋 Advanced gamification
- 📋 Virtual classroom (3D)
- 📋 Integration with external tools

## 🙏 Acknowledgments

- React community
- Vite team
- Clerk for authentication
- All contributors and testers

---

**Made with ❤️ for education**
