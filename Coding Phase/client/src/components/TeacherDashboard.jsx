import React, { useState } from 'react';
import { BookOpen, Megaphone, CheckSquare, Plus, Send } from 'lucide-react';
import { createHomework, createAnnouncement, markAttendance } from '../services/api';

export const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('homework');

  // Homework Form State
  const [hwTitle, setHwTitle] = useState('');
  const [hwSubject, setHwSubject] = useState('Mathematics');
  const [hwDesc, setHwDesc] = useState('');
  const [hwDate, setHwDate] = useState('2026-08-15');
  const [hwStatus, setHwStatus] = useState('');

  // Announcement Form State
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annCategory, setAnnCategory] = useState('ACADEMIC');
  const [annStatus, setAnnStatus] = useState('');

  // Attendance Form State
  const [attDate, setAttDate] = useState('2026-08-08');
  const [attStudentStatus, setAttStudentStatus] = useState('PRESENT');
  const [attStatus, setAttStatus] = useState('');

  const handleCreateHomework = async (e) => {
    e.preventDefault();
    try {
      await createHomework({
        classId: 1,
        subject: hwSubject,
        title: hwTitle,
        description: hwDesc,
        dueDate: hwDate
      });
      setHwStatus('✅ Homework created & pushed to MongoDB!');
      setHwTitle(''); setHwDesc('');
    } catch (err) {
      setHwStatus('❌ Error creating homework');
    }
  };

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    try {
      await createAnnouncement({
        title: annTitle,
        content: annContent,
        category: annCategory,
        isPinned: true
      });
      setAnnStatus('✅ Announcement published to MongoDB Feed!');
      setAnnTitle(''); setAnnContent('');
    } catch (err) {
      setAnnStatus('❌ Error publishing announcement');
    }
  };

  const handleMarkAttendance = async (e) => {
    e.preventDefault();
    try {
      await markAttendance({
        classId: 1,
        date: attDate,
        records: [{ studentId: 4, status: attStudentStatus, remarks: 'Daily record' }]
      });
      setAttStatus(`✅ Attendance marked as ${attStudentStatus} for Aarav Mehta!`);
    } catch (err) {
      setAttStatus('❌ Error marking attendance');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-card p-6 border-l-4 border-l-purple-500 flex flex-wrap justify-between items-center gap-4">
        <div>
          <span className="badge badge-academic mb-2">Academic Staff Portal</span>
          <h2 className="text-2xl font-bold text-white">Mrs. Priya Patel's Teacher Hub</h2>
          <p className="text-slate-400 text-sm mt-1">Assigned Class: Grade 10-A • Subject: Mathematics</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('homework')}
            className={`btn-secondary text-xs ${activeTab === 'homework' ? 'bg-indigo-600/30 border-indigo-500' : ''}`}
          >
            <BookOpen className="w-4 h-4 text-indigo-400" /> Homework
          </button>
          <button
            onClick={() => setActiveTab('announcements')}
            className={`btn-secondary text-xs ${activeTab === 'announcements' ? 'bg-cyan-600/30 border-cyan-500' : ''}`}
          >
            <Megaphone className="w-4 h-4 text-cyan-400" /> Announcements
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`btn-secondary text-xs ${activeTab === 'attendance' ? 'bg-emerald-600/30 border-emerald-500' : ''}`}
          >
            <CheckSquare className="w-4 h-4 text-emerald-400" /> Attendance
          </button>
        </div>
      </div>

      {/* Tab 1: Create Homework */}
      {activeTab === 'homework' && (
        <div className="glass-card p-6 max-w-2xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" /> Assign New Homework (NoSQL MongoDB Store)
          </h3>
          {hwStatus && <div className="mb-4 text-sm font-semibold text-emerald-400">{hwStatus}</div>}
          <form onSubmit={handleCreateHomework} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Homework Title</label>
              <input
                type="text"
                required
                value={hwTitle}
                onChange={(e) => setHwTitle(e.target.value)}
                placeholder="e.g. Quadratic Equations Exercises"
                className="w-full bg-slate-900/80 border border-glass rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Subject</label>
                <input
                  type="text"
                  value={hwSubject}
                  onChange={(e) => setHwSubject(e.target.value)}
                  className="w-full bg-slate-900/80 border border-glass rounded-lg p-2.5 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Due Date</label>
                <input
                  type="date"
                  value={hwDate}
                  onChange={(e) => setHwDate(e.target.value)}
                  className="w-full bg-slate-900/80 border border-glass rounded-lg p-2.5 text-sm text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Instructions & Description</label>
              <textarea
                required
                rows={3}
                value={hwDesc}
                onChange={(e) => setHwDesc(e.target.value)}
                placeholder="Write detailed instructions for students..."
                className="w-full bg-slate-900/80 border border-glass rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button type="submit" className="btn-primary">
              <Plus className="w-4 h-4" /> Publish Assignment
            </button>
          </form>
        </div>
      )}

      {/* Tab 2: Create Announcement */}
      {activeTab === 'announcements' && (
        <div className="glass-card p-6 max-w-2xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-cyan-400" /> Broadcast School/Class Announcement
          </h3>
          {annStatus && <div className="mb-4 text-sm font-semibold text-emerald-400">{annStatus}</div>}
          <form onSubmit={handleCreateAnnouncement} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Announcement Title</label>
              <input
                type="text"
                required
                value={annTitle}
                onChange={(e) => setAnnTitle(e.target.value)}
                placeholder="e.g. Midterm Exam Timetable Announcement"
                className="w-full bg-slate-900/80 border border-glass rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Category Tag</label>
              <select
                value={annCategory}
                onChange={(e) => setAnnCategory(e.target.value)}
                className="w-full bg-slate-900/80 border border-glass rounded-lg p-2.5 text-sm text-white"
              >
                <option value="ACADEMIC">ACADEMIC</option>
                <option value="URGENT">URGENT</option>
                <option value="EVENT">EVENT</option>
                <option value="SPORTS">SPORTS</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Announcement Body</label>
              <textarea
                required
                rows={3}
                value={annContent}
                onChange={(e) => setAnnContent(e.target.value)}
                placeholder="Post updates to parents and students..."
                className="w-full bg-slate-900/80 border border-glass rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <button type="submit" className="btn-primary bg-cyan-600 hover:bg-cyan-500">
              <Send className="w-4 h-4" /> Broadcast Announcement
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Mark Attendance */}
      {activeTab === 'attendance' && (
        <div className="glass-card p-6 max-w-2xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-emerald-400" /> One-Click Daily Attendance (Grade 10-A)
          </h3>
          {attStatus && <div className="mb-4 text-sm font-semibold text-emerald-400">{attStatus}</div>}
          <form onSubmit={handleMarkAttendance} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Attendance Date</label>
              <input
                type="date"
                value={attDate}
                onChange={(e) => setAttDate(e.target.value)}
                className="w-full bg-slate-900/80 border border-glass rounded-lg p-2.5 text-sm text-white"
              />
            </div>

            <div className="p-4 bg-slate-900/60 rounded-xl border border-glass flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-white">Student: Aarav Mehta</div>
                <div className="text-xs text-slate-400">Roll No: 10A-04 • Parent: Vikram Mehta</div>
              </div>
              <div className="flex gap-2">
                {['PRESENT', 'ABSENT', 'LATE'].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setAttStudentStatus(status)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      attStudentStatus === status
                        ? status === 'PRESENT' ? 'bg-emerald-500 text-white' : status === 'ABSENT' ? 'bg-rose-500 text-white' : 'bg-amber-500 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="btn-primary bg-emerald-600 hover:bg-emerald-500">
              <CheckSquare className="w-4 h-4" /> Save Attendance Record
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
