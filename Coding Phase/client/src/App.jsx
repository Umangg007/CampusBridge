import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ParentSquareFeed } from './components/ParentSquareFeed';
import { AdminDashboard } from './components/AdminDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { ParentDashboard } from './components/ParentDashboard';
import { StudentDashboard } from './components/StudentDashboard';

const MainContent = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('feed');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
      {/* Left Sidebar Menu */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} role={user?.role} />

      {/* Main Content Area */}
      <main className="flex-1 space-y-6">
        {activeTab === 'feed' && <ParentSquareFeed />}
        {activeTab === 'admin' && <AdminDashboard />}
        {activeTab === 'homework' && (
          user?.role === 'TEACHER' ? <TeacherDashboard /> :
          user?.role === 'PARENT' ? <ParentDashboard /> :
          user?.role === 'STUDENT' ? <StudentDashboard /> :
          <TeacherDashboard />
        )}
        {activeTab === 'attendance' && (
          user?.role === 'TEACHER' ? <TeacherDashboard /> : <ParentDashboard />
        )}
        {activeTab === 'conferences' && (
          user?.role === 'PARENT' ? <ParentDashboard /> : <TeacherDashboard />
        )}
        {activeTab === 'messages' && <ParentDashboard />}
      </main>
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#F1F5F9] text-slate-900">
        <Header />
        <MainContent />
      </div>
    </AuthProvider>
  );
}

export default App;
