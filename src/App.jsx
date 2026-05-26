import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SchoolProvider, useSchool } from './context/SchoolContext';
import { useUser } from '@clerk/clerk-react';

// Components
import PortalLayout from './components/PortalLayout';
import CommandPalette from './components/CommandPalette';

// Global Pages
import LandingPage from './pages/LandingPage';
import PortalSelection from './pages/PortalSelection';
import LoginPage from './pages/LoginPage';
import PublicCourses from './pages/PublicCourses';
import Labs from './pages/Labs';
import Scholarships from './pages/Scholarships';
import FastAI from './pages/FastAI';
import ApplicationForm from './pages/ApplicationForm';
import StudentLMS from './pages/StudentLMS';
import NotesCatalog from './pages/NotesCatalog';
import Chatbook from './pages/Chatbook';
import Alumni from './pages/Alumni';
import Events from './pages/Events';
import About from './pages/About';
import Privacy from './pages/Privacy';

// CEO Pages
import CEODashboard from './pages/ceo/CEODashboard';
import StaffManagement from './pages/ceo/StaffManagement';
import VerificationCenter from './pages/ceo/VerificationCenter';
import GlobalAnalytics from './pages/ceo/GlobalAnalytics';
import AuditLogs from './pages/ceo/AuditLogs';

// Teacher Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import MyCourses from './pages/teacher/MyCourses';
import ClassroomLauncher from './pages/teacher/ClassroomLauncher';
import AttendanceBook from './pages/teacher/AttendanceBook';
import LessonPlanner from './pages/teacher/LessonPlanner';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import EnrolledCourses from './pages/student/EnrolledCourses';
import MySchedule from './pages/student/MySchedule';
import ResourceLibrary from './pages/student/ResourceLibrary';
import CommunityChat from './pages/student/CommunityChat';
import Assignments from './pages/student/Assignments';
import SocialHub from './pages/student/SocialHub';
import CourseLMS from './pages/student/CourseLMS';
import StudentSettings from './pages/student/StudentSettings';
import StudentWorkspace from './pages/student/StudentWorkspace';
import StudentClassroom from './pages/student/StudentClassroom';

// Shared
import Classroom from './pages/shared/Classroom';
import ComingSoon from './pages/shared/ComingSoon';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isLoaded, isSignedIn } = useUser();
  const { user } = useSchool();

  // If Clerk is still loading, show loader
  if (!isLoaded) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-deep)' }}>
       <div className="loader"></div>
    </div>
  );

  // If not signed in, redirect to login
  if (!isSignedIn) return <Navigate to="/login" />;

  // If signed in but SchoolContext hasn't synced yet, show a more descriptive loader
  if (isSignedIn && !user) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-deep)', color: 'white', gap: '2rem' }}>
       <div className="loader"></div>
       <p style={{ fontWeight: 800, letterSpacing: '0.1em', opacity: 0.6 }}>SYNCHRONIZING WITH INSTITUTIONAL CORE...</p>
    </div>
  );

  // Role based protection
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/portal-select" />;

  return children;
};

function App() {
  const [isCmdOpen, setIsCmdOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        setIsCmdOpen(prev => !prev);
      }
    };

    const handleCustomToggle = () => setIsCmdOpen(prev => !prev);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('toggle-command-palette', handleCustomToggle);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('toggle-command-palette', handleCustomToggle);
    };
  }, []);

  return (
    <SchoolProvider>
      <Router>
        <CommandPalette isOpen={isCmdOpen} onClose={() => setIsCmdOpen(false)} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/courses" element={<PublicCourses />} />
          <Route path="/labs" element={<Labs />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/fast-ai" element={<FastAI />} />
          <Route path="/apply/:type/:targetId" element={<ApplicationForm />} />
          <Route path="/lms" element={
            <ProtectedRoute allowedRoles={['student', 'teacher', 'ceo']}>
              <StudentLMS />
            </ProtectedRoute>
          } />
          <Route path="/notes" element={<NotesCatalog />} />
          <Route path="/chatbook" element={
            <ProtectedRoute allowedRoles={['student', 'teacher', 'ceo']}>
              <Chatbook />
            </ProtectedRoute>
          } />
          <Route path="/alumni" element={<Alumni />} />
          <Route path="/events" element={<Events />} />
          <Route path="/login/*" element={<LoginPage mode="login" />} />
          <Route path="/signup/*" element={<LoginPage mode="signup" />} />
          <Route path="/portal-select" element={
            <ProtectedRoute allowedRoles={['ceo', 'teacher', 'student']}>
              <PortalSelection />
            </ProtectedRoute>
          } />
          
          {/* CEO Portal */}
          <Route path="/ceo" element={
            <ProtectedRoute allowedRoles={['ceo']}>
              <PortalLayout portal="ceo" />
            </ProtectedRoute>
          }>
            <Route index element={<CEODashboard />} />
            <Route path="staff" element={<StaffManagement />} />
            <Route path="verify" element={<VerificationCenter />} />
            <Route path="analytics" element={<GlobalAnalytics />} />
            <Route path="logs" element={<AuditLogs />} />
          </Route>

          {/* Teacher Portal */}
          <Route path="/teacher" element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <PortalLayout portal="teacher" />
            </ProtectedRoute>
          }>
            <Route index element={<TeacherDashboard />} />
            <Route path="courses" element={<MyCourses />} />
            <Route path="live-class" element={<ClassroomLauncher />} />
            <Route path="attendance" element={<AttendanceBook />} />
            <Route path="lessons" element={<LessonPlanner />} />
          </Route>

          {/* Student Portal */}
          <Route path="/student" element={
            <ProtectedRoute allowedRoles={['student']}>
              <PortalLayout portal="student" />
            </ProtectedRoute>
          }>
            <Route index element={<StudentDashboard />} />
            <Route path="enrolled" element={<EnrolledCourses />} />
            <Route path="schedule" element={<MySchedule />} />
            <Route path="resources" element={<ResourceLibrary />} />
            <Route path="chat" element={<CommunityChat />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="social" element={<SocialHub />} />
            <Route path="settings" element={<StudentSettings />} />
            <Route path="course/:id" element={<CourseLMS />} />
            <Route path="workspace" element={<StudentWorkspace />} />
            <Route path="classroom" element={<StudentClassroom />} />
            
            {/* New Sections Placeholders */}
            <Route path="live" element={<ComingSoon title="Live Lectures & Classes" />} />
            <Route path="recordings" element={<ComingSoon title="Lecture Recordings" />} />
            <Route path="ebooks" element={<ComingSoon title="E-Books Access" />} />
            <Route path="support" element={<ComingSoon title="Chat Support" />} />
            <Route path="mentorship" element={<ComingSoon title="6-Month Mentorship" />} />
            <Route path="1on1" element={<ComingSoon title="One-on-One Sessions" />} />
            <Route path="growth" element={<ComingSoon title="Personal Growth Sessions" />} />
            <Route path="qna" element={<ComingSoon title="Live Q&A Sessions" />} />
            <Route path="career" element={<ComingSoon title="Career Advisor Sessions" />} />
            <Route path="portfolio" element={<ComingSoon title="Portfolio Creation" />} />
            <Route path="portfolio-review" element={<ComingSoon title="Portfolio Review" />} />
            <Route path="networking" element={<ComingSoon title="Networking Events" />} />
            <Route path="internships" element={<ComingSoon title="Internship Opportunities" />} />
            <Route path="ai-support" element={<ComingSoon title="AI Support Chatbot" />} />
            <Route path="ai-tools" element={<ComingSoon title="Relevant AI Tools" />} />
            <Route path="paid-tools" element={<ComingSoon title="Premium Paid Tools" />} />
            <Route path="goals" element={<ComingSoon title="Goal-Setting Framework" />} />
            <Route path="progress" element={<ComingSoon title="Progress Tracking" />} />
            <Route path="newsletters" element={<ComingSoon title="Industry Newsletters" />} />
          </Route>

          {/* Universal Classroom */}
          <Route path="/classroom/:id" element={<Classroom />} />
          
        </Routes>
      </Router>
    </SchoolProvider>
  );
}

export default App;
