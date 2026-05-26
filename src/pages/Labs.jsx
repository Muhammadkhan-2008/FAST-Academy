import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, Cpu, HardDrive, Globe, 
  Play, Square, RefreshCw, ChevronRight, 
  Database, Shield, Cloud, Activity, User
} from 'lucide-react';
import Navbar from '../components/Navbar';

const Labs = () => {
  const [activeLab, setActiveLab] = useState(null);
  const [labStatus, setLabStatus] = useState('idle');
  const [logs, setLogs] = useState([]);

  const labTemplates = [
    { id: 'web', name: 'WEB ARCHITECTURE HUB', icon: <Globe size={24} />, specs: '4 vCPU | 8GB RAM', desc: 'Pre-configured Node.js & Docker clusters.' },
    { id: 'ai', name: 'NEURAL SANDBOX ALPHA', icon: <Cpu size={24} />, specs: '8 vCPU | 16GB RAM | A100', desc: 'GPU-accelerated PyTorch & CUDA env.' },
    { id: 'sec', name: 'SECURITY OPS CENTER', icon: <Shield size={24} />, specs: '2 vCPU | 4GB RAM', desc: 'Isolated Zero-Trust simulation environment.' },
    { id: 'db', name: 'DATALAKE CLUSTER', icon: <Database size={24} />, specs: 'Multi-Node Sharding', desc: 'High-availability MongoDB/Postgres clusters.' },
  ];

  const startLab = (lab) => {
    setActiveLab(lab);
    setLabStatus('provisioning');
    setLogs(['[UPLINK] INITIALIZING ORCHESTRATOR...', '[STORAGE] PULLING IMAGE: FAST_INSTITUTE/' + lab.id]);
    
    const steps = ['ALLOCATING QUANTUM CORES...', 'ESTABLISHING SECURE BRIDGE...', 'INJECTING ENCRYPTION KEYS...', 'ENVIRONMENT INITIALIZED.'];
    steps.forEach((step, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, `[SYSTEM] ${step}`]);
        if (i === steps.length - 1) setLabStatus('active');
      }, (i + 1) * 1200);
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', color: '#fff' }}>
      <div className="mesh-grid" style={{ opacity: 0.2 }} />
      <Navbar />
      
      <div style={{ padding: '8rem 5% 4rem', maxWidth: '1600px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
         <header style={{ marginBottom: '5rem', textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
               <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, letterSpacing: '-0.04em' }}>RESEARCH <span className="gradient-text">LABS</span></h1>
               <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', fontWeight: 600, marginTop: '1rem' }}>PROVISION ELITE CLOUD ENVIRONMENTS ON-DEMAND.</p>
            </motion.div>
         </header>

         {!activeLab ? (
           <div className="bento-grid-labs">
              {labTemplates.map((lab, i) => (
                <motion.div 
                  key={lab.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className="glass-card" 
                  style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem', border: '1px solid var(--border-light)' }}
                >
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ width: '50px', height: '50px', background: 'var(--bg-subtle)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', border: '1px solid var(--border-light)' }}>
                        {lab.icon}
                      </div>
                      <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '0.1em' }}>{lab.specs}</span>
                   </div>
                   <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 900, marginBottom: '0.75rem', letterSpacing: '0.05em' }}>{lab.name}</h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>{lab.desc}</p>
                   </div>
                   <button onClick={() => startLab(lab)} className="premium-btn" style={{ width: '100%', justifyContent: 'center' }}>
                     PROVISION <ChevronRight size={18} />
                   </button>
                </motion.div>
              ))}
           </div>
         ) : (
           <div className="bento-grid-active-lab">
              {/* CRT TERMINAL */}
              <div className="terminal-container" style={{ background: '#020617', padding: 0, borderRadius: '32px', border: '1px solid var(--primary-glow)', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
                 <div className="crt-overlay" />
                 
                 <div style={{ padding: '1.25rem 2.5rem', background: 'rgba(30, 41, 59, 0.5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', zIndex: 20 }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                       <Terminal size={18} color="var(--primary)" />
                       <span style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.15em', color: 'var(--primary)' }}>FAST_KERNEL v2.0 // {activeLab.name}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                       <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
                       <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
                       <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
                    </div>
                 </div>

                 <div style={{ flex: 1, padding: '2.5rem', fontFamily: '"JetBrains Mono", monospace', fontSize: '0.9rem', overflowY: 'auto', color: 'var(--primary)', zIndex: 20 }} className="custom-scrollbar">
                    {logs.map((log, i) => (
                      <div key={i} style={{ marginBottom: '0.75rem', textShadow: '0 0 10px var(--primary-glow)' }}>
                         <span style={{ opacity: 0.7 }}>{new Date().toLocaleTimeString()} </span>
                         <span>{log}</span>
                      </div>
                    ))}
                    {labStatus === 'active' && (
                      <div style={{ marginTop: '3rem' }}>
                         <p style={{ color: '#10B981' }}>scholar@fast-terminal:~ $ <span className="cursor-blink">█</span></p>
                         <div style={{ marginTop: '2rem', background: 'rgba(20, 184, 166, 0.05)', padding: '2rem', borderRadius: '20px', border: '1px solid var(--primary-glow)' }}>
                            <p style={{ fontWeight: 900, letterSpacing: '0.05em' }}>UPLINK ESTABLISHED SUCCESSFULLY.</p>
                            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.8 }}>Accessing dedicated {activeLab.specs} resources. Local IDE sync active.</p>
                         </div>
                      </div>
                    )}
                 </div>
              </div>

              {/* METRICS PANEL */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                 <div className="glass-card" style={{ padding: '2rem' }}>
                    <h4 style={{ fontSize: '0.8rem', fontWeight: 900, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', letterSpacing: '0.1em' }}>
                       <Activity size={20} color="var(--primary)" /> TELEMETRY
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                       <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: 900, marginBottom: '0.75rem' }}>
                             <span style={{ color: 'var(--text-dim)' }}>COMPUTE LOAD</span>
                             <span style={{ color: 'var(--primary)' }}>{labStatus === 'active' ? '12.4%' : '0%'}</span>
                          </div>
                          <div style={{ height: '6px', background: 'var(--bg-subtle)', borderRadius: '10px', overflow: 'hidden' }}>
                             <motion.div animate={{ width: labStatus === 'active' ? '12.4%' : '0%' }} style={{ height: '100%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }} />
                          </div>
                       </div>
                       <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: 900, marginBottom: '0.75rem' }}>
                             <span style={{ color: 'var(--text-dim)' }}>MEMORY ALLOCATION</span>
                             <span style={{ color: 'var(--secondary)' }}>{labStatus === 'active' ? '2.8 GB' : '0 GB'}</span>
                          </div>
                          <div style={{ height: '4px', background: 'var(--bg-subtle)', borderRadius: '10px', overflow: 'hidden' }}>
                             <motion.div animate={{ width: labStatus === 'active' ? '35%' : '0%' }} style={{ height: '100%', background: 'var(--secondary)', boxShadow: '0 0 10px var(--secondary)' }} />
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <button 
                      onClick={() => { setLabStatus('idle'); setActiveLab(null); setLogs([]); }}
                      className="premium-btn" style={{ width: '100%', background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.2)', justifyContent: 'center' }}
                    >
                       TERMINATE <Square size={16} />
                    </button>
                    <button className="premium-btn-ghost" style={{ width: '100%', justifyContent: 'center', fontSize: '0.75rem' }}>
                       RESET NODE <RefreshCw size={16} />
                    </button>
                 </div>
              </div>
           </div>
         )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .cursor-blink { animation: blink 1s step-end infinite; }
        @keyframes blink { from, to { opacity: 1; } 50% { opacity: 0; } }
        .bento-grid-labs { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; }
        .bento-grid-active-lab { display: grid; grid-template-columns: 1fr 350px; gap: 2rem; }
        .crt-overlay {
           position: absolute; inset: 0; 
           background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
           z-index: 10; pointer-events: none; background-size: 100% 2px, 3px 100%;
        }
      `}} />
    </div>
  );
};

export default Labs;
