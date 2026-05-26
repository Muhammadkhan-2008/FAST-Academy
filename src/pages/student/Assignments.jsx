import React from 'react';
import { FileText, Clock, CheckCircle, AlertCircle, Upload } from 'lucide-react';

const Assignments = () => {
  const assignments = [
    { title: 'React Performance Optimization', course: 'Web Dev 101', deadline: '2026-05-12', status: 'pending', priority: 'high' },
    { title: 'UI Layout Principles', course: 'Design Hub', deadline: '2026-05-15', status: 'submitted', priority: 'medium' },
    { title: 'Database Schema Design', course: 'Backend Mastery', deadline: '2026-05-10', status: 'overdue', priority: 'high' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Academic Deliverables</h2>
        <p style={{ color: 'var(--text-dim)' }}>Manage and submit your assignments across all enrolled modules.</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {assignments.map((asgn, i) => (
          <div key={i} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ padding: '1rem', background: asgn.status === 'overdue' ? 'var(--error)15' : 'var(--primary)15', color: asgn.status === 'overdue' ? 'var(--error)' : 'var(--primary)', borderRadius: '12px' }}>
                   <FileText size={24} />
                </div>
                <div>
                   <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{asgn.title}</h3>
                   <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>Course: {asgn.course}</p>
                   <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem', color: asgn.status === 'overdue' ? 'var(--error)' : 'white' }}>
                         <Clock size={14} /> Deadline: {asgn.deadline}
                      </span>
                      <span className={`badge ${asgn.priority === 'high' ? 'badge-rose' : 'badge-gold'}`} style={{ fontSize: '0.6rem' }}>{asgn.priority.toUpperCase()} PRIORITY</span>
                   </div>
                </div>
             </div>

             <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ textAlign: 'right' }}>
                   <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.25rem' }}>STATUS</p>
                   <span style={{ 
                     display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 700,
                     color: asgn.status === 'submitted' ? 'var(--success)' : asgn.status === 'overdue' ? 'var(--error)' : 'var(--warning)'
                   }}>
                      {asgn.status === 'submitted' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                      {asgn.status.toUpperCase()}
                   </span>
                </div>
                <button className={`neo-btn ${asgn.status === 'submitted' ? 'neo-btn-ghost' : 'neo-btn-primary'}`} style={{ padding: '0.6rem 1.2rem' }}>
                   <Upload size={18} /> {asgn.status === 'submitted' ? 'Update' : 'Submit'}
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;
