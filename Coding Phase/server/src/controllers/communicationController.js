const Announcement = require('../models/Announcement');
const Message = require('../models/Message');
const Notification = require('../models/Notification');
const { redis, isRedisConnected } = require('../config/redis');

// Announcement APIs
const createAnnouncement = async (req, res) => {
  try {
    const { title, content, category, targetAudience, targetClassIds, attachments, isPinned } = req.body;

    const announcement = await Announcement.create({
      schoolId: req.user.schoolId,
      createdBy: req.user.id,
      authorName: req.user.name,
      authorRole: req.user.role,
      title,
      content,
      category: category || 'GENERAL',
      targetAudience: targetAudience || 'ALL',
      targetClassIds: targetClassIds || [],
      attachments: attachments || [],
      isPinned: isPinned || false
    });

    res.status(201).json({ success: true, message: 'Announcement published', data: announcement });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error publishing announcement', error: error.message });
  }
};

const getAnnouncements = async (req, res) => {
  try {
    const query = { schoolId: req.user.schoolId };

    if (req.query.category) {
      query.category = req.query.category;
    }

    const announcements = await Announcement.find(query).sort({ isPinned: -1, createdAt: -1 });
    res.json({ success: true, data: announcements });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching announcements', error: error.message });
  }
};

// Chat Message APIs
const sendMessage = async (req, res) => {
  try {
    const { recipientId, recipientName, content, attachments } = req.body;

    const conversationId = [req.user.id, parseInt(recipientId, 10)].sort().join('_');

    const message = await Message.create({
      conversationId,
      senderId: req.user.id,
      senderName: req.user.name,
      senderRole: req.user.role,
      recipientId: parseInt(recipientId, 10),
      content,
      attachments: attachments || []
    });

    // Cache unread message count in Redis
    if (isRedisConnected()) {
      await redis.incr(`unread:messages:${recipientId}`);
    }

    res.status(201).json({ success: true, message: 'Message sent', data: message });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error sending message', error: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const otherUserId = parseInt(req.params.userId, 10);
    const conversationId = [req.user.id, otherUserId].sort().join('_');

    const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
    
    // Reset unread count in Redis
    if (isRedisConnected()) {
      await redis.set(`unread:messages:${req.user.id}`, 0);
    }

    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching messages', error: error.message });
  }
};

module.exports = {
  createAnnouncement,
  getAnnouncements,
  sendMessage,
  getMessages
};
