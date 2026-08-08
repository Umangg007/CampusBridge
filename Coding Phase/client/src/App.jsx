import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { AdminDashboard } from './components/AdminDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { ParentDashboard } from './components/ParentDashboard';
import { StudentDashboard } from './components/StudentDashboard';

const MainContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 pb-12">
      {user?.role === 'ADMIN' && <AdminDashboard />}
      {user?.role === 'TEACHER' && <TeacherDashboard />}
      {user?.role === 'PARENT' && <ParentDashboard />}
      {user?.role === 'STUDENT' && <StudentDashboard />}
    </main>
  );
};

export function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#0B0F19] text-slate-100 p-4">
        <div className="max-w-7xl mx-auto">
          <Header />
          <MainContent />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
