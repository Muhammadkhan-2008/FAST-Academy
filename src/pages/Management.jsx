import React from 'react';
import { Users, UserPlus, CreditCard, ClipboardCheck, MoreHorizontal } from 'lucide-react';

const Management = () => {
  const students = [
    { name: 'John Doe', id: 'S101', attendance: '95%', status: 'Paid', email: 'john@example.com' },
    { name: 'Jane Smith', id: 'S102', attendance: '88%', status: 'Pending', email: 'jane@example.com' },
    { name: 'Alex Johnson', id: 'S103', attendance: '92%', status: 'Paid', email: 'alex@example.com' },
    { name: 'Sarah Wilson', id: 'S104', attendance: '75%', status: 'Paid', email: 'sarah@example.com' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Management Portal</h1>
          <p style={{ color: 'var(--text-muted)' }}>Administrative tools for student tracking and faculty management.</p>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <UserPlus size={18} /> Add New Student
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {[
          { label: 'Total Students', value: '1,240', icon: <Users color="var(--primary)" /> },
          { label: 'Avg Attendance', value: '89%', icon: <ClipboardCheck color="var(--success)" /> },
          { label: 'Fees Collected', value: '$45,200', icon: <CreditCard color="var(--accent)" /> },
        ].map((stat, i) => (
          <div key={i} className="glass" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>{stat.icon}</div>
            <div>
              <h3 style={{ fontSize: '1.5rem' }}>{stat.value}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <section className="glass" style={{ padding: '1.5rem', overflowX: 'auto' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Student Roster</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <th style={{ padding: '1rem' }}>Student Name</th>
              <th style={{ padding: '1rem' }}>ID</th>
              <th style={{ padding: '1rem' }}>Attendance</th>
              <th style={{ padding: '1rem' }}>Fee Status</th>
              <th style={{ padding: '1rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', fontSize: '0.95rem' }}>
                <td style={{ padding: '1rem' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                     <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--surface-light)' }}></div>
                     <div>
                       <p>{s.name}</p>
                       <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.email}</p>
                     </div>
                   </div>
                </td>
                <td style={{ padding: '1rem' }}>{s.id}</td>
                <td style={{ padding: '1rem' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                     <div style={{ width: '60px', height: '6px', background: 'var(--surface-light)', borderRadius: '3px' }}>
                        <div style={{ width: s.attendance, height: '100%', background: 'var(--success)', borderRadius: '3px' }}></div>
                     </div>
                     <span>{s.attendance}</span>
                   </div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '20px', 
                    fontSize: '0.75rem', 
                    background: s.status === 'Paid' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    color: s.status === 'Paid' ? 'var(--success)' : 'var(--error)',
                    border: `1px solid ${s.status === 'Paid' ? 'var(--success)' : 'var(--error)'}`
                  }}>
                    {s.status}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                   <MoreHorizontal size={18} cursor="pointer" color="var(--text-muted)" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Management;
