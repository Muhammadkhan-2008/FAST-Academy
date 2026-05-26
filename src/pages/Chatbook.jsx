import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Paperclip, MoreVertical, Search, 
  Smile, Phone, Video, Info, User, 
  CheckCheck, Clock, ArrowLeft, Shield,
  Users, MessageSquare, Globe, Hash, Zap
} from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Chatbook = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeChannel, setActiveChannel] = useState('Global Institutional Chat');
  const scrollRef = useRef(null);

  const channels = [
    { id: 'global', name: 'Global Institutional Chat', icon: <Globe size={18} />, color: '#0ea5e9', lastMsg: 'Institutional sync established.' },
    { id: 'neural', name: 'Neural Architecture Cohort', icon: <Hash size={18} />, color: '#8b5cf6', lastMsg: 'Phase 02 lab materials uploaded.' },
    { id: 'admin', name: 'Admissions Support', icon: <Shield size={18} />, color: '#f43f5e', lastMsg: 'Your profile is fully verified.' },
  ];

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Optimized polling
    return () => clearInterval(interval);
  }, [activeChannel]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/chat/${encodeURIComponent(activeChannel)}`);
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) { console.error('Sync failure:', err); }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;
    const msgData = { 
      senderId: user.id, 
      senderName: user.fullName || user.username || 'Anonymous Scholar', 
      text: newMessage, 
      channel: activeChannel 
    };
    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msgData)
      });
      if (res.ok) { setNewMessage(''); fetchMessages(); }
    } catch (err) { console.error('Transmission failed', err); }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-deep)', color: 'white' }}>
      <div className="mesh-grid" style={{ opacity: 0.1 }} />
      <Navbar />
      
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', padding: '2rem', gap: '2rem', zIndex: 10 }}>
         
         {/* 📟 COMMS DIRECTORY */}
         <div style={{ width: '380px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-card" style={{ padding: '2rem', border: '1px solid var(--border-light)' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 900, letterSpacing: '0.1em' }}>DIRECTORIES</h3>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e' }} />
               </div>
               
               <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {channels.map(c => (
                    <motion.div 
                      key={c.id} 
                      onClick={() => setActiveChannel(c.name)}
                      whileHover={{ scale: 1.02 }}
                      style={{ 
                        padding: '1.25rem', borderRadius: '16px', cursor: 'pointer',
                        background: activeChannel === c.name ? 'var(--primary-glow)' : 'rgba(255,255,255,0.02)',
                        border: activeChannel === c.name ? '1px solid var(--primary-glow)' : '1px solid var(--border-light)',
                        transition: '0.3s'
                      }}
                    >
                       <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                          <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: `${c.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color }}>
                             {c.icon}
                          </div>
                          <div style={{ flex: 1, overflow: 'hidden' }}>
                             <p style={{ fontWeight: 800, fontSize: '0.85rem', color: activeChannel === c.name ? 'var(--primary)' : 'white' }}>{c.name}</p>
                             <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.lastMsg}</p>
                          </div>
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>

            <div className="glass-card" style={{ flex: 1, padding: '2rem', border: '1px solid var(--border-light)', background: 'linear-gradient(to bottom, rgba(15,23,42,0.4), transparent)' }}>
               <h4 style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-dim)', letterSpacing: '0.2em', marginBottom: '1.5rem' }}>ONLINE SCHOLARS</h4>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                       <div style={{ width: '35px', height: '35px', borderRadius: '10px', background: 'var(--bg-subtle)', border: '1px solid var(--border-light)' }} />
                       <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-dim)' }}>Scholar-00{i}</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* 📡 SIGNAL INTERFACE */}
         <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', border: '1px solid var(--border-light)' }}>
            <header style={{ padding: '2rem 3rem', background: 'rgba(3, 7, 18, 0.4)', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '15px', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--primary-glow)' }}>
                     <Zap size={24} color="var(--primary)" />
                  </div>
                  <div>
                     <h3 style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.02em' }}>{activeChannel}</h3>
                     <p style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 900, letterSpacing: '0.1em' }}>SECURE CHANNEL • {messages.length} PACKETS</p>
                  </div>
               </div>
               <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <button className="premium-btn-ghost" style={{ padding: '0.6rem 1.2rem' }}><Video size={18} /> INITIATE CALL</button>
                  <MoreVertical size={22} color="var(--text-dim)" cursor="pointer" />
               </div>
            </header>

            {/* MESSAGE FEED */}
            <div style={{ flex: 1, padding: '3rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2rem' }} className="custom-scrollbar">
               {messages.length === 0 && (
                 <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.3 }}>
                    <MessageSquare size={80} style={{ marginBottom: '2rem' }} />
                    <p style={{ fontWeight: 900, letterSpacing: '0.2em' }}>NO TRANSMISSIONS DETECTED</p>
                 </div>
               )}
               {messages.map((m, i) => {
                 const isMe = m.senderId === user?.id;
                 return (
                   <motion.div 
                     key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                     style={{ 
                       alignSelf: isMe ? 'flex-end' : 'flex-start',
                       maxWidth: '65%'
                     }}
                   >
                      <div style={{ 
                        background: isMe ? 'var(--primary)' : 'rgba(255,255,255,0.03)',
                        padding: '1.25rem 1.75rem',
                        borderRadius: '24px',
                        borderBottomRightRadius: isMe ? '4px' : '24px',
                        borderBottomLeftRadius: !isMe ? '4px' : '24px',
                        border: '1px solid var(--border-light)',
                        boxShadow: isMe ? '0 10px 30px var(--primary-glow)' : 'none'
                      }}>
                         {!isMe && <p style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '0.5rem' }}>{m.senderName}</p>}
                         <p style={{ fontSize: '1rem', fontWeight: 600, lineHeight: 1.6, color: isMe ? 'white' : 'var(--text-main)' }}>{m.text}</p>
                         <div style={{ fontSize: '0.6rem', color: isMe ? 'rgba(255,255,255,0.7)' : 'var(--text-dim)', marginTop: '0.75rem', textAlign: 'right', fontWeight: 800 }}>
                            {new Date(m.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                         </div>
                      </div>
                   </motion.div>
                 );
               })}
               <div ref={scrollRef} />
            </div>

            {/* INPUT TERMINAL */}
            <form onSubmit={handleSend} style={{ padding: '2rem 3rem', background: 'rgba(3, 7, 18, 0.4)', borderTop: '1px solid var(--border-light)' }}>
               <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', borderRadius: '18px', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', padding: '0 1.5rem' }}>
                     <Smile size={22} color="var(--text-dim)" cursor="pointer" />
                     <input 
                       type="text" placeholder="TRANSMIT DATA TO NETWORK..." 
                       value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                       style={{ flex: 1, padding: '1.25rem 1.5rem', background: 'transparent', border: 'none', outline: 'none', color: 'white', fontWeight: 600, fontSize: '0.95rem' }}
                     />
                     <Paperclip size={22} color="var(--text-dim)" cursor="pointer" />
                  </div>
                  <button type="submit" className="premium-btn" style={{ width: '60px', height: '60px', borderRadius: '18px', justifyContent: 'center' }}>
                     <Send size={24} />
                  </button>
               </div>
            </form>
         </div>
      </div>
    </div>
  );
};

export default Chatbook;
