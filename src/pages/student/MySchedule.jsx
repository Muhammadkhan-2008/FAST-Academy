import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

const MySchedule = () => {
  const events = [
    { title: 'Web Development Live', time: '10:00 AM', day: 'Today', type: 'Live Class' },
    { title: 'UI Design Workshop', time: '02:00 PM', day: 'Tomorrow', type: 'Workshop' },
    { title: 'Q&A Session', time: '04:00 PM', day: 'May 10', type: 'Support' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Personal Academic Calendar</h2>
        <p style={{ color: 'var(--text-dim)' }}>Your synchronized schedule across all enrolled courses.</p>
      </header>

      <div className="glass-panel" style={{ padding: '2rem' }}>
         <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {events.map((ev, i) => (
              <div key={i} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                 <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ padding: '1rem', background: 'var(--primary-glow)', borderRadius: '12px', textAlign: 'center', minWidth: '80px' }}>
                       <p style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 800 }}>{ev.day.toUpperCase()}</p>
                       <p style={{ fontSize: '1.2rem', fontWeight: 800 }}>{ev.time.split(' ')[0]}</p>
                    </div>
                    <div>
                       <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{ev.title}</h3>
                       <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={14} /> {ev.time}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={14} /> Virtual Bridge</span>
                       </div>
                    </div>
                 </div>
                 <span className="badge badge-cyan">{ev.type}</span>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default MySchedule;
