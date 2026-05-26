import React, { useState } from 'react';
import { BookOpen, Video, FileText, ArrowRight, DownloadCloud, PenTool, BookMarked, Folder } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSchool } from '../../context/SchoolContext';

const StudentClassroom = () => {
  const { data, user } = useSchool();
  const navigate = useNavigate();

  const enrolledCourses = data.courses?.filter(c => 
    c.students?.includes(user?.id) || c.students?.includes(user?._id) || c.students?.includes(user?.clerkId)
  ) || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', width: '100%' }}>
      <header>
         <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
           ACADEMIC <span style={{ color: 'var(--primary)' }}>CLASSROOM</span>
         </h1>
         <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', fontWeight: 600 }}>
           Access recorded lectures, class notes, e-books, and weekly assignments provided by faculty.
         </p>
      </header>

      {enrolledCourses.length === 0 ? (
        <div className="glass-card" style={{ padding: '4rem', textAlign: 'center', border: '1px dashed var(--border-light)' }}>
          <Folder size={48} color="var(--border-light)" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>No Active Classrooms</h3>
          <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>You are not currently enrolled in any academic modules.</p>
          <button onClick={() => navigate('/courses')} className="premium-btn" style={{ margin: '0 auto' }}>EXPLORE CATALOG</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '2rem' }}>
          {enrolledCourses.map((course, i) => (
            <div key={i} className="glass-card" style={{ padding: '2rem', display: 'flex', gap: '2rem', flexDirection: 'column' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-light)', paddingBottom: '1.5rem' }}>
                  <div>
                     <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '0.1em' }}>COURSE ID: {course.id || 'CS-901'}</span>
                     <h2 style={{ fontSize: '1.75rem', fontWeight: 900, marginTop: '0.5rem' }}>{course.name}</h2>
                     <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginTop: '0.25rem', fontWeight: 600 }}>Faculty Instructor: Prof. Alexander</p>
                  </div>
                  <button onClick={() => navigate(`/student/course/${course.id}`)} className="premium-btn-ghost" style={{ padding: '0.6rem 1.5rem' }}>
                     ENTER LMS <ArrowRight size={18} />
                  </button>
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                  {[
                    { icon: <Video />, title: 'Lectures', count: '24 Recordings', color: 'var(--primary)', bg: 'var(--primary-glow)' },
                    { icon: <FileText />, title: 'Class Notes', count: '12 PDFs', color: 'var(--secondary)', bg: 'var(--secondary-glow)' },
                    { icon: <BookMarked />, title: 'E-Books', count: '3 Books', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
                    { icon: <PenTool />, title: 'Assignments', count: '4 Pending', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
                  ].map((module, mIdx) => (
                    <motion.div key={mIdx} whileHover={{ y: -5 }} style={{ padding: '1.5rem', background: 'var(--bg-subtle)', borderRadius: '16px', border: '1px solid var(--border-light)', cursor: 'pointer' }}>
                       <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: module.bg, color: module.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                          {module.icon}
                       </div>
                       <h4 style={{ fontSize: '1rem', fontWeight: 900, marginBottom: '0.25rem' }}>{module.title}</h4>
                       <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 700 }}>{module.count}</p>
                    </motion.div>
                  ))}
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentClassroom;
