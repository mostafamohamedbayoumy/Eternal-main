const EventRequest = require('../models/EventRequest');

// @desc    Create event request
// @route   POST /api/events
// @access  Public/Private
exports.createEventRequest = async (req, res, next) => {
  try {
    const {
      type,
      selectedCenterpieces,
      preferences,
      eventDate,
      eventTime,
      location,
      expectedGuests,
      tableCount,
      details,
      guestInfo,
    } = req.body;

    const eventData = {
      type,
      selectedCenterpieces,
      preferences,
      eventDate,
      eventTime,
      location,
      expectedGuests,
      tableCount,
      details,
      status: 'new',
    };

    // If user is logged in, add customerId
    if (req.user) {
      eventData.customerId = req.user.id;
    } else if (guestInfo) {
      // Guest request
      eventData.guestInfo = guestInfo;
    } else {
      return res.status(400).json({
        success: false,
        message: 'Guest information is required for non-logged-in users',
      });
    }

    const eventRequest = await EventRequest.create(eventData);

    res.status(201).json({
      success: true,
      message: 'Event request submitted successfully',
      data: eventRequest,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's event requests
// @route   GET /api/events/my-requests
// @access  Private
exports.getMyEventRequests = async (req, res, next) => {
  try {
    const eventRequests = await EventRequest.find({ customerId: req.user.id })
      .sort({ createdAt: -1 })
      .populate('selectedCenterpieces.productId');

    res.json({
      success: true,
      count: eventRequests.length,
      data: eventRequests,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single event request
// @route   GET /api/events/:id
// @access  Private
exports.getEventRequest = async (req, res, next) => {
  try {
    const eventRequest = await EventRequest.findById(req.params.id)
      .populate('customerId', 'name email phone')
      .populate('selectedCenterpieces.productId');

    if (!eventRequest) {
      return res.status(404).json({
        success: false,
        message: 'Event request not found',
      });
    }

    // Check authorization
    if (
      req.user.role !== 'admin' &&
      eventRequest.customerId &&
      eventRequest.customerId._id.toString() !== req.user.id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this event request',
      });
    }

    res.json({
      success: true,
      data: eventRequest,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all event requests (Admin)
// @route   GET /api/events
// @access  Private/Admin
exports.getAllEventRequests = async (req, res, next) => {
  try {
    const { status, type, startDate, endDate } = req.query;

    let query = {};

    if (status) {
      query.status = status;
    }

    if (type) {
      query.type = type;
    }

    if (startDate || endDate) {
      query.eventDate = {};
      if (startDate) query.eventDate.$gte = new Date(startDate);
      if (endDate) query.eventDate.$lte = new Date(endDate);
    }

    const eventRequests = await EventRequest.find(query)
      .sort({ createdAt: -1 })
      .populate('customerId', 'name email phone')
      .populate('selectedCenterpieces.productId');

    res.json({
      success: true,
      count: eventRequests.length,
      data: eventRequests,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update event request status (Admin)
// @route   PUT /api/events/:id
// @access  Private/Admin
exports.updateEventRequest = async (req, res, next) => {
  try {
    const { status, internalNotes, quote } = req.body;

    const eventRequest = await EventRequest.findById(req.params.id);

    if (!eventRequest) {
      return res.status(404).json({
        success: false,
        message: 'Event request not found',
      });
    }

    if (status) eventRequest.status = status;
    if (internalNotes !== undefined) eventRequest.internalNotes = internalNotes;
    if (quote) {
      eventRequest.quote = {
        ...quote,
        quotedAt: new Date(),
      };
    }

    await eventRequest.save();

    res.json({
      success: true,
      message: 'Event request updated successfully',
      data: eventRequest,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete event request (Admin)
// @route   DELETE /api/events/:id
// @access  Private/Admin
exports.deleteEventRequest = async (req, res, next) => {
  try {
    const eventRequest = await EventRequest.findById(req.params.id);

    if (!eventRequest) {
      return res.status(404).json({
        success: false,
        message: 'Event request not found',
      });
    }

    await eventRequest.deleteOne();

    res.json({
      success: true,
      message: 'Event request deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
