import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { BookOpen, Users, Clock, MessageSquare, Plus, Video, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const TeacherDashboard = () => {
  const { data, user } = useSchool();
  if (!user) return null;
  
  const myCourses = data.courses?.filter(c => c.teacherId === user.id) || [];
  const totalStudents = myCourses.reduce((acc, c) => acc + (c.students?.length || 0), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900 }}>FACULTY <span className="gradient-text">COMMAND CENTER</span></h2>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Orchestrate your curriculum and engage with global scholars.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
           <button className="premium-btn-ghost" style={{ padding: '0.6rem 1.2rem', fontSize: '0.75rem' }}>SCHEDULE</button>
           <button className="premium-btn">
             <Video size={18} /> LAUNCH BROADCASTER
           </button>
        </div>
      </header>

      {/* 📊 PERFORMANCE METRICS */}
      <div className="bento-grid">
        {[
          { label: 'ACTIVE PROGRAMS', value: myCourses.length, icon: <BookOpen size={20} />, color: 'var(--primary)' },
          { label: 'GLOBAL SCHOLARS', value: totalStudents, icon: <Users size={20} />, color: 'var(--secondary)' },
          { label: 'ACADEMIC HOURS', value: '184h', icon: <Clock size={20} />, color: '#818CF8' },
          { label: 'ENROLLMENT QUEUE', value: '14', icon: <Plus size={20} />, color: '#F472B6' },
        ].map((stat, i) => (
          <motion.div 
            key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="glass-card" 
            style={{ gridColumn: 'span 3', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}
          >
             <div style={{ padding: '0.75rem', background: `${stat.color}15`, color: stat.color, borderRadius: '12px', boxShadow: `0 0 20px ${stat.color}15` }}>{stat.icon}</div>
             <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.05em' }}>{stat.label}</p>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 900 }}>{stat.value}</h3>
             </div>
          </motion.div>
        ))}
      </div>

      <div className="bento-grid">
         {/* 📚 PROGRAM ORCHESTRATION */}
         <motion.div 
           initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
           className="glass-card" style={{ gridColumn: 'span 8', padding: '2rem' }}
         >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
               <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                 <BookOpen size={20} color="var(--primary)" /> PROGRAM MANAGEMENT
               </h3>
               <button className="premium-btn-ghost" style={{ fontSize: '0.7rem', padding: '0.4rem 1rem' }}>EXPAND CATALOG</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               {myCourses.map((course, i) => (
                 <motion.div 
                    key={course._id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                    style={{ 
                      padding: '1.25rem', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', 
                      border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' 
                    }}
                 >
                    <div>
                       <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>{course.name}</h4>
                       <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{course.students?.length || 0} Scholars actively enrolled</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                       <button className="premium-btn-ghost" style={{ padding: '0.5rem 1rem', fontSize: '0.7rem' }}>METRICS</button>
                       <button className="premium-btn" style={{ padding: '0.5rem 1.2rem', fontSize: '0.7rem' }}>GO LIVE</button>
                    </div>
                 </motion.div>
               ))}
               {myCourses.length === 0 && (
                 <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                    <Plus size={48} color="var(--text-muted)" style={{ opacity: 0.2, marginBottom: '1.5rem' }} />
                    <p style={{ color: 'var(--text-muted)' }}>Initialize your first program to begin teaching.</p>
                 </div>
               )}
            </div>
         </motion.div>

         {/* 📡 BROADCAST READY */}
         <motion.div 
           initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
           className="glass-card" style={{ gridColumn: 'span 4', padding: '2.5rem', background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(129, 140, 248, 0.05) 100%)' }}
         >
            <h3 style={{ marginBottom: '2rem', fontSize: '1rem', color: 'var(--text-main)', letterSpacing: '0.05em' }}>LIVE TRANSMISSION</h3>
            <div style={{ background: 'rgba(45, 212, 191, 0.05)', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--primary-glow)', marginBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
               <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'var(--primary-glow)', filter: 'blur(40px)', borderRadius: '50%' }} />
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', position: 'relative' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--primary)', background: 'rgba(45, 212, 191, 0.1)', padding: '0.3rem 0.75rem', borderRadius: '99px', border: '1px solid var(--primary-glow)', animation: 'pulse 2s infinite' }}>T-MINUS 45M</span>
                  <Clock size={18} color="var(--primary)" />
               </div>
               <h4 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem', position: 'relative' }}>Neural Architecture</h4>
               <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5, position: 'relative' }}>Topic: Hyper-parameter optimization in large-scale models.</p>
            </div>
            <button className="premium-btn" style={{ width: '100%', justifyContent: 'center', height: '3.5rem' }}>
              LAUNCH STUDIO
            </button>
         </motion.div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
