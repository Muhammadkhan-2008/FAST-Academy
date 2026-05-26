import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Users, BookOpen, ShieldAlert, TrendingUp, Activity, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const CEODashboard = () => {
  const { stats, data, user } = useSchool();
  if (!user) return null;

  const statsList = [
    { label: 'VERIFIED FACULTY', value: stats.totalTeachers, icon: <Users size={20} />, color: 'var(--primary)', trend: '+12% this month' },
    { label: 'SCHOLAR NETWORK', value: stats.totalStudents, icon: <TrendingUp size={20} />, color: 'var(--secondary)', trend: '+5% growth' },
    { label: 'ACTIVE SYLLABUS', value: stats.activeCourses, icon: <BookOpen size={20} />, color: '#818CF8', trend: 'Live Sync' },
    { label: 'RISK QUEUE', value: stats.pendingVerifications, icon: <ShieldAlert size={20} />, color: '#F472B6', trend: 'Priority' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* 🚀 ELITE STATS BENTO */}
      <div className="bento-grid">
        {statsList.map((s, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card"
            style={{ gridColumn: 'span 3', padding: '1.5rem', background: 'var(--bg-card)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
               <div style={{ padding: '0.75rem', background: `${s.color}15`, color: s.color, borderRadius: '12px', boxShadow: `0 0 20px ${s.color}20` }}>
                 {s.icon}
               </div>
               <span style={{ fontSize: '0.65rem', fontWeight: 800, color: s.color, background: `${s.color}10`, padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{s.trend}</span>
            </div>
            <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-dim)', letterSpacing: '0.05em' }}>{s.label}</p>
            <h3 style={{ fontSize: '2rem', fontWeight: 900, marginTop: '0.5rem' }}>{s.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="bento-grid">
        {/* 📉 SYSTEM PULSE MONITOR */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card" 
          style={{ gridColumn: 'span 8', padding: '2rem' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
             <div>
                <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Activity size={20} color="var(--primary)" /> SYSTEM PULSE MONITOR
                </h2>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Real-time institutional activity stream</p>
             </div>
             <button className="premium-btn-ghost" style={{ fontSize: '0.7rem', padding: '0.4rem 1rem' }}>REBOOT LOGS</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {data.pendingUsers?.length > 0 ? (
              data.pendingUsers.map((item, i) => (
                <motion.div 
                  key={i} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1rem', 
                    background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border-light)' 
                  }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.8rem' }}>
                     {item.name[0]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.name} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>requested</span> {item.role} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>access</span></p>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{new Date(item.createdAt).toLocaleString()}</p>
                  </div>
                  <button className="premium-btn" style={{ padding: '0.4rem 1rem', fontSize: '0.7rem' }}>VERIFY</button>
                </motion.div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                 <ShieldAlert size={48} color="var(--text-muted)" style={{ marginBottom: '1.5rem', opacity: 0.3 }} />
                 <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>No critical alerts in the verification pipeline.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* 🌐 INSTITUTIONAL CORE */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card" 
          style={{ gridColumn: 'span 4', padding: '2rem', display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Globe size={20} color="var(--secondary)" /> CORE METRICS
            </h2>
          </div>
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
             {[
               { label: 'Database Sync', val: '99.9%', color: 'var(--primary)' },
               { label: 'Network Integrity', val: 'Secure', color: 'var(--secondary)' },
               { label: 'AI Assistance', val: 'Active', color: '#818CF8' }
             ].map((m, i) => (
               <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                     <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)' }}>{m.label}</span>
                     <span style={{ fontSize: '0.75rem', fontWeight: 900, color: m.color }}>{m.val}</span>
                  </div>
                  <div style={{ height: '4px', background: 'var(--bg-subtle)', borderRadius: '99px', overflow: 'hidden' }}>
                     <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1, delay: 0.5 }} style={{ height: '100%', background: m.color }} />
                  </div>
               </div>
             ))}
          </div>

          <button className="premium-btn" style={{ width: '100%', marginTop: '3rem', justifyContent: 'center' }}>
            GLOBAL COMMAND CENTER
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default CEODashboard;
