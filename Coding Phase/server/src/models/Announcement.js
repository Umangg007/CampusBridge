const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
  schoolId: { type: Number, required: true, index: true },
  createdBy: { type: Number, required: true },
  authorName: { type: String, required: true },
  authorRole: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['GENERAL', 'URGENT', 'ACADEMIC', 'EVENT', 'SPORTS'], 
    default: 'GENERAL' 
  },
  targetAudience: { 
    type: String, 
    enum: ['ALL', 'PARENTS', 'TEACHERS', 'STUDENTS', 'CLASS'], 
    default: 'ALL' 
  },
  targetClassIds: [{ type: Number }],
  attachments: [{
    fileName: String,
    fileUrl: String
  }],
  isPinned: { type: Boolean, default: false },
  reactions: {
    like: { type: Number, default: 0 },
    heart: { type: Number, default: 0 },
    thanks: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Announcement', AnnouncementSchema);
