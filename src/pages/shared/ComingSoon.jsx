import React from 'react';
import { Clock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ComingSoon = ({ title = "Module Under Construction" }) => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
         <Clock size={40} color="var(--primary)" />
      </div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', color: 'var(--text-main)' }}>{title}</h1>
      <p style={{ fontSize: '1.1rem', color: 'var(--text-dim)', maxWidth: '500px', lineHeight: 1.6, marginBottom: '2.5rem' }}>
         This institutional module is currently being configured and will be deployed in the next synchronization cycle.
      </p>
      <button onClick={() => navigate(-1)} className="premium-btn">
         <ArrowLeft size={18} /> RETURN TO PORTAL
      </button>
    </div>
  );
};

export default ComingSoon;
