import React from 'react';
import { useAuth, DEMO_ACCOUNTS } from '../context/AuthContext';
import { Search, Bell, Plus, ShieldCheck, Database, Server, Cpu } from 'lucide-react';

export const Header = () => {
  const { user, switchRole, healthStatus } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* Brand Logo & ParentSquare Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white font-black text-xl shadow-md">
            PS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">CampusBridge</span>
              <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded border border-teal-200 uppercase">
                ParentSquare Enterprise
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Greenwood High School District</p>
          </div>
        </div>

        {/* Global Search Bar (ParentSquare Signature UI) */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search announcements, classes, teachers, or homework..."
              className="w-full bg-slate-100 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Tri-Database Engine Status Badge */}
        {healthStatus && (
          <div className="hidden lg:flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-xs">
            <Cpu className="w-4 h-4 text-teal-600" />
            <span className="text-slate-500 font-medium">Tri-DB:</span>
            <span className="text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.5 rounded">SQLite</span>
            <span className="text-sky-700 font-bold bg-sky-100 px-1.5 py-0.5 rounded">MongoDB</span>
            <span className="text-purple-700 font-bold bg-purple-100 px-1.5 py-0.5 rounded">Redis 7</span>
          </div>
        )}

        {/* Role Switcher & User Avatar */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            {Object.keys(DEMO_ACCOUNTS).map((roleKey) => {
              const isSelected = user?.role === roleKey;
              return (
                <button
                  key={roleKey}
                  onClick={() => switchRole(roleKey)}
                  className={`role-pill ${isSelected ? 'role-pill-active' : 'role-pill-inactive'}`}
                >
                  {roleKey}
                </button>
              );
            })}
          </div>

          {/* User Profile Badge */}
          {user && (
            <div className="flex items-center gap-2.5 bg-slate-100 border border-slate-200 pl-2 pr-3 py-1.5 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                {user.name.charAt(0)}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-slate-800 leading-tight">{user.name}</div>
                <div className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">{user.role}</div>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
