import React from 'react';
import { useAuth, DEMO_ACCOUNTS } from '../context/AuthContext';
import { Database, UserCheck, Activity } from 'lucide-react';

export const Header = () => {
  const { user, switchRole, healthStatus } = useAuth();

  return (
    <header className="glass-header mb-8 p-5 flex flex-wrap items-center justify-between gap-4">
      {/* Brand & Logo */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-400 flex items-center justify-center text-white font-extrabold text-2xl shadow-xl border border-white/20">
          CB
        </div>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
            CampusBridge
          </h1>
          <p className="text-xs font-medium text-slate-400">ParentSquare Enterprise Clone</p>
        </div>
      </div>

      {/* Tri-DB Health Status Badge */}
      {healthStatus && (
        <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-2 rounded-xl border border-glass text-xs shadow-inner">
          <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Tri-DB Engines:</span>
            <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              SQLite (SQL)
            </span>
            <span className="text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              MongoDB (NoSQL)
            </span>
            <span className="text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
              Redis 7 (Cache)
            </span>
          </div>
        </div>
      )}

      {/* Role Switcher & Profile */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 bg-slate-950/90 p-1.5 rounded-2xl border border-glass shadow-lg">
          <span className="text-xs text-slate-400 px-3 font-semibold flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5 text-indigo-400" /> Switch Role:
          </span>
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

        {/* User Pill */}
        {user && (
          <div className="flex items-center gap-3 bg-indigo-950/50 border border-indigo-500/40 px-3.5 py-1.5 rounded-2xl shadow-md">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow">
              {user.name.charAt(0)}
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-white">{user.name}</div>
              <div className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-wider">{user.role}</div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
