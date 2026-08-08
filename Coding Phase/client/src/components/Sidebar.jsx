import React from 'react';
import { Megaphone, BookOpen, CheckSquare, Video, MessageSquare, Shield, Home, Calendar } from 'lucide-react';

export const Sidebar = ({ activeTab, setActiveTab, role }) => {
  const menuItems = [
    { id: 'feed', label: 'School Feed', icon: Home, roles: ['ADMIN', 'TEACHER', 'PARENT', 'STUDENT'] },
    { id: 'homework', label: 'Classes & Homework', icon: BookOpen, roles: ['ADMIN', 'TEACHER', 'PARENT', 'STUDENT'] },
    { id: 'attendance', label: 'Attendance Hub', icon: CheckSquare, roles: ['ADMIN', 'TEACHER', 'PARENT', 'STUDENT'] },
    { id: 'conferences', label: 'Virtual Conferences', icon: Video, roles: ['ADMIN', 'TEACHER', 'PARENT', 'STUDENT'] },
    { id: 'messages', label: 'Direct Messages', icon: MessageSquare, roles: ['ADMIN', 'TEACHER', 'PARENT', 'STUDENT'] },
    { id: 'admin', label: 'Admin & Tri-DB Engine', icon: Shield, roles: ['ADMIN'] }
  ];

  return (
    <aside className="w-full lg:w-64 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm h-fit">
      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 mb-3">
        ParentSquare Menu
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
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-teal-50 text-teal-800 border border-teal-200 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
      </nav>

      {/* School Info Widget */}
      <div className="mt-6 pt-4 border-t border-slate-100 px-3 text-xs text-slate-500 space-y-1">
        <div className="font-bold text-slate-800">Greenwood High School</div>
        <div>Academic Year 2026-2027</div>
        <div className="text-[10px] text-teal-600 font-semibold pt-1">Verified Family Account</div>
      </div>
    </aside>
  );
};
