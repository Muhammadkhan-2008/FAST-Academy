import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cpu, MessageSquare, Sparkles, Send, Zap, Shield, ChevronRight, Terminal, Globe, Command } from 'lucide-react';
import Navbar from '../components/Navbar';
import { API_URL } from '../utils/api';

const FastAI = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Neural pathways synchronized. I am FAST Intelligence v4.0. Accessing institutional research database. How can I facilitate your academic progress?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState('institutional'); // 'institutional' or 'global'
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/fast-ai/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input, mode })
      });
      
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', content: data.response || 'System timeout. Neural link unstable.' }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: `CRITICAL ERROR: ${err.message}. Institutional firewall may be blocking transmission.` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: 'white', position: 'relative', overflow: 'hidden' }}>
      <div className="mesh-grid" style={{ opacity: 0.15 }} />
      <Navbar />

      {/* 🧠 NEURAL MATRIX ANIMATION (SIMULATED) */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 1 }}>
         <div style={{ position: 'absolute', top: '10%', left: '5%', width: '400px', height: '400px', background: 'var(--primary)', filter: 'blur(150px)', opacity: 0.1, borderRadius: '50%' }} />
         <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '400px', height: '400px', background: 'var(--secondary)', filter: 'blur(150px)', opacity: 0.1, borderRadius: '50%' }} />
      </div>
      
      <div style={{ padding: '6rem 6% 4rem', maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10, display: 'flex', gap: '3rem', height: 'calc(100vh - 85px)' }}>
         
         {/* 📟 AI TELEMETRY SIDEBAR */}
         <div style={{ width: '350px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-card" style={{ padding: '2rem', border: '1px solid var(--primary-glow)' }}>
               <h3 style={{ fontSize: '0.9rem', fontWeight: 900, letterSpacing: '0.2em', marginBottom: '2rem', color: 'var(--primary)' }}>SYSTEM STATUS</h3>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {[
                    { label: 'UPLINK', val: 'ACTIVE', color: '#22c55e' },
                    { label: 'NEURAL LOAD', val: '24.2%', color: 'var(--primary)' },
                    { label: 'DB SYNC', val: 'VERIFIED', color: '#8b5cf6' },
                  ].map((s, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                       <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-dim)' }}>{s.label}</span>
                       <span style={{ fontSize: '0.75rem', fontWeight: 900, color: s.color }}>{s.val}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="glass-card" style={{ flex: 1, padding: '2.5rem', border: '1px solid var(--border-light)' }}>
               <h3 style={{ fontSize: '0.9rem', fontWeight: 900, letterSpacing: '0.1em', marginBottom: '2rem' }}>QUERY MODE</h3>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <button 
                    onClick={() => setMode('institutional')}
                    style={{ 
                      display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem', borderRadius: '15px', 
                      background: mode === 'institutional' ? 'var(--primary-glow)' : 'rgba(255,255,255,0.02)',
                      border: mode === 'institutional' ? '1px solid var(--primary-glow)' : '1px solid var(--border-light)',
                      color: mode === 'institutional' ? 'var(--primary)' : 'var(--text-dim)',
                      cursor: 'pointer', transition: '0.3s', textAlign: 'left'
                    }}
                  >
                     <Shield size={20} />
                     <div>
                        <p style={{ fontWeight: 900, fontSize: '0.8rem' }}>INSTITUTIONAL</p>
                        <p style={{ fontSize: '0.6rem', opacity: 0.7 }}>Secure Campus Database</p>
                     </div>
                  </button>
                  <button 
                    onClick={() => setMode('global')}
                    style={{ 
                      display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem', borderRadius: '15px', 
                      background: mode === 'global' ? 'var(--secondary-glow)' : 'rgba(255,255,255,0.02)',
                      border: mode === 'global' ? '1px solid var(--secondary-glow)' : '1px solid var(--border-light)',
                      color: mode === 'global' ? 'var(--secondary)' : 'var(--text-dim)',
                      cursor: 'pointer', transition: '0.3s', textAlign: 'left'
                    }}
                  >
                     <Globe size={20} />
                     <div>
                        <p style={{ fontWeight: 900, fontSize: '0.8rem' }}>GLOBAL</p>
                        <p style={{ fontSize: '0.6rem', opacity: 0.7 }}>General Web Knowledge</p>
                     </div>
                  </button>
               </div>
            </div>
         </div>

         {/* 🧠 NEURAL INTERFACE FEED */}
         <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', border: '1px solid var(--border-light)', background: 'rgba(15, 23, 42, 0.4)' }}>
            <div ref={chatRef} style={{ flex: 1, padding: '4rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }} className="custom-scrollbar">
               <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                  <div style={{ width: '80px', height: '80px', background: 'var(--primary-glow)', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', margin: '0 auto 2rem', boxShadow: '0 0 40px var(--primary-glow)' }}>
                     <Brain size={42} />
                  </div>
                  <h2 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.05em' }}>NEURAL <span className="gradient-text">UPLINK</span></h2>
                  <p style={{ color: 'var(--text-dim)', fontWeight: 600 }}>FAST Institutional AI v4.0.2</p>
               </div>

               {messages.map((m, i) => (
                 <motion.div 
                   key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                   style={{ 
                     alignSelf: m.role === 'ai' ? 'flex-start' : 'flex-end',
                     maxWidth: '80%', display: 'flex', gap: '1.5rem',
                     flexDirection: m.role === 'ai' ? 'row' : 'row-reverse'
                   }}
                 >
                    <div style={{ 
                      width: '45px', height: '45px', borderRadius: '12px', 
                      background: m.role === 'ai' ? 'var(--primary-glow)' : 'var(--secondary-glow)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: m.role === 'ai' ? 'var(--primary)' : 'var(--secondary)',
                      flexShrink: 0, border: '1px solid currentColor'
                    }}>
                       {m.role === 'ai' ? <Cpu size={22} /> : <Terminal size={22} />}
                    </div>
                    <div style={{ 
                      padding: '1.75rem 2.25rem', borderRadius: '25px',
                      background: m.role === 'ai' ? 'rgba(255,255,255,0.02)' : 'var(--primary)',
                      border: '1px solid var(--border-light)',
                      color: 'white', fontSize: '1rem', lineHeight: 1.8, fontWeight: 500,
                      borderTopLeftRadius: m.role === 'ai' ? '4px' : '25px',
                      borderTopRightRadius: m.role === 'user' ? '4px' : '25px',
                      boxShadow: m.role === 'user' ? '0 15px 35px var(--primary-glow)' : 'none'
                    }}>
                       {m.content}
                    </div>
                 </motion.div>
               ))}

               {isLoading && (
                 <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div className="shimmer" style={{ width: '45px', height: '45px', borderRadius: '12px' }} />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                       <div className="shimmer" style={{ width: '12px', height: '12px', borderRadius: '50%' }} />
                       <div className="shimmer" style={{ width: '12px', height: '12px', borderRadius: '50%', animationDelay: '0.2s' }} />
                       <div className="shimmer" style={{ width: '12px', height: '12px', borderRadius: '50%', animationDelay: '0.4s' }} />
                    </div>
                 </div>
               )}
            </div>

            {/* ⌨️ COMMAND TERMINAL */}
            <form onSubmit={handleSend} style={{ padding: '2.5rem 4rem', background: 'rgba(3, 7, 18, 0.8)', borderTop: '1px solid var(--border-light)' }}>
               <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <div style={{ flex: 1, position: 'relative' }}>
                     <div style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }}>
                        <Command size={18} />
                     </div>
                     <input 
                       type="text" placeholder="TRANSMIT NEURAL QUERY..." 
                       value={input} onChange={(e) => setInput(e.target.value)}
                       style={{ 
                         width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', 
                         borderRadius: '20px', padding: '1.5rem 1.5rem 1.5rem 4rem', color: 'white', outline: 'none', 
                         fontSize: '1rem', fontWeight: 600, transition: '0.4s'
                       }}
                       onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                       onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
                     />
                  </div>
                  <button type="submit" disabled={isLoading} className="premium-btn" style={{ width: '70px', height: '70px', borderRadius: '20px', justifyContent: 'center' }}>
                     <Send size={24} />
                  </button>
               </div>
            </form>
         </div>
      </div>
    </div>
  );
};

export default FastAI;
