import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Plus, Edit2, Users, BookOpen, Clock, X, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MyCourses = () => {
  const { data, user, createCourse } = useSchool();
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({ name: '', description: '', schedule: '', syllabus: '' });
  
  const myCourses = data.courses?.filter(c => c.teacherId === user.id) || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCourse({ ...newCourse, teacherId: user.id });
      setShowModal(false);
      setNewCourse({ name: '', description: '', schedule: '', syllabus: '' });
    } catch (err) {
      alert('Failed to create course');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Course Orchestration</h2>
          <p style={{ color: 'var(--text-dim)' }}>Manage content, students, and assessments for your assigned courses.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="neo-btn neo-btn-primary">
          <Plus size={20} /> Create New Course
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '2rem' }}>
        {myCourses.map((course) => (
          <motion.div 
            layoutId={course._id}
            key={course._id} 
            className="glass-panel" 
            style={{ padding: '2rem' }}
          >
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div style={{ padding: '1rem', background: 'var(--primary-glow)', borderRadius: '15px', color: 'var(--primary)' }}>
                   <BookOpen size={32} />
                </div>
                <div style={{ textAlign: 'right' }}>
                   <span className="badge badge-cyan">Active</span>
                   <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.5rem' }}>ID: {course._id.slice(-6).toUpperCase()}</p>
                </div>
             </div>

             <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{course.name}</h3>
             <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.6 }}>{course.description}</p>

             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
                   <Users size={20} color="var(--secondary)" style={{ marginBottom: '0.5rem' }} />
                   <p style={{ fontSize: '1.1rem', fontWeight: 800 }}>{course.students?.length || 0}</p>
                   <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>ENROLLED</p>
                </div>
                <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
                   <Clock size={20} color="var(--accent)" style={{ marginBottom: '0.5rem' }} />
                   <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>SCHEDULE</p>
                   <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>{course.schedule || 'Flex'}</p>
                </div>
             </div>

             <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="neo-btn neo-btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>
                   <Edit2 size={16} /> Edit Syllabus
                </button>
                <button className="neo-btn neo-btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                   Manage Students
                </button>
             </div>
          </motion.div>
        ))}

        {myCourses?.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem', color: 'var(--text-dim)' }}>
             <BookOpen size={60} style={{ opacity: 0.1, marginBottom: '1.5rem' }} />
             <h3>No Courses Found</h3>
             <p>You haven't orchestrated any courses yet. Start by creating one above.</p>
          </div>
        )}
      </div>

      {/* Course Creation Modal */}
      <AnimatePresence>
        {showModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '2rem' }}>
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className="glass-panel" 
               style={{ width: '100%', maxWidth: '600px', padding: '3rem', position: 'relative' }}
             >
                <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X /></button>
                <h3 style={{ fontSize: '1.75rem', marginBottom: '2rem' }}>Orchestrate New Course</h3>
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                   <div>
                      <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.5rem', display: 'block' }}>Course Name</label>
                      <input 
                        type="text" required 
                        value={newCourse.name} onChange={e => setNewCourse({...newCourse, name: e.target.value})}
                        placeholder="e.g., Advanced Full Stack Engineering" 
                        style={{ width: '100%', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', color: 'white', outline: 'none' }}
                      />
                   </div>
                   <div>
                      <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.5rem', display: 'block' }}>Description</label>
                      <textarea 
                        required rows={3}
                        value={newCourse.description} onChange={e => setNewCourse({...newCourse, description: e.target.value})}
                        placeholder="Brief overview of the curriculum..." 
                        style={{ width: '100%', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', color: 'white', outline: 'none', resize: 'none' }}
                      />
                   </div>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                         <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.5rem', display: 'block' }}>Schedule</label>
                         <input 
                           type="text" placeholder="Mon/Wed 6PM" 
                           value={newCourse.schedule} onChange={e => setNewCourse({...newCourse, schedule: e.target.value})}
                           style={{ width: '100%', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', color: 'white', outline: 'none' }}
                         />
                      </div>
                      <div>
                         <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.5rem', display: 'block' }}>Credits/Duration</label>
                         <input 
                           type="text" placeholder="3 Months" 
                           style={{ width: '100%', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', color: 'white', outline: 'none' }}
                         />
                      </div>
                   </div>
                   <button type="submit" className="neo-btn neo-btn-primary" style={{ marginTop: '1rem', padding: '1.2rem', justifyContent: 'center', fontSize: '1.1rem' }}>
                      <Save size={20} /> Initialize Course
                   </button>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyCourses;
