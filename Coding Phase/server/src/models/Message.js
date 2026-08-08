const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  conversationId: { type: String, required: true, index: true },
  senderId: { type: Number, required: true },
  senderName: { type: String, required: true },
  senderRole: { type: String, required: true },
  recipientId: { type: Number, required: true, index: true },
  content: { type: String, required: true },
  attachments: [{
    fileName: String,
    fileUrl: String
  }],
  isRead: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Message', MessageSchema);
