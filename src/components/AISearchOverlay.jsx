import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, BookOpen, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AISearchOverlay = ({ query, setQuery }) => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAISearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/ai/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error('AI Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)', borderRadius: '99px' }}>
        <input 
          type="text" 
          placeholder="Try 'I want to learn web development'..." 
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAISearch()}
          style={{ 
            width: '100%', 
            padding: 'clamp(1.2rem, 2vw, 1.5rem) clamp(1.5rem, 3vw, 2rem)', 
            paddingRight: '160px',
            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
            borderRadius: '99px',
            border: '2px solid rgba(13, 148, 136, 0.1)', // Teal glow
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            color: 'var(--text-main)',
            fontWeight: 500
          }}
        />
        <button 
          onClick={handleAISearch}
          className="premium-btn search-submit-btn" 
          style={{ 
            position: 'absolute', 
            right: '0.6rem', 
            top: '50%', 
            transform: 'translateY(-50%)',
            padding: '0.8rem 1.5rem',
            borderRadius: '99px',
            fontSize: 'clamp(0.85rem, 1vw, 1rem)'
          }}
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <><Sparkles size={20} /> <span className="search-btn-text">AI Search</span></>}
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 500px) {
          .search-input { padding: 1rem !important; padding-right: 50px !important; border-radius: 16px !important; }
          .search-submit-btn { padding: 0.6rem !important; right: 0.4rem !important; border-radius: 12px !important; }
          .search-btn-text { display: none; }
          .search-wrapper { border-radius: 16px !important; }
        }
      `}} />

      <AnimatePresence>
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="glass-panel"
            style={{ 
              position: 'absolute', 
              top: '110%', 
              left: 0, 
              right: 0, 
              zIndex: 50, 
              padding: '1.5rem',
              textAlign: 'left',
              background: '#FFFFFF',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.9rem' }}>
              <Sparkles size={16} /> AI INSIGHT
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
              "{results.aiInsight}"
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {results.suggestions.map((s) => (
                <div 
                  key={s.id} 
                  onClick={() => navigate('/courses')}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '1rem', 
                    background: 'var(--bg-surface)', 
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: '0.2s'
                  }}
                  className="ai-suggestion-item"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <BookOpen size={18} color="var(--primary)" />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{s.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.matchReason}</div>
                    </div>
                  </div>
                  <ArrowRight size={16} color="var(--text-muted)" />
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => setResults(null)}
              style={{ width: '100%', marginTop: '1.5rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Clear AI Results
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AISearchOverlay;
