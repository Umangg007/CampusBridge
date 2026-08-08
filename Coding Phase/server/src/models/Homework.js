const mongoose = require('mongoose');

const HomeworkSchema = new mongoose.Schema({
  schoolId: { type: Number, required: true, index: true },
  classId: { type: Number, required: true, index: true },
  teacherId: { type: Number, required: true, index: true },
  subject: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true, index: true },
  attachments: [{
    fileName: String,
    fileUrl: String,
    fileType: String
  }],
  status: { type: String, enum: ['ASSIGNED', 'COMPLETED', 'ARCHIVED'], default: 'ASSIGNED' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Homework', HomeworkSchema);
