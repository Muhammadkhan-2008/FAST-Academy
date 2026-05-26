import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useSchool } from '../context/SchoolContext';
import { 
  LayoutDashboard, Users, ShieldCheck, BarChart3, ListTree,
  BookOpen, Calendar, ClipboardCheck, GraduationCap,
  Library, MessageSquare, LogOut, Settings, Bell, Search,
  Menu, X, Video, ChevronRight, Command, Brain, Sparkles, User,
  Globe, Cpu, VideoIcon, FileVideo, LifeBuoy, HeartHandshake,
  Target, Briefcase, TrendingUp, PenTool, BookMarked, MonitorPlay,
  Newspaper, PlayCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PortalLayout = ({ portal }) => {
  let { logout, user } = useSchool();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- MOCK USER FOR TESTING ---
  if (!user) {
    user = { name: 'SCHOLAR MODE', role: portal, email: 'test@fast.edu' };
  }

  // Define Menu Groups
  const menuGroups = {
    ceo: [
      {
        title: "EXECUTIVE",
        items: [
          { icon: <LayoutDashboard size={18} />, label: 'OVERVIEW', path: '/ceo' },
          { icon: <ShieldCheck size={18} />, label: 'VERIFICATION', path: '/ceo/verify' },
          { icon: <Users size={18} />, label: 'STAFF HUB', path: '/ceo/staff' },
          { icon: <BarChart3 size={18} />, label: 'INTELLIGENCE', path: '/ceo/analytics' },
          { icon: <ListTree size={18} />, label: 'SYSTEM LOGS', path: '/ceo/logs' },
        ]
      }
    ],
    teacher: [
      {
        title: "INSTRUCTION",
        items: [
          { icon: <LayoutDashboard size={18} />, label: 'WORKSTATION', path: '/teacher' },
          { icon: <BookOpen size={18} />, label: 'PROGRAMS', path: '/teacher/courses' },
          { icon: <Video size={18} />, label: 'BROADCASTER', path: '/teacher/live-class' }, 
          { icon: <ClipboardCheck size={18} />, label: 'ROSTER', path: '/teacher/attendance' },
          { icon: <ListTree size={18} />, label: 'PLANNER', path: '/teacher/lessons' },
        ]
      }
    ],
    student: [
      {
        title: "CORE ACADEMICS",
        items: [
          { icon: <LayoutDashboard size={18} />, label: 'DASHBOARD', path: '/student' },
          { icon: <BookOpen size={18} />, label: 'CLASSROOM', path: '/student/classroom' },
          { icon: <MonitorPlay size={18} />, label: 'WORKSPACE', path: '/student/workspace' },
          { icon: <VideoIcon size={18} />, label: 'LIVE BROADCAST', path: '/student/live' },
        ]
      },
      {
        title: "SUPPORT & MENTORSHIP",
        items: [
          { icon: <HeartHandshake size={18} />, label: 'MENTORSHIP (6M)', path: '/student/mentorship' },
          { icon: <User size={18} />, label: '1-ON-1 SESSION', path: '/student/1on1' },
          { icon: <Briefcase size={18} />, label: 'CAREER ADVISOR', path: '/student/career' },
          { icon: <Brain size={18} />, label: 'PERSONAL GROWTH', path: '/student/growth' },
          { icon: <PlayCircle size={18} />, label: 'LIVE Q&A', path: '/student/qna' },
        ]
      },
      {
        title: "CAREER & PORTFOLIO",
        items: [
          { icon: <Library size={18} />, label: 'PORTFOLIO CREATOR', path: '/student/portfolio' },
          { icon: <ClipboardCheck size={18} />, label: 'PORTFOLIO REVIEW', path: '/student/portfolio-review' },
          { icon: <Users size={18} />, label: 'NETWORKING', path: '/student/networking' },
          { icon: <Globe size={18} />, label: 'INTERNSHIP', path: '/student/internships' },
        ]
      },
      {
        title: "INTELLIGENCE (AI)",
        items: [
          { icon: <Sparkles size={18} />, label: 'FAST AI SUPPORT', path: '/student/ai-support' },
          { icon: <Cpu size={18} />, label: 'AI TOOLS SUITE', path: '/student/ai-tools' },
          { icon: <LogOut size={18} />, label: 'PREMIUM TOOLS', path: '/student/paid-tools' },
        ]
      },
      {
        title: "TRACKING & COMMS",
        items: [
          { icon: <TrendingUp size={18} />, label: 'PROGRESS TRACKING', path: '/student/progress' },
          { icon: <Target size={18} />, label: 'GOAL SETTING', path: '/student/goals' },
          { icon: <Newspaper size={18} />, label: 'NEWSLETTERS', path: '/student/newsletters' },
          { icon: <MessageSquare size={18} />, label: 'FAST CHATBOOK', path: '/student/chat' },
        ]
      }
    ]
  };

  const currentGroups = menuGroups[portal] || menuGroups.student;
  
  // Find active label deeply
  let activeLabel = 'OVERVIEW';
  for (const group of currentGroups) {
    const found = group.items.find(item => item.path === location.pathname);
    if (found) activeLabel = found.label;
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--bg-deep)', overflow: 'hidden' }}>
      <div className="mesh-grid" style={{ opacity: 0.05 }} />

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 40 }}
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* 🏛️ ELITE RESPONSIVE SIDEBAR */}
      <motion.aside 
        style={{
          position: window.innerWidth < 1024 ? 'fixed' : 'relative',
          top: 0, left: 0, bottom: 0,
          width: '280px',
          background: 'var(--bg-base)',
          borderRight: '1px solid var(--border-light)',
          display: 'flex', flexDirection: 'column',
          zIndex: 50,
          transform: window.innerWidth < 1024 && !isSidebarOpen ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: window.innerWidth < 1024 ? 'var(--shadow-lg)' : 'none'
        }}
      >
        <div style={{ padding: '2rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Cpu size={18} color="#fff" />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.5px', color: 'var(--text-main)' }}>FAST <span style={{ color: 'var(--primary)' }}>PORTAL</span></h2>
          </div>
          {window.innerWidth < 1024 && (
            <button onClick={() => setIsSidebarOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)' }}>
              <X size={24} />
            </button>
          )}
        </div>

        <nav className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '0 1rem 2rem' }}>
          {currentGroups.map((group, gIdx) => (
            <div key={gIdx} style={{ marginBottom: '2rem' }}>
              <p style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '1rem', letterSpacing: '0.15em', paddingLeft: '0.5rem' }}>
                {group.title}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {group.items.map((item) => (
                  <li key={item.path}>
                    <NavLink 
                      to={item.path} 
                      onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)}
                      style={({ isActive }) => ({
                        display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1rem',
                        borderRadius: '10px', textDecoration: 'none', transition: 'all 0.2s ease',
                        background: isActive ? 'var(--primary-glow)' : 'transparent',
                        color: isActive ? 'var(--primary)' : 'var(--text-dim)',
                        fontWeight: isActive ? 800 : 600,
                        fontSize: '0.85rem'
                      })}
                    >
                      <span style={{ opacity: location.pathname === item.path ? 1 : 0.7 }}>{item.icon}</span>
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-light)', background: 'var(--bg-subtle)' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#fff', fontSize: '1rem' }}>
                 {user.name[0]}
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                 <p style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</p>
                 <p style={{ fontSize: '0.65rem', color: 'var(--primary)', fontWeight: 800, letterSpacing: '0.05em' }}>ID: {user.fastId || 'FST-XXXX'}</p>
              </div>
           </div>
           <button onClick={logout} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', borderRadius: '10px', border: '1px solid #fee2e2', background: '#fef2f2', cursor: 'pointer', color: '#ef4444', fontWeight: 800, fontSize: '0.8rem', transition: 'all 0.2s' }}>
             <LogOut size={16} /> LOGOUT
           </button>
        </div>
      </motion.aside>

      {/* 🖥️ MAIN WORKSPACE */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
         
         {/* BEAUTIFUL HEADER */}
         <header style={{ 
           height: '80px', padding: '0 2rem', 
           display: 'flex', justifyContent: 'space-between', alignItems: 'center',
           background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(12px)', 
           borderBottom: '1px solid var(--border-light)', zIndex: 30
         }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
               <button onClick={() => setIsSidebarOpen(true)} style={{ display: window.innerWidth < 1024 ? 'flex' : 'none', background: 'none', border: 'none', color: 'var(--text-main)' }}>
                 <Menu size={24} />
               </button>
               <h1 style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.02em', color: 'var(--text-main)' }}>{activeLabel}</h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-subtle)', padding: '0.5rem 1rem', borderRadius: '99px', border: '1px solid var(--border-light)' }}>
                  <Search size={16} color="var(--text-muted)" />
                  <input type="text" placeholder="Search portal..." style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.8rem', width: '120px', color: 'var(--text-main)', fontWeight: 600 }} />
               </div>
               <button style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <Bell size={22} color="var(--text-dim)" />
                  <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '10px', height: '10px', background: '#ef4444', borderRadius: '50%', border: '2px solid white' }} />
               </button>
               <button onClick={() => navigate(`/${portal}/settings`)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <Settings size={22} color="var(--text-dim)" />
               </button>
            </div>
         </header>

         {/* CONTENT AREA */}
         <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '2rem', position: 'relative' }}>
            <Outlet />
         </div>
      </main>

      {/* 🤖 FLOATING AI */}
      <motion.div 
        onClick={() => navigate(`/${portal}/ai-support`)}
        whileHover={{ scale: 1.05, y: -5 }}
        style={{ 
          position: 'fixed', bottom: '2rem', right: '2rem',
          background: 'var(--primary)',
          padding: '0.8rem 1.5rem', borderRadius: '99px',
          display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white',
          boxShadow: '0 10px 25px -5px var(--primary-glow)', cursor: 'pointer',
          zIndex: 100
        }}
      >
        <Sparkles size={18} />
        <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.05em' }}>AI SUPPORT</span>
      </motion.div>
    </div>
  );
};

export default PortalLayout;
