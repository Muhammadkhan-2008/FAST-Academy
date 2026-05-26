import React from 'react';
import { Search, Folder, FileText, Download, PlayCircle, Filter } from 'lucide-react';

const ResourceLibrary = () => {
  const resources = [
    { name: 'React Foundations.pdf', type: 'document', size: '2.4 MB', date: '2026-05-01' },
    { name: 'Week 1 Live Session.mp4', type: 'video', size: '450 MB', date: '2026-05-02' },
    { name: 'Advanced CSS Cheat Sheet.pdf', type: 'document', size: '1.2 MB', date: '2026-05-03' },
    { name: 'Deployment Guide.vtt', type: 'document', size: '12 KB', date: '2026-05-04' },
    { name: 'Project Assets.zip', type: 'archive', size: '15 MB', date: '2026-05-05' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Resource Vault</h2>
          <p style={{ color: 'var(--text-dim)' }}>Access all study materials, recordings, and assets.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
           <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input type="text" placeholder="Search resources..." className="glass-panel" style={{ padding: '0.6rem 1rem 0.6rem 2.5rem', background: 'transparent', width: '300px' }} />
           </div>
           <button className="neo-btn neo-btn-ghost"><Filter size={18} /> Filters</button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
         {/* Categories */}
         <div className="glass-panel" style={{ padding: '1.5rem', height: 'fit-content' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Categories</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
               {[
                 { label: 'All Resources', icon: <Folder size={18} />, count: 124 },
                 { label: 'Live Recordings', icon: <PlayCircle size={18} />, count: 12 },
                 { label: 'Study Notes', icon: <FileText size={18} />, count: 48 },
                 { label: 'Project Assets', icon: <Folder size={18} />, count: 64 },
               ].map((cat, i) => (
                 <button key={i} className="neo-btn neo-btn-ghost" style={{ width: '100%', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                       {cat.icon} {cat.label}
                    </div>
                    <span style={{ fontSize: '0.75rem', opacity: 0.5 }}>{cat.count}</span>
                 </button>
               ))}
            </div>
         </div>

         {/* File List */}
         <div className="glass-panel" style={{ overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
               <thead>
                  <tr style={{ color: 'var(--text-dim)', fontSize: '0.85rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                     <th style={{ padding: '1.25rem' }}>File Name</th>
                     <th style={{ padding: '1.25rem' }}>Type</th>
                     <th style={{ padding: '1.25rem' }}>Size</th>
                     <th style={{ padding: '1.25rem' }}>Date</th>
                     <th style={{ padding: '1.25rem' }}>Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {resources.map((file, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                       <td style={{ padding: '1.25rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                             {file.type === 'video' ? <PlayCircle size={20} color="var(--primary)" /> : <FileText size={20} color="var(--secondary)" />}
                             <span style={{ fontWeight: 600 }}>{file.name}</span>
                          </div>
                       </td>
                       <td style={{ padding: '1.25rem', fontSize: '0.9rem' }}>{file.type.toUpperCase()}</td>
                       <td style={{ padding: '1.25rem', fontSize: '0.9rem' }}>{file.size}</td>
                       <td style={{ padding: '1.25rem', fontSize: '0.9rem' }}>{file.date}</td>
                       <td style={{ padding: '1.25rem' }}>
                          <button className="neo-btn neo-btn-ghost" style={{ padding: '0.5rem' }}>
                             <Download size={18} />
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default ResourceLibrary;
