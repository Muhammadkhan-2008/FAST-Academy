import React, { useState, useEffect } from 'react';
import { Video, Users, Clock, Play, Calendar, Zap, Bell, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { API_URL } from '../../utils/api';

const LiveClasses = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/sessions/active`)
      .then(r => r.json())
      .then(data => { setSessions(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => { setSessions([]); setLoading(false); });

    // Refresh every 30 seconds
    const interval = setInterval(() => {
      fetch(`${API_URL}/api/sessions/active`)
        .then(r => r.json())
        .then(data => setSessions(Array.isArray(data) ? data : []))
        .catch(() => {});
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const scheduled = [
    { title: 'Advanced Neural Architecture — Live Q&A', teacher: 'Dr. Sarah Khan', time: 'Today 3:00 PM', students: 45, course: 'Neural Architecture' },
    { title: 'Full Stack Architecture Workshop', teacher: 'Prof. Ahmed Ali', time: 'Tomorrow 10:00 AM', students: 32, course: 'Web Architecture' },
    { title: 'Quantum Security Masterclass', teacher: 'Dr. Fatima Hussain', time: 'May 28, 2:00 PM', students: 28, course: 'Quantum Security' },
    { title: 'React Performance Optimization', teacher: 'Prof. Ali Hassan', time: 'May 30, 11:00 AM', students: 54, course: 'Web Architecture' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', width: '100%' }}>
      <header>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>
          LIVE <span style={{ color: 'var(--primary)' }}>CLASSES</span>
        </h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', fontWeight: 600 }}>
          Join real-time sessions with your faculty. Interact, ask questions, learn live.
        </p>
      </header>

      {/* LIVE NOW Section */}
      {loading ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
          <div className="loader" style={{ margin: '0 auto' }} />
        </div>
      ) : sessions.length > 0 ? (
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e', animation: 'pulse 1.5s infinite', boxShadow: '0 0 12px #22c55e' }} />
            <h3 style={{ fontWeight: 900, color: '#22c55e', fontSize: '1rem', letterSpacing: '0.1em' }}>LIVE NOW</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
            {sessions.map((s, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.02 }} 
                className="glass-card" 
                style={{ padding: '2rem', border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(34,197,94,0.04)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e', animation: 'pulse 1.5s infinite' }} />
                  <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#22c55e', letterSpacing: '0.1em' }}>BROADCASTING</span>
                </div>
                <h3 style={{ fontWeight: 900, marginBottom: '0.5rem', fontSize: '1.2rem' }}>Room: {s.roomName}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '1.5rem' }}>Live session in progress</p>
                <button 
                  onClick={() => window.open(`https://meet.jit.si/${s.roomName}#config.prejoinPageEnabled=false`, '_blank')}
                  className="premium-btn" 
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Play size={18} /> JOIN NOW <ExternalLink size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      ) : (
        <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid var(--primary)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Zap size={28} color="var(--primary)" />
          <div>
            <p style={{ fontWeight: 800, marginBottom: '0.25rem' }}>No live sessions right now</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Sessions will appear here when a teacher starts a broadcast. Check upcoming sessions below.</p>
          </div>
        </div>
      )}

      {/* UPCOMING Sessions */}
      <section>
        <h3 style={{ fontWeight: 900, marginBottom: '1.5rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Calendar size={20} color="var(--primary)" />
          UPCOMING SESSIONS
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {scheduled.map((s, i) => (
            <motion.div 
              key={i} 
              whileHover={{ x: 5 }} 
              className="glass-card" 
              style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--border-light)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '15px', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Video size={22} color="var(--primary)" />
                </div>
                <div>
                  <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '0.1em' }}>{s.course.toUpperCase()}</span>
                  <h4 style={{ fontWeight: 800, marginBottom: '0.25rem', marginTop: '0.25rem', fontSize: '1rem' }}>{s.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                    {s.teacher} • <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{s.time}</span>
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexShrink: 0 }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Users size={14} />{s.students} enrolled
                </span>
                <button className="premium-btn-ghost" style={{ padding: '0.5rem 1.5rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Bell size={14} /> REMIND ME
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <div className="glass-card" style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)' }}>
        <h4 style={{ fontWeight: 900, marginBottom: '1.5rem', fontSize: '0.9rem', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>HOW TO JOIN A LIVE CLASS</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {[
            { step: '01', title: 'Wait for broadcast', desc: 'When your teacher starts a session, it appears in "Live Now".' },
            { step: '02', title: 'Click Join Now', desc: 'Opens Jitsi Meet — no downloads or accounts needed.' },
            { step: '03', title: 'Participate', desc: 'Enable your mic/camera, ask questions, and interact in real-time.' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary)', opacity: 0.3, lineHeight: 1 }}>{s.step}</span>
              <div>
                <p style={{ fontWeight: 800, marginBottom: '0.25rem' }}>{s.title}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveClasses;
