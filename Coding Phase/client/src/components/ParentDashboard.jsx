import React, { useState, useEffect } from 'react';
import { User, CheckCircle, BookOpen, Megaphone, MessageSquare, Send, Video, ExternalLink, Calendar } from 'lucide-react';
import { fetchAnnouncements, fetchHomework, fetchStudentAttendance, sendMessage, fetchMessages, fetchMeetings, bookMeetingSlot } from '../services/api';

export const ParentDashboard = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [homeworkList, setHomeworkList] = useState([]);
  const [attendanceStats, setAttendanceStats] = useState(null);
  const [meetings, setMeetings] = useState([]);

  // Chat State
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [msgInput, setMsgInput] = useState('');

  useEffect(() => {
    loadParentData();
  }, []);

  const loadParentData = async () => {
    try {
      const annRes = await fetchAnnouncements();
      setAnnouncements(annRes.data || []);

      const hwRes = await fetchHomework();
      setHomeworkList(hwRes.data || []);

      const attRes = await fetchStudentAttendance(4);
      setAttendanceStats(attRes.stats || { percentage: '100', present: 1, absent: 0, total: 1 });

      const meetRes = await fetchMeetings();
      setMeetings(meetRes.data || []);
    } catch (err) {
      console.warn('Error loading parent data:', err);
    }
  };

  const handleBookSlot = async (meetingId, slotIndex) => {
    try {
      await bookMeetingSlot(meetingId, slotIndex);
      loadParentData();
    } catch (err) {
      console.error('Error booking slot:', err);
    }
  };

  const openChatWithTeacher = async () => {
    setChatOpen(true);
    try {
      const res = await fetchMessages(2); // Teacher ID 2
      setMessages(res.data || []);
    } catch (err) {
      console.warn('Error loading messages:', err);
    }
  };

  const handleSendChat = async (e) => {
    e.preventDefault();
    if (!msgInput.trim()) return;

    try {
      const res = await sendMessage({
        recipientId: 2,
        recipientName: 'Priya Patel (Teacher)',
        content: msgInput
      });
      setMessages((prev) => [...prev, res.data]);
      setMsgInput('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Linked Child Overview Header */}
      <div className="glass-card p-6 border-l-4 border-l-cyan-500 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            AM
          </div>
          <div>
            <span className="badge badge-event mb-1">Parent Guardian View</span>
            <h2 className="text-2xl font-bold text-white">Student: Aarav Mehta</h2>
            <p className="text-slate-400 text-sm">Grade 10 - Section A • Greenwood High School</p>
          </div>
        </div>

        {/* Quick Action & Attendance Badge */}
        <div className="flex items-center gap-4">
          <div className="bg-slate-900/80 px-4 py-2 rounded-xl border border-glass text-right">
            <div className="text-[10px] uppercase text-slate-400 font-semibold">Attendance Rate</div>
            <div className="text-xl font-bold text-emerald-400">{attendanceStats?.percentage || '100'}%</div>
          </div>
          <button onClick={openChatWithTeacher} className="btn-primary bg-cyan-600 hover:bg-cyan-500">
            <MessageSquare className="w-4 h-4" /> Message Teacher
          </button>
        </div>
      </div>

      {/* Virtual Parent-Teacher Conferences & Video Calls Section */}
      <div className="glass-card p-6 space-y-4 border-t-2 border-t-purple-500">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Video className="w-5 h-5 text-purple-400" /> Virtual Parent-Teacher Conferences & Video Calls
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {meetings.length === 0 ? (
            <p className="text-slate-400 text-sm italic">No conference sessions scheduled by teacher.</p>
          ) : (
            meetings.map((m) => (
              <div key={m._id} className="p-4 bg-slate-900/60 rounded-xl border border-glass space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white text-base">{m.title}</h4>
                  <span className="badge badge-academic">{m.status}</span>
                </div>
                <p className="text-slate-300 text-xs">{m.description}</p>
                
                {/* Time Slot Booking Picker */}
                <div className="space-y-1.5 pt-2 border-t border-glass">
                  <div className="text-[11px] font-semibold text-slate-400">Available Conference Slots:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {m.slots?.map((slot, idx) => (
                      <button
                        key={idx}
                        disabled={slot.status === 'BOOKED'}
                        onClick={() => handleBookSlot(m._id, idx)}
                        className={`p-2 rounded-lg text-xs font-semibold flex items-center justify-between border ${
                          slot.status === 'BOOKED'
                            ? slot.parentId === 3
                              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                              : 'bg-slate-800/40 border-slate-800 text-slate-500 cursor-not-allowed'
                            : 'bg-indigo-600/20 border-indigo-500/40 text-indigo-200 hover:bg-indigo-600'
                        }`}
                      >
                        <span>{slot.slotTime}</span>
                        <span>{slot.status === 'BOOKED' ? (slot.parentId === 3 ? 'RESERVED' : 'TAKEN') : 'BOOK'}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <a
                  href={m.meetingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary w-full bg-purple-600 hover:bg-purple-500 mt-2 text-xs"
                >
                  <ExternalLink className="w-4 h-4" /> Join Video Call Room Now
                </a>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Content Grid: Announcements Feed & Homework List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Announcements Feed */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-cyan-400" /> School Announcements Feed
          </h3>

          <div className="space-y-3">
            {announcements.length === 0 ? (
              <p className="text-slate-400 text-sm italic">No announcements published yet.</p>
            ) : (
              announcements.map((item) => (
                <div key={item._id} className="p-4 bg-slate-900/60 rounded-xl border border-glass space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-semibold text-white text-base">{item.title}</h4>
                    <span className={`badge badge-${item.category.toLowerCase()}`}>{item.category}</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{item.content}</p>
                  <div className="text-[11px] text-slate-400 pt-2 border-t border-glass flex justify-between">
                    <span>By: {item.authorName} ({item.authorRole})</span>
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Assigned Homework Portal */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" /> Child Assigned Homework
          </h3>

          <div className="space-y-3">
            {homeworkList.length === 0 ? (
              <p className="text-slate-400 text-sm italic">No homework assigned yet.</p>
            ) : (
              homeworkList.map((hw) => (
                <div key={hw._id} className="p-4 bg-slate-900/60 rounded-xl border border-glass space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{hw.subject}</span>
                    <span className="text-xs text-amber-400 font-medium">Due: {new Date(hw.dueDate).toLocaleDateString()}</span>
                  </div>
                  <h4 className="font-semibold text-white text-base">{hw.title}</h4>
                  <p className="text-slate-300 text-sm">{hw.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Real-time Parent-Teacher Chat Drawer/Modal */}
      {chatOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="glass-card p-6 max-w-lg w-full space-y-4 border border-cyan-500/40">
            <div className="flex justify-between items-center border-b border-glass pb-3">
              <div>
                <h3 className="font-bold text-white text-lg">Chat with Mrs. Priya Patel</h3>
                <p className="text-xs text-slate-400">Class Teacher (Grade 10-A)</p>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            {/* Messages Scroll View */}
            <div className="h-64 overflow-y-auto space-y-3 p-3 bg-slate-950/60 rounded-xl border border-glass">
              {messages.length === 0 ? (
                <p className="text-xs text-slate-500 italic text-center pt-8">No prior messages. Send a message to start conversation!</p>
              ) : (
                messages.map((m, idx) => (
                  <div
                    key={m._id || idx}
                    className={`p-2.5 rounded-xl max-w-[80%] text-xs ${
                      m.senderId === 3 ? 'bg-indigo-600 text-white ml-auto' : 'bg-slate-800 text-slate-200'
                    }`}
                  >
                    <div className="font-semibold mb-0.5">{m.senderName}</div>
                    <div>{m.content}</div>
                  </div>
                ))
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendChat} className="flex gap-2">
              <input
                type="text"
                value={msgInput}
                onChange={(e) => setMsgInput(e.target.value)}
                placeholder="Type your message to teacher..."
                className="flex-1 bg-slate-900 border border-glass rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
              <button type="submit" className="btn-primary bg-cyan-600 hover:bg-cyan-500">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
