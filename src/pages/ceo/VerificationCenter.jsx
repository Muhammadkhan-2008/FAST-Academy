import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { CheckCircle, XCircle, Eye, FileText, User, ShieldCheck, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VerificationCenter = () => {
  const { data, verifyUser } = useSchool();
  const [selectedRequest, setSelectedRequest] = useState(null);

  const pendingRequests = data.pendingUsers || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Identity & Access Control</h2>
        <p style={{ color: 'var(--text-dim)' }}>Verify credentials, payment proofs, and institutional eligibility.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {pendingRequests.map((req) => (
          <motion.div 
            key={req.id} 
            layoutId={req.id}
            className="glass-panel" 
            style={{ padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'var(--primary)15', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                   {req.role === 'teacher' ? <ShieldCheck /> : <User />}
                </div>
                <div>
                   <h3 style={{ fontSize: '1.1rem' }}>{req.name}</h3>
                   <span className={`badge ${req.role === 'teacher' ? 'badge-gold' : 'badge-cyan'}`} style={{ fontSize: '0.65rem' }}>
                     {req.role.toUpperCase()} APPLICANT
                   </span>
                </div>
              </div>
              <button onClick={() => setSelectedRequest(req)} className="neo-btn neo-btn-ghost" style={{ padding: '0.5rem' }}><Eye size={18} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-dim)' }}>Email:</span>
                  <span>{req.email}</span>
               </div>
               {req.role === 'teacher' ? (
                 <>
                   <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-dim)' }}>Subject:</span>
                      <span>{req.subject}</span>
                   </div>
                   <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-dim)' }}>Exp:</span>
                      <span>{req.experience}</span>
                   </div>
                 </>
               ) : (
                 <>
                   <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-dim)' }}>Payment:</span>
                      <span style={{ color: 'var(--success)' }}>VERIFIED</span>
                   </div>
                 </>
               )}
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
               <button onClick={() => verifyUser(req.id, 'approve')} className="neo-btn neo-btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                 <CheckCircle size={18} /> Approve
               </button>
               <button onClick={() => verifyUser(req.id, 'reject')} className="neo-btn neo-btn-ghost" style={{ flex: 1, justifyContent: 'center', color: 'var(--error)' }}>
                 <XCircle size={18} /> Reject
               </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed Document Modal */}
      <AnimatePresence>
        {selectedRequest && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '2rem' }}>
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className="glass-panel" 
               style={{ width: '100%', maxWidth: '800px', padding: '3rem', position: 'relative' }}
             >
                <button onClick={() => setSelectedRequest(null)} style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><XCircle /></button>
                
                <h3 style={{ fontSize: '1.75rem', marginBottom: '2rem' }}>Credential Verification: {selectedRequest.name}</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                   <div>
                      <h4 style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FileText size={18} /> Application Details</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                         <p><strong>Full Name:</strong> {selectedRequest.name}</p>
                         <p><strong>Role:</strong> {selectedRequest.role}</p>
                         <p><strong>Email:</strong> {selectedRequest.email}</p>
                         {selectedRequest.role === 'teacher' && (
                           <>
                             <p><strong>Qualification:</strong> {selectedRequest.qualification}</p>
                             <p><strong>Experience:</strong> {selectedRequest.experience}</p>
                           </>
                         )}
                         <p><strong>Submitted:</strong> {selectedRequest.submittedAt}</p>
                      </div>
                   </div>
                   <div>
                      <h4 style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ShieldCheck size={18} /> Document Proofs</h4>
                      <div style={{ background: 'rgba(255,255,255,0.02)', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '15px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
                         <FileText size={48} color="var(--text-dim)" />
                         <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Verification Document.pdf</p>
                         <button className="neo-btn neo-btn-ghost" style={{ fontSize: '0.75rem' }}>View Full Document</button>
                      </div>
                   </div>
                </div>

                <div style={{ marginTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem', display: 'flex', gap: '1.5rem' }}>
                   <button onClick={() => { verifyUser(selectedRequest.id, 'approve'); setSelectedRequest(null); }} className="neo-btn neo-btn-primary" style={{ padding: '1rem 3rem' }}>Approve Enrollment</button>
                   <button onClick={() => { verifyUser(selectedRequest.id, 'reject'); setSelectedRequest(null); }} className="neo-btn neo-btn-ghost" style={{ padding: '1rem 3rem', color: 'var(--error)' }}>Reject & Delete</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VerificationCenter;
