import React, { useState, useEffect } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { BookOpen, Calendar, ChevronRight, Award, Flame, Brain, Cpu, Library, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const { user, data } = useSchool();
  const navigate = useNavigate();
  const [activeNotice, setActiveNotice] = useState(0);

  const enrolledCourses = data.courses?.filter(c => 
    c.students?.includes(user?.id) || c.students?.includes(user?._id) || c.students?.includes(user?.clerkId)
  ) || [];
  
  const isAdmitted = enrolledCourses.length > 0;

  const notices = [
    { title: "Mid-Term Examination Schedule Released", date: "May 20, 2026", type: "Urgent" },
    { title: "New Advanced AI Lab Facility Open for Scholars", date: "May 18, 2026", type: "Update" },
    { title: "Scholarship Applications for Fall Session Open", date: "May 15, 2026", type: "Grant" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNotice(prev => (prev + 1) % notices.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', width: '100%' }}>
      
      {/* 🚀 ELITE HERO SECTION */}
      <section className="glass-card" style={{ padding: '3rem', background: 'linear-gradient(135deg, rgba(75, 0, 130, 0.05), transparent)', border: '1px solid var(--primary-glow)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
               <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }} />
               <span style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.15em', color: 'var(--primary)' }}>SYSTEM ONLINE • COHORT 26</span>
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>NEURAL TERM <span style={{ color: 'var(--primary)' }}>ACTIVE.</span></h1>
            <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', maxWidth: '600px', lineHeight: 1.6 }}>Welcome back, <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>{user.name}</span>. Your cognitive load is optimal. 3 assignments pending across active sectors.</p>
         </div>
         <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
               <p style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>78%</p>
               <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>PROGRESS</p>
            </div>
            <div style={{ width: '1px', height: '50px', background: 'var(--border-light)' }} />
            <div style={{ textAlign: 'center' }}>
               <p style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-main)', lineHeight: 1 }}>12</p>
               <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>CREDITS</p>
            </div>
         </div>
      </section>

      {/* 📢 GLOBAL NOTICE BOARD (DYNAMIC) */}
      <section className="glass-card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderLeft: '4px solid var(--primary)' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div style={{ background: 'var(--primary-glow)', padding: '1rem', borderRadius: '15px' }}>
               <Flame size={24} color="var(--primary)" />
            </div>
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeNotice}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              >
                 <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{notices[activeNotice].type} • {notices[activeNotice].date}</span>
                 <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>{notices[activeNotice].title}</p>
              </motion.div>
            </AnimatePresence>
         </div>
         <button className="premium-btn-ghost" style={{ padding: '0.75rem 2rem' }}>VIEW ARCHIVE</button>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
        
        {/* 📚 LEFT COLUMN: CORE ACADEMICS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
           
           <section>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
                 <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><BookOpen size={20} color="var(--primary)" /> ACTIVE MODULES</h2>
                 <button onClick={() => navigate('/student/enrolled')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>VIEW ALL <ChevronRight size={16} /></button>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                {!isAdmitted ? (
                  <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', border: '1px dashed var(--border-light)' }}>
                    <p style={{ color: 'var(--text-dim)', marginBottom: '1.5rem', fontWeight: 600 }}>You are not currently enrolled in any academic modules.</p>
                    <button onClick={() => navigate('/courses')} className="premium-btn" style={{ margin: '0 auto' }}>EXPLORE CATALOG</button>
                  </div>
                ) : (
                  enrolledCourses.map((course, i) => (
                    <motion.div key={course.id || i} whileHover={{ x: 5 }} className="glass-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                          <div style={{ width: '60px', height: '60px', background: 'var(--bg-subtle)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                             <Brain size={24} color="var(--text-dim)" />
                          </div>
                          <div>
                             <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '0.1em' }}>CS-40{i+1}</span>
                             <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{course.name}</h3>
                             <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600 }}>Prof. Alexander • 12 Modules</p>
                          </div>
                       </div>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                          <div style={{ textAlign: 'right' }}>
                             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 800, marginBottom: '0.5rem', width: '150px' }}>
                                <span>PROGRESS</span> <span>{80 - (i*10)}%</span>
                             </div>
                             <div style={{ height: '6px', width: '150px', background: 'var(--bg-subtle)', borderRadius: '10px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${80 - (i*10)}%`, background: 'var(--primary)' }} />
                             </div>
                          </div>
                          <button onClick={() => navigate('/lms')} className="premium-btn" style={{ padding: '0.75rem 1.5rem' }}>ENTER LAB</button>
                       </div>
                    </motion.div>
                  ))
                )}
              </div>
           </section>

           <section>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Library size={20} color="var(--primary)" /> RECENT RESOURCES</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                 {[1, 2].map(i => (
                    <div key={i} className="glass-card" style={{ padding: '1.5rem' }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                          <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)' }}>PDF DOCUMENT</span>
                          <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--primary)' }}>CS-401</span>
                       </div>
                       <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Neural Architecture Chap 0{i}</h4>
                       <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Added 2 days ago • 4.5 MB</p>
                    </div>
                 ))}
              </div>
           </section>

        </div>

        {/* ⏱️ RIGHT COLUMN: TELEMETRY & COMMS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
           
           <section className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                 <h2 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Calendar size={18} color="var(--primary)" /> ACADEMIC TIMELINE</h2>
                 <button onClick={() => navigate('/student/progress')} style={{ background: 'var(--primary-glow)', color: 'var(--primary)', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 800, cursor: 'pointer' }}>FULL TRACKING</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
                 <div style={{ position: 'absolute', left: '6px', top: '10px', bottom: '10px', width: '2px', background: 'var(--border-light)' }} />
                 {[
                    { title: 'Institutional Onboarding', status: 'COMPLETED', date: 'May 01', active: true },
                    { title: 'Neural Architecture Phase 01', status: 'IN PROGRESS', date: 'Current', active: true },
                    { title: enrolledCourses[0]?.name || 'Scalability Capstone', status: 'LOCKED', date: 'June 15', active: false },
                 ].map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: '1.5rem', position: 'relative', zIndex: 1, opacity: step.active ? 1 : 0.5 }}>
                       <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: step.status === 'COMPLETED' ? 'var(--primary)' : 'var(--bg-card)', border: `3px solid ${step.active ? 'var(--primary)' : 'var(--border-light)'}`, marginTop: '4px' }} />
                       <div>
                          <p style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{step.date}</p>
                          <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{step.title}</h4>
                          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: step.status === 'COMPLETED' ? 'var(--primary)' : 'var(--text-dim)' }}>{step.status}</span>
                       </div>
                    </div>
                 ))}
              </div>
           </section>

           <section className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                 <h2 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Flame size={18} color="var(--primary)" /> ACTIVE GOALS</h2>
                 <button onClick={() => navigate('/student/goals')} style={{ border: 'none', background: 'transparent', color: 'var(--primary)', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer' }}>EDIT GOALS</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                 {[
                   { name: 'Complete Neural Net Module', p: 80 },
                   { name: 'Publish React Native App', p: 45 },
                   { name: 'Attend 1-on-1 Mentorship', p: 0 }
                 ].map((goal, i) => (
                    <div key={i}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                          <span>{goal.name}</span>
                          <span style={{ color: 'var(--primary)' }}>{goal.p}%</span>
                       </div>
                       <div style={{ height: '6px', width: '100%', background: 'var(--bg-subtle)', borderRadius: '10px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${goal.p}%`, background: 'var(--primary)' }} />
                       </div>
                    </div>
                 ))}
              </div>
           </section>

           <section className="glass-card" style={{ padding: '2rem', background: 'linear-gradient(135deg, var(--bg-card), var(--primary-glow))' }}>
              <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Award size={18} color="var(--primary)" /> 6-MONTH MENTORSHIP</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '1.5rem', lineHeight: 1.6 }}>Your next one-on-one session with your career advisor is scheduled for Friday.</p>
              <button onClick={() => navigate('/student/mentorship')} className="premium-btn" style={{ width: '100%', justifyContent: 'center', padding: '0.8rem' }}>VIEW ADVISOR NOTES</button>
           </section>

           {/* CONDITIONAL INTERNSHIP BLOCK */}
           {enrolledCourses.some(c => {
             const cat = (c.category || '').toLowerCase();
             return cat.includes('ai') || cat.includes('cyber') || cat.includes('tech') || cat.includes('engineering') || cat.includes('security');
           }) && (
             <section className="glass-card" style={{ padding: '2rem', border: '1px solid var(--secondary)' }}>
                <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--secondary)' }}><Flame size={18} /> ELITE INTERNSHIP</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '1.5rem', lineHeight: 1.6 }}>Your technical curriculum qualifies you for the Google Cloud & FAST AI partnership internship.</p>
                <button onClick={() => navigate('/student/internships')} className="premium-btn" style={{ width: '100%', justifyContent: 'center', padding: '0.8rem', background: 'var(--secondary)' }}>APPLY FOR COHORT</button>
             </section>
           )}

        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
