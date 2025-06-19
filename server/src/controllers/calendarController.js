const CalendarEvent = require('../models/CalendarEvent');

/**
 * @desc    Get all user's calendar events
 * @route   GET /api/calendar
 * @access  Private
 */
const getCalendarEvents = async (req, res) => {
  try {
    const { start, end } = req.query;
    
    // Build query to filter by date range if provided
    const query = { userId: req.user._id };
    if (start && end) {
      query.startDate = { $gte: new Date(start), $lte: new Date(end) };
    }

    const events = await CalendarEvent.find(query).sort({ startDate: 1 });

    res.json(events);
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    res.status(500).json({ message: 'Error fetching calendar events' });
  }
};

/**
 * @desc    Create a new calendar event
 * @route   POST /api/calendar/event
 * @access  Private
 */
const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      startDate,
      endDate,
      ideaId,
      contentType,
      status,
    } = req.body;

    const event = await CalendarEvent.create({
      userId: req.user._id,
      title,
      description,
      startDate,
      endDate: endDate || startDate,
      ideaId,
      contentType,
      status: status || 'Not Started',
    });

    res.status(201).json(event);
  } catch (error) {
    console.error('Error creating calendar event:', error);
    res.status(500).json({ message: 'Error creating calendar event' });
  }
};

/**
 * @desc    Get a calendar event by ID
 * @route   GET /api/calendar/event/:id
 * @access  Private
 */
const getEventById = async (req, res) => {
  try {
    const event = await CalendarEvent.findById(req.params.id);

    // Check if event exists
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if event belongs to user
    if (event.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(event);
  } catch (error) {
    console.error('Error fetching calendar event:', error);
    res.status(500).json({ message: 'Error fetching calendar event' });
  }
};

/**
 * @desc    Update a calendar event
 * @route   PUT /api/calendar/event/:id
 * @access  Private
 */
const updateEvent = async (req, res) => {
  try {
    let event = await CalendarEvent.findById(req.params.id);

    // Check if event exists
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if event belongs to user
    if (event.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Update event
    event = await CalendarEvent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(event);
  } catch (error) {
    console.error('Error updating calendar event:', error);
    res.status(500).json({ message: 'Error updating calendar event' });
  }
};

/**
 * @desc    Delete a calendar event
 * @route   DELETE /api/calendar/event/:id
 * @access  Private
 */
const deleteEvent = async (req, res) => {
  try {
    const event = await CalendarEvent.findById(req.params.id);

    // Check if event exists
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if event belongs to user
    if (event.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await event.remove();

    res.json({ message: 'Event removed' });
  } catch (error) {
    console.error('Error deleting calendar event:', error);
    res.status(500).json({ message: 'Error deleting calendar event' });
  }
};

/**
 * @desc    Mark calendar event as completed
 * @route   PUT /api/calendar/event/:id/complete
 * @access  Private
 */
const markEventComplete = async (req, res) => {
  try {
    let event = await CalendarEvent.findById(req.params.id);

    // Check if event exists
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if event belongs to user
    if (event.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Update completed status
    event.completed = true;
    event.status = 'Completed';
    await event.save();

    res.json(event);
  } catch (error) {
    console.error('Error updating calendar event status:', error);
    res.status(500).json({ message: 'Error updating calendar event status' });
  }
};

module.exports = {
  getCalendarEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
  markEventComplete,
};
