import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSchool } from '../context/SchoolContext';
import { useAuth } from '@clerk/clerk-react';
import { ShieldCheck, UserCog, GraduationCap, ArrowRight, Lock, Zap, Globe, Sparkles, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

const PortalSelection = () => {
  const { user } = useSchool();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSelect = (role) => {
    if (user && user.role !== role && user.role !== 'ceo') {
      return; 
    }
    navigate(`/${role}`);
  };

  const portals = [
    { 
      role: 'ceo', 
      title: 'DIRECTORATE', 
      desc: 'Institutional oversight, executive strategy, and system-wide verification.',
      icon: <ShieldCheck size={48} />,
      color: 'var(--primary)',
      restricted: user?.role !== 'ceo'
    },
    { 
      role: 'teacher', 
      title: 'FACULTY HUB', 
      desc: 'Curriculum orchestration, student assessment, and dynamic classroom leadership.',
      icon: <UserCog size={48} />,
      color: 'var(--secondary)',
      restricted: user?.role !== 'teacher' && user?.role !== 'ceo'
    },
    { 
      role: 'student', 
      title: 'SCHOLAR PORTAL', 
      desc: 'Personalized learning trajectory, research archives, and peer collaboration.',
      icon: <GraduationCap size={48} />,
      color: 'var(--primary)',
      restricted: false 
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-deep)', color: 'var(--text-main)', position: 'relative', overflow: 'hidden' }}>
      <div className="mesh-grid" style={{ opacity: 0.1 }} />
      
      <header style={{ padding: '3rem 6%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <img src="/logo.png" alt="FAST" style={{ width: '45px' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--primary)' }}>FAST <span style={{ color: 'var(--text-main)' }}>INSTITUTE</span></h2>
         </div>
         <button onClick={() => signOut()} style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.8rem', border: '1px solid #ef4444', background: 'transparent', padding: '0.6rem 1.5rem', borderRadius: '10px', cursor: 'pointer' }}>LOG OUT</button>
      </header>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', zIndex: 10 }}>
         <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
               <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1.5rem', background: 'var(--primary-glow)', borderRadius: '99px', fontSize: '0.7rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '2.5rem', border: '1px solid var(--primary)', letterSpacing: '0.15em' }}>
                  <Building2 size={14} /> AUTHORIZED SECTOR ACCESS
               </div>
               <h1 style={{ fontSize: '4.5rem', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '1.5rem', color: 'var(--primary)' }}>CHOOSE YOUR <span style={{ color: 'var(--text-main)' }}>SECTOR</span></h1>
               <p style={{ color: 'var(--text-dim)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6, fontWeight: 600 }}>
                  Welcome back, <span style={{ color: 'var(--primary)' }}>{user?.name}</span>. Access the sector corresponding to your institutional authorization.
               </p>
            </motion.div>
         </div>

         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem', width: '100%', maxWidth: '1300px' }}>
            {portals.map((p, i) => (
              <motion.div 
                key={p.role}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => !p.restricted && handleSelect(p.role)}
                className="glass-card"
                style={{ 
                  padding: '4.5rem 3.5rem', cursor: p.restricted ? 'not-allowed' : 'pointer', 
                  background: 'white', border: p.restricted ? '1px solid var(--border-light)' : `1px solid var(--border-light)`,
                  textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center',
                  opacity: p.restricted ? 0.6 : 1,
                  boxShadow: p.restricted ? 'none' : '0 10px 30px rgba(0,0,0,0.05)'
                }}
              >
                {!p.restricted && (
                  <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--primary)' }}>
                    <Sparkles size={20} />
                  </div>
                )}
                
                <div style={{ 
                  width: '90px', height: '90px', borderRadius: '25px', 
                  background: p.restricted ? 'var(--bg-subtle)' : 'var(--primary-glow)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: p.restricted ? 'var(--text-muted)' : 'var(--primary)',
                  marginBottom: '2.5rem', border: `1px solid ${p.restricted ? 'var(--border-light)' : 'var(--primary)'}`
                }}>
                   {p.icon}
                </div>

                <h2 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '1.25rem', color: 'var(--primary)' }}>{p.title}</h2>
                <p style={{ color: 'var(--text-dim)', marginBottom: '3rem', lineHeight: 1.7, fontSize: '0.95rem', fontWeight: 600 }}>{p.desc}</p>
                
                {!p.restricted ? (
                  <motion.div 
                    whileHover={{ x: 10 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 900, color: 'var(--secondary)', fontSize: '0.85rem', letterSpacing: '0.1em' }}
                  >
                    ENTER SECTOR <ArrowRight size={20} />
                  </motion.div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 900, letterSpacing: '0.1em', background: 'var(--bg-subtle)', padding: '0.6rem 1.5rem', borderRadius: '99px' }}>
                    <Lock size={14} /> UNAUTHORIZED
                  </div>
                )}
              </motion.div>
            ))}
         </div>
      </main>

      <footer style={{ padding: '5rem', textAlign: 'center', borderTop: '1px solid var(--border-light)', zIndex: 10 }}>
         <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em' }}>© 2026 FAST INSTITUTE • SECURITY PROTOCOL v4.5</p>
      </footer>
    </div>
  );
};

export default PortalSelection;
