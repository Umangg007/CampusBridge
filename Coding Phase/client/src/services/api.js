import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_BASE
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('cb_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  if (res.data.token) {
    localStorage.setItem('cb_token', res.data.token);
  }
  return res.data;
};

export const fetchHealth = async () => {
  const res = await api.get('/health');
  return res.data;
};

export const fetchAnnouncements = async () => {
  const res = await api.get('/announcements');
  return res.data;
};

export const createAnnouncement = async (payload) => {
  const res = await api.post('/announcements', payload);
  return res.data;
};

export const fetchHomework = async () => {
  const res = await api.get('/homework');
  return res.data;
};

export const createHomework = async (payload) => {
  const res = await api.post('/homework', payload);
  return res.data;
};

export const markAttendance = async (payload) => {
  const res = await api.post('/attendance/bulk', payload);
  return res.data;
};

export const fetchStudentAttendance = async (studentId) => {
  const res = await api.get(`/attendance/student/${studentId || ''}`);
  return res.data;
};

export const fetchMessages = async (userId) => {
  const res = await api.get(`/messages/${userId}`);
  return res.data;
};

export const sendMessage = async (payload) => {
  const res = await api.post('/messages', payload);
  return res.data;
};

export const fetchMeetings = async () => {
  const res = await api.get('/meetings');
  return res.data;
};

export const createMeeting = async (payload) => {
  const res = await api.post('/meetings', payload);
  return res.data;
};

export const bookMeetingSlot = async (meetingId, slotIndex) => {
  const res = await api.post('/meetings/book', { meetingId, slotIndex });
  return res.data;
};

export default api;
