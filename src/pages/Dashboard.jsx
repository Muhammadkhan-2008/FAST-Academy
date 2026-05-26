import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, CheckCircle, Calendar } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Courses Enrolled', value: '12', icon: <CheckCircle color="var(--primary)" /> },
    { label: 'Hours Studied', value: '48h', icon: <Clock color="var(--secondary)" /> },
    { label: 'Live Classes', value: '3 Today', icon: <Play color="var(--accent)" /> },
    { label: 'Attendance', value: '94%', icon: <Calendar color="var(--success)" /> },
  ];

  const upcomingClasses = [
    { title: 'Advanced Mathematics', teacher: 'Dr. MK', time: '10:00 AM', date: 'Tomorrow' },
    { title: 'Full Stack Development', teacher: 'Prof. Circle', time: '02:00 PM', date: 'May 10' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Student Dashboard</h1>
        <p style={{ color: 'var(--text-muted)' }}>Welcome back! You have 3 classes today.</p>
      </header>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 1.02 }}
            className="glass-card" 
            style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
          >
            <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
              {stat.icon}
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stat.value}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Learning Progress */}
        <section className="glass" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Learning Progress</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {['Physics Unit 4', 'Chemistry Unit 2', 'English Literature'].map((subject, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.9rem' }}>{subject}</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>{75 - (i * 15)}%</span>
                </div>
                <div style={{ height: '8px', background: 'var(--surface-light)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${75 - (i * 15)}%`, background: 'var(--primary)' }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Classes */}
        <section className="glass" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Upcoming Classes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {upcomingClasses.map((cls, i) => (
              <div key={i} style={{ padding: '1rem', borderLeft: '3px solid var(--primary)', background: 'rgba(255,255,255,0.02)' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{cls.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cls.teacher} • {cls.time}</p>
                <p style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: 'var(--primary)' }}>{cls.date}</p>
              </div>
            ))}
            <button className="btn-primary" style={{ padding: '0.6rem', fontSize: '0.9rem', marginTop: '1rem' }}>
              View Schedule
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
