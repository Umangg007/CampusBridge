import React, { useState, useEffect } from 'react';
import { BookOpen, Megaphone, CheckCircle, Award } from 'lucide-react';
import { fetchHomework, fetchAnnouncements, fetchStudentAttendance } from '../services/api';

export const StudentDashboard = () => {
  const [homeworkList, setHomeworkList] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [attendanceStats, setAttendanceStats] = useState(null);

  useEffect(() => {
    loadStudentData();
  }, []);

  const loadStudentData = async () => {
    try {
      const hwRes = await fetchHomework();
      setHomeworkList(hwRes.data || []);

      const annRes = await fetchAnnouncements();
      setAnnouncements(annRes.data || []);

      const attRes = await fetchStudentAttendance(4);
      setAttendanceStats(attRes.stats || { percentage: '100', present: 1, absent: 0, total: 1 });
    } catch (err) {
      console.warn('Error loading student data:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Student Banner */}
      <div className="glass-card p-6 border-l-4 border-l-emerald-500 flex flex-wrap justify-between items-center gap-4">
        <div>
          <span className="badge badge-sports mb-2">Student Portal</span>
          <h2 className="text-2xl font-bold text-white">Welcome back, Aarav Mehta!</h2>
          <p className="text-slate-400 text-sm mt-1">Grade 10 - Section A • Greenwood High School</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-slate-900/80 px-4 py-2 rounded-xl border border-glass text-center">
            <div className="text-[10px] uppercase text-slate-400 font-semibold">Attendance</div>
            <div className="text-xl font-bold text-emerald-400">{attendanceStats?.percentage || '100'}%</div>
          </div>
          <div className="bg-slate-900/80 px-4 py-2 rounded-xl border border-glass text-center">
            <div className="text-[10px] uppercase text-slate-400 font-semibold">Assignments Due</div>
            <div className="text-xl font-bold text-indigo-400">{homeworkList.length}</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Homework Assignments & Announcements Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Homework List */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" /> Pending Homework Assignments
          </h3>

          <div className="space-y-3">
            {homeworkList.length === 0 ? (
              <p className="text-slate-400 text-sm italic">No pending assignments!</p>
            ) : (
              homeworkList.map((hw) => (
                <div key={hw._id} className="p-4 bg-slate-900/60 rounded-xl border border-glass space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{hw.subject}</span>
                    <span className="badge badge-urgent">DUE {new Date(hw.dueDate).toLocaleDateString()}</span>
                  </div>
                  <h4 className="font-semibold text-white text-base">{hw.title}</h4>
                  <p className="text-slate-300 text-sm">{hw.description}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* School Announcements */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-cyan-400" /> Class & School Bulletins
          </h3>

          <div className="space-y-3">
            {announcements.length === 0 ? (
              <p className="text-slate-400 text-sm italic">No announcements currently posted.</p>
            ) : (
              announcements.map((item) => (
                <div key={item._id} className="p-4 bg-slate-900/60 rounded-xl border border-glass space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-white text-base">{item.title}</h4>
                    <span className={`badge badge-${item.category.toLowerCase()}`}>{item.category}</span>
                  </div>
                  <p className="text-slate-300 text-sm">{item.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
