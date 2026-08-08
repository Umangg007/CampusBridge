const Meeting = require('../models/Meeting');

const createMeeting = async (req, res) => {
  try {
    const { title, description, startTime, endTime, participantRole, targetClassId, customSlots } = req.body;

    const roomId = `CampusBridge_Room_${Date.now()}`;
    const meetingUrl = `https://meet.jit.si/${roomId}`;

    const defaultSlots = [
      { slotTime: '10:00 AM - 10:15 AM', status: 'AVAILABLE' },
      { slotTime: '10:15 AM - 10:30 AM', status: 'AVAILABLE' },
      { slotTime: '10:30 AM - 10:45 AM', status: 'AVAILABLE' },
      { slotTime: '10:45 AM - 11:00 AM', status: 'AVAILABLE' }
    ];

    const meeting = await Meeting.create({
      schoolId: req.user.schoolId,
      hostUserId: req.user.id,
      hostName: req.user.name,
      hostRole: req.user.role,
      title,
      description: description || 'Parent-Teacher Virtual Conference',
      meetingUrl,
      startTime: new Date(startTime || Date.now()),
      endTime: new Date(endTime || Date.now() + 3600000),
      participantRole: participantRole || 'PARENTS',
      targetClassId: targetClassId ? parseInt(targetClassId, 10) : 1,
      status: 'SCHEDULED',
      slots: customSlots || defaultSlots
    });

    res.status(201).json({ success: true, message: 'Virtual Meeting scheduled', data: meeting });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error scheduling meeting', error: error.message });
  }
};

const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({ schoolId: req.user.schoolId }).sort({ startTime: 1 });
    res.json({ success: true, data: meetings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching meetings', error: error.message });
  }
};

const bookSlot = async (req, res) => {
  try {
    const { meetingId, slotIndex } = req.body;

    const meeting = await Meeting.findById(meetingId);
    if (!meeting) {
      return res.status(404).json({ success: false, message: 'Meeting not found' });
    }

    if (meeting.slots[slotIndex]) {
      meeting.slots[slotIndex].parentId = req.user.id;
      meeting.slots[slotIndex].parentName = req.user.name;
      meeting.slots[slotIndex].status = 'BOOKED';
      await meeting.save();
    }

    res.json({ success: true, message: 'Slot booked successfully', data: meeting });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error booking slot', error: error.message });
  }
};

module.exports = {
  createMeeting,
  getMeetings,
  bookSlot
};
