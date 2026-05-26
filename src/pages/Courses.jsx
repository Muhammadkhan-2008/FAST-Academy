import React from 'react';
import { Play, FileText, Download } from 'lucide-react';

const Courses = () => {
  const courses = [
    { title: 'Modern Web Architecture', lectures: 24, notes: 12, category: 'Tech' },
    { title: 'Quantum Physics Fundamentals', lectures: 18, notes: 8, category: 'Science' },
    { title: 'Digital Marketing Mastery', lectures: 30, notes: 15, category: 'Business' },
    { title: 'Advanced Calculus', lectures: 40, notes: 20, category: 'Math' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Course Library</h1>
          <p style={{ color: 'var(--text-muted)' }}>Explore recorded lectures and download study materials.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['All', 'Tech', 'Science', 'Math'].map(cat => (
            <button key={cat} className="glass" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>{cat}</button>
          ))}
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {courses.map((course, i) => (
          <div key={i} className="glass-card" style={{ overflow: 'hidden' }}>
            <div style={{ height: '160px', background: 'linear-gradient(45deg, var(--surface-light), var(--primary))', position: 'relative' }}>
               <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(0,0,0,0.5)', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.75rem' }}>
                 {course.category}
               </div>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{course.title}</h3>
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Play size={16} /> {course.lectures} Lectures
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <FileText size={16} /> {course.notes} Notes
                </span>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn-primary" style={{ flex: 1, fontSize: '0.9rem' }}>Resume Study</button>
                <button className="glass" style={{ padding: '0.6rem', color: 'white' }} title="Download Materials">
                  <Download size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
