import React, { useState } from 'react';
import { Video, Monitor, Mic, Settings, Play, Users, Clock, Shield, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSchool } from '../../context/SchoolContext';

const ClassroomLauncher = () => {
  const { user } = useSchool();
  const [isLive, setIsLive] = useState(false);
  const [roomName, setRoomName] = useState('');

  const startBroadcast = () => {
    const name = `BhaisAcademy_${Math.random().toString(36).substring(7)}`;
    setRoomName(name);
    setIsLive(true);

    // Sync with backend
    fetch('http://localhost:5000/api/sessions/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomName: name, teacherId: user.id })
    });
  };

  if (isLive) {
    return (
      <div style={{ height: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <header className="glass-panel" style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--error)30' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="badge badge-error" style={{ animation: 'pulse 1.5s infinite' }}>● LIVE BROADCAST</div>
              <h3 style={{ fontSize: '1rem' }}>Room: {roomName}</h3>
           </div>
           <button onClick={() => setIsLive(false)} className="neo-btn neo-btn-ghost" style={{ color: 'var(--error)' }}>
              <XCircle size={18} /> TERMINATE SESSION
           </button>
        </header>

        <div className="glass-panel" style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
           <iframe 
             src={`https://meet.jit.si/${roomName}#config.prejoinPageEnabled=false&interfaceConfig.TOOLBAR_BUTTONS=["microphone","camera","closedcaptions","desktop","fullscreen","fittowindow","chat","raisehand","videoquality","filmstrip","invite","shortcuts","tileview","videobackgroundblur","download","help","mute-everyone","security"]`}
             allow="camera; microphone; display-capture; autoplay; clipboard-write"
             style={{ width: '100%', height: '100%', border: 'none' }}
           ></iframe>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Virtual Classroom Orchestrator</h2>
        <p style={{ color: 'var(--text-dim)' }}>Initialize your secure, high-definition broadcast bridge.</p>
      </header>

      <div className="glass-panel" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', textAlign: 'center' }}>
               <Video size={40} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
               <h3 style={{ marginBottom: '0.5rem' }}>HD Camera</h3>
               <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>System ready for 1080p stream.</p>
            </div>
            <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', textAlign: 'center' }}>
               <Mic size={40} color="var(--secondary)" style={{ marginBottom: '1.5rem' }} />
               <h3 style={{ marginBottom: '0.5rem' }}>Stereo Mic</h3>
               <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Noise cancellation active.</p>
            </div>
            <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', textAlign: 'center' }}>
               <Monitor size={40} color="var(--accent)" style={{ marginBottom: '1.5rem' }} />
               <h3 style={{ marginBottom: '0.5rem' }}>Screen Share</h3>
               <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>4K presentation mode ready.</p>
            </div>
         </div>

         <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem', display: 'flex', justifyContent: 'center' }}>
            <button onClick={startBroadcast} className="neo-btn neo-btn-primary" style={{ padding: '1rem 4rem', fontSize: '1.1rem', gap: '1rem' }}>
              <Play fill="black" /> START LIVE BROADCAST
            </button>
         </div>
      </div>
    </div>
  );
};

export default ClassroomLauncher;
