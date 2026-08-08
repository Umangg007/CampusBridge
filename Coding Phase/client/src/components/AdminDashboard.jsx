import React from 'react';
import { Users, Shield, CheckCircle, Database, Server, Cpu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminDashboard = () => {
  const { healthStatus } = useAuth();

  return (
    <div className="space-y-6">
      {/* Executive Banner */}
      <div className="ps-card p-6 border-l-4 border-l-teal-600 flex flex-wrap justify-between items-center gap-4">
        <div>
          <span className="badge badge-academic mb-2">School Administrator Portal</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Greenwood High School Executive Control</h2>
          <p className="text-slate-600 text-xs mt-1 font-medium max-w-xl">
            Central management for school user accounts, class rosters, RBAC security scoping, and real-time Tri-Database engine diagnostics.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl text-emerald-800 text-xs font-bold shadow-sm">
          <CheckCircle className="w-4 h-4 text-emerald-600" /> Tri-DB Engines Live & Healthy
        </div>
      </div>

      {/* Tri-Database Architecture Live Metrics */}
      <div>
        <h3 className="text-base font-extrabold text-slate-900 mb-3 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-teal-600" /> Enterprise Tri-Database Engine Blueprint
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* SQL Card */}
          <div className="ps-card p-5 space-y-2 border-t-4 border-t-teal-600">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider">Relational SQL</span>
              <Database className="w-5 h-5 text-teal-600" />
            </div>
            <div className="text-lg font-bold text-slate-900">SQLite (via Prisma)</div>
            <div className="text-xs font-medium text-slate-600">ACID Compliant • 4 Users • 1 Class</div>
            <p className="text-xs text-slate-500 border-t border-slate-100 pt-2 leading-relaxed">
              Maintains user accounts, passwords, roles, and parent-student links with foreign key rules.
            </p>
          </div>

          {/* NoSQL Card */}
          <div className="ps-card p-5 space-y-2 border-t-4 border-t-sky-600">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wider">Document NoSQL</span>
              <Server className="w-5 h-5 text-sky-600" />
            </div>
            <div className="text-lg font-bold text-slate-900">MongoDB Atlas</div>
            <div className="text-xs font-medium text-slate-600">Flexible Schemas • Rich Text</div>
            <p className="text-xs text-slate-500 border-t border-slate-100 pt-2 leading-relaxed">
              Stores semi-structured document feeds: Homework, Announcements, Attendance logs, and Messages.
            </p>
          </div>

          {/* Key-Value Card */}
          <div className="ps-card p-5 space-y-2 border-t-4 border-t-purple-600">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider">In-Memory Key-Value</span>
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-lg font-bold text-slate-900">Redis 7 (Port 6379)</div>
            <div className="text-xs font-medium text-slate-600">Microsecond Speed • Socket.IO</div>
            <p className="text-xs text-slate-500 border-t border-slate-100 pt-2 leading-relaxed">
              Buffers real-time parent-teacher chat, caches user online presence, and increments unread counters.
            </p>
          </div>
        </div>
      </div>

      {/* Managed Users Registry Table */}
      <div className="ps-card p-6">
        <h3 className="text-base font-extrabold text-slate-900 mb-3 flex items-center gap-2">
          <Users className="w-5 h-5 text-teal-600" /> Managed School User Registry (Relational SQL Database)
        </h3>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table>
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
                <td className="font-bold text-slate-900">Rajesh Shah</td>
                <td><span className="badge badge-urgent">ADMIN</span></td>
                <td className="font-mono text-slate-600">admin@campusbridge.edu</td>
                <td className="text-slate-500">+1-555-0101</td>
                <td><span className="text-emerald-600 font-bold">ACTIVE</span></td>
              </tr>
              <tr>
                <td className="font-bold text-slate-900">Priya Patel</td>
                <td><span className="badge badge-academic">TEACHER</span></td>
                <td className="font-mono text-slate-600">teacher@campusbridge.edu</td>
                <td className="text-slate-500">+1-555-0102</td>
                <td><span className="text-emerald-600 font-bold">ACTIVE</span></td>
              </tr>
              <tr>
                <td className="font-bold text-slate-900">Vikram Mehta</td>
                <td><span className="badge badge-event">PARENT</span></td>
                <td className="font-mono text-slate-600">parent@campusbridge.edu</td>
                <td className="text-slate-500">+1-555-0103</td>
                <td><span className="text-emerald-600 font-bold">ACTIVE</span></td>
              </tr>
              <tr>
                <td className="font-bold text-slate-900">Aarav Mehta</td>
                <td><span className="badge badge-sports">STUDENT</span></td>
                <td className="font-mono text-slate-600">student@campusbridge.edu</td>
                <td className="text-slate-500">+1-555-0104</td>
                <td><span className="text-emerald-600 font-bold">ACTIVE</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
