import React from 'react';
import { Home, BookOpen, CheckSquare, Video, MessageSquare, Shield } from 'lucide-react';

export const Sidebar = ({ activeTab, setActiveTab, role }) => {
  const menuItems = [
    { id: 'feed', label: 'School Feed & Bulletins', icon: Home, roles: ['ADMIN', 'TEACHER', 'PARENT', 'STUDENT'] },
    { id: 'homework', label: 'Classes & Homework', icon: BookOpen, roles: ['ADMIN', 'TEACHER', 'PARENT', 'STUDENT'] },
    { id: 'attendance', label: 'Attendance Hub', icon: CheckSquare, roles: ['ADMIN', 'TEACHER', 'PARENT', 'STUDENT'] },
    { id: 'conferences', label: 'Virtual Conferences', icon: Video, roles: ['ADMIN', 'TEACHER', 'PARENT', 'STUDENT'] },
    { id: 'messages', label: 'Direct Messaging', icon: MessageSquare, roles: ['ADMIN', 'TEACHER', 'PARENT', 'STUDENT'] },
    { id: 'admin', label: 'Admin & Tri-DB Engine', icon: Shield, roles: ['ADMIN'] }
  ];

  return (
    <aside className="ps-sidebar-menu">
      <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', padding: '0 4px 12px 4px', letterSpacing: '0.05em' }}>
        ParentSquare Menu
      </div>

      <nav>
        {menuItems
          .filter((item) => item.roles.includes(role))
          .map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`ps-sidebar-item ${isActive ? 'ps-sidebar-item-active' : ''}`}
              >
                <Icon size={16} style={{ color: isActive ? '#047857' : '#94A3B8' }} />
                <span>{item.label}</span>
              </button>
            );
          })}
      </nav>

      {/* District Info Widget */}
      <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid #F1F5F9', fontSize: '12px', color: '#64748B' }}>
        <div style={{ fontWeight: 700, color: '#0F172A' }}>Greenwood High School</div>
        <div style={{ fontSize: '11px', color: '#94A3B8' }}>Academic Year 2026-2027</div>
        <div style={{ fontSize: '10px', color: '#047857', fontWeight: 700, marginTop: '6px' }}>
          ✓ Verified ParentSquare Account
        </div>
      </div>
    </aside>
  );
};
