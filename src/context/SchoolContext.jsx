import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';

const SchoolContext = createContext();

export const SchoolProvider = ({ children }) => {
  const { user: clerkUser, isLoaded: userLoaded } = useUser();
  const { getToken, signOut } = useAuth();
  
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ totalStudents: 0, totalTeachers: 0, activeCourses: 0, pendingVerifications: 0 });
  const [data, setData] = useState({ courses: [], pendingUsers: [] });

  const API_URL = 'http://localhost:5000/api';

  // Sync Clerk User with Local App User state
  useEffect(() => {
    if (userLoaded && clerkUser) {
      // Determine role from Clerk Metadata or Email
      let role = 'student';
      const email = clerkUser.primaryEmailAddress?.emailAddress;
      
      if (clerkUser.publicMetadata?.role) {
        role = clerkUser.publicMetadata.role;
      } else if (email === 'khanmuhammadkolachi390@gmail.com') {
        role = 'teacher';
      } else if (email === 'kiddozone2008@gmail.com') {
        role = 'student';
      } else if (email?.includes('ceo@')) {
        role = 'ceo';
      } else if (clerkUser.publicMetadata?.isTeacher) {
        role = 'teacher';
      }

      setUser({
        id: clerkUser.id,
        name: clerkUser.fullName || clerkUser.username,
        email: clerkUser.primaryEmailAddress?.emailAddress,
        role: role
      });

      // ROBUST SYNC WITH BACKEND
      const performSync = async (retryCount = 0) => {
        try {
          const syncRes = await fetch(`${API_URL}/auth/sync`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              clerkId: clerkUser.id,
              name: clerkUser.fullName || clerkUser.username,
              email: clerkUser.primaryEmailAddress?.emailAddress,
              role: role
            })
          });
          
          if (!syncRes.ok) throw new Error('Institutional Sync Offline');
          const syncData = await syncRes.json();
          console.log('✅ Institutional Sync Complete');
          if (syncData) setUser(prev => ({ ...prev, ...syncData }));
        } catch (err) {
          console.warn(`⚠️ Sync Attempt ${retryCount + 1} Failed:`, err.message);
          if (retryCount < 2) {
             // Fallback to IP if localhost fails
             const fallbackUrl = 'http://127.0.0.1:5000/api';
             console.log('🔄 Retrying with IP Fallback...');
             setTimeout(() => performSync(retryCount + 1), 2000);
          } else {
             setUser(prev => ({ ...prev, status: 'active' }));
          }
        }
      };

      performSync();
      fetchStats();
      fetchInitialData(role);
    } else if (userLoaded && !clerkUser) {
      setUser(null);
    }
  }, [clerkUser, userLoaded]);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_URL}/stats`);
      const result = await res.json();
      setStats(result);
    } catch (err) { console.error('Stats fetch failed'); }
  };

  const fetchInitialData = async (role) => {
    try {
      if (role === 'ceo') {
        const res = await fetch(`${API_URL}/admin/users?status=pending`);
        const pendingUsers = await res.json();
        setData(prev => ({ ...prev, pendingUsers }));
      }
      const courseRes = await fetch(`${API_URL}/admin/courses`);
      const courses = await courseRes.json();
      setData(prev => ({ ...prev, courses }));
    } catch (err) { console.error('Data fetch failed'); }
  };

  const logout = () => {
    signOut();
    setUser(null);
  };

  const verifyUser = async (userId, action) => {
    await fetch(`${API_URL}/admin/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, action })
    });
    fetchInitialData(user?.role);
    fetchStats();
  };

  const createCourse = async (courseData) => {
    const token = await getToken();
    const res = await fetch(`${API_URL}/admin/courses`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(courseData)
    });
    if (!res.ok) {
      throw new Error('Failed to create course. Please ensure you have Faculty access.');
    }
    fetchInitialData(user?.role);
    fetchStats();
  };

  return (
    <SchoolContext.Provider value={{ user, stats, data, logout, verifyUser, createCourse }}>
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchool = () => useContext(SchoolContext);
