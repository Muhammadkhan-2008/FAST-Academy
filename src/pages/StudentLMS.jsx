import React, { useState, useEffect, useRef } from 'react';
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
import { API_URL } from '../utils/api';

// Neural AI Chat Component
const NeuralAIChat = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Neural link established. I am FAST AI. How can I accelerate your learning today, Scholar?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/fast-ai/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMsg })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', text: data.response || 'Neural link unstable. Try again.' }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Connection to institutional AI failed. Please ensure the server is running.' }]);
    }
    setLoading(false);
  };

  return (
    <>
      <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ 
            alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', 
            maxWidth: '70%', 
            background: m.role === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.04)', 
            padding: '1rem 1.5rem', 
            borderRadius: '18px', 
            border: '1px solid var(--border-light)', 
            color: m.role === 'user' ? 'white' : 'var(--text-main)', 
            fontSize: '0.95rem', 
            lineHeight: 1.6 
          }}>
            {m.text}
          </div>
        ))}
        {loading && (
          <div style={{ alignSelf: 'flex-start', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 800 }}>
            NEURAL PROCESSING...
          </div>
        )}
        <div ref={scrollRef} />
      </div>
      <form onSubmit={send} style={{ padding: '1.5rem', borderTop: '1px solid var(--border-light)', display: 'flex', gap: '1rem' }}>
        <input 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          placeholder="Ask FAST AI anything..." 
          style={{ 
            flex: 1, padding: '1rem 1.5rem', 
            background: 'rgba(255,255,255,0.04)', 
            border: '1px solid var(--border-light)', 
            borderRadius: '12px', color: 'white', 
            outline: 'none', fontSize: '0.9rem' 
          }} 
        />
        <button type="submit" className="premium-btn" style={{ padding: '1rem 2rem' }} disabled={loading}>
          <Send size={18} />
        </button>
      </form>
    </>
  );
};

const StudentLMS = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [lmsMessages, setLmsMessages] = useState([]);
  const [lmsMsg, setLmsMsg] = useState('');
  const chatScrollRef = useRef(null);

  const enrolledCourses = [
    { 
      id: 'c1', title: 'ADVANCED NEURAL ARCHITECTURE', instructor: 'Dr. Sarah Khan', 
      progress: 65, color: 'var(--primary)',
      syllabus: ['Neural Foundations', 'Backpropagation Deep-Dive', 'Transformer Models'],
      notes: [{ title: 'Lecture 1: Gradient Descent', date: '2026-05-01' }],
      labs: [{ title: 'Neural Sandbox Alpha', id: 'ai' }]
    }
  ];

  useEffect(() => {
    if (chatOpen) fetchLmsMessages();
    const interval = chatOpen ? setInterval(fetchLmsMessages, 5000) : null;
    return () => { if (interval) clearInterval(interval); };
  }, [chatOpen]);

  useEffect(() => {
    chatScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lmsMessages]);

  const fetchLmsMessages = async () => {
    try {
      const res = await fetch(`${API_URL}/api/chat/LMS_Global`);
      const data = await res.json();
      setLmsMessages(Array.isArray(data) ? data : []);
    } catch (err) { console.error('Chat fetch failed'); }
  };

  const sendLmsMessage = async (e) => {
    e.preventDefault();
    if (!lmsMsg.trim() || !user) return;
    try {
      await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: user.id,
          senderName: user.fullName || user.username || 'Scholar',
          text: lmsMsg,
          channel: 'LMS_Global'
        })
      });
      setLmsMsg('');
      fetchLmsMessages();
    } catch (err) { console.error('Send failed'); }
  };

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
                                <div style={{ width: '70px', height: '70px', background: 'var(--bg-subtle)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: course.color, border: '1px solid var(--border-light)', boxShadow: `0 0 20px ${course.color}20` }}>
                                  <Brain size={28} />
                                </div>
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
                      <button onClick={() => setActiveTab('labs')} className="premium-btn-ghost" style={{ padding: '1rem 2rem' }}><FlaskConical size={18} /> OPEN LAB</button>
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

      case 'resources':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="reveal">
            <h2 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '2rem' }}>RESOURCE <span className="gradient-text">ARCHIVES</span></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {[
                { title: 'Neural Architecture Fundamentals', type: 'PDF', size: '4.2 MB', icon: <FileText size={24} />, color: 'var(--primary)' },
                { title: 'Transformer Models - Deep Dive', type: 'PDF', size: '8.1 MB', icon: <FileText size={24} />, color: 'var(--secondary)' },
                { title: 'Lab Environment Setup Guide', type: 'PDF', size: '2.3 MB', icon: <FileText size={24} />, color: '#10B981' },
                { title: 'Lecture 01 - Neural Foundations', type: 'VIDEO', size: '1.2 GB', icon: <PlayCircle size={24} />, color: '#F59E0B' },
                { title: 'Lecture 02 - Backpropagation', type: 'VIDEO', size: '980 MB', icon: <PlayCircle size={24} />, color: '#F59E0B' },
                { title: 'Assignment 01 - Gradient Descent', type: 'TASK', size: 'Due May 30', icon: <ClipboardList size={24} />, color: '#EF4444' },
              ].map((res, i) => (
                <motion.div key={i} whileHover={{ scale: 1.02 }} className="glass-card hover-glow" style={{ padding: '2rem', cursor: 'pointer', border: '1px solid var(--border-light)' }}>
                  <div style={{ color: res.color, marginBottom: '1rem', width: '45px', height: '45px', background: `${res.color}15`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{res.icon}</div>
                  <h4 style={{ fontWeight: 800, marginBottom: '0.5rem', fontSize: '1rem' }}>{res.title}</h4>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800 }}>
                    <span style={{ background: 'rgba(255,255,255,0.06)', padding: '0.25rem 0.75rem', borderRadius: '99px' }}>{res.type}</span>
                    <span>{res.size}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'labs':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="reveal">
            <h2 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '2rem' }}>RESEARCH <span className="gradient-text">LABS</span></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
              {[
                { title: 'Neural Sandbox Alpha', status: 'AVAILABLE', color: '#22c55e', desc: 'Interactive neural network playground with live visualization and parameter tuning.' },
                { title: 'Full-Stack Container', status: 'AVAILABLE', color: '#22c55e', desc: 'Pre-configured Docker environment for web architecture and API development labs.' },
                { title: 'Quantum Crypto Lab', status: 'MAINTENANCE', color: '#F59E0B', desc: 'Advanced quantum cryptography simulation environment. Back online June 1.' },
              ].map((lab, i) => (
                <motion.div key={i} whileHover={{ y: -5 }} className="glass-card" style={{ padding: '2.5rem', border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <FlaskConical size={32} color="var(--primary)" />
                    <span style={{ fontSize: '0.65rem', fontWeight: 900, color: lab.color, background: `${lab.color}15`, padding: '0.4rem 1rem', borderRadius: '99px', border: `1px solid ${lab.color}30` }}>{lab.status}</span>
                  </div>
                  <h3 style={{ fontWeight: 900, marginBottom: '0.75rem', fontSize: '1.2rem' }}>{lab.title}</h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>{lab.desc}</p>
                  <button 
                    className="premium-btn" 
                    style={{ width: '100%', justifyContent: 'center', padding: '0.8rem', opacity: lab.status === 'MAINTENANCE' ? 0.5 : 1 }} 
                    disabled={lab.status === 'MAINTENANCE'}
                  >
                    {lab.status === 'AVAILABLE' ? <><Rocket size={16} /> LAUNCH LAB</> : 'UNDER MAINTENANCE'}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'ai':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: '70vh', display: 'flex', flexDirection: 'column' }} className="glass-card">
            <div style={{ padding: '2rem', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '45px', height: '45px', background: 'var(--primary-glow)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Brain size={24} color="var(--primary)" />
              </div>
              <div>
                <h3 style={{ fontWeight: 900 }}>FAST <span className="gradient-text">NEURAL AI</span></h3>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>Powered by Gemini 1.5 Flash • Institutional Intelligence</p>
              </div>
            </div>
            <NeuralAIChat />
          </motion.div>
        );

      default:
        return <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', fontWeight: 800 }}>SELECT A MODULE FROM THE SIDEBAR.</div>;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-deep)', color: 'white' }}>
      <div className="mesh-grid" style={{ opacity: 0.2 }} />
      
      {/* SIDEBAR */}
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
              {isSidebarOpen && <span>BACK TO PORTAL</span>}
           </button>
        </div>
      </motion.aside>

      {/* MAIN WORKSTATION */}
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
                <button onClick={() => setActiveTab('ai')} style={{ width: '50px', height: '50px', borderRadius: '15px', border: '1px solid var(--primary-glow)', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                   <Sparkles size={20} color="var(--primary)" />
                </button>
            </div>
         </header>

         {renderContent()}
      </main>

      {/* INSTITUTIONAL CHAT OVERLAY */}
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
             <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                   <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MessageSquare size={22} color="white" />
                   </div>
                   <div>
                      <h4 style={{ fontWeight: 900, letterSpacing: '0.05em' }}>SYNC CHAT</h4>
                      <p style={{ fontSize: '0.65rem', color: 'var(--primary)', fontWeight: 900 }}>LMS GLOBAL CHANNEL</p>
                   </div>
                </div>
                <button onClick={() => setChatOpen(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-dim)' }}><X size={24} /></button>
             </div>

             <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
               {lmsMessages.length === 0 && (
                 <div style={{ textAlign: 'center', opacity: 0.4, marginTop: '4rem' }}>
                   <MessageSquare size={48} style={{ marginBottom: '1rem' }} />
                   <p style={{ fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.1em' }}>NO MESSAGES YET</p>
                 </div>
               )}
               {lmsMessages.map((m, i) => {
                 const isMe = m.senderId === user?.id;
                 return (
                   <div key={i} style={{ 
                     alignSelf: isMe ? 'flex-end' : 'flex-start',
                     maxWidth: '80%', padding: '1rem 1.5rem', borderRadius: '18px',
                     background: isMe ? 'var(--primary)' : 'rgba(255,255,255,0.04)',
                     color: isMe ? 'white' : 'var(--text-main)',
                     fontSize: '0.9rem', fontWeight: 600, border: '1px solid var(--border-light)'
                   }}>
                     {!isMe && <p style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '0.4rem' }}>{m.senderName}</p>}
                     <p>{m.text}</p>
                     <p style={{ fontSize: '0.6rem', opacity: 0.6, textAlign: 'right', marginTop: '0.4rem' }}>
                       {new Date(m.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                     </p>
                   </div>
                 );
               })}
               <div ref={chatScrollRef} />
             </div>

             <form onSubmit={sendLmsMessage} style={{ padding: '2rem', borderTop: '1px solid var(--border-light)' }}>
               <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <input 
                    type="text" placeholder="TRANSMIT MESSAGE..." 
                    value={lmsMsg} onChange={(e) => setLmsMsg(e.target.value)}
                    style={{ flex: 1, padding: '1.25rem 1.5rem', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-light)', borderRadius: '14px', outline: 'none', color: 'white', fontWeight: 600, fontSize: '0.95rem' }}
                  />
                  <button type="submit" className="premium-btn" style={{ width: '55px', height: '55px', borderRadius: '14px', justifyContent: 'center', padding: 0 }}>
                     <Send size={22} />
                  </button>
               </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentLMS;
