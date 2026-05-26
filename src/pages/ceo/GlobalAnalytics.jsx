import React from 'react';
import { TrendingUp, Users, DollarSign, Clock, Download } from 'lucide-react';

const GlobalAnalytics = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Institutional Analytics</h2>
          <p style={{ color: 'var(--text-dim)' }}>Comprehensive data on revenue, engagement, and growth.</p>
        </div>
        <button className="neo-btn neo-btn-primary">
          <Download size={18} /> Export Full Report
        </button>
      </header>

      {/* Hero Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {[
          { label: 'Monthly Revenue', value: '$124,500', trend: '+12.5%', icon: <DollarSign />, color: 'var(--success)' },
          { label: 'Active Learners', value: '8,420', trend: '+8.2%', icon: <Users />, color: 'var(--primary)' },
          { label: 'Avg Study Time', value: '4.2h/day', trend: '+2.1%', icon: <Clock />, color: 'var(--secondary)' },
          { label: 'Growth Rate', value: '24.5%', trend: '+4.5%', icon: <TrendingUp />, color: 'var(--accent)' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel" style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', color: stat.color }}>{stat.icon}</div>
                <span style={{ color: 'var(--success)', fontSize: '0.8rem', fontWeight: 800 }}>{stat.trend}</span>
             </div>
             <h3 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>{stat.value}</h3>
             <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>{stat.label}</p>
             <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: stat.color, opacity: 0.3 }}></div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
         <div className="glass-panel" style={{ padding: '2rem', minHeight: '400px' }}>
            <h3 style={{ marginBottom: '2rem' }}>Revenue Projection (2026)</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', height: '250px', padding: '0 1rem' }}>
               {[40, 65, 55, 85, 75, 95, 80, 100, 90, 110, 105, 120].map((h, i) => (
                 <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                    <div style={{ height: `${h}%`, width: '100%', background: 'linear-gradient(to top, var(--primary), var(--secondary))', borderRadius: '4px', opacity: 0.8 }}></div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>M{i+1}</span>
                 </div>
               ))}
            </div>
         </div>

         <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '2rem' }}>Enrollment by Category</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
               {[
                 { cat: 'Engineering', val: '45%', color: 'var(--primary)' },
                 { cat: 'Design', val: '25%', color: 'var(--secondary)' },
                 { cat: 'Business', val: '20%', color: 'var(--accent)' },
                 { cat: 'Humanities', val: '10%', color: 'var(--text-dim)' },
               ].map((c, i) => (
                 <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                       <span>{c.cat}</span>
                       <span>{c.val}</span>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                       <div style={{ width: c.val, height: '100%', background: c.color }}></div>
                    </div>
                 </div>
               ))}
            </div>
            <button className="neo-btn neo-btn-ghost" style={{ width: '100%', marginTop: '3rem' }}>
              View Detailed Metrics
            </button>
         </div>
      </div>
    </div>
  );
};

export default GlobalAnalytics;
