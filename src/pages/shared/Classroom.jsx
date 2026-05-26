import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  XCircle, ShieldCheck, Users, MessageSquare, 
  Settings, Mic, Video, Monitor, Radio,
  Share2, MoreVertical, Send, Smile, Paperclip
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Classroom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(true);
  const [participants, setParticipants] = useState(32);

  return (
    <div style={{ height: '100vh', background: '#020617', color: 'white', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div className="mesh-grid" style={{ opacity: 0.15 }} />
      
      {/* 🚀 TOP BROADCAST HUD */}
      <header style={{ 
        height: '80px', padding: '0 3rem', display: 'flex', 
        justifyContent: 'space-between', alignItems: 'center', 
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(3, 7, 18, 0.6)', backdropFilter: 'blur(20px)', zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ position: 'relative' }}>
             <img src="/logo.png" alt="FAST" style={{ width: '40px', filter: 'drop-shadow(0 0 10px var(--primary-glow))' }} />
             <div style={{ position: 'absolute', top: -5, right: -5, width: '12px', height: '12px', background: '#ef4444', borderRadius: '50%', border: '2px solid #020617', animation: 'pulse 1.5s infinite' }} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 900, letterSpacing: '-0.5px' }}>LIVE SESSION: {id.toUpperCase().replace('-', ' ')}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.2rem' }}>
               <p style={{ color: '#22c55e', fontSize: '0.7rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(34, 197, 94, 0.1)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                 <ShieldCheck size={12} /> ENCRYPTED
               </p>
               <p style={{ color: 'var(--text-dim)', fontSize: '0.7rem', fontWeight: 800 }}>• LEAD FACULTY: DR. SARAH KHAN</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
              <Users size={16} color="var(--primary)" />
              <span style={{ fontSize: '0.8rem', fontWeight: 900 }}>{participants} ONLINE</span>
           </div>
           <button onClick={() => navigate(-1)} style={{ border: '1px solid #ef4444', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.6rem 1.25rem', borderRadius: '10px', cursor: 'pointer', fontWeight: 900, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             <XCircle size={18} /> ABORT SESSION
           </button>
        </div>
      </header>

      {/* 🏙️ BROADCAST HUB CORE */}
      <div style={{ flex: 1, display: 'flex', position: 'relative' }}>
         
         {/* VIDEO FEED TERMINAL */}
         <div style={{ flex: 1, position: 'relative', background: '#000', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, position: 'relative' }}>
                <iframe 
                  src={`https://meet.jit.si/${id}#config.prejoinPageEnabled=false&interfaceConfig.TOOLBAR_BUTTONS=[]`}
                  allow="camera; microphone; display-capture; autoplay; clipboard-write"
                  style={{ width: '100%', height: '100%', border: 'none' }}
                ></iframe>
                
                {/* HUD Overlays */}
                <div style={{ position: 'absolute', top: '2rem', left: '2rem', pointerEvents: 'none' }}>
                   <div style={{ padding: '0.5rem 1rem', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <p style={{ fontSize: '0.6rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '0.2em' }}>SIGNAL STATUS</p>
                      <p style={{ fontSize: '0.9rem', fontWeight: 900 }}>4K ULTRA HD • 60FPS</p>
                   </div>
                </div>
            </div>

            {/* 🎮 COMMAND CONTROLS */}
            <div style={{ 
              height: '100px', background: 'rgba(3, 7, 18, 0.8)', 
              backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.05)',
              display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem'
            }}>
               {[
                 { icon: <Mic size={22} />, label: 'AUDIO' },
                 { icon: <Video size={22} />, label: 'VIDEO' },
                 { icon: <Monitor size={22} />, label: 'SHARE' },
                 { icon: <Radio size={22} />, label: 'RECORD', color: '#ef4444' },
                 { icon: <Settings size={22} />, label: 'CONFIG' },
               ].map((ctrl, i) => (
                 <motion.button 
                   key={i} whileHover={{ scale: 1.1, y: -5 }}
                   style={{ 
                     background: ctrl.color ? `${ctrl.color}20` : 'rgba(255,255,255,0.05)',
                     border: `1px solid ${ctrl.color || 'rgba(255,255,255,0.1)'}`,
                     width: '55px', height: '55px', borderRadius: '15px',
                     display: 'flex', alignItems: 'center', justifyContent: 'center',
                     color: ctrl.color || 'white', cursor: 'pointer', position: 'relative'
                   }}
                 >
                    {ctrl.icon}
                    <span style={{ position: 'absolute', bottom: '-2rem', fontSize: '0.6rem', fontWeight: 900, opacity: 0.5 }}>{ctrl.label}</span>
                 </motion.button>
               ))}
               <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.1)', margin: '0 1rem' }} />
               <motion.button 
                 onClick={() => setChatOpen(!chatOpen)}
                 whileHover={{ scale: 1.1 }}
                 style={{ 
                   background: chatOpen ? 'var(--primary-glow)' : 'transparent',
                   border: chatOpen ? '1px solid var(--primary-glow)' : '1px solid rgba(255,255,255,0.1)',
                   width: '55px', height: '55px', borderRadius: '15px',
                   display: 'flex', alignItems: 'center', justifyContent: 'center',
                   color: chatOpen ? 'var(--primary)' : 'white', cursor: 'pointer'
                 }}
               >
                  <MessageSquare size={22} />
               </motion.button>
            </div>
         </div>

         {/* 🗨️ CLASSROOM SYNC CHAT */}
         <AnimatePresence>
            {chatOpen && (
              <motion.div 
                initial={{ width: 0, opacity: 0 }} animate={{ width: '400px', opacity: 1 }} exit={{ width: 0, opacity: 0 }}
                style={{ 
                  background: 'rgba(3, 7, 18, 0.4)', backdropFilter: 'blur(30px)', 
                  borderLeft: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column'
                }}
              >
                 <header style={{ padding: '2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
                    <h3 style={{ fontWeight: 900, letterSpacing: '0.1em', fontSize: '0.9rem' }}>CLASS SYNC</h3>
                    <MoreVertical size={18} color="var(--text-dim)" cursor="pointer" />
                 </header>

                 <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {[
                      { user: 'Dr. Sarah Khan', msg: 'Welcome everyone. We are starting the Neural Flow analysis.', type: 'teacher' },
                      { user: 'Scholar-42', msg: 'Professor, will this session be archived?', type: 'other' },
                      { user: 'Scholar-88', msg: 'Signal is perfect here. Ready.', type: 'other' },
                    ].map((m, i) => (
                      <div key={i} style={{ 
                        alignSelf: 'flex-start', maxWidth: '85%', padding: '1rem',
                        background: m.type === 'teacher' ? 'var(--primary-glow)' : 'rgba(255,255,255,0.03)',
                        borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)'
                      }}>
                         <p style={{ fontSize: '0.65rem', fontWeight: 900, color: m.type === 'teacher' ? 'var(--primary)' : 'var(--secondary)', marginBottom: '0.3rem' }}>{m.user.toUpperCase()}</p>
                         <p style={{ fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.5 }}>{m.msg}</p>
                      </div>
                    ))}
                 </div>

                 <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '0.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                       <input type="text" placeholder="TRANSMIT TO CLASS..." style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'white', padding: '0.5rem 1rem', fontWeight: 600, fontSize: '0.8rem' }} />
                       <button style={{ background: 'var(--primary)', border: 'none', borderRadius: '8px', padding: '0.5rem', cursor: 'pointer' }}>
                          <Send size={16} color="white" />
                       </button>
                    </div>
                 </div>
              </motion.div>
            )}
         </AnimatePresence>
      </div>
    </div>
  );
};

export default Classroom;
