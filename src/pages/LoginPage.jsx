import React from 'react';
import { SignIn, SignUp, useAuth } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ mode = 'login' }) => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isSignedIn) {
      navigate('/portal-select');
    }
  }, [isSignedIn, navigate]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg-deep)', color: 'var(--text-main)' }}>
      <div className="mesh-grid" style={{ opacity: 0.1 }} />
      
      {/* 🏙️ BRAND SIDE */}
      <div className="auth-brand-side" style={{ 
        flex: 1.2, padding: '6rem', background: 'white', 
        borderRight: '1px solid var(--border-light)', display: 'flex', 
        flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' 
      }}>
        <div style={{ position: 'relative', zIndex: 10 }}>
           <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1.5rem', background: 'var(--primary-glow)', borderRadius: '99px', fontSize: '0.7rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '2.5rem', border: '1px solid var(--primary)', letterSpacing: '0.1em' }}>
              <Zap size={14} fill="var(--primary)" /> INSTITUTIONAL GATEWAY
           </div>
           <h1 style={{ fontSize: '4.5rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '2rem', letterSpacing: '-0.04em', color: 'var(--primary)' }}>
             FAST <br /> INSTITUTE <br /><span style={{ color: 'var(--text-main)' }}>PORTAL.</span>
           </h1>
           <p style={{ fontSize: '1.2rem', color: 'var(--text-dim)', lineHeight: 1.7, maxWidth: '500px', fontWeight: 600 }}>
             Access the premier research and educational ecosystem. Log in with your institutional credentials.
           </p>
        </div>
      </div>

      {/* 🔐 AUTH SIDE */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative', zIndex: 10 }}>
         <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            {mode === 'login' ? (
              <SignIn 
                routing="path" 
                path="/login" 
                signUpUrl="/signup" 
                appearance={{
                  elements: {
                    rootBox: "mx-auto",
                    card: "bg-white border-0 shadow-none",
                    headerTitle: "text-[#4B0082] text-3xl font-black tracking-tighter",
                    headerSubtitle: "text-slate-500 font-bold",
                    socialButtonsBlockButton: "bg-slate-50 border-slate-200 text-slate-900 hover:bg-slate-100",
                    formButtonPrimary: "bg-[#4B0082] hover:bg-[#2563EB] text-white font-black h-12 rounded-full transition-all",
                    formFieldLabel: "text-slate-700 font-bold",
                    formFieldInput: "bg-slate-50 border-slate-200 text-slate-900 rounded-xl",
                    footerActionText: "text-slate-500",
                    footerActionLink: "text-[#4B0082] hover:text-[#2563EB] font-bold"
                  }
                }}
              />
            ) : (
              <SignUp 
                routing="path" 
                path="/signup" 
                signInUrl="/login"
                appearance={{
                  elements: {
                    rootBox: "mx-auto",
                    card: "bg-white border-0 shadow-none",
                    headerTitle: "text-[#4B0082] text-3xl font-black tracking-tighter",
                    headerSubtitle: "text-slate-500 font-bold",
                    socialButtonsBlockButton: "bg-slate-50 border-slate-200 text-slate-900 hover:bg-slate-100",
                    formButtonPrimary: "bg-[#4B0082] hover:bg-[#2563EB] text-white font-black h-12 rounded-full transition-all",
                    formFieldLabel: "text-slate-700 font-bold",
                    formFieldInput: "bg-slate-50 border-slate-200 text-slate-900 rounded-xl",
                    footerActionText: "text-slate-500",
                    footerActionLink: "text-[#4B0082] hover:text-[#2563EB] font-bold"
                  }
                }}
              />
            )}
         </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 1024px) {
          .auth-brand-side { display: none !important; }
        }
      `}} />
    </div>
  );
};

export default LoginPage;
