import api from './api';

// Create event request
export const createEventRequest = async (eventData) => {
  const response = await api.post('/events', eventData);
  return response.data;
};

// Get user event requests
export const getMyEventRequests = async () => {
  const response = await api.get('/events/my-requests');
  return response.data;
};

// Get single event request
export const getEventRequest = async (id) => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};

// Get all event requests (Admin)
export const getAllEventRequests = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const response = await api.get(`/events?${params}`);
  return response.data;
};

// Update event request (Admin)
export const updateEventRequest = async (id, eventData) => {
  const response = await api.put(`/events/${id}`, eventData);
  return response.data;
};

// Delete event request (Admin)
export const deleteEventRequest = async (id) => {
  const response = await api.delete(`/events/${id}`);
  return response.data;
};
