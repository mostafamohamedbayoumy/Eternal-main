import api from './api';

// Create order
export const createOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

// Get user orders
export const getMyOrders = async () => {
  const response = await api.get('/orders/my-orders');
  return response.data;
};

// Get single order
export const getOrder = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

// Get all orders (Admin)
export const getAllOrders = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const response = await api.get(`/orders?${params}`);
  return response.data;
};

// Update order status (Admin)
export const updateOrderStatus = async (id, statusData) => {
  const response = await api.put(`/orders/${id}/status`, statusData);
  return response.data;
};

// Get order statistics (Admin)
export const getOrderStats = async () => {
  const response = await api.get('/orders/stats');
  return response.data;
};
