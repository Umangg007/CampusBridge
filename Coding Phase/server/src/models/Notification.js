const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  userId: { type: Number, required: true, index: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['ANNOUNCEMENT', 'HOMEWORK', 'ATTENDANCE', 'MESSAGE', 'MEETING'], 
    required: true 
  },
  referenceId: { type: String },
  isRead: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Notification', NotificationSchema);
