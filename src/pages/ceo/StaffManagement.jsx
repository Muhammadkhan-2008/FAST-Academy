import React from 'react';
import { UserPlus, Mail, Phone, MoreVertical, Edit, Trash2 } from 'lucide-react';

const StaffManagement = () => {
  const staff = [
    { name: 'Prof. MK', role: 'Head of Engineering', dept: 'Tech', status: 'Active', email: 'mk@circle.edu' },
    { name: 'Dr. Sarah Wilson', role: 'Senior Faculty', dept: 'Science', status: 'Active', email: 'sarah.w@circle.edu' },
    { name: 'John Doe', role: 'Lab Assistant', dept: 'Tech', status: 'On Leave', email: 'john.d@circle.edu' },
    { name: 'Alice Smith', role: 'Course Coordinator', dept: 'Admin', status: 'Active', email: 'alice.s@circle.edu' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Staff Directory</h2>
          <p style={{ color: 'var(--text-dim)' }}>Manage faculty and administrative personnel access.</p>
        </div>
        <button className="neo-btn neo-btn-primary">
          <UserPlus size={20} /> Add New Staff
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {staff.map((s, i) => (
          <div key={i} className="glass-panel" style={{ padding: '1.5rem', position: 'relative' }}>
             <button style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
               <MoreVertical size={20} />
             </button>
             
             <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '15px', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>{s.name[0]}</span>
                </div>
                <div>
                   <h3 style={{ fontSize: '1.1rem' }}>{s.name}</h3>
                   <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>{s.dept}</span>
                </div>
             </div>

             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                   <span style={{ color: 'var(--text-dim)' }}>Role:</span> {s.role}
                </p>
                <p style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                   <Mail size={14} color="var(--primary)" /> {s.email}
                </p>
                <p style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                   <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.status === 'Active' ? 'var(--success)' : 'var(--warning)' }}></span>
                   {s.status}
                </p>
             </div>

             <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button className="neo-btn neo-btn-ghost" style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem' }}>
                   <Edit size={14} /> Edit
                </button>
                <button className="neo-btn neo-btn-ghost" style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem', color: 'var(--error)' }}>
                   <Trash2 size={14} /> Remove
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffManagement;
