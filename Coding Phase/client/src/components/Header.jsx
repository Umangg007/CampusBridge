import React from 'react';
import { useAuth, DEMO_ACCOUNTS } from '../context/AuthContext';
import { ChevronDown, Database, Cpu } from 'lucide-react';

export const Header = () => {
  const { user, switchRole, healthStatus } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      
      {/* 1. Main Navbar */}
      <div className="ps-container py-3 flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="grid grid-cols-2 gap-0.5 w-8 h-8 p-1 rounded-lg bg-slate-900 shadow-sm">
            <div className="bg-rose-500 rounded-sm"></div>
            <div className="bg-emerald-400 rounded-sm"></div>
            <div className="bg-sky-400 rounded-sm"></div>
            <div className="bg-purple-500 rounded-sm"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">CampusBridge</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 uppercase">
                ParentSquare Clone
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">K-12 Family Engagement Platform</p>
          </div>
        </div>

        {/* Navigation Dropdowns (ParentSquare Style) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-700">
          <div className="flex items-center gap-1 cursor-pointer hover:text-emerald-700 transition-colors">
            <span>Platform</span> <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-emerald-700 transition-colors">
            <span>Solutions</span> <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-emerald-700 transition-colors">
            <span>Resources & Support</span> <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-emerald-700 transition-colors">
            <span>Company</span> <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="ps-btn-green text-xs">
            Get demo →
          </button>
          <button className="ps-btn-outline text-xs">
            Sign in
          </button>
        </div>

      </div>

      {/* 2. Sub-Bar: Role Selector Pills & Tri-DB Engine Info */}
      <div className="bg-slate-50 border-t border-slate-200 py-2">
        <div className="ps-container flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Role Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-bold uppercase tracking-wider text-[11px]">Select Role View:</span>
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
              {Object.keys(DEMO_ACCOUNTS).map((roleKey) => {
                const isSelected = user?.role === roleKey;
                return (
                  <button
                    key={roleKey}
                    onClick={() => switchRole(roleKey)}
                    className={`ps-role-pill ${isSelected ? 'ps-role-pill-active' : 'ps-role-pill-inactive'}`}
                  >
                    {roleKey}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Logged-In User Profile */}
          {user && (
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-5 h-5 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-[10px]">
                {user.name.charAt(0)}
              </div>
              <span className="font-bold text-slate-800 text-xs">{user.name}</span>
              <span className="badge badge-academic text-[10px]">{user.role}</span>
            </div>
          )}

          {/* Tri-DB Diagnostics */}
          {healthStatus && (
            <div className="hidden md:flex items-center gap-2 text-[11px]">
              <Cpu className="w-3.5 h-3.5 text-emerald-700" />
              <span className="text-slate-500 font-medium">Tri-DB:</span>
              <span className="text-emerald-800 font-bold bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-200">SQLite (SQL)</span>
              <span className="text-sky-800 font-bold bg-sky-100 px-1.5 py-0.5 rounded border border-sky-200">MongoDB</span>
              <span className="text-purple-800 font-bold bg-purple-100 px-1.5 py-0.5 rounded border border-purple-200">Redis 7</span>
            </div>
          )}

        </div>
      </div>

    </header>
  );
};
