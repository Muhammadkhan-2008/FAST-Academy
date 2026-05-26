import React from 'react';
import { Search, Phone, Video, Info, Send, Smile, Paperclip } from 'lucide-react';

const Chat = () => {
  const contacts = [
    { name: 'Physics Group', lastMsg: 'Exam dates are out!', time: '12:45 PM', active: true },
    { name: 'Prof. MK', lastMsg: 'Please submit the assignment.', time: '11:20 AM', active: false },
    { name: 'Student Council', lastMsg: 'Next meeting on Friday.', time: 'Yesterday', active: false },
    { name: 'Circle Admin', lastMsg: 'Welcome to the platform!', time: 'May 5', active: false },
  ];

  return (
    <div className="glass" style={{ height: 'calc(100vh - 120px)', display: 'grid', gridTemplateColumns: '320px 1fr', overflow: 'hidden' }}>
      {/* Sidebar */}
      <div style={{ borderRight: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.5rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>Messages</h2>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search chat..." 
              style={{ width: '100%', padding: '0.5rem 1rem 0.5rem 2.2rem', background: 'var(--surface)', border: 'none', borderRadius: '8px', color: 'white' }}
            />
          </div>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {contacts.map((c, i) => (
            <div key={i} style={{ padding: '1rem 1.5rem', display: 'flex', gap: '1rem', cursor: 'pointer', background: c.active ? 'rgba(255,255,255,0.05)' : 'transparent', borderLeft: c.active ? '4px solid var(--primary)' : '4px solid transparent' }}>
              <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'var(--surface-light)', flexShrink: 0 }}></div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                  <h4 style={{ fontSize: '0.95rem' }}>{c.name}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.time}</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.lastMsg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)' }}></div>
            <div>
              <h4 style={{ fontSize: '1rem' }}>Physics Group</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--success)' }}>Online • 24 members</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)' }}>
             <Phone size={20} cursor="pointer" />
             <Video size={20} cursor="pointer" />
             <Info size={20} cursor="pointer" />
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'rgba(0,0,0,0.1)' }}>
          <div style={{ alignSelf: 'center', background: 'var(--surface)', padding: '0.25rem 1rem', borderRadius: '20px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Today</div>
          
          <div style={{ maxWidth: '70%', background: 'var(--surface)', padding: '1rem', borderRadius: '0 15px 15px 15px' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>Sarah Miller</p>
            <p style={{ fontSize: '0.9rem' }}>Hey everyone! Did you check the new notes for Unit 4?</p>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', float: 'right', marginTop: '0.5rem' }}>12:40 PM</span>
          </div>

          <div style={{ maxWidth: '70%', alignSelf: 'flex-end', background: 'var(--primary)', padding: '1rem', borderRadius: '15px 15px 0 15px' }}>
            <p style={{ fontSize: '0.9rem' }}>Yes, just finished reading them. The derivation on page 5 is quite tricky though.</p>
            <span style={{ fontSize: '0.7rem', opacity: 0.7, float: 'right', marginTop: '0.5rem' }}>12:42 PM</span>
          </div>
        </div>

        {/* Input */}
        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Paperclip size={22} color="var(--text-muted)" cursor="pointer" />
            <div style={{ flex: 1, position: 'relative' }}>
              <input 
                type="text" 
                placeholder="Type a message..." 
                style={{ width: '100%', padding: '0.75rem 3rem 0.75rem 1rem', background: 'var(--surface)', border: 'none', borderRadius: '12px', color: 'white', outline: 'none' }}
              />
              <Smile size={20} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', cursor: 'pointer' }} />
            </div>
            <button style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
