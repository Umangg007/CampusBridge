const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
  schoolId: { type: Number, required: true, index: true },
  hostUserId: { type: Number, required: true },
  hostName: { type: String, required: true },
  hostRole: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  meetingUrl: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  participantRole: { type: String, enum: ['ALL', 'PARENTS', 'TEACHERS', 'STUDENTS'], default: 'PARENTS' },
  targetClassId: { type: Number, default: 1 },
  status: { type: String, enum: ['SCHEDULED', 'LIVE', 'COMPLETED', 'CANCELLED'], default: 'SCHEDULED' },
  slots: [{
    slotTime: String,
    parentId: Number,
    parentName: String,
    status: { type: String, enum: ['AVAILABLE', 'BOOKED'], default: 'AVAILABLE' }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Meeting', MeetingSchema);
