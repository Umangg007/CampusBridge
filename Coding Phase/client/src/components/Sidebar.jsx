import React from 'react';
import { Home, BookOpen, CheckSquare, Video, MessageSquare, Shield, Bell } from 'lucide-react';

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
    <aside className="ps-sidebar">
      <div className="ps-card space-y-4">
        <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-1 flex items-center justify-between">
          <span>ParentSquare Menu</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>

        <nav className="space-y-1">
          {menuItems
            .filter((item) => item.roles.includes(role))
            .map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-sm'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
        </nav>

        {/* District Info Footer Widget */}
        <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1 px-1">
          <div className="font-bold text-slate-900">Greenwood High School</div>
          <div className="text-[11px] text-slate-400">Academic Year 2026-2027</div>
          <div className="text-[10px] text-emerald-700 font-bold pt-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Verified ParentSquare Account
          </div>
        </div>
      </div>
    </aside>
  );
};
