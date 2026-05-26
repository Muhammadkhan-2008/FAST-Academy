import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserButton } from '@clerk/clerk-react';
import { ArrowRight } from 'lucide-react';
import Logo from '../assets/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  return (
    <nav style={{ 
      padding: '1.5rem 5%', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      background: 'var(--bg-base)',
      borderBottom: '1px solid var(--border-light)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
         <img src={Logo} alt="FAST" style={{ width: '45px' }} />
         <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--primary)' }}>FAST <span style={{ color: 'var(--text-main)' }}>INSTITUTE</span></h2>
      </div>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-dim)' }}>
         <a href="/courses" style={{ textDecoration: 'none', color: 'inherit' }}>CATALOG</a>
         <a href="/labs" style={{ textDecoration: 'none', color: 'inherit' }}>LABS</a>
         <a href="/scholarships" style={{ textDecoration: 'none', color: 'inherit' }}>SCHOLARSHIPS</a>
         <a href="/notes" style={{ textDecoration: 'none', color: 'inherit' }}>ARCHIVES</a>
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
         {isSignedIn ? (
           <>
             <button onClick={() => navigate('/portal-select')} className="premium-btn">
               PORTAL <ArrowRight size={18} />
             </button>
             <UserButton />
           </>
         ) : (
           <button onClick={() => navigate('/login')} className="premium-btn">
             SECURE LOGIN <ArrowRight size={18} />
           </button>
         )}
      </div>
    </nav>
  );
};

export default Navbar;
