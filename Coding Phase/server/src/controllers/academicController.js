const Homework = require('../models/Homework');
const Attendance = require('../models/Attendance');
const { prisma } = require('../config/db');

// Homework APIs
const createHomework = async (req, res) => {
  try {
    const { classId, subject, title, description, dueDate, attachments } = req.body;

    const homework = await Homework.create({
      schoolId: req.user.schoolId,
      classId: parseInt(classId, 10),
      teacherId: req.user.id,
      subject,
      title,
      description,
      dueDate: new Date(dueDate),
      attachments: attachments || []
    });

    res.status(201).json({ success: true, message: 'Homework created successfully', data: homework });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating homework', error: error.message });
  }
};

const getHomeworkList = async (req, res) => {
  try {
    const query = { schoolId: req.user.schoolId };

    if (req.query.classId) {
      query.classId = parseInt(req.query.classId, 10);
    }

    const homeworkList = await Homework.find(query).sort({ dueDate: 1 });
    res.json({ success: true, data: homeworkList });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching homework', error: error.message });
  }
};

// Attendance APIs
const markBulkAttendance = async (req, res) => {
  try {
    const { classId, date, records } = req.body; // records: [{ studentId, status, remarks }]

    if (!classId || !date || !Array.isArray(records)) {
      return res.status(400).json({ success: false, message: 'Invalid attendance payload' });
    }

    const operations = records.map(record => ({
      updateOne: {
        filter: { studentId: record.studentId, date },
        update: {
          $set: {
            schoolId: req.user.schoolId,
            classId: parseInt(classId, 10),
            markedByTeacherId: req.user.id,
            status: record.status,
            remarks: record.remarks || ''
          }
        },
        upsert: true
      }
    }));

    await Attendance.bulkWrite(operations);
    res.json({ success: true, message: `Attendance marked for ${records.length} students` });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error marking attendance', error: error.message });
  }
};

const getStudentAttendance = async (req, res) => {
  try {
    const studentId = parseInt(req.params.studentId || req.user.id, 10);
    const records = await Attendance.find({ studentId }).sort({ date: -1 });

    const total = records.length;
    const present = records.filter(r => r.status === 'PRESENT').length;
    const absent = records.filter(r => r.status === 'ABSENT').length;
    const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 100;

    res.json({
      success: true,
      stats: { total, present, absent, percentage },
      records
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching attendance', error: error.message });
  }
};

module.exports = {
  createHomework,
  getHomeworkList,
  markBulkAttendance,
  getStudentAttendance
};
