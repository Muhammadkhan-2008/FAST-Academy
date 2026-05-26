import React from 'react';
import { UserProfile } from '@clerk/clerk-react';

const StudentSettings = () => {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ marginBottom: '2rem' }}>
         <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
           ACCOUNT <span style={{ color: 'var(--primary)' }}>SETTINGS</span>
         </h1>
         <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', fontWeight: 600 }}>
           Update your personal information, security credentials, and communication preferences.
         </p>
      </header>

      <div className="glass-card" style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
         <UserProfile 
           appearance={{
             elements: {
               rootBox: "mx-auto w-full max-w-4xl",
               card: "shadow-none w-full max-w-4xl",
               navbar: "border-r border-[#E2E8F0] pr-6",
               navbarButton: "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#4B0082] rounded-xl font-bold",
               headerTitle: "text-[#4B0082] text-2xl font-black tracking-tighter",
               headerSubtitle: "text-[#475569] font-bold",
               profileSectionTitleText: "text-[#4B0082] font-black border-b border-[#E2E8F0] pb-2",
               profileSectionPrimaryButton: "text-[#4B0082] hover:bg-[#F1F5F9] font-bold",
               formButtonPrimary: "bg-[#4B0082] hover:bg-[#2563EB] text-white font-black h-10 rounded-xl transition-all",
               formFieldLabel: "text-[#0F172A] font-bold",
               formFieldInput: "bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] rounded-xl focus:ring-[#4B0082]",
               badge: "bg-[#F1F5F9] text-[#4B0082] font-bold"
             }
           }}
         />
      </div>
    </div>
  );
};

export default StudentSettings;
