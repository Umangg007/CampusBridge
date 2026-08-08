const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  schoolId: { type: Number, required: true, index: true },
  classId: { type: Number, required: true, index: true },
  studentId: { type: Number, required: true, index: true },
  markedByTeacherId: { type: Number, required: true },
  date: { type: String, required: true, index: true }, // Format YYYY-MM-DD
  status: { type: String, enum: ['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'], required: true },
  remarks: { type: String }
}, {
  timestamps: true
});

AttendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);
