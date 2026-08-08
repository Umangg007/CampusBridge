import React, { useState, useEffect } from 'react';
import { BookOpen, Megaphone, CheckSquare, Video, Plus, Send, ExternalLink } from 'lucide-react';
import { createHomework, createAnnouncement, markAttendance, createMeeting, fetchMeetings } from '../services/api';

export const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('homework');

  // Form States
  const [hwTitle, setHwTitle] = useState('');
  const [hwSubject, setHwSubject] = useState('Mathematics');
  const [hwDesc, setHwDesc] = useState('');
  const [hwDate, setHwDate] = useState('2026-08-15');
  const [hwStatus, setHwStatus] = useState('');

  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annCategory, setAnnCategory] = useState('ACADEMIC');
  const [annStatus, setAnnStatus] = useState('');

  const [attDate, setAttDate] = useState('2026-08-08');
  const [attStudentStatus, setAttStudentStatus] = useState('PRESENT');
  const [attStatus, setAttStatus] = useState('');

  const [meetings, setMeetings] = useState([]);
  const [meetTitle, setMeetTitle] = useState('');
  const [meetDesc, setMeetDesc] = useState('');
  const [meetStatusMsg, setMeetStatusMsg] = useState('');

  useEffect(() => {
    loadMeetings();
  }, []);

  const loadMeetings = async () => {
    try {
      const res = await fetchMeetings();
      setMeetings(res.data || []);
    } catch (err) {
      console.warn('Error loading meetings:', err);
    }
  };

  const handleCreateHomework = async (e) => {
    e.preventDefault();
    try {
      await createHomework({ classId: 1, subject: hwSubject, title: hwTitle, description: hwDesc, dueDate: hwDate });
      setHwStatus('✅ Homework created & published to MongoDB!');
      setHwTitle(''); setHwDesc('');
    } catch (err) {
      setHwStatus('❌ Error creating homework');
    }
  };

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    try {
      await createAnnouncement({ title: annTitle, content: annContent, category: annCategory, isPinned: true });
      setAnnStatus('✅ Announcement broadcasted to School Feed!');
      setAnnTitle(''); setAnnContent('');
    } catch (err) {
      setAnnStatus('❌ Error publishing announcement');
    }
  };

  const handleMarkAttendance = async (e) => {
    e.preventDefault();
    try {
      await markAttendance({ classId: 1, date: attDate, records: [{ studentId: 4, status: attStudentStatus, remarks: 'Daily record' }] });
      setAttStatus(`✅ Attendance marked as ${attStudentStatus} for Aarav Mehta!`);
    } catch (err) {
      setAttStatus('❌ Error marking attendance');
    }
  };

  const handleCreateMeeting = async (e) => {
    e.preventDefault();
    try {
      await createMeeting({ title: meetTitle, description: meetDesc, participantRole: 'PARENTS' });
      setMeetStatusMsg('✅ Parent-Teacher Virtual Conference Scheduled!');
      setMeetTitle(''); setMeetDesc('');
      loadMeetings();
    } catch (err) {
      setMeetStatusMsg('❌ Error scheduling meeting');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="ps-card p-6 border-l-4 border-l-emerald-600 flex flex-wrap justify-between items-center gap-4">
        <div>
          <span className="badge badge-academic mb-2">Academic Staff Portal</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Mrs. Priya Patel's Teacher Hub</h2>
          <p className="text-slate-500 text-xs mt-1 font-medium">Assigned Class: Grade 10-A • Subject: Mathematics</p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveTab('homework')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'homework' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Homework
          </button>
          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'announcements' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5" /> Announcements
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'attendance' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" /> Attendance
          </button>
          <button
            onClick={() => setActiveTab('meetings')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'meetings' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Video className="w-3.5 h-3.5" /> Virtual Meetings
          </button>
        </div>
      </div>

      {/* Tab 1: Create Homework */}
      {activeTab === 'homework' && (
        <div className="ps-card p-6 max-w-2xl">
          <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-700" /> Assign New Homework (NoSQL MongoDB Store)
          </h3>
          {hwStatus && <div className="mb-4 text-xs font-bold text-emerald-700">{hwStatus}</div>}
          <form onSubmit={handleCreateHomework} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Homework Title</label>
              <input
                type="text"
                required
                value={hwTitle}
                onChange={(e) => setHwTitle(e.target.value)}
                placeholder="e.g. Quadratic Equations Practice"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Subject</label>
                <input
                  type="text"
                  value={hwSubject}
                  onChange={(e) => setHwSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Due Date</label>
                <input
                  type="date"
                  value={hwDate}
                  onChange={(e) => setHwDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Instructions & Description</label>
              <textarea
                required
                rows={3}
                value={hwDesc}
                onChange={(e) => setHwDesc(e.target.value)}
                placeholder="Write detailed assignment instructions for students..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button type="submit" className="ps-btn-green">
              <Plus className="w-4 h-4" /> Publish Assignment
            </button>
          </form>
        </div>
      )}

      {/* Tab 2: Broadcast Announcement */}
      {activeTab === 'announcements' && (
        <div className="ps-card p-6 max-w-2xl">
          <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-emerald-700" /> Broadcast School/Class Announcement
          </h3>
          {annStatus && <div className="mb-4 text-xs font-bold text-emerald-700">{annStatus}</div>}
          <form onSubmit={handleCreateAnnouncement} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Announcement Title</label>
              <input
                type="text"
                required
                value={annTitle}
                onChange={(e) => setAnnTitle(e.target.value)}
                placeholder="e.g. Midterm Exam Schedule Update"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Category Tag</label>
              <select
                value={annCategory}
                onChange={(e) => setAnnCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800"
              >
                <option value="ACADEMIC">ACADEMIC</option>
                <option value="URGENT">URGENT</option>
                <option value="EVENT">EVENT</option>
                <option value="SPORTS">SPORTS</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Announcement Body</label>
              <textarea
                required
                rows={3}
                value={annContent}
                onChange={(e) => setAnnContent(e.target.value)}
                placeholder="Post updates to parents and students..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button type="submit" className="ps-btn-green">
              <Send className="w-4 h-4" /> Broadcast Announcement
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Mark Attendance */}
      {activeTab === 'attendance' && (
        <div className="ps-card p-6 max-w-2xl">
          <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-emerald-700" /> Daily Attendance Marker (Grade 10-A)
          </h3>
          {attStatus && <div className="mb-4 text-xs font-bold text-emerald-700">{attStatus}</div>}
          <form onSubmit={handleMarkAttendance} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Attendance Date</label>
              <input
                type="date"
                value={attDate}
                onChange={(e) => setAttDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800"
              />
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-slate-900">Student: Aarav Mehta</div>
                <div className="text-xs text-slate-500">Roll No: 10A-04 • Parent: Vikram Mehta</div>
              </div>
              <div className="flex gap-2">
                {['PRESENT', 'ABSENT', 'LATE'].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setAttStudentStatus(status)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      attStudentStatus === status
                        ? status === 'PRESENT' ? 'bg-emerald-600 text-white' : status === 'ABSENT' ? 'bg-rose-600 text-white' : 'bg-amber-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-600'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="ps-btn-green">
              <CheckSquare className="w-4 h-4" /> Save Attendance Record
            </button>
          </form>
        </div>
      )}

      {/* Tab 4: Virtual Meetings */}
      {activeTab === 'meetings' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="ps-card p-6">
            <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
              <Video className="w-5 h-5 text-emerald-700" /> Schedule Virtual Conference / Call
            </h3>
            {meetStatusMsg && <div className="mb-4 text-xs font-bold text-emerald-700">{meetStatusMsg}</div>}
            <form onSubmit={handleCreateMeeting} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Conference Topic</label>
                <input
                  type="text"
                  required
                  value={meetTitle}
                  onChange={(e) => setMeetTitle(e.target.value)}
                  placeholder="e.g. Q1 Parent-Teacher Progress Meeting"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Agenda / Description</label>
                <textarea
                  rows={3}
                  value={meetDesc}
                  onChange={(e) => setMeetDesc(e.target.value)}
                  placeholder="Discuss student academic goals and progress..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button type="submit" className="ps-btn-green">
                <Video className="w-4 h-4" /> Schedule & Generate Video Call Link
              </button>
            </form>
          </div>

          <div className="ps-card p-6 space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Video className="w-5 h-5 text-emerald-700" /> Scheduled Video Conferences
            </h3>
            <div className="space-y-3">
              {meetings.length === 0 ? (
                <p className="text-slate-400 text-xs italic">No scheduled video meetings.</p>
              ) : (
                meetings.map((m) => (
                  <div key={m._id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-slate-900 text-sm">{m.title}</h4>
                      <span className="badge badge-academic">{m.status}</span>
                    </div>
                    <p className="text-slate-600 text-xs">{m.description}</p>
                    <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                      <span className="text-[11px] text-slate-500">Host: {m.hostName}</span>
                      <a
                        href={m.meetingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="ps-btn-outline text-xs bg-emerald-50 text-emerald-800 border-emerald-200"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Join Video Call
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
