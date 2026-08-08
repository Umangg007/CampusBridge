import React, { createContext, useState, useEffect, useContext } from 'react';
import { loginUser, fetchHealth } from '../services/api';

const AuthContext = createContext();

export const DEMO_ACCOUNTS = {
  ADMIN: { label: 'Admin (Rajesh Shah)', email: 'admin@campusbridge.edu', role: 'ADMIN' },
  TEACHER: { label: 'Teacher (Priya Patel)', email: 'teacher@campusbridge.edu', role: 'TEACHER' },
  PARENT: { label: 'Parent (Vikram Mehta)', email: 'parent@campusbridge.edu', role: 'PARENT' },
  STUDENT: { label: 'Student (Aarav Mehta)', email: 'student@campusbridge.edu', role: 'STUDENT' }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [healthStatus, setHealthStatus] = useState(null);

  useEffect(() => {
    // Default auto-login as Admin for seamless demo
    switchRole('ADMIN');
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      const data = await fetchHealth();
      setHealthStatus(data);
    } catch (err) {
      console.warn('Health check warning:', err.message);
    }
  };

  const switchRole = async (roleKey) => {
    setLoading(true);
    const demo = DEMO_ACCOUNTS[roleKey];
    if (demo) {
      try {
        const res = await loginUser(demo.email, 'Password123!');
        setUser(res.user);
      } catch (err) {
        console.error('Role switch failed:', err);
      }
    }
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('cb_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, switchRole, logout, healthStatus, checkHealth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
