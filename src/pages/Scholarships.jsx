import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, FileText, CheckCircle, ArrowRight, Zap, Shield, Sparkles, Rocket } from 'lucide-react';
import Navbar from '../components/Navbar';

const Scholarships = () => {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', color: 'var(--text-main)' }}>
      <Navbar />
      <div className="mesh-grid" style={{ opacity: 0.1 }} />
      
      <div style={{ padding: '8rem 5% 4rem', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1.5rem', background: 'var(--primary-glow)', borderRadius: '99px', fontSize: '0.7rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '2rem', border: '1px solid var(--primary-glow)', letterSpacing: '0.15em' }}>
               <Sparkles size={14} /> INSTITUTIONAL GRANTS 2026
            </div>
            <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>FINANCIAL <span className="gradient-text">EMPOWERMENT</span></h1>
            <p style={{ color: 'var(--text-dim)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>The FAST Ecosystem offers merit-based scholarships to empower exceptional talent and bridge the gap between potential and opportunity.</p>
         </motion.div>

         <div className="bento-grid" style={{ marginBottom: '6rem' }}>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="glass-card" 
              style={{ gridColumn: 'span 8', padding: '4rem', border: '1px solid var(--primary-glow)', background: 'var(--bg-card)' }}
            >
               <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
                  <div style={{ width: '70px', height: '70px', background: 'var(--primary-glow)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', border: '1px solid var(--primary-glow)' }}>
                     <Award size={40} />
                  </div>
                  <div>
                     <h2 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-1px' }}>Turing Innovator Grant</h2>
                     <p style={{ color: 'var(--primary)', fontWeight: 800, letterSpacing: '0.1em', fontSize: '0.8rem' }}>100% TUITION COVERAGE</p>
                  </div>
               </div>
               <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '3rem' }}>
                  A fully-funded grant covering total tuition for the Advanced Web Architecture and AI Foundation tracks. Aimed at candidates demonstrating exceptional logical aptitude and meaningful project history.
               </p>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                  {[
                    'Complete Tuition Remission',
                    'Priority Lab Resource Allocation',
                    'Direct Faculty Mentorship',
                    'Industry Placement Support'
                  ].map((benefit, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)', fontWeight: 600 }}>
                       <CheckCircle size={18} color="var(--primary)" /> {benefit}
                    </div>
                  ))}
               </div>
               <button onClick={() => navigate('/apply/scholarship/turing-100')} className="premium-btn" style={{ padding: '1rem 2.5rem' }}>
                  SUBMIT APPLICATION <ArrowRight size={20} />
               </button>
            </motion.div>

            <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
               <div className="glass-card" style={{ padding: '2.5rem', border: '1px solid var(--border-light)' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 900, marginBottom: '1.5rem', color: 'var(--primary)' }}>NEXT DEADLINE</h4>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-1px' }}>AUG 15 <span style={{ fontSize: '1rem', color: 'var(--text-dim)' }}>2026</span></div>
               </div>
               <div className="glass-card" style={{ flex: 1, padding: '2.5rem', border: '1px solid var(--border-light)', background: 'var(--bg-card)' }}>
                  <Shield size={32} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                  <h4 style={{ fontSize: '1rem', fontWeight: 900, marginBottom: '1rem' }}>VERIFICATION</h4>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', lineHeight: 1.6 }}>All grants are subject to institutional verification and merit-based ranking through our Neural Assessment system.</p>
               </div>
            </div>
         </div>

         <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '3rem', letterSpacing: '0.1em' }}>APPLICATION REQUISITES</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
               {[
                 { title: 'Academic History', icon: <FileText /> },
                 { title: 'Research Intent', icon: <Zap /> },
                 { title: 'Technical Portfolio', icon: <Rocket /> }
               ].map((req, i) => (
                 <div key={i} className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <div style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>{req.icon}</div>
                    <h4 style={{ fontWeight: 800 }}>{req.title}</h4>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default Scholarships;
