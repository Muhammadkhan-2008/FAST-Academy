import React, { useState } from 'react';
import { ClipboardCheck, Search, Filter, Save, Download } from 'lucide-react';

const AttendanceBook = () => {
  const [students, setStudents] = useState([
    { id: 's1', name: 'Alex Johnson', status: 'present' },
    { id: 's2', name: 'Jane Smith', status: 'absent' },
    { id: 's3', name: 'Michael Brown', status: 'present' },
    { id: 's4', name: 'Emily Davis', status: 'late' },
    { id: 's5', name: 'Chris Wilson', status: 'present' },
  ]);

  const toggleStatus = (id, newStatus) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Digital Attendance Book</h2>
          <p style={{ color: 'var(--text-dim)' }}>Track student participation for Web Development Masterclass.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="neo-btn neo-btn-ghost"><Download size={18} /> Export</button>
          <button className="neo-btn neo-btn-primary"><Save size={18} /> Save Records</button>
        </div>
      </header>

      <div className="glass-panel" style={{ padding: '1.5rem' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div style={{ position: 'relative' }}>
               <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
               <input type="text" placeholder="Find student..." className="glass-panel" style={{ padding: '0.5rem 1rem 0.5rem 2.5rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.05)', color: 'white' }} />
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
               <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Date: May 08, 2026</span>
               <button className="neo-btn neo-btn-ghost" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}><Filter size={16} /> Filter</button>
            </div>
         </div>

         <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {students.map((s, i) => (
              <div key={s.id} className="glass-panel" style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.01)' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>{s.name[0]}</div>
                    <div>
                       <h4 style={{ fontSize: '1rem' }}>{s.name}</h4>
                       <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>ID: {s.id}</p>
                    </div>
                 </div>

                 <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['present', 'late', 'absent'].map(status => (
                      <button 
                        key={status}
                        onClick={() => toggleStatus(s.id, status)}
                        style={{ 
                          padding: '0.4rem 1rem', borderRadius: '20px', border: 'none', cursor: 'pointer',
                          fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase',
                          background: s.status === status ? (status === 'present' ? 'var(--success)' : status === 'late' ? 'var(--warning)' : 'var(--error)') : 'rgba(255,255,255,0.03)',
                          color: s.status === status ? 'black' : 'var(--text-dim)',
                          transition: '0.2s'
                        }}
                      >
                        {status}
                      </button>
                    ))}
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default AttendanceBook;
