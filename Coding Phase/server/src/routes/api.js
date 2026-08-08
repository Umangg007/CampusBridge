const express = require('express');
const router = express.Router();
const { authenticateJWT, authorizeRole } = require('../middleware/auth');
const { 
  createHomework, 
  getHomeworkList, 
  markBulkAttendance, 
  getStudentAttendance 
} = require('../controllers/academicController');
const { 
  createAnnouncement, 
  getAnnouncements, 
  sendMessage, 
  getMessages 
} = require('../controllers/communicationController');

// Homework Routes
router.post('/homework', authenticateJWT, authorizeRole('TEACHER', 'ADMIN'), createHomework);
router.get('/homework', authenticateJWT, getHomeworkList);

// Attendance Routes
router.post('/attendance/bulk', authenticateJWT, authorizeRole('TEACHER', 'ADMIN'), markBulkAttendance);
router.get('/attendance/student/:studentId?', authenticateJWT, getStudentAttendance);

// Announcement Routes
router.post('/announcements', authenticateJWT, authorizeRole('TEACHER', 'ADMIN'), createAnnouncement);
router.get('/announcements', authenticateJWT, getAnnouncements);

// Chat Routes
router.post('/messages', authenticateJWT, sendMessage);
router.get('/messages/:userId', authenticateJWT, getMessages);

module.exports = router;
