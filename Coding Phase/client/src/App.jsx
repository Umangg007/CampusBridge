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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
        <div style={{ width: '32px', height: '32px', border: '3px solid #E2E8F0', borderTopColor: '#00A884', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
      </div>
    );
  }

  return (
    <div className="ps-app-container">
      {/* Left Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} role={user?.role} />

      {/* Main Content Body */}
      <main className="ps-content-body">
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
      <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
        <Header />
        <MainContent />
      </div>
    </AuthProvider>
  );
}

export default App;
