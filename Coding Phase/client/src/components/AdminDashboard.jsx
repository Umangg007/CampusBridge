import React from 'react';
import { Users, Shield, BookOpen, CheckCircle, Database, Server } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminDashboard = () => {
  const { healthStatus } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="glass-card p-6 border-l-4 border-l-indigo-500 flex flex-wrap justify-between items-center gap-4">
        <div>
          <span className="badge badge-academic mb-2">School Administrator Portal</span>
          <h2 className="text-2xl font-bold text-white">Greenwood High School Executive Control</h2>
          <p className="text-slate-400 text-sm mt-1">
            Manage users, monitor academic attendance, oversee school announcements, and track Tri-DB health.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-emerald-400 text-xs font-semibold">
          <CheckCircle className="w-4 h-4" /> System Online & Healthy
        </div>
      </div>

      {/* Tri-Database Architecture Live Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Relational DB</span>
            <Database className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-lg font-bold text-white">SQLite (via Prisma)</div>
          <div className="text-xs text-indigo-300 mt-1">ACID Compliant • 4 Users • 1 Class</div>
          <div className="mt-3 text-[11px] text-slate-400 border-t border-glass pt-2">
            Stores: Users, Roles, School Tenants, Class Links
          </div>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Document DB</span>
            <Server className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-lg font-bold text-white">MongoDB Atlas</div>
          <div className="text-xs text-cyan-300 mt-1">NoSQL • Dynamic Schemas • Rich Text</div>
          <div className="mt-3 text-[11px] text-slate-400 border-t border-glass pt-2">
            Stores: Announcements, Homework, Attendance, Chat
          </div>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">In-Memory Cache</span>
            <Shield className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-lg font-bold text-white">Redis 7 (Port 6379)</div>
          <div className="text-xs text-purple-300 mt-1">Key-Value • Microsecond Latency</div>
          <div className="mt-3 text-[11px] text-slate-400 border-t border-glass pt-2">
            Stores: Live Presence, Chat Buffer, Unread Badges
          </div>
        </div>
      </div>

      {/* User Directory Overview */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-400" /> Managed School Users (SQL Relational Registry)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/60 text-slate-400 text-xs uppercase border-b border-glass">
              <tr>
                <th className="p-3">User Name</th>
                <th className="p-3">Role</th>
                <th className="p-3">Email Address</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass">
              <tr>
                <td className="p-3 font-semibold text-white">Rajesh Shah</td>
                <td className="p-3"><span className="badge badge-urgent">ADMIN</span></td>
                <td className="p-3">admin@campusbridge.edu</td>
                <td className="p-3">+1-555-0101</td>
                <td className="p-3 text-emerald-400 font-medium">ACTIVE</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Priya Patel</td>
                <td className="p-3"><span className="badge badge-academic">TEACHER</span></td>
                <td className="p-3">teacher@campusbridge.edu</td>
                <td className="p-3">+1-555-0102</td>
                <td className="p-3 text-emerald-400 font-medium">ACTIVE</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Vikram Mehta</td>
                <td className="p-3"><span className="badge badge-event">PARENT</span></td>
                <td className="p-3">parent@campusbridge.edu</td>
                <td className="p-3">+1-555-0103</td>
                <td className="p-3 text-emerald-400 font-medium">ACTIVE</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Aarav Mehta</td>
                <td className="p-3"><span className="badge badge-sports">STUDENT</span></td>
                <td className="p-3">student@campusbridge.edu</td>
                <td className="p-3">+1-555-0104</td>
                <td className="p-3 text-emerald-400 font-medium">ACTIVE</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
