import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Shield, Target, Users, Zap, Award, Globe, Rocket } from 'lucide-react';

const About = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', color: 'var(--text-main)' }}>
      <Navbar />
      <div className="mesh-grid" style={{ opacity: 0.05 }} />
      
      <div style={{ padding: '10rem 6% 6rem', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
         <header style={{ textAlign: 'center', marginBottom: '8rem' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
               <h1 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 900, letterSpacing: '-0.05em', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                 ENGINEERING <span style={{ color: 'var(--secondary)' }}>THE FUTURE.</span>
               </h1>
               <p style={{ color: 'var(--text-dim)', fontSize: '1.5rem', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6, fontWeight: 600 }}>
                 FAST Institute is a premier global hub for technical excellence, research, and high-performance career acceleration.
               </p>
            </motion.div>
         </header>

         <div className="bento-grid" style={{ marginBottom: '8rem' }}>
            <div className="glass-card" style={{ gridColumn: 'span 8', padding: '4rem', background: 'var(--bg-base)' }}>
               <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '2rem' }}>OUR INSTITUTIONAL <span className="gradient-text">CORE.</span></h2>
               <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--text-dim)', marginBottom: '2.5rem' }}>
                 Founded on the principles of neural innovation and architectural mastery, FAST provides a trajectory for scholars to transition from conceptual understanding to industry leadership. Our ecosystem is designed for those who seek to push the boundaries of AI, Engineering, and Pure Sciences.
               </p>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
                  {[
                    { title: 'Global Recognition', icon: <Globe color="var(--primary)" /> },
                    { title: 'Research Focused', icon: <Target color="var(--secondary)" /> },
                    { title: 'Elite Community', icon: <Users color="var(--accent)" /> },
                    { title: 'Rapid Deployment', icon: <Rocket color="var(--primary)" /> },
                  ].map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 800 }}>
                       {f.icon} {f.title}
                    </div>
                  ))}
               </div>
            </div>
            <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
               <div className="glass-card" style={{ padding: '3rem', background: 'var(--primary)', color: 'white' }}>
                  <Award size={48} style={{ marginBottom: '2rem' }} />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem' }}>VERIFIED EXCELLENCE</h3>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.6 }}>Awarded "Institution of the Year 2025" for technical curriculum innovation.</p>
               </div>
               <div className="glass-card" style={{ flex: 1, padding: '3rem', background: 'var(--bg-base)', border: '1px solid var(--border-light)' }}>
                  <Zap size={32} color="var(--secondary)" style={{ marginBottom: '1.5rem' }} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '1rem' }}>NEURAL SYNC</h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Our proprietary AI synchronization engine ensures every scholar gets a personalized learning path.</p>
               </div>
            </div>
         </div>

         <section style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '4rem' }}>LEADERSHIP TEAM</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2.5rem' }}>
               {[
                 { name: 'Dr. Sarah Khan', role: 'Head of Neural AI' },
                 { name: 'Engr. Ahmed Ali', role: 'Director of Architecture' },
                 { name: 'Dr. John Smith', role: 'Principal Researcher' },
                 { name: 'Ms. Maria Zain', role: 'Dean of Scholarships' }
               ].map((m, i) => (
                 <div key={i} className="glass-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--bg-subtle)', margin: '0 auto 1.5rem' }} />
                    <h4 style={{ fontWeight: 800, fontSize: '1.1rem' }}>{m.name}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 900, marginTop: '0.5rem' }}>{m.role}</p>
                 </div>
               ))}
            </div>
         </section>
      </div>
    </div>
  );
};

export default About;
