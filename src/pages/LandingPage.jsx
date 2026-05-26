import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Sparkles, Brain, Cpu, Rocket, 
  Globe, Shield, Zap, ChevronRight, 
  Search, Star, Users, BookOpen, Mail, MapPin, Phone
} from 'lucide-react';
import AISearchOverlay from '../components/AISearchOverlay';
import Logo from '../assets/logo.png';
import Navbar from '../components/Navbar';

const LandingPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { isSignedIn } = useAuth();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', color: 'var(--text-main)', position: 'relative', overflow: 'hidden' }}>
      <div className="mesh-grid" style={{ opacity: 0.1 }} />
      <Navbar />

      {/* 🏛️ ELITE HERO SECTION */}
      <header style={{ 
        padding: '8rem 5% 10rem', 
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ maxWidth: '1400px', margin: '0 auto' }}
        >
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '0.75rem', 
            padding: '0.6rem 1.5rem', background: 'var(--primary-glow)', 
            borderRadius: '99px', color: 'var(--primary)', 
            fontSize: '0.7rem', fontWeight: 900, marginBottom: '3rem',
            border: '1px solid var(--primary)',
            letterSpacing: '0.15em'
          }}>
            <Sparkles size={14} fill="var(--primary)" /> ELITE ACADEMIC ECOSYSTEM 2026
          </div>

          <h1 style={{ 
            fontSize: 'clamp(3.5rem, 8vw, 7.5rem)', 
            fontWeight: 900, 
            lineHeight: 1.1, 
            marginBottom: '3rem', 
            color: 'var(--text-main)',
            letterSpacing: '-0.05em'
          }}>
            ARCHITECT THE <br /> <span style={{ color: 'var(--primary)' }}>FRONTIERS</span> OF TECH.
          </h1>

          <p style={{ 
            fontSize: '1.4rem', 
            color: 'var(--text-dim)', 
            maxWidth: '850px', 
            margin: '0 auto 5rem', 
            lineHeight: 1.7,
            fontWeight: 600
          }}>
            FAST Institute is the ultimate institutional engine for high-performance scholars. 
            Synthesizing intelligence to transform potential into global leadership.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginBottom: '6rem', flexWrap: 'wrap' }}>
            <button onClick={() => navigate(isSignedIn ? '/portal-select' : '/courses')} className="premium-btn" style={{ padding: '1.25rem 3.5rem' }}>
              {isSignedIn ? 'ACCESS WORKSTATION' : 'GET STARTED'} <ArrowRight size={22} />
            </button>
            <button onClick={() => navigate('/about')} className="premium-btn-ghost" style={{ padding: '1.25rem 3.5rem' }}>
              ABOUT INSTITUTION <ChevronRight size={20} />
            </button>
          </div>

          <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}>
             <AISearchOverlay query={searchQuery} setQuery={setSearchQuery} />
          </div>
        </motion.div>
      </header>

      {/* 🚀 CORE SECTORS */}
      <section style={{ padding: '8rem 5%', maxWidth: '1400px', margin: '0 auto' }}>
         <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.5rem' }}>INSTITUTIONAL <span style={{ color: 'var(--primary)' }}>SECTORS</span></h2>
            <p style={{ color: 'var(--text-dim)', fontWeight: 600 }}>Explore the foundations of technical mastery.</p>
         </div>
         
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' }}>
            {[
              { icon: <Brain size={40} />, title: 'Neural Labs', desc: 'Advanced AI and Machine Learning research clusters.' },
              { icon: <Cpu size={40} />, title: 'Architecture Hub', desc: 'Scalable system design and micro-service engineering.' },
              { icon: <Shield size={40} />, title: 'Security Vault', desc: 'Zero-trust protocols and offensive security research.' },
            ].map((sector, i) => (
              <motion.div 
                key={i} whileHover={{ y: -15 }}
                className="glass-card" style={{ padding: '4rem', textAlign: 'center' }}
              >
                 <div style={{ color: 'var(--primary)', marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>{sector.icon}</div>
                 <h3 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '1.5rem' }}>{sector.title}</h3>
                 <p style={{ color: 'var(--text-dim)', lineHeight: 1.7 }}>{sector.desc}</p>
              </motion.div>
            ))}
         </div>
      </section>

      {/* 📊 TELEMETRY DATA */}
      <section style={{ padding: '10rem 5%', background: 'var(--bg-subtle)' }}>
         <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4rem' }}>
            {[
              { val: '12K+', label: 'SCHOLARS' },
              { val: '150+', label: 'ELITE COURSES' },
              { val: '98%', label: 'SUCCESS RATE' },
              { val: '40+', label: 'GLOBAL NODES' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                 <div style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--primary)' }}>{s.val}</div>
                 <div style={{ fontSize: '0.8rem', fontWeight: 900, letterSpacing: '0.2em', color: 'var(--text-muted)', marginTop: '0.5rem' }}>{s.label}</div>
              </div>
            ))}
         </div>
      </section>

      {/* 🌍 INSTITUTIONAL FOOTER */}
      <footer style={{ padding: '10rem 5% 5rem', background: 'var(--bg-base)', borderTop: '1px solid var(--border-light)' }}>
         <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5rem' }}>
            <div style={{ gridColumn: 'span 1.5' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                  <img src={Logo} alt="FAST" style={{ width: '45px' }} />
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--primary)' }}>FAST INSTITUTE</h2>
               </div>
               <p style={{ color: 'var(--text-dim)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                 Engaging the brightest minds to architect the technological frontiers of tomorrow. Global, secure, and accelerated.
               </p>
               <div style={{ display: 'flex', gap: '1.5rem', fontWeight: 800, fontSize: '0.8rem', color: 'var(--primary)' }}>
                  <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>FB</a>
                  <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>TW</a>
                  <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>IN</a>
                  <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>IG</a>
               </div>
            </div>

            <div>
               <h4 style={{ fontWeight: 900, marginBottom: '2rem', fontSize: '0.85rem', letterSpacing: '0.1em' }}>ACADEMY</h4>
               <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <li><a href="/courses" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontWeight: 700 }}>Catalog</a></li>
                  <li><a href="/scholarships" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontWeight: 700 }}>Scholarships</a></li>
                  <li><a href="/labs" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontWeight: 700 }}>Research Labs</a></li>
                  <li><a href="/alumni" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontWeight: 700 }}>Alumni Network</a></li>
               </ul>
            </div>

            <div>
               <h4 style={{ fontWeight: 900, marginBottom: '2rem', fontSize: '0.85rem', letterSpacing: '0.1em' }}>RESOURCES</h4>
               <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <li><a href="/about" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontWeight: 700 }}>About Us</a></li>
                  <li><a href="/privacy" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontWeight: 700 }}>Privacy Policy</a></li>
                  <li><a href="/notes" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontWeight: 700 }}>Academic Archives</a></li>
                  <li><a href="/events" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontWeight: 700 }}>Institutional Events</a></li>
               </ul>
            </div>

            <div>
               <h4 style={{ fontWeight: 900, marginBottom: '2rem', fontSize: '0.85rem', letterSpacing: '0.1em' }}>CONTACT</h4>
               <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <li style={{ display: 'flex', gap: '1rem', color: 'var(--text-dim)', fontWeight: 700 }}><MapPin size={18} color="var(--primary)" /> Karachi, Pakistan</li>
                  <li style={{ display: 'flex', gap: '1rem', color: 'var(--text-dim)', fontWeight: 700 }}><Mail size={18} color="var(--primary)" /> info@fast.edu</li>
                  <li style={{ display: 'flex', gap: '1rem', color: 'var(--text-dim)', fontWeight: 700 }}><Phone size={18} color="var(--primary)" /> +92 21 111-128-128</li>
               </ul>
            </div>
         </div>

         <div style={{ borderTop: '1px solid var(--border-light)', marginTop: '8rem', paddingTop: '4rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em' }}>
              © 2026 FUTURE ADVANCE SCIENCE AND TECHNOLOGY INSTITUTE. ALL RIGHTS RESERVED.
            </p>
         </div>
      </footer>
    </div>
  );
};

export default LandingPage;
