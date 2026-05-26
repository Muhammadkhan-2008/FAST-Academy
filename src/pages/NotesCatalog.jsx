import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Download, Lock, Search, Filter, Bookmark, Star, 
  ArrowRight, Zap, Sparkles, CreditCard, CheckCircle, X,
  Archive, Book, FileCheck
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const ResourcePurchaseDialog = ({ resource, onClose, onConfirm }) => (
  <motion.div 
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    style={{ position: 'fixed', inset: 0, background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(20px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
  >
    <motion.div 
      initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
      className="glass-card" style={{ width: '100%', maxWidth: '550px', padding: '4rem', position: 'relative', border: '1px solid var(--secondary-glow)' }}
    >
      <button onClick={onClose} style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}><X size={24} /></button>
      
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ width: '80px', height: '80px', background: 'var(--secondary-glow)', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)', margin: '0 auto 2rem', boxShadow: '0 0 30px var(--secondary-glow)' }}>
           <Archive size={40} />
        </div>
        <h2 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '1rem' }}>RESOURCE UPLINK</h2>
        <p style={{ color: 'var(--text-dim)', fontWeight: 600 }}>Unlocking: {resource.title}</p>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '20px', border: '1px solid var(--border-light)', marginBottom: '3rem' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 800, color: 'var(--text-dim)' }}>RESOURCE COST</span>
            <span style={{ fontWeight: 900, color: 'var(--secondary)' }}>{resource.price}</span>
         </div>
         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 800, color: 'var(--text-dim)' }}>FILE FORMAT</span>
            <span style={{ fontWeight: 900 }}>DIGITAL SOLVED ARCHIVE</span>
         </div>
      </div>

      <button onClick={onConfirm} className="premium-btn" style={{ width: '100%', padding: '1.25rem', justifyContent: 'center', background: 'var(--secondary)', boxShadow: '0 10px 20px var(--secondary-glow)' }}>
         CONFIRM ACQUISITION <Download size={20} />
      </button>
    </motion.div>
  </motion.div>
);

const NotesCatalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedResource, setSelectedResource] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const notes = [
    { 
      id: 'n1', title: 'NED UNIVERSITY PAST PAPERS (2018-2025)', 
      type: 'PDF / SOLVED', category: 'Academic Entry', price: 'Rs. 450',
      rating: 4.9, downloads: '1.2k', description: 'Comprehensive solved past papers with detailed conceptual explanations for NED admission.'
    },
    { 
      id: 'n2', title: 'ARMY ENTRY TEST: INTELLIGENCE & ACADEMIC', 
      type: 'STUDY GUIDE', category: 'Institutional Entry', price: 'Rs. 600',
      rating: 4.8, downloads: '850', description: 'Complete prep material for PMA Long Course, ISSB, and Technical Entry tests.'
    },
    { 
      id: 'n3', title: 'QUANTUM MECHANICS: ADVANCED LECTURE NOTES', 
      type: 'DIGITAL ARCHIVE', category: 'Pure Science', price: 'Free',
      rating: 4.7, downloads: '3.4k', description: 'Detailed derivations and theoretical framework for advanced physics scholars.'
    },
    { 
      id: 'n4', title: 'MDCAT BIOENERGETICS & GENETICS MASTER NOTES', 
      type: 'REVISION CORE', category: 'Medical Entry', price: 'Rs. 300',
      rating: 5.0, downloads: '2.1k', description: 'High-yield notes covering complex biological pathways for medical entrance exams.'
    }
  ];

  const handlePurchase = () => {
    setSuccess(true);
    setTimeout(() => { setSuccess(false); setSelectedResource(null); }, 2500);
  };

  const categories = ['All', 'Academic Entry', 'Institutional Entry', 'Pure Science', 'Medical Entry'];
  const filteredNotes = notes.filter(n => 
    (activeCategory === 'All' || n.category === activeCategory) &&
    (n.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: 'white' }}>
      <div className="mesh-grid" style={{ opacity: 0.15 }} />
      <Navbar />

      <AnimatePresence>
        {selectedResource && !success && (
          <ResourcePurchaseDialog resource={selectedResource} onClose={() => setSelectedResource(null)} onConfirm={handlePurchase} />
        )}
        {success && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(2, 6, 23, 0.95)', zIndex: 4000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          >
            <div style={{ width: '100px', height: '100px', background: 'var(--secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', boxShadow: '0 0 50px var(--secondary-glow)' }}>
               <FileCheck size={50} color="white" />
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.04em' }}>ACQUISITION COMPLETE</h2>
            <p style={{ color: 'var(--text-dim)', fontWeight: 800, marginTop: '1rem' }}>Uplinking archive to your workstation...</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div style={{ padding: '10rem 6% 6rem', maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
         <header style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
               <div style={{ 
                 display: 'inline-flex', alignItems: 'center', gap: '0.75rem', 
                 padding: '0.6rem 1.5rem', background: 'var(--secondary-glow)', borderRadius: '99px',
                 color: 'var(--secondary)', fontSize: '0.7rem', fontWeight: 900,
                 marginBottom: '2.5rem', border: '1px solid var(--secondary-glow)',
                 letterSpacing: '0.15em'
               }}>
                 <Sparkles size={14} /> ELITE ACADEMIC REPOSITORY
               </div>
               <h1 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.05em', color: 'white' }}>
                 ACADEMIC <span className="gradient-text">ARCHIVES</span>
               </h1>
               <p style={{ color: 'var(--text-dim)', fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto', lineHeight: 1.7 }}>
                 Access verified past examinations, solved solutions, and elite technical resources engineered for the high-performance scholar.
               </p>
            </motion.div>
         </header>

         {/* 🧩 SEARCH & FILTERS */}
         <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', marginBottom: '6rem' }}>
            <div className="glass-card" style={{ padding: '0.5rem', borderRadius: '32px', display: 'flex', alignItems: 'center', background: 'rgba(15, 23, 42, 0.4)', border: '1px solid var(--border-light)' }}>
               <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '1rem 2.5rem', gap: '1.5rem' }}>
                  <Search size={24} color="var(--secondary)" />
                  <input 
                    type="text" placeholder="QUERY ARCHIVES BY EXAM, UNIVERSITY, OR FIELD..." 
                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontSize: '1.1rem', fontWeight: 700, color: 'white', letterSpacing: '0.05em' }}
                  />
               </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
               {categories.map(cat => (
                 <button 
                   key={cat} onClick={() => setActiveCategory(cat)}
                   style={{ 
                     padding: '0.8rem 2.2rem', borderRadius: '99px', border: '1px solid var(--border-light)',
                     background: activeCategory === cat ? 'var(--secondary)' : 'rgba(255,255,255,0.03)',
                     color: activeCategory === cat ? 'white' : 'var(--text-dim)',
                     fontWeight: 900, fontSize: '0.75rem', cursor: 'pointer', transition: '0.4s', letterSpacing: '0.08em'
                   }}
                 >
                   {cat.toUpperCase()}
                 </button>
               ))}
            </div>
         </div>

         {/* 🧩 GRID */}
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: '3rem' }}>
            {filteredNotes.map((note, i) => (
              <motion.div 
                key={note.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="glass-card hover-glow" style={{ padding: '3.5rem', display: 'flex', flexDirection: 'column', background: 'rgba(15, 23, 42, 0.4)', border: '1px solid var(--border-light)', borderRadius: '40px' }}
              >
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div style={{ width: '70px', height: '70px', background: 'var(--bg-subtle)', borderRadius: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)', border: '1px solid var(--border-light)', boxShadow: '0 0 20px var(--secondary-glow)' }}>
                       <FileText size={32} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', fontWeight: 900, color: '#F59E0B' }}>
                       <Star size={18} fill="#F59E0B" /> {note.rating}
                    </div>
                 </div>
                 
                 <h3 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '1.25rem', color: 'white', letterSpacing: '-0.03em', lineHeight: 1.3 }}>{note.title}</h3>
                 
                 <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '2.5rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--secondary)', background: 'var(--secondary-glow)', padding: '0.5rem 1.25rem', borderRadius: '8px', letterSpacing: '0.05em' }}>{note.type}</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-dim)', alignSelf: 'center' }}>{note.downloads} ACCESSES</span>
                 </div>
                 
                 <p style={{ color: 'var(--text-dim)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '3.5rem', flex: 1 }}>{note.description}</p>
                 
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2.5rem' }}>
                    <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'white' }}>{note.price}</div>
                    <button 
                      onClick={() => note.price === 'Free' ? handlePurchase() : setSelectedResource(note)}
                      className="premium-btn" style={{ padding: '0.9rem 2rem', fontSize: '0.8rem', background: 'var(--secondary)', boxShadow: '0 10px 20px var(--secondary-glow)' }}
                    >
                       {note.price === 'Free' ? 'UPLINK' : 'PURCHASE'} <Download size={20} />
                    </button>
                 </div>
              </motion.div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default NotesCatalog;
