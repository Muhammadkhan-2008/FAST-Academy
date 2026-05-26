import React, { useState, useEffect, useRef } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Search, Send, Smile, Paperclip, CheckCheck, User, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SocialHub = () => {
  const { user } = useSchool();
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef();

  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    if (selectedContact) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedContact]);

  const fetchContacts = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/users`);
      const data = await res.json();
      // Filter out self
      setContacts(data.filter(c => c.clerkId !== user.id));
      setLoading(false);
    } catch (err) { console.error('Contacts fetch failed'); }
  };

  const getChannelId = (id1, id2) => {
    return [id1, id2].sort().join('_');
  };

  const fetchMessages = async () => {
    if (!selectedContact) return;
    try {
      const channel = getChannelId(user.id, selectedContact.clerkId);
      const res = await fetch(`${API_URL}/chat/${channel}`);
      const data = await res.json();
      setMessages(data);
    } catch (err) { console.error('Messages fetch failed'); }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedContact) return;

    const msgData = {
      senderId: user.id,
      senderName: user.name,
      text: inputText,
      channel: getChannelId(user.id, selectedContact.clerkId)
    };

    try {
      await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msgData)
      });
      setInputText('');
      fetchMessages();
    } catch (err) { console.error('Send failed'); }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="glass-panel" style={{ height: 'calc(100vh - 180px)', display: 'flex', overflow: 'hidden' }}>
      {/* --- Sidebar (Contacts) --- */}
      <div style={{ width: 'clamp(280px, 30%, 400px)', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.1)' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
           <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Messages</h3>
           <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input 
                type="text" placeholder="Search contacts..." 
                style={{ width: '100%', background: 'var(--bg-surface)', border: 'none', padding: '0.6rem 1rem 0.6rem 2.5rem', borderRadius: '10px', color: 'white', fontSize: '0.85rem' }}
              />
           </div>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto' }} className="custom-scrollbar">
           {contacts.map(c => (
             <div 
               key={c.clerkId}
               onClick={() => setSelectedContact(c)}
               style={{ 
                 padding: '1rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', cursor: 'pointer',
                 background: selectedContact?.clerkId === c.clerkId ? 'rgba(34, 211, 238, 0.1)' : 'transparent',
                 transition: '0.2s', borderLeft: selectedContact?.clerkId === c.clerkId ? '4px solid var(--primary)' : '4px solid transparent'
               }}
             >
                <div style={{ position: 'relative' }}>
                   <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <User size={24} color="var(--text-dim)" />
                   </div>
                   <div style={{ position: 'absolute', bottom: '2px', right: '2px', width: '12px', height: '12px', background: 'var(--success)', borderRadius: '50%', border: '2px solid var(--bg-surface)' }}></div>
                </div>
                <div style={{ flex: 1 }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>{c.name}</p>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>12:45 PM</span>
                   </div>
                   <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>
                      {c.role.toUpperCase()} • Last seen recently
                   </p>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* --- Main Chat Area --- */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.05)' }}>
        {selectedContact ? (
          <>
            <header style={{ padding: '1rem 2rem', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <User size={20} color="var(--primary)" />
                  </div>
                  <div>
                     <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{selectedContact.name}</h4>
                     <p style={{ fontSize: '0.7rem', color: 'var(--success)' }}>Online</p>
                  </div>
               </div>
            </header>

            <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }} className="custom-scrollbar">
               {messages.map((msg, i) => (
                 <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   style={{ 
                     alignSelf: msg.senderId === user.id ? 'flex-end' : 'flex-start',
                     maxWidth: '65%', display: 'flex', flexDirection: 'column', gap: '0.25rem'
                   }}
                 >
                    <div style={{ 
                      padding: '0.75rem 1.25rem', 
                      background: msg.senderId === user.id ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                      color: msg.senderId === user.id ? 'black' : 'white',
                      borderRadius: msg.senderId === user.id ? '15px 15px 4px 15px' : '15px 15px 15px 4px',
                      fontSize: '0.9rem',
                      boxShadow: msg.senderId === user.id ? '0 4px 12px var(--primary-glow)' : 'none'
                    }}>
                       {msg.text}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', alignSelf: msg.senderId === user.id ? 'flex-end' : 'flex-start' }}>
                       <span style={{ fontSize: '0.6rem', color: 'var(--text-dim)' }}>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                       {msg.senderId === user.id && <CheckCheck size={12} color="var(--primary)" />}
                    </div>
                 </motion.div>
               ))}
               <div ref={scrollRef}></div>
            </div>

            <form onSubmit={handleSend} style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
               <button type="button" className="neo-btn neo-btn-ghost" style={{ padding: '0.6rem' }}><Paperclip size={20} /></button>
               <input 
                 type="text" 
                 value={inputText}
                 onChange={(e) => setInputText(e.target.value)}
                 placeholder="Type a message..." 
                 style={{ flex: 1, background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.05)', padding: '0.8rem 1.5rem', borderRadius: '30px', color: 'white', outline: 'none' }}
               />
               <button type="button" className="neo-btn neo-btn-ghost" style={{ padding: '0.6rem' }}><Smile size={20} /></button>
               <button type="submit" className="neo-btn neo-btn-primary" style={{ width: '45px', height: '45px', padding: 0, borderRadius: '50%', justifyContent: 'center' }}>
                 <Send size={20} fill="black" />
               </button>
            </form>
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', textAlign: 'center', padding: '3rem' }}>
             <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                <MessageCircle size={48} opacity={0.3} />
             </div>
             <h3>Bhai's Secure Messenger</h3>
             <p style={{ maxWidth: '300px', fontSize: '0.85rem', marginTop: '1rem' }}>Select a contact from the sidebar to start a secure, encrypted conversation.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialHub;
