import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlayCircle, FileText, CheckCircle, Clock, 
  MessageSquare, Settings, LogOut, Search, 
  Layout, BookOpen, User, Menu, X, ChevronRight,
  Shield, Rocket, Brain, ClipboardList, FlaskConical, Zap,
  Monitor, Target, Sparkles, Send, Paperclip, Smile
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const StudentLMS = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);

  // Mock data for enrolled courses
  const [enrolledCourses] = useState([
    { 
      id: 'c1', title: 'ADVANCED NEURAL ARCHITECTURE', instructor: 'Dr. Sarah Khan', 
      progress: 65, color: 'var(--primary)', icon: <Brain size={24} />,
      syllabus: ['Neural Foundations', 'Backpropagation Deep-Dive', 'Transformer Models'],
      notes: [{ title: 'Lecture 1: Gradient Descent', date: '2026-05-01' }],
      labs: [{ title: 'Neural Sandbox Alpha', id: 'ai' }]
    }
  ]);

  if (!isLoaded) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-deep)' }}>
       <div className="loader"></div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="reveal">
            {/* 🛸 ELITE METRICS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                {[
                  { label: 'MASTERY UNITS', val: '128', icon: <Target size={20} />, color: 'var(--primary)' },
                  { label: 'LAB HOURS', val: '42h', icon: <FlaskConical size={20} />, color: 'var(--secondary)' },
                  { label: 'SYNC RATE', val: '98%', icon: <Zap size={20} />, color: '#F472B6' },
                  { label: 'RANK', val: '#42', icon: <Rocket size={20} />, color: '#818CF8' },
                ].map((stat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card hover-glow" style={{ padding: '2rem', textAlign: 'center' }}>
                    <div style={{ color: stat.color, marginBottom: '1rem', background: `${stat.color}10`, width: '50px', height: '50px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>{stat.icon}</div>
                    <div style={{ fontSize: '2rem', fontWeight: 900 }}>{stat.val}</div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 900, letterSpacing: '0.2em', marginTop: '0.5rem' }}>{stat.label}</div>
                  </motion.div>
                ))}
            </div>

            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em' }}>ACTIVE TRACKS</h2>
                    <button className="premium-btn-ghost" style={{ fontSize: '0.7rem' }}>SYNC TIMELINE</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {enrolledCourses.map(course => (
                      <motion.div 
                        key={course.id} whileHover={{ scale: 1.01 }}
                        className="glass-card" style={{ padding: '2.5rem', border: '1px solid var(--border-light)', background: 'rgba(15, 23, 42, 0.4)' }}
                      >
                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                             <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                                <div style={{ width: '70px', height: '70px', background: 'var(--bg-subtle)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: course.color, border: '1px solid var(--border-light)', boxShadow: `0 0 20px ${course.color}20` }}>{course.icon}</div>
                                <div>
                                   <h3 style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.03em' }}>{course.title}</h3>
                                   <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', fontWeight: 600 }}>FACULTY: {course.instructor}</p>
                                </div>
                             </div>
                             <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.65rem', color: 'var(--primary)', fontWeight: 900, background: 'var(--primary-glow)', padding: '0.5rem 1.25rem', borderRadius: '99px', border: '1px solid var(--primary-glow)', letterSpacing: '0.1em' }}>CORE MODULE</div>
                             </div>
                         </div>
                         
                         <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 900, marginBottom: '0.75rem', color: 'var(--text-muted)' }}>
                                   <span>PROGRESSION</span>
                                   <span style={{ color: 'var(--primary)' }}>{course.progress}%</span>
                                </div>
                                <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                                   <motion.div initial={{ width: 0 }} animate={{ width: `${course.progress}%` }} transition={{ duration: 1.5 }} style={{ height: '100%', background: 'var(--primary)', boxShadow: '0 0 20px var(--primary-glow)' }} />
                                </div>
                            </div>
                            <button onClick={() => setActiveTab('courses')} className="premium-btn" style={{ padding: '1rem 2rem' }}>
                               RESUME <PlayCircle size={20} />
                            </button>
                         </div>
                      </motion.div>
                    ))}
                </div>
            </section>
          </div>
        );

      case 'courses':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card" style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
             {/* 🎬 CINEMATIC PLAYER */}
             <div style={{ padding: '1.5rem 3rem', background: '#020617', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                   <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444', animation: 'pulse 1.5s infinite' }} />
                   <h2 style={{ fontSize: '1.1rem', fontWeight: 900, color: 'white' }}>LIVE: NEURAL FOUNDATIONS V2.4</h2>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                   <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 800 }}>TRACK-A / 2026</div>
                   <div style={{ background: 'var(--primary-glow)', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 900, color: 'var(--primary)' }}>ENCRYPTED</div>
                </div>
             </div>
             
             <div style={{ width: '100%', aspectRatio: '21/9', background: '#000', position: 'relative' }}>
                <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} alt="Cyber Class" />
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 20%, rgba(0,0,0,0.9) 100%)' }} />
                
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                   <motion.div whileHover={{ scale: 1.1 }} style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', margin: '0 auto 2rem', boxShadow: '0 0 50px var(--primary-glow)' }}>
                      <PlayCircle size={48} color="white" fill="white" />
                   </motion.div>
                </div>

                {/* HUD Overlay */}
                <div style={{ position: 'absolute', top: '2rem', right: '2rem', textAlign: 'right' }}>
                   <p style={{ fontSize: '0.6rem', color: 'var(--primary)', fontWeight: 900, letterSpacing: '0.2em' }}>TELEMETRY STATUS</p>
                   <p style={{ fontSize: '1rem', fontWeight: 900, color: 'white' }}>SIGNAL: 100%</p>
                </div>
             </div>

             <div style={{ padding: '3rem', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
                <div>
                   <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>MODULE OVERVIEW</h3>
                   <p style={{ color: 'var(--text-dim)', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '2.5rem' }}>
                     Exploring the convergence of biological neural networks and synthetic transformer architectures. This session focuses on the mathematical derivation of self-attention mechanisms.
                   </p>
                   <div style={{ display: 'flex', gap: '1rem' }}>
                      <button className="premium-btn" style={{ padding: '1rem 2rem' }}><FileText size={18} /> RESOURCE PACK</button>
                      <button className="premium-btn-ghost" style={{ padding: '1rem 2rem' }}><FlaskConical size={18} /> OPEN LAB</button>
                   </div>
                </div>
                <div className="glass-card" style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)' }}>
                   <h4 style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>UPCOMING MILESTONES</h4>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      {[
                        { time: '45m', label: 'Math Foundations' },
                        { time: '1h 20m', label: 'Architecture Build' },
                        { time: '2h 00m', label: 'Neural Sync Test' },
                      ].map((m, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                           <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--primary)' }}>{m.time}</span>
                           <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{m.label}</span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </motion.div>
        );

      default:
        return <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', fontWeight: 800 }}>TERMINAL ACCESS GRANTED. SELECT MODULE.</div>;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-deep)', color: 'white' }}>
      <div className="mesh-grid" style={{ opacity: 0.2 }} />
      
      {/* 🚀 CYBER SIDEBAR */}
      <motion.aside 
        animate={{ width: isSidebarOpen ? '280px' : '90px' }}
        style={{ 
          background: 'rgba(3, 7, 18, 0.6)', backdropFilter: 'blur(30px)', borderRight: '1px solid var(--border-light)',
          display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', zIndex: 100
        }}
      >
        <div style={{ padding: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: isSidebarOpen ? 'space-between' : 'center' }}>
           {isSidebarOpen && <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-2px' }}>FAST <span className="gradient-text">LMS</span></h2>}
           <button onClick={() => setSidebarOpen(!isSidebarOpen)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-dim)' }}>
             {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
           </button>
        </div>

        <nav style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
           {[
             { id: 'dashboard', label: 'COMMAND', icon: <Monitor size={22} /> },
             { id: 'courses', label: 'TRACKS', icon: <BookOpen size={22} /> },
             { id: 'resources', label: 'ARCHIVES', icon: <ClipboardList size={22} /> },
             { id: 'labs', label: 'RESEARCH', icon: <FlaskConical size={22} /> },
             { id: 'chat', label: 'SYNC CHAT', icon: <MessageSquare size={22} /> },
             { id: 'ai', label: 'NEURAL AI', icon: <Brain size={22} /> },
           ].map(item => (
             <button 
               key={item.id} onClick={() => item.id === 'chat' ? setChatOpen(true) : setActiveTab(item.id)}
               style={{ 
                 display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1rem 1.5rem',
                 borderRadius: '15px', border: 'none', cursor: 'pointer',
                 background: activeTab === item.id ? 'var(--primary-glow)' : 'transparent',
                 color: activeTab === item.id ? 'var(--primary)' : 'var(--text-dim)',
                 width: '100%', transition: '0.3s', justifyContent: isSidebarOpen ? 'flex-start' : 'center',
                 fontWeight: 900, fontSize: '0.75rem', letterSpacing: '0.1em'
               }}
             >
                {item.icon}
                {isSidebarOpen && <span>{item.label}</span>}
             </button>
           ))}
        </nav>

        <div style={{ padding: '2rem', borderTop: '1px solid var(--border-light)' }}>
           <button 
             onClick={() => navigate('/portal-select')}
             style={{ 
               display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1rem', borderRadius: '12px', border: 'none', 
               cursor: 'pointer', background: 'transparent', color: '#EF4444', width: '100%', justifyContent: isSidebarOpen ? 'flex-start' : 'center',
               fontWeight: 900, fontSize: '0.75rem', letterSpacing: '0.1em'
             }}
           >
              <LogOut size={22} />
              {isSidebarOpen && <span>ABORT</span>}
           </button>
        </div>
      </motion.aside>

      {/* 🖥️ MAIN WORKSTATION */}
      <main style={{ flex: 1, padding: '5rem', overflowY: 'auto', zIndex: 10 }}>
         <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5rem' }}>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
               <h1 style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-0.05em' }}>SCHOLAR <span className="gradient-text">TERMINAL</span></h1>
               <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', fontWeight: 600 }}>Active Session: {user?.firstName} • FAST Institutional Node</p>
            </motion.div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ padding: '0.75rem 2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '15px', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                   <Search size={18} color="var(--primary)" />
                   <input type="text" placeholder="QUERY SYSTEM..." style={{ background: 'transparent', border: 'none', outline: 'none', color: 'white', fontWeight: 800, fontSize: '0.8rem' }} />
                </div>
                <div style={{ width: '50px', height: '50px', borderRadius: '15px', border: '1px solid var(--primary-glow)', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <Sparkles size={20} color="var(--primary)" />
                </div>
            </div>
         </header>

         {renderContent()}
      </main>

      {/* 🗨️ INSTITUTIONAL CHAT OVERLAY (WHATSAPP STYLE) */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{ 
              position: 'fixed', top: 0, right: 0, width: '450px', height: '100vh', 
              background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(30px)', 
              zIndex: 1000, borderLeft: '1px solid var(--border-light)',
              display: 'flex', flexDirection: 'column'
            }}
          >
             {/* Chat Header */}
             <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                   <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MessageSquare size={22} color="white" />
                   </div>
                   <div>
                      <h4 style={{ fontWeight: 900, letterSpacing: '0.05em' }}>SYNC CHAT</h4>
                      <p style={{ fontSize: '0.65rem', color: 'var(--primary)', fontWeight: 900 }}>34 SCHOLARS ONLINE</p>
                   </div>
                </div>
                <button onClick={() => setChatOpen(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-dim)' }}><X size={24} /></button>
             </div>

             {/* Messages */}
             <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { sender: 'System', text: 'Institutional sync established. Welcome to the global chat.', type: 'system' },
                  { sender: 'Scholar-492', text: 'Has anyone finished the Neural Foundations lab yet?', type: 'other' },
                  { sender: 'Scholar-881', text: 'Yes! The self-attention derivation is tricky though.', type: 'other' },
                  { sender: 'You', text: 'I just uploaded my notes to the resource pack.', type: 'self' },
                ].map((msg, i) => (
                  <div key={i} style={{ 
                    alignSelf: msg.type === 'self' ? 'flex-end' : (msg.type === 'system' ? 'center' : 'flex-start'),
                    maxWidth: '80%', padding: '1rem 1.5rem', borderRadius: '18px',
                    background: msg.type === 'self' ? 'var(--primary)' : (msg.type === 'system' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)'),
                    color: msg.type === 'self' ? 'white' : 'var(--text-main)',
                    fontSize: msg.type === 'system' ? '0.7rem' : '0.9rem',
                    fontWeight: 600, border: '1px solid var(--border-light)'
                  }}>
                    {msg.type !== 'self' && msg.type !== 'system' && <p style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '0.25rem' }}>{msg.sender}</p>}
                    {msg.text}
                  </div>
                ))}
             </div>

             {/* Input Area */}
             <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                   <Smile size={22} color="var(--text-dim)" cursor="pointer" />
                   <Paperclip size={22} color="var(--text-dim)" cursor="pointer" />
                   <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '15px', padding: '0.75rem 1.5rem', border: '1px solid var(--border-light)' }}>
                      <input type="text" placeholder="Message academic network..." style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', color: 'white', fontWeight: 600 }} />
                   </div>
                   <div style={{ width: '50px', height: '50px', borderRadius: '15px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 0 20px var(--primary-glow)' }}>
                      <Send size={20} color="white" />
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentLMS;
