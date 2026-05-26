import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Clock, Video, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const TimetableManager = () => {
  const [schedule, setSchedule] = useState([
    { id: 1, day: 'Monday', time: '10:00 AM', course: 'Web Development Masterclass', duration: '2h', students: 42 },
    { id: 2, day: 'Wednesday', time: '02:00 PM', course: 'React Hooks & State', duration: '1.5h', students: 38 },
    { id: 3, day: 'Friday', time: '11:00 AM', course: 'Backend Engineering', duration: '2h', students: 35 },
  ]);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Academic Timetable</h2>
          <p style={{ color: 'var(--text-dim)' }}>Plan and manage your live class sessions across the week.</p>
        </div>
        <button className="neo-btn neo-btn-primary">
          <Plus size={20} /> Schedule New Class
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {days.map(day => (
          <div key={day} className="glass-panel" style={{ padding: '1.5rem', minHeight: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--primary)' }}>{day}</h3>
              <span className="badge badge-cyan" style={{ fontSize: '0.6rem' }}>
                {schedule.filter(s => s.day === day).length} Classes
              </span>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {schedule.filter(s => s.day === day).map((item) => (
                <motion.div 
                  key={item.id}
                  whileHover={{ x: 5 }}
                  style={{ 
                    padding: '1rem', background: 'rgba(255,255,255,0.03)', 
                    borderRadius: '12px', borderLeft: '3px solid var(--primary)' 
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--accent)' }}>
                       <Clock size={14} /> {item.time}
                     </div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                       <Users size={14} /> {item.students}
                     </div>
                  </div>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem' }}>{item.course}</h4>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                     <button className="neo-btn neo-btn-ghost" style={{ padding: '0.3rem 0.6rem', fontSize: '0.7rem', flex: 1 }}>
                       Edit
                     </button>
                     <button className="neo-btn neo-btn-primary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.7rem', flex: 1 }}>
                       <Video size={14} /> Launch
                     </button>
                  </div>
                </motion.div>
              ))}
              
              {schedule.filter(s => s.day === day).length === 0 && (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed rgba(255,255,255,0.05)', borderRadius: '12px', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                  No classes scheduled
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimetableManager;
