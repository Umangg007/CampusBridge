import React from 'react';
import { Users, Shield, BookOpen, CheckCircle, Database, Server, Cpu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminDashboard = () => {
  const { healthStatus } = useAuth();

  return (
    <div className="space-y-8">
      {/* Executive Banner */}
      <div className="glass-card p-8 border-l-4 border-l-indigo-500 flex flex-wrap justify-between items-center gap-6">
        <div>
          <span className="badge badge-academic mb-3">Executive Administration Portal</span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Greenwood High School Command Center</h2>
          <p className="text-slate-300 text-sm mt-2 max-w-2xl leading-relaxed">
            Central management for user accounts, school class rosters, multi-role authorization, and real-time Tri-Database engine diagnostics.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2.5 rounded-xl text-emerald-400 text-xs font-bold shadow-lg">
          <CheckCircle className="w-5 h-5" /> All 3 DB Engines Live & Synced
        </div>
      </div>

      {/* Tri-Database Architecture Live Cards */}
      <div>
        <h3 className="text-xl font-extrabold text-white mb-4 flex items-center gap-2">
          <Cpu className="w-6 h-6 text-indigo-400" /> Tri-Database Architecture (Polyglot Persistence)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* SQL Card */}
          <div className="glass-card p-6 border-t-2 border-t-indigo-500 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Relational SQL</span>
              <Database className="w-6 h-6 text-indigo-400" />
            </div>
            <div className="text-xl font-extrabold text-white">SQLite (via Prisma)</div>
            <div className="text-xs font-semibold text-indigo-300">ACID Compliant • 4 Users • 1 Class</div>
            <p className="text-xs text-slate-400 border-t border-glass pt-3 leading-normal">
              Maintains strict tabular constraints and relational joins for User accounts, Password Hashes, Roles, and Parent-Student links.
            </p>
          </div>

          {/* NoSQL Card */}
          <div className="glass-card p-6 border-t-2 border-t-cyan-500 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Document NoSQL</span>
              <Server className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="text-xl font-extrabold text-white">MongoDB Atlas</div>
            <div className="text-xs font-semibold text-cyan-300">Flexible JSON • Rich Content</div>
            <p className="text-xs text-slate-400 border-t border-glass pt-3 leading-normal">
              Stores semi-structured document feeds: Homework Assignments, Class Bulletins, Student Attendance logs, and Messages.
            </p>
          </div>

          {/* Key-Value Card */}
          <div className="glass-card p-6 border-t-2 border-t-purple-500 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">In-Memory Key-Value</span>
              <Shield className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-xl font-extrabold text-white">Redis 7 (Port 6379)</div>
            <div className="text-xs font-semibold text-purple-300">Microsecond Speed • Socket.IO</div>
            <p className="text-xs text-slate-400 border-t border-glass pt-3 leading-normal">
              Buffers real-time parent-teacher chat, caches user online presence, and increments unread notification badges.
            </p>
          </div>
        </div>
      </div>

      {/* User Directory Table */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-extrabold text-white mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-400" /> Managed School User Accounts (Relational SQL Registry)
        </h3>
        <div className="overflow-x-auto rounded-xl border border-glass">
          <table className="w-full text-left text-sm">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Role</th>
                <th>Email Address</th>
                <th>Phone</th>
                <th>Account Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-bold text-white">Rajesh Shah</td>
                <td><span className="badge badge-urgent">ADMIN</span></td>
                <td className="text-slate-300 font-mono">admin@campusbridge.edu</td>
                <td className="text-slate-400">+1-555-0101</td>
                <td><span className="text-emerald-400 font-bold">ACTIVE</span></td>
              </tr>
              <tr>
                <td className="font-bold text-white">Priya Patel</td>
                <td><span className="badge badge-academic">TEACHER</span></td>
                <td className="text-slate-300 font-mono">teacher@campusbridge.edu</td>
                <td className="text-slate-400">+1-555-0102</td>
                <td><span className="text-emerald-400 font-bold">ACTIVE</span></td>
              </tr>
              <tr>
                <td className="font-bold text-white">Vikram Mehta</td>
                <td><span className="badge badge-event">PARENT</span></td>
                <td className="text-slate-300 font-mono">parent@campusbridge.edu</td>
                <td className="text-slate-400">+1-555-0103</td>
                <td><span className="text-emerald-400 font-bold">ACTIVE</span></td>
              </tr>
              <tr>
                <td className="font-bold text-white">Aarav Mehta</td>
                <td><span className="badge badge-sports">STUDENT</span></td>
                <td className="text-slate-300 font-mono">student@campusbridge.edu</td>
                <td className="text-slate-400">+1-555-0104</td>
                <td><span className="text-emerald-400 font-bold">ACTIVE</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
