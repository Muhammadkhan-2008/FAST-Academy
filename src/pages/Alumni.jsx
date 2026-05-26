import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Globe, Award, Sparkles, ArrowRight, Users } from 'lucide-react';

const Alumni = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', color: 'white' }}>
      <Navbar />
      <div className="mesh-grid" style={{ opacity: 0.1 }} />
      
      <div style={{ padding: '8rem 5% 4rem', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1.5rem', background: 'var(--primary-glow)', borderRadius: '99px', fontSize: '0.7rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '2.5rem', border: '1px solid var(--primary-glow)', letterSpacing: '0.15em' }}>
             <Users size={14} /> GLOBAL RESEARCH NETWORK
          </div>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>FAST <span className="gradient-text">ALUMNI CORE</span></h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-dim)', marginBottom: '3rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
            The legacy of FAST is defined by the leaders, innovators, and pioneers who have passed through our institutional gates.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem', marginBottom: '6rem' }}>
          {[
            { icon: <Globe size={32} />, title: 'Global Footprint', desc: 'Active scholars in over 40 countries leading technology sectors.' },
            { icon: <Briefcase size={32} />, title: 'Executive Access', desc: 'Direct mentoring and placement programs within the network.' },
            { icon: <Award size={32} />, title: 'Scholarly Archive', desc: 'Lifelong access to institutional resources and neural nodes.' }
          ].map((item, i) => (
            <motion.div 
              key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass-card" style={{ padding: '3rem', border: '1px solid var(--border-light)', textAlign: 'center' }}
            >
              <div style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-dim)', lineHeight: 1.6 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <section className="glass-card" style={{ padding: '5rem 3rem', textAlign: 'center', border: '1px solid var(--primary-glow)', background: 'linear-gradient(135deg, rgba(15,23,42,0.6), rgba(14,165,233,0.05))' }}>
          <div style={{ width: '80px', height: '80px', background: 'var(--primary-glow)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', margin: '0 auto 2.5rem', boxShadow: '0 0 30px var(--primary-glow)' }}>
             <GraduationCap size={48} />
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>JOINT MENTORSHIP PROTOCOL</h2>
          <p style={{ color: 'var(--text-dim)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.1rem', lineHeight: 1.7 }}>
            Contribute to the institutional knowledge base by guiding the next generation of scholars, or synchronize with a mentor to navigate your own professional orbit.
          </p>
          <button className="premium-btn" style={{ padding: '1rem 3rem' }}>ENROLL AS MENTOR <Sparkles size={20} style={{ marginLeft: '0.75rem' }} /></button>
        </section>
      </div>
    </div>
  );
};

export default Alumni;
