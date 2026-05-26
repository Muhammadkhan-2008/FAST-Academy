import React, { useState, useEffect } from 'react';
import { ShieldAlert, MonitorCheck, Lock, Play, StopCircle, FileWarning } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StudentWorkspace = () => {
  const [isSecureMode, setIsSecureMode] = useState(false);
  const [violationCount, setViolationCount] = useState(0);
  const [testCanceled, setTestCanceled] = useState(false);

  useEffect(() => {
    if (!isSecureMode || testCanceled) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setViolationCount(prev => prev + 1);
        handleViolation();
      }
    };

    const handleContextMenu = (e) => e.preventDefault();
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [isSecureMode, testCanceled]);

  const handleViolation = () => {
    // If user changes tab or minimizes, cancel immediately
    setTestCanceled(true);
    setIsSecureMode(false);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => console.error(err));
    }
  };

  const startSecureTest = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
      setIsSecureMode(true);
      setTestCanceled(false);
      setViolationCount(0);
    } catch (err) {
      alert("Failed to enter secure mode. Fullscreen is required for this assessment.");
    }
  };

  const exitSecureTest = () => {
    setIsSecureMode(false);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => console.error(err));
    }
  };

  if (testCanceled) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#fef2f2', border: '1px solid #ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
           <FileWarning size={40} color="#ef4444" />
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', color: '#ef4444' }}>ASSESSMENT TERMINATED</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-dim)', maxWidth: '600px', lineHeight: 1.6, marginBottom: '2.5rem' }}>
           A security violation was detected. You attempted to exit the secure workspace, change tabs, or minimize the window. Your assessment has been canceled and flagged for review.
        </p>
        <button onClick={() => setTestCanceled(false)} className="premium-btn">ACKNOWLEDGE</button>
      </div>
    );
  }

  if (isSecureMode) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: '#0f172a', color: 'white', zIndex: 9999, display: 'flex', flexDirection: 'column' }}>
         <header style={{ padding: '1rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#020617' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
               <ShieldAlert size={24} color="#ef4444" />
               <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 900 }}>SECURE WORKSPACE ACTIVE</h3>
                  <p style={{ fontSize: '0.7rem', color: '#ef4444', letterSpacing: '0.05em' }}>DO NOT CHANGE TABS OR EXIT FULLSCREEN</p>
               </div>
            </div>
            <button onClick={exitSecureTest} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#ef4444', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', fontWeight: 800, cursor: 'pointer' }}>
               <StopCircle size={18} /> SUBMIT & EXIT
            </button>
         </header>

         <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <div style={{ maxWidth: '800px', width: '100%', background: '#1e293b', padding: '3rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
               <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem' }}>CS-401 Mid-Term Assessment</h2>
               <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Question 1 of 50</p>
               <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
                  <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>Describe the theoretical difference between a monolithic neural network and a micro-service based cognitive architecture in an enterprise environment.</p>
               </div>
               <textarea 
                 placeholder="Type your response here..." 
                 style={{ width: '100%', height: '200px', padding: '1.5rem', background: '#020617', border: '1px solid #334155', color: 'white', borderRadius: '8px', resize: 'none', outline: 'none' }}
               />
               <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                  <button style={{ background: 'var(--primary)', color: 'white', padding: '0.8rem 2rem', borderRadius: '8px', border: 'none', fontWeight: 800, cursor: 'pointer' }}>NEXT QUESTION</button>
               </div>
            </div>
         </main>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', width: '100%' }}>
      <header>
         <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
           INSTITUTIONAL <span style={{ color: 'var(--primary)' }}>WORKSPACE</span>
         </h1>
         <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', fontWeight: 600 }}>
           Access quizzes, lab work, and secure examinations.
         </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
         <div className="glass-card" style={{ padding: '2rem', border: '1px solid #ef4444' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
               <div style={{ width: '50px', height: '50px', background: '#fef2f2', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
                  <Lock size={24} />
               </div>
               <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#ef4444', letterSpacing: '0.1em', background: '#fef2f2', padding: '0.4rem 0.8rem', borderRadius: '99px' }}>HIGH SECURITY</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '0.5rem' }}>Advanced Neural Networks</h3>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '2rem' }}>Mid-Term Assessment • 60 Minutes</p>
            
            <div style={{ background: 'var(--bg-subtle)', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
               <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}><MonitorCheck size={14} color="var(--primary)" /> Fullscreen enforcement active</p>
               <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ShieldAlert size={14} color="#ef4444" /> Tab switching will auto-cancel test</p>
            </div>

            <button onClick={startSecureTest} className="premium-btn" style={{ width: '100%', justifyContent: 'center', background: '#ef4444', boxShadow: 'none' }}>
               <Play size={18} /> INITIATE EXAM
            </button>
         </div>

         <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
               <div style={{ width: '50px', height: '50px', background: 'var(--primary-glow)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                  <MonitorCheck size={24} />
               </div>
               <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '0.1em', background: 'var(--bg-subtle)', padding: '0.4rem 0.8rem', borderRadius: '99px' }}>LAB WORK</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '0.5rem' }}>React Native Prototype</h3>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '2rem' }}>UI Development • No time limit</p>
            <button className="premium-btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
               ENTER LAB
            </button>
         </div>
      </div>
    </div>
  );
};

export default StudentWorkspace;
