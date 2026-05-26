import React from 'react';
import { ChevronRight, CheckCircle2, Circle } from 'lucide-react';

const Syllabus = () => {
  const units = [
    { title: 'Unit 1: Introduction to Web Design', status: 'completed', topics: ['HTML Basics', 'CSS Fundamentals', 'Visual Hierarchy'] },
    { title: 'Unit 2: Advanced Styling', status: 'completed', topics: ['Flexbox & Grid', 'Responsive Design', 'CSS Variables'] },
    { title: 'Unit 3: JavaScript Core', status: 'current', topics: ['DOM Manipulation', 'ES6+ Features', 'Async/Await'] },
    { title: 'Unit 4: Frameworks & Libraries', status: 'pending', topics: ['React Fundamentals', 'Hooks', 'State Management'] },
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Course Syllabus</h1>
        <p style={{ color: 'var(--text-muted)' }}>Full Stack Web Development • 2026 Batch</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {units.map((unit, i) => (
          <div key={i} className="glass-panel" style={{ padding: '1.5rem', borderLeft: `6px solid ${unit.status === 'completed' ? 'var(--success)' : unit.status === 'current' ? 'var(--primary)' : 'var(--border-light)'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem' }}>{unit.title}</h3>
              {unit.status === 'completed' ? <CheckCircle2 color="var(--success)" /> : <Circle color="var(--text-muted)" />}
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {unit.topics.map((topic, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: unit.status === 'pending' ? 'var(--text-muted)' : 'var(--text-main)' }}>
                  <ChevronRight size={14} color="var(--primary)" />
                  {topic}
                </div>
              ))}
            </div>
            
            {unit.status === 'current' && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px', border: '1px dashed var(--primary)' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>Currently In Progress • Next Lecture: Tomorrow 10:00 AM</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Syllabus;
