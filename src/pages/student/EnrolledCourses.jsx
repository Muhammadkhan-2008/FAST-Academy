import React, { useState, useEffect } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { BookOpen, Play, FileText, ChevronRight, Lock, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {
  const { data, user } = useSchool();
  const [activeSessions, setActiveSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchActiveSessions();
    const inv = setInterval(fetchActiveSessions, 5000);
    return () => clearInterval(inv);
  }, []);

  const fetchActiveSessions = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/sessions/active');
      const sessions = await res.json();
      setActiveSessions(sessions);
    } catch (err) { console.error('Sessions fetch failed'); }
  };

  const enrolledCourses = data.courses?.filter(c => c.students.includes(user.id)) || [];
  const otherCourses = data.courses?.filter(c => !c.students.includes(user.id)) || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {/* Live Alerts */}
      {activeSessions.length > 0 && (
        <section className="glass-panel" style={{ padding: '1.5rem 2rem', border: '1px solid var(--error)40', background: 'var(--error)05' }}>
           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                 <div style={{ width: '12px', height: '12px', background: 'var(--error)', borderRadius: '50%', animation: 'pulse 1s infinite' }}></div>
                 <h3 style={{ fontSize: '1rem' }}>Live Session in Progress: <span style={{ color: 'var(--error)', fontWeight: 800 }}>{activeSessions[0].roomName}</span></h3>
              </div>
              <button 
                onClick={() => navigate(`/classroom/${activeSessions[0].roomName}`)}
                className="neo-btn neo-btn-primary" 
                style={{ padding: '0.6rem 2rem' }}
              >
                JOIN LECTURE NOW
              </button>
           </div>
        </section>
      )}

      <section>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>My Learning Journey</h2>
          <p style={{ color: 'var(--text-dim)' }}>Access the courses you are currently enrolled in.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
          {enrolledCourses.map((course, i) => (
            <motion.div key={course._id} whileHover={{ y: -5 }} className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '180px', background: 'linear-gradient(45deg, var(--bg-surface), var(--secondary))', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(4px)' }}></div>
                <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem' }}>
                   <span className="badge badge-cyan" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>In Progress</span>
                   <h3 style={{ fontSize: '1.25rem' }}>{course.name}</h3>
                </div>
              </div>
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>{course.description}</p>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-dim)' }}><Play size={16} /> 24 Lectures</div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-dim)' }}><FileText size={16} /> 12 Resources</div>
                </div>
                <button 
                  onClick={() => navigate(`/student/course/${course._id}`)}
                  className="neo-btn neo-btn-primary" 
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Continue Learning <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default EnrolledCourses;
