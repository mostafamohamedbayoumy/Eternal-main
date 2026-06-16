import api from './api';

// Get all active partners
export const getPartners = async () => {
  const response = await api.get('/partners');
  return response.data;
};

// Create partner (Admin)
export const createPartner = async (partnerData) => {
  const response = await api.post('/partners', partnerData);
  return response.data;
};

// Delete partner (Admin)
export const deletePartner = async (id) => {
  const response = await api.delete(`/partners/${id}`);
  return response.data;
};
