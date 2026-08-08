import React from 'react';
import { useAuth, DEMO_ACCOUNTS } from '../context/AuthContext';
import { ShieldCheck, Database, Bell, UserCheck } from 'lucide-react';

export const Header = () => {
  const { user, switchRole, healthStatus } = useAuth();

  return (
    <header className="glass-card mb-6 p-4 flex flex-wrap items-center justify-between gap-4 border-b border-glass">
      {/* Brand & Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
          CB
        </div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent">
            CampusBridge
          </h1>
          <p className="text-xs text-slate-400">ParentSquare Next-Gen Clone</p>
        </div>
      </div>

      {/* Tri-DB Health Status Badge */}
      {healthStatus && (
        <div className="flex items-center gap-3 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
          <Database className="w-4 h-4 text-indigo-400" />
          <div className="flex items-center gap-2">
            <span className="text-slate-400">DB Engines:</span>
            <span className="text-emerald-400 font-medium">SQL (SQLite)</span>
            <span className="text-slate-600">•</span>
            <span className="text-cyan-400 font-medium">NoSQL (MongoDB)</span>
            <span className="text-slate-600">•</span>
            <span className="text-purple-400 font-medium">Cache (Redis)</span>
          </div>
        </div>
      )}

      {/* Role Switcher & User Profile */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-glass">
          <span className="text-xs text-slate-400 px-2 flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5 text-indigo-400" /> Role:
          </span>
          {Object.keys(DEMO_ACCOUNTS).map((roleKey) => {
            const isSelected = user?.role === roleKey;
            return (
              <button
                key={roleKey}
                onClick={() => switchRole(roleKey)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {roleKey}
              </button>
            );
          })}
        </div>

        {/* Current Logged In User Pill */}
        {user && (
          <div className="flex items-center gap-2 bg-indigo-950/40 border border-indigo-500/30 px-3 py-1.5 rounded-xl">
            <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold text-white">
              {user.name.charAt(0)}
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-indigo-200">{user.name}</div>
              <div className="text-[10px] text-indigo-400 font-medium">{user.role}</div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
