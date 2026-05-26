import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, Book, Video, MessageCircle, Settings, ArrowRight, Sparkles } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const { data } = useSchool();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const results = query ? [
    ...(data.courses || []).filter(c => c.name?.toLowerCase().includes(query.toLowerCase())).map(c => ({ ...c, type: 'course', icon: <Book size={18} /> })),
    { id: 'chat', name: 'Go to Community Chat', type: 'nav', icon: <MessageCircle size={18} />, path: '/student/chat' },
    { id: 'live', name: 'Join Live Class', type: 'nav', icon: <Video size={18} />, path: '/student/live-class' },
    { id: 'settings', name: 'Profile Settings', type: 'nav', icon: <Settings size={18} />, path: '/portal-select' },
  ].slice(0, 6) : [];

  const handleSelect = (item) => {
    if (item.type === 'course') navigate(`/student/course/${item._id}`);
    else if (item.path) navigate(item.path);
    onClose();
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 3000 }}>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="cmd-palette glass-panel"
            style={{ background: 'white' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border-light)' }}>
               <Search size={20} style={{ marginLeft: '1.5rem', color: 'var(--text-muted)' }} />
               <input 
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search courses, lessons, or tools..."
                  className="cmd-input"
               />
               <div style={{ marginRight: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                  <span style={{ padding: '0.2rem 0.5rem', background: 'var(--bg-deep)', borderRadius: '4px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>ESC</span>
               </div>
            </div>

            <div style={{ padding: '0.5rem', maxHeight: '400px', overflowY: 'auto' }}>
               {results.length > 0 ? (
                 results.map((item, idx) => (
                   <div 
                    key={item._id || item.id}
                    onClick={() => handleSelect(item)}
                    style={{ 
                      display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', 
                      borderRadius: '8px', cursor: 'pointer', transition: '0.2s' 
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-deep)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                   >
                      <div style={{ color: 'var(--primary)' }}>{item.icon}</div>
                      <div style={{ flex: 1 }}>
                         <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.name}</p>
                         <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.type.toUpperCase()}</p>
                      </div>
                      <ArrowRight size={14} style={{ opacity: 0.3 }} />
                   </div>
                 ))
               ) : (
                 query ? (
                   <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      <Sparkles size={32} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                      <p>No direct results. Try asking <span style={{ color: 'var(--primary)', fontWeight: 700 }}>FAST AI</span></p>
                   </div>
                 ) : (
                   <div style={{ padding: '1.5rem' }}>
                      <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase' }}>Recent Suggestions</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                         {['Web Dev', 'ECAT Prep', 'Live Classes', 'My Syllabus'].map(tag => (
                           <span key={tag} style={{ padding: '0.4rem 0.8rem', background: 'var(--bg-deep)', borderRadius: '20px', fontSize: '0.8rem', cursor: 'pointer' }}>{tag}</span>
                         ))}
                      </div>
                   </div>
                 )
               )}
            </div>

            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-light)', background: 'var(--bg-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                  <Command size={14} /> <span>to search anything in FAST Ecosystem</span>
               </div>
               <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>
                  v2.0 PRO
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
