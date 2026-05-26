import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSchool } from '../../context/SchoolContext';
import { 
  Play, BookOpen, MessageSquare, FileText, Layout, 
  ChevronRight, ChevronDown, CheckCircle, Video, 
  Download, Search, Sparkles, Send, Brain, Target, Star,
  Monitor, Share2, MoreHorizontal, User, Lock, Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CourseLMS = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, user } = useSchool();
  const [activeTab, setActiveTab] = useState('curriculum');
  const [currentModule, setCurrentModule] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiChat, setAiChat] = useState([
    { role: 'assistant', content: 'Hello! I am your FAST AI Tutor. How can I help you master this course today?' }
  ]);
  const [aiInput, setAiInput] = useState('');

  const course = data.courses?.find(c => c._id === id);

  if (!course) return <div style={{ padding: '5rem', textAlign: 'center' }}><h2>Course Not Found</h2><button onClick={() => navigate('/student')}>Back to Dashboard</button></div>;

  const modules = [
    { title: 'Foundations & Principles', lessons: ['Introduction to Core Concepts', 'Setting up the Environment', 'First Practical Application'] },
    { title: 'Advanced Architecture', lessons: ['Structural Patterns', 'Optimizing Performance', 'Scalability Standards'] },
    { title: 'Industry Integration', lessons: ['Deployment Strategies', 'Security Best Practices', 'Final Capstone Project'] },
  ];

  const handleAiSend = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    const newChat = [...aiChat, { role: 'user', content: aiInput }];
    setAiChat(newChat);
    setAiInput('');
    
    // Simulating AI Response
    setTimeout(() => {
      setAiChat([...newChat, { role: 'assistant', content: `That's a great question about "${modules[currentModule].lessons[currentLesson]}". In professional environments, we handle this by using...` }]);
    }, 1000);
  };

  return (
    <div style={{ height: 'calc(100vh - 140px)', display: 'flex', gap: '1.5rem', position: 'relative' }}>
      
      {/* 📺 MAIN LEARNING AREA (COURSERA STYLE) */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', overflow: 'hidden' }}>
        
        {/* Video Player Section */}
        <div className="glass-panel" style={{ background: '#000', borderRadius: '16px', aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
           <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center', color: 'white' }}>
                 <Play size={64} style={{ marginBottom: '1rem', cursor: 'pointer', color: 'var(--primary)' }} />
                 <h3 style={{ opacity: 0.8 }}>Module {currentModule + 1}: {modules[currentModule].lessons[currentLesson]}</h3>
              </div>
           </div>
           {/* Progress Bar overlay */}
           <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: 'rgba(255,255,255,0.2)' }}>
              <div style={{ width: '45%', height: '100%', background: 'var(--primary)' }}></div>
           </div>
        </div>

        {/* Lesson Controls & Header */}
        <div className="glass-panel" style={{ padding: '1.5rem 2rem' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                 <span className="badge badge-purple" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>In Progress • Module {currentModule + 1}</span>
                 <h1 style={{ fontSize: '1.75rem', fontWeight: 900 }}>{modules[currentModule].lessons[currentLesson]}</h1>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                 <button className="neo-btn neo-btn-ghost"><Share2 size={18} /> Share</button>
                 <button className="neo-btn neo-btn-ghost"><Download size={18} /> Notes</button>
                 <button className="neo-btn neo-btn-primary" onClick={() => setIsAiOpen(true)}>
                    <Brain size={18} /> Ask FAST AI
                 </button>
              </div>
           </div>

           {/* Tabs for Details */}
           <div style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid var(--border-light)', marginBottom: '1.5rem' }}>
              {['Overview', 'Notes', 'Resources', 'Discussions'].map(t => (
                <span 
                  key={t} 
                  onClick={() => setActiveTab(t.toLowerCase())}
                  style={{ 
                    padding: '1rem 0', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 700,
                    color: activeTab === t.toLowerCase() ? 'var(--primary)' : 'var(--text-muted)',
                    borderBottom: activeTab === t.toLowerCase() ? '2px solid var(--primary)' : 'none',
                    transition: '0.2s'
                  }}
                >
                  {t}
                </span>
              ))}
           </div>

           <div style={{ color: 'var(--text-dim)', lineHeight: 1.6 }}>
              <p>In this lesson, we cover the core architectural patterns used in modern high-performance systems. You will learn how to structure your code for maximum scalability and maintainability, ensuring that your applications can handle millions of requests with minimal latency.</p>
           </div>
        </div>
      </div>

      {/* 📋 MODULE SIDEBAR (PRO STRUCTURE) */}
      <aside style={{ width: '380px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        {/* Course Progress Card */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ fontWeight: 800 }}>Course Progress</h4>
              <span className="pro-badge">PRO</span>
           </div>
           <div className="progress-bar" style={{ marginBottom: '0.5rem' }}>
              <div className="progress-fill" style={{ width: '35%' }}></div>
           </div>
           <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>12 of 34 lessons completed • 4 hours left</p>
        </div>

        {/* Modules List */}
        <div className="glass-panel" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
           <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-light)' }}>
              <h4 style={{ fontWeight: 800 }}>Curriculum</h4>
           </div>
           
           <div className="custom-scrollbar" style={{ overflowY: 'auto' }}>
              {modules.map((mod, mIdx) => (
                <div key={mIdx}>
                   <div style={{ 
                     padding: '1rem 1.5rem', background: 'var(--bg-surface)', 
                     display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                     cursor: 'pointer', borderBottom: '1px solid var(--border-light)'
                   }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>M{mIdx + 1}: {mod.title}</span>
                      <ChevronDown size={16} />
                   </div>
                   {mod.lessons.map((les, lIdx) => (
                     <div 
                      key={lIdx}
                      onClick={() => { setCurrentModule(mIdx); setCurrentLesson(lIdx); }}
                      style={{ 
                        padding: '1rem 1.5rem 1rem 3rem', display: 'flex', gap: '1rem', 
                        alignItems: 'center', cursor: 'pointer', transition: '0.2s',
                        background: (currentModule === mIdx && currentLesson === lIdx) ? 'var(--primary-glow)' : 'transparent',
                        borderLeft: (currentModule === mIdx && currentLesson === lIdx) ? '4px solid var(--primary)' : 'none'
                      }}
                     >
                        {mIdx === 0 && lIdx === 0 ? <CheckCircle size={16} color="var(--success)" /> : <Play size={16} color="var(--text-muted)" />}
                        <span style={{ 
                          fontSize: '0.85rem', 
                          fontWeight: (currentModule === mIdx && currentLesson === lIdx) ? 700 : 500,
                          color: (currentModule === mIdx && currentLesson === lIdx) ? 'var(--primary)' : 'var(--text-main)'
                        }}>{les}</span>
                     </div>
                   ))}
                </div>
              ))}
           </div>
        </div>

        {/* Instructor Shortcut */}
        <div className="glass-panel" style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
           <div style={{ width: '40px', height: '40px', background: 'var(--bg-deep)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={20} />
           </div>
           <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.85rem', fontWeight: 700 }}>Sir Ahmed Ali</p>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Lead Developer @ FAST</p>
           </div>
           <MessageSquare size={18} style={{ cursor: 'pointer', color: 'var(--primary)' }} />
        </div>
      </aside>

      {/* 🤖 FAST AI ASSISTANT OVERLAY (OPENAI STYLE) */}
      <AnimatePresence>
        {isAiOpen && (
          <motion.div 
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="glass-panel"
            style={{ 
              position: 'absolute', right: 0, top: 0, bottom: 0, width: '400px', 
              zIndex: 100, display: 'flex', flexDirection: 'column', 
              boxShadow: '-10px 0 30px rgba(0,0,0,0.1)', background: 'white' 
            }}
          >
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Brain size={24} color="var(--primary)" />
                  <h4 style={{ fontWeight: 800 }}>FAST AI Tutor</h4>
               </div>
               <button onClick={() => setIsAiOpen(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}><MoreHorizontal /></button>
            </div>

            <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="custom-scrollbar">
               {aiChat.map((msg, i) => (
                 <div key={i} style={{ display: 'flex', gap: '1rem', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
                    <div style={{ 
                      width: '32px', height: '32px', borderRadius: '50%', 
                      background: msg.role === 'user' ? 'var(--secondary)' : 'var(--primary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                    }}>
                       {msg.role === 'user' ? <User size={16} /> : <Sparkles size={16} />}
                    </div>
                    <div style={{ 
                      background: msg.role === 'user' ? 'var(--bg-deep)' : 'var(--primary-glow)',
                      padding: '0.75rem 1rem', borderRadius: '12px', maxWidth: '80%)',
                      fontSize: '0.9rem', lineHeight: 1.5
                    }}>
                       {msg.content}
                    </div>
                 </div>
               ))}
            </div>

            <form onSubmit={handleAiSend} style={{ padding: '1.5rem', borderTop: '1px solid var(--border-light)' }}>
               <div style={{ position: 'relative' }}>
                  <input 
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="Ask about this lesson..."
                    style={{ width: '100%', padding: '0.8rem 3rem 0.8rem 1rem', borderRadius: '10px', border: '1px solid var(--border-light)', outline: 'none' }}
                  />
                  <button type="submit" style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', background: 'var(--primary)', color: 'white', border: 'none', padding: '0.4rem', borderRadius: '6px', cursor: 'pointer' }}>
                     <Send size={16} />
                  </button>
               </div>
               <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '0.75rem', textAlign: 'center' }}>FAST AI can make mistakes. Verify important information.</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🚀 PRO FEATURE UNLOCKER (FLOATING) */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        style={{ 
          position: 'fixed', bottom: '2rem', left: '2rem', 
          background: 'linear-gradient(45deg, #0F172A, #334155)', 
          color: 'white', padding: '0.8rem 1.5rem', borderRadius: '50px',
          display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer',
          boxShadow: '0 10px 20px rgba(0,0,0,0.2)', zIndex: 50
        }}
      >
        <Award size={20} color="#F59E0B" />
        <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>UPGRADE TO ELITE</span>
        <ChevronRight size={16} />
      </motion.div>

    </div>
  );
};

export default CourseLMS;
