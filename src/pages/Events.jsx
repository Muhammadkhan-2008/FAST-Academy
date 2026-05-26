import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';

const Events = () => {
  const events = [
    { title: 'Annual AI Symposium', date: 'Oct 15, 2026', location: 'Main Auditorium', type: 'Conference' },
    { title: 'Tech Career Fair 2026', date: 'Nov 02, 2026', location: 'Virtual', type: 'Career' },
    { title: 'Neural Networks Workshop', date: 'Nov 18, 2026', location: 'Lab Alpha', type: 'Workshop' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-subtle)' }}>
      <Navbar />
      <div style={{ padding: 'clamp(2rem, 5vw, 5rem)', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.1 }}>
            Upcoming <span className="gradient-text">Events</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px' }}>
            Discover workshops, symposiums, and career fairs hosted by FAST Institute to enhance your academic journey.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {events.map((ev, i) => (
            <motion.div 
              key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              className="glass-card" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}
            >
              <div>
                <div style={{ display: 'inline-block', padding: '0.3rem 0.8rem', background: 'var(--primary-glow)', color: 'var(--primary)', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '1rem' }}>
                  {ev.type}
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>{ev.title}</h3>
                <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={16} /> {ev.date}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={16} /> {ev.location}</span>
                </div>
              </div>
              <button className="neo-btn neo-btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Register <ArrowRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
