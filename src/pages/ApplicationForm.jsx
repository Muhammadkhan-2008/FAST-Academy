import React, { useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, CheckCircle, FileText, Lock } from 'lucide-react';
import Navbar from '../components/Navbar';
import { API_URL } from '../utils/api';

const ApplicationForm = () => {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const { type, targetId } = useParams();

  const [formData, setFormData] = useState({
    // Personal Info
    phone: '',
    fatherName: '',
    cnic: '',
    address: '',
    
    // Academic Info
    educationLevel: 'Undergraduate',
    currentInstitute: '',
    lastGrade: '', // GPA or Percentage
    
    // Application Specific
    statementOfPurpose: '',
    financialJustification: '', // Specifically for scholarships
    githubLink: '',
    portfolioLink: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      alert("Security Protocol: You must be signed in to submit an application.");
      navigate('/login');
      return;
    }

    setStatus('submitting');
    try {
      const token = await getToken();
      const response = await fetch(`${API_URL}/api/applications`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: user.id,
          name: user.fullName || user.username,
          email: user.primaryEmailAddress?.emailAddress,
          type: type,
          targetId: targetId,
          formData: formData
        })
      });

      if (!response.ok) throw new Error("Backend synchronization failed.");
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-subtle)' }}>
      <Navbar />
      <div style={{ padding: '8rem 5% 4rem', maxWidth: '900px', margin: '0 auto' }}>
         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ padding: 'clamp(1.5rem, 5vw, 4rem)' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
               <Shield size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
               <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                 {type === 'scholarship' ? 'Institutional Grant' : 'Elite Course'} <span className="gradient-text">Application</span>
               </h1>
               <p style={{ color: 'var(--text-dim)' }}>
                 Ref ID: {targetId?.toUpperCase()} • Secure Verification Active
               </p>
            </div>

            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                 <CheckCircle size={64} color="var(--primary)" style={{ marginBottom: '1.5rem', margin: '0 auto' }} />
                 <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Application Secured</h2>
                 <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>Your detailed profile has been encrypted and saved to the FAST institutional database. Our committee will review your technical and academic standing.</p>
                 <button onClick={() => navigate('/portal-select')} className="premium-btn" style={{ margin: '0 auto' }}>
                   Return to Workstation
                 </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                 {/* Security Notice */}
                 <div style={{ display: 'flex', gap: '1rem', padding: '1.25rem', background: 'var(--primary-glow)', borderRadius: '12px', border: '1px solid rgba(13, 148, 136, 0.2)' }}>
                    <Lock size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                    <p style={{ fontSize: '0.85rem', color: 'var(--primary-deep)', fontWeight: 600, lineHeight: 1.5 }}>
                      Verification Protocol: This form will be linked to UID: {user?.id}. All academic data must be authentic. False information will result in permanent suspension from the FAST ecosystem.
                    </p>
                 </div>

                 {/* Section: Personal Identity */}
                 <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--primary)', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>I. Personal Identity</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                       <div className="form-group">
                          <label className="pro-label">Father's Name / Guardian</label>
                          <input className="pro-input" required value={formData.fatherName} onChange={(e) => setFormData({...formData, fatherName: e.target.value})} />
                       </div>
                       <div className="form-group">
                          <label className="pro-label">CNIC / ID Number</label>
                          <input className="pro-input" required placeholder="00000-0000000-0" value={formData.cnic} onChange={(e) => setFormData({...formData, cnic: e.target.value})} />
                       </div>
                       <div className="form-group">
                          <label className="pro-label">Active Contact Number</label>
                          <input className="pro-input" required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                       </div>
                       <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                          <label className="pro-label">Permanent Residential Address</label>
                          <input className="pro-input" required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                       </div>
                    </div>
                 </div>

                 {/* Section: Academic Background */}
                 <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--primary)', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>II. Academic Background</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                       <div className="form-group">
                          <label className="pro-label">Education Level</label>
                          <select className="pro-input" value={formData.educationLevel} onChange={(e) => setFormData({...formData, educationLevel: e.target.value})}>
                             <option>Matric / O-Level</option>
                             <option>Intermediate / A-Level</option>
                             <option>Undergraduate</option>
                             <option>Postgraduate</option>
                          </select>
                       </div>
                       <div className="form-group">
                          <label className="pro-label">Institute Name</label>
                          <input className="pro-input" required placeholder="Full name of College/University" value={formData.currentInstitute} onChange={(e) => setFormData({...formData, currentInstitute: e.target.value})} />
                       </div>
                       <div className="form-group">
                          <label className="pro-label">Previous GPA / Percentage</label>
                          <input className="pro-input" required placeholder="e.g. 3.8 or 85%" value={formData.lastGrade} onChange={(e) => setFormData({...formData, lastGrade: e.target.value})} />
                       </div>
                    </div>
                 </div>

                 {/* Section: Justification */}
                 <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--primary)', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>III. Justification & Research</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                       <div className="form-group">
                          <label className="pro-label">Statement of Purpose (Min. 200 words)</label>
                          <textarea className="pro-input" required rows={6} placeholder="How will FAST help you achieve your technical goals?" value={formData.statementOfPurpose} onChange={(e) => setFormData({...formData, statementOfPurpose: e.target.value})} />
                       </div>
                       {type === 'scholarship' && (
                         <div className="form-group">
                            <label className="pro-label">Financial Need Justification</label>
                            <textarea className="pro-input" required rows={4} placeholder="Briefly explain why you are applying for this specific grant." value={formData.financialJustification} onChange={(e) => setFormData({...formData, financialJustification: e.target.value})} />
                         </div>
                       )}
                       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                          <div className="form-group">
                             <label className="pro-label">GitHub / Repository Link</label>
                             <input className="pro-input" type="url" placeholder="https://github.com/..." value={formData.githubLink} onChange={(e) => setFormData({...formData, githubLink: e.target.value})} />
                          </div>
                          <div className="form-group">
                             <label className="pro-label">Professional Portfolio / LinkedIn</label>
                             <input className="pro-input" type="url" placeholder="https://linkedin.com/..." value={formData.portfolioLink} onChange={(e) => setFormData({...formData, portfolioLink: e.target.value})} />
                          </div>
                       </div>
                    </div>
                 </div>

                 {status === 'error' && <p style={{ color: 'red', fontWeight: 600, textAlign: 'center' }}>Institutional DB Error: Please ensure you are authenticated.</p>}

                 <button type="submit" disabled={status === 'submitting'} className="premium-btn" style={{ width: '100%', justifyContent: 'center', height: '60px', fontSize: '1.1rem' }}>
                    {status === 'submitting' ? 'Encrypting Data...' : 'Submit Institutional Application'} <ArrowRight size={22} />
                 </button>
              </form>
            )}
         </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .pro-label { display: block; font-weight: 800; font-size: 0.85rem; color: var(--text-main); margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; }
        .pro-input { width: 100%; padding: 1rem; border-radius: 12px; border: 1px solid var(--border-light); background: #ffffff; color: var(--text-main); font-size: 0.95rem; transition: 0.3s; outline: none; }
        .pro-input:focus { border-color: var(--primary); box-shadow: 0 0 0 4px var(--primary-glow); }
        .form-group { width: 100%; }
      `}} />
    </div>
  );
};

export default ApplicationForm;
