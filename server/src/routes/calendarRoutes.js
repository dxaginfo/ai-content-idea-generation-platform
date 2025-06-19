const express = require('express');
const router = express.Router();
const {
  getCalendarEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
  markEventComplete,
} = require('../controllers/calendarController');
const { protect } = require('../middleware/authMiddleware');

// Get all calendar events
router.get('/', protect, getCalendarEvents);

// Create a new event
router.post('/event', protect, createEvent);

// Get, update, delete a specific event
router.get('/event/:id', protect, getEventById);
router.put('/event/:id', protect, updateEvent);
router.delete('/event/:id', protect, deleteEvent);

// Mark event as complete
router.put('/event/:id/complete', protect, markEventComplete);

module.exports = router;
