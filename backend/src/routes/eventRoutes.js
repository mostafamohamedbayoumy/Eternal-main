const express = require('express');
const router = express.Router();
const {
  createEventRequest,
  getMyEventRequests,
  getEventRequest,
  getAllEventRequests,
  updateEventRequest,
  deleteEventRequest,
} = require('../controllers/eventController');
const { protect, adminOnly } = require('../middleware/auth');

// Public route for creating event request (can be guest or logged in)
router.post('/', createEventRequest);

// Protected routes
router.get('/my-requests', protect, getMyEventRequests);
router.get('/:id', protect, getEventRequest);

// Admin routes
router.get('/', protect, adminOnly, getAllEventRequests);
router.put('/:id', protect, adminOnly, updateEventRequest);
router.delete('/:id', protect, adminOnly, deleteEventRequest);

module.exports = router;
