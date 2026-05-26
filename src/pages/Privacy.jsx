import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, UserCheck } from 'lucide-react';

const Privacy = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', color: 'var(--text-main)' }}>
      <Navbar />
      <div className="mesh-grid" style={{ opacity: 0.05 }} />
      
      <div style={{ padding: '10rem 6% 6rem', maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <div style={{ width: '80px', height: '80px', background: 'var(--primary-glow)', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', margin: '0 auto 2rem' }}>
               <Shield size={42} />
            </div>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '-0.04em' }}>PRIVACY <span style={{ color: 'var(--text-main)' }}>PROTOCOL</span></h1>
            <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', fontWeight: 600 }}>FAST Institutional Privacy Policy & Data Governance</p>
         </motion.div>

         <div className="glass-card" style={{ padding: '4rem', background: 'var(--bg-base)', lineHeight: 1.8 }}>
            <section style={{ marginBottom: '4rem' }}>
               <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Lock size={24} color="var(--primary)" /> 1. DATA ENCRYPTION
               </h2>
               <p style={{ color: 'var(--text-dim)' }}>
                 All scholar data, including academic records and personal identifiers, are encrypted using institutional-grade 256-bit protocols. We utilize end-to-end encryption for all real-time communications within the FAST ecosystem.
               </p>
            </section>

            <section style={{ marginBottom: '4rem' }}>
               <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Eye size={24} color="var(--secondary)" /> 2. INFORMATION USAGE
               </h2>
               <p style={{ color: 'var(--text-dim)' }}>
                 Personal data is exclusively used for academic synchronization, personalized learning trajectory optimization, and institutional verification. We do not share data with third-party entities for commercial purposes.
               </p>
            </section>

            <section style={{ marginBottom: '4rem' }}>
               <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <UserCheck size={24} color="var(--primary)" /> 3. SCHOLAR RIGHTS
               </h2>
               <p style={{ color: 'var(--text-dim)' }}>
                 Every scholar has the right to access, rectify, or request the deletion of their institutional profile. Data portability is supported for all certified academic achievements.
               </p>
            </section>

            <div style={{ background: 'var(--bg-subtle)', padding: '2rem', borderRadius: '15px', textAlign: 'center', border: '1px solid var(--border-light)' }}>
               <FileText size={32} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
               <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700 }}>LAST UPDATED: MAY 15, 2026 • FAST COMPLIANCE DEPT.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Privacy;
