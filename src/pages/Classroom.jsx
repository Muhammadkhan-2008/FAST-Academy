import React, { useState } from 'react';
import { 
  Mic, MicOff, Video, VideoOff, 
  Hand, Share, PhoneOff, Users, 
  MessageSquare, MoreVertical, Send, Sparkles, X
} from 'lucide-react';
import Navbar from '../components/Navbar';

const Classroom = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', position: 'relative', overflow: 'hidden' }}>
      <div className="mesh-grid" style={{ opacity: 0.3 }} />
      <Navbar />
      
      <div style={{ 
        height: 'calc(100vh - 85px)', 
        padding: '2rem', 
        display: 'grid', 
        gridTemplateColumns: '1fr 450px', 
        gap: '2rem',
        position: 'relative',
        zIndex: 10
      }}>
        {/* 🎬 MISSION CONTROL: VIDEO AREA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#030712', borderRadius: '32px', border: '1px solid var(--border-light)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
            {/* HUD OVERLAY */}
            <div style={{ position: 'absolute', inset: 0, border: '2px solid var(--primary-glow)', opacity: 0.1, pointerEvents: 'none', borderRadius: '32px' }} />
            
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center' }}>
                <div style={{ width: '160px', height: '160px', borderRadius: '40px', background: 'var(--primary-glow)', margin: '0 auto 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--primary-glow)', boxShadow: '0 0 40px var(--primary-glow)' }}>
                  <User size={64} color="var(--primary)" />
                </div>
                <h2 style={{ color: 'white', fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.02em' }}>PROF. MK <span className="gradient-text">PRESENTING</span></h2>
                <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', fontWeight: 600, marginTop: '0.5rem' }}>SYSTEMS ARCHITECTURE & NEURAL DYNAMICS</p>
              </motion.div>
            </div>

            {/* PIP VIEW (STUDENT) */}
            <motion.div drag dragConstraints={{ top: 20, left: 20, right: 20, bottom: 20 }} style={{ position: 'absolute', bottom: '2rem', right: '2rem', width: '260px', height: '160px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-light)', backdropFilter: 'blur(20px)', borderRadius: '24px', overflow: 'hidden', cursor: 'grab' }}>
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 800, fontSize: '0.8rem' }}>
                 LOCAL TRANSMISSION: YOU
              </div>
            </motion.div>

            {/* TELEMETRY OVERLAY */}
            <div style={{ position: 'absolute', top: '2rem', left: '2rem', display: 'flex', gap: '1.25rem' }}>
               <div style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#EF4444', padding: '0.6rem 1.25rem', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 900, border: '1px solid rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', gap: '0.75rem', letterSpacing: '0.1em' }}>
                 <div style={{ width: '8px', height: '8px', background: '#EF4444', borderRadius: '50%', animation: 'pulse 1.5s infinite' }}></div> LIVE FEED
               </div>
               <div style={{ background: 'rgba(15, 23, 42, 0.6)', color: 'white', padding: '0.6rem 1.25rem', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 800, backdropFilter: 'blur(10px)', border: '1px solid var(--border-light)' }}>
                 NODE COUNT: 42 SCHOLARS
               </div>
            </div>
          </div>

          {/* 🎛️ COMMAND CONSOLE */}
          <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'center', gap: '2.5rem', alignItems: 'center', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(20px)', borderRadius: '32px', border: '1px solid var(--border-light)' }}>
            {[
              { id: 'mic', icon: isMuted ? <MicOff /> : <Mic />, active: !isMuted, action: () => setIsMuted(!isMuted) },
              { id: 'video', icon: !isVideoOn ? <VideoOff /> : <Video />, active: isVideoOn, action: () => setIsVideoOn(!isVideoOn) },
              { id: 'hand', icon: <Hand />, active: false, action: () => {} },
              { id: 'share', icon: <Share />, active: false, action: () => {} },
            ].map(btn => (
              <motion.button 
                key={btn.id} onClick={btn.action} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                style={{ 
                  width: '60px', height: '60px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: btn.active ? 'var(--primary-glow)' : 'rgba(255,255,255,0.03)',
                  color: btn.active ? 'var(--primary)' : 'var(--text-dim)',
                  border: btn.active ? '1px solid var(--primary-glow)' : '1px solid var(--border-light)',
                  cursor: 'pointer', transition: '0.3s'
                }}
              >
                {btn.icon}
              </motion.button>
            ))}
            <motion.button whileHover={{ scale: 1.05 }} style={{ width: '80px', height: '60px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(239, 68, 68, 0.2)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.3)', cursor: 'pointer' }}>
              <PhoneOff />
            </motion.button>
          </div>
        </div>

        {/* 🛰️ TERMINAL HUB: SIDEBAR */}
        <div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(20px)', borderRadius: '32px', border: '1px solid var(--border-light)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', padding: '1rem', gap: '0.75rem', background: 'rgba(3, 7, 18, 0.4)', borderBottom: '1px solid var(--border-light)' }}>
             {[
               { id: 'chat', label: 'COMMUNICATION' },
               { id: 'ai', label: 'AI INTELLIGENCE' },
             ].map(tab => (
               <button 
                 key={tab.id} onClick={() => setActiveTab(tab.id)}
                 style={{ 
                   flex: 1, padding: '1rem', borderRadius: '16px', border: 'none', 
                   background: activeTab === tab.id ? 'var(--primary-glow)' : 'transparent',
                   color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-dim)',
                   fontWeight: 900, fontSize: '0.7rem', cursor: 'pointer', transition: '0.3s', letterSpacing: '0.1em'
                 }}
               >
                  {tab.label}
               </button>
             ))}
          </div>
          
          <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }} className="custom-scrollbar">
            {activeTab === 'chat' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--border-light)' }}>
                  <p style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>PROF. MK</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.6 }}>Welcome everyone to Mission Control. Today we'll architect neural dynamics.</p>
                </div>
                <div style={{ background: 'var(--primary-glow)', padding: '1.5rem', borderRadius: '20px', alignSelf: 'flex-end', width: '90%', border: '1px solid var(--primary-glow)' }}>
                  <p style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>LOCAL SCHOLAR</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.6 }}>Initializing neural parameters for the project session.</p>
                </div>
              </div>
            )}

            {activeTab === 'ai' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                 <div style={{ padding: '2rem', background: 'linear-gradient(135deg, var(--primary), #0D9488)', borderRadius: '24px', color: 'white', boxShadow: '0 10px 30px rgba(20, 184, 166, 0.2)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                       <Sparkles size={24} />
                       <span style={{ fontWeight: 900, fontSize: '1rem', letterSpacing: '0.05em' }}>INSTITUTIONAL AI</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', opacity: 0.9, lineHeight: 1.6 }}>Submit queries for real-time concept synthesis from the current lecture.</p>
                 </div>
                 
                 <div>
                    <p style={{ fontSize: '0.65rem', color: 'var(--primary)', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '0.1em' }}>SUGGESTED SYNTHESIS</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                       {['Explain Neural Dynamics', 'Summarize Professor\'s Thesis', 'Retrieve Module Notes'].map((q, i) => (
                         <motion.button key={i} whileHover={{ x: 10 }} style={{ textAlign: 'left', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-light)', background: 'rgba(255,255,255,0.02)', fontSize: '0.85rem', cursor: 'pointer', color: 'var(--text-main)', fontWeight: 600 }}>
                           {q}
                         </motion.button>
                       ))}
                    </div>
                 </div>
              </div>
            )}
          </div>

          {/* ⌨️ UPLINK TERMINAL */}
          <div style={{ padding: '2rem', borderTop: '1px solid var(--border-light)', background: 'rgba(3, 7, 18, 0.2)' }}>
            <div style={{ display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '0.75rem 1.25rem', borderRadius: '20px', border: '1px solid var(--border-light)' }}>
              <input 
                type="text" 
                placeholder={activeTab === 'ai' ? "QUERY AI..." : "TRANSMIT MESSAGE..."} 
                style={{ flex: 1, background: 'transparent', border: 'none', padding: '0.5rem', outline: 'none', fontSize: '0.85rem', color: 'white', fontWeight: 600 }}
              />
              <button style={{ width: '45px', height: '45px', borderRadius: '14px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 0 20px var(--primary-glow)' }}>
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classroom;
