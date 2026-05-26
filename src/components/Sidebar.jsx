import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Video, 
  MessageSquare, 
  ClipboardList, 
  Users, 
  Settings,
  GraduationCap
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/app' },
    { icon: <BookOpen size={20} />, label: 'Courses', path: '/app/courses' },
    { icon: <ClipboardList size={20} />, label: 'Syllabus', path: '/app/syllabus' },
    { icon: <Video size={20} />, label: 'Classroom', path: '/app/classroom' },
    { icon: <MessageSquare size={20} />, label: 'Chat', path: '/app/chat' },
    { icon: <Users size={20} />, label: 'Management', path: '/app/management' },
  ];

  return (
    <aside className="glass" style={{ margin: '1rem', height: 'calc(100vh - 2rem)', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem', paddingLeft: '0.5rem' }}>
        <div style={{ background: 'var(--primary)', padding: '0.5rem', borderRadius: '8px' }}>
          <GraduationCap color="white" />
        </div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text)' }}>Circle & MK</h2>
      </div>

      <nav style={{ flex: 1 }}>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path}
                end={item.path === '/app'}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  color: isActive ? 'var(--text)' : 'var(--text-muted)',
                  background: isActive ? 'var(--primary)' : 'transparent',
                  transition: '0.2s all'
                })}
              >
                {item.icon}
                <span style={{ fontWeight: 500 }}>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div style={{ marginTop: 'auto', borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)', padding: '0.75rem 1rem' }}>
          <Settings size={20} />
          <span>Settings</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
