import React from 'react';
import { Shield, Clock, User, HardDrive, Terminal, Activity } from 'lucide-react';

const AuditLogs = () => {
  const logs = [
    { id: 'L-8902', event: 'Unauthorized Login Attempt', user: 'IP 192.168.1.45', time: '2026-05-08 18:12', severity: 'high' },
    { id: 'L-8901', event: 'Course Data Deleted', user: 'Admin_MK', time: '2026-05-08 17:45', severity: 'medium' },
    { id: 'L-8900', event: 'System Update Completed', user: 'Auto_System', time: '2026-05-08 16:30', severity: 'low' },
    { id: 'L-8899', event: 'User Permission Changed', user: 'Director_CEO', time: '2026-05-08 15:20', severity: 'medium' },
    { id: 'L-8898', event: 'Database Backup Initialized', user: 'Cloud_Cron', time: '2026-05-08 14:00', severity: 'low' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Shield size={24} color="var(--primary)" /> System Audit Logs
        </h2>
        <p style={{ color: 'var(--text-dim)' }}>Immutable record of all critical system actions and security events.</p>
      </header>

      <div className="glass-panel" style={{ padding: '1.5rem', background: '#020617' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
            <Terminal size={18} />
            <span>system_audit_trail_v2.log</span>
         </div>

         <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(255,255,255,0.05)' }}>
            {logs.map((log, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 180px 180px 100px', gap: '1rem', padding: '1rem', background: '#020617', alignItems: 'center' }}>
                 <code style={{ color: 'var(--primary)', fontSize: '0.8rem' }}>[{log.id}]</code>
                 <span style={{ fontSize: '0.9rem', color: log.severity === 'high' ? 'var(--error)' : 'white' }}>{log.event}</span>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                    <User size={14} /> {log.user}
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                    <Clock size={14} /> {log.time}
                 </div>
                 <span className={`badge ${log.severity === 'high' ? 'badge-rose' : log.severity === 'medium' ? 'badge-gold' : 'badge-cyan'}`} style={{ fontSize: '0.6rem', textAlign: 'center' }}>
                    {log.severity}
                 </span>
              </div>
            ))}
         </div>

         <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Showing 5 of 12,450 records</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
               <button className="neo-btn neo-btn-ghost" style={{ padding: '0.4rem 1rem' }}>Prev</button>
               <button className="neo-btn neo-btn-ghost" style={{ padding: '0.4rem 1rem' }}>Next</button>
            </div>
         </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
         <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <HardDrive size={32} color="var(--primary)" />
            <div>
               <h4 style={{ fontSize: '1rem' }}>Storage Health</h4>
               <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>92% Space Available</p>
            </div>
         </div>
         <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Activity size={32} color="var(--success)" />
            <div>
               <h4 style={{ fontSize: '1rem' }}>API Uptime</h4>
               <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>99.99% Online</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AuditLogs;
