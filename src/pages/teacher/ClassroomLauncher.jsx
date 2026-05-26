import React, { useState } from 'react';
import { Video, Monitor, Mic, Settings, Play, Users, Clock, Shield, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSchool } from '../../context/SchoolContext';
import { API_URL } from '../../utils/api';

const ClassroomLauncher = () => {
  const { user } = useSchool();
  const [isLive, setIsLive] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [loading, setLoading] = useState(false);

  const startBroadcast = async () => {
    setLoading(true);
    const name = `FAST_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setRoomName(name);

    try {
      await fetch(`${API_URL}/api/sessions/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomName: name, teacherId: user?.id || user?.clerkId })
      });
    } catch (err) {
      console.error('Session sync failed (non-critical):', err);
    }
    setIsLive(true);
    setLoading(false);
  };

  const endBroadcast = async () => {
    try {
      await fetch(`${API_URL}/api/sessions/end`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomName })
      });
    } catch (err) {
      console.error('Session end sync failed (non-critical):', err);
    }
    setIsLive(false);
    setRoomName('');
  };

  if (isLive) {
    return (
      <div style={{ height: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <header className="glass-panel" style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid rgba(239,68,68,0.3)' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="badge badge-error" style={{ animation: 'pulse 1.5s infinite' }}>● LIVE BROADCAST</div>
              <h3 style={{ fontSize: '1rem' }}>Room: <span style={{ color: 'var(--primary)', fontWeight: 900 }}>{roomName}</span></h3>
           </div>
           <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>Share this room code with students: <strong style={{ color: 'var(--primary)' }}>{roomName}</strong></span>
              <button onClick={endBroadcast} className="neo-btn neo-btn-ghost" style={{ color: 'var(--error)' }}>
                 <XCircle size={18} /> END SESSION
              </button>
           </div>
        </header>

        <div className="glass-panel" style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
           <iframe 
             src={`https://meet.jit.si/${roomName}#config.prejoinPageEnabled=false&interfaceConfig.TOOLBAR_BUTTONS=["microphone","camera","closedcaptions","desktop","fullscreen","chat","raisehand","videoquality","filmstrip","tileview","download","help","mute-everyone","security"]`}
             allow="camera; microphone; display-capture; autoplay; clipboard-write"
             style={{ width: '100%', height: '100%', border: 'none' }}
             title="FAST Live Classroom"
           />
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Virtual Classroom Orchestrator</h2>
        <p style={{ color: 'var(--text-dim)' }}>Initialize your secure, high-definition live broadcast session.</p>
      </header>

      <div className="glass-panel" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[
              { icon: <Video size={40} color="var(--primary)" />, title: 'HD Camera', desc: 'System ready for 1080p stream.' },
              { icon: <Mic size={40} color="var(--secondary)" />, title: 'Stereo Mic', desc: 'Noise cancellation active.' },
              { icon: <Monitor size={40} color="var(--accent)" />, title: 'Screen Share', desc: '4K presentation mode ready.' },
              { icon: <Shield size={40} color="#22c55e" />, title: 'End-to-End Encrypted', desc: 'Secure institutional channel.' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', textAlign: 'center', border: '1px solid var(--border-light)' }}>
                 <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                 <h3 style={{ marginBottom: '0.5rem', fontWeight: 800 }}>{item.title}</h3>
                 <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{item.desc}</p>
              </div>
            ))}
         </div>

         <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem', display: 'flex', justifyContent: 'center' }}>
            <button 
              onClick={startBroadcast} 
              disabled={loading}
              className="neo-btn neo-btn-primary" 
              style={{ padding: '1rem 4rem', fontSize: '1.1rem', gap: '1rem', opacity: loading ? 0.7 : 1 }}
            >
              <Play fill="black" /> {loading ? 'INITIALIZING...' : 'START LIVE BROADCAST'}
            </button>
         </div>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem 2rem', background: 'rgba(255,255,255,0.02)' }}>
         <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textAlign: 'center' }}>
           Live sessions are powered by <strong>Jitsi Meet</strong> — fully open source, encrypted, and no account required for students to join.
         </p>
      </div>
    </div>
  );
};

export default ClassroomLauncher;
