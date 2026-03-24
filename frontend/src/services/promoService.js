import api from './api';

// Validate promo code
export const validatePromoCode = async (code, orderTotal, userId) => {
  const response = await api.post('/promo-codes/validate', {
    code,
    orderTotal,
    userId,
  });
  return response.data;
};

// Get all promo codes (Admin)
export const getAllPromoCodes = async () => {
  const response = await api.get('/promo-codes');
  return response.data;
};

// Create promo code (Admin)
export const createPromoCode = async (promoData) => {
  const response = await api.post('/promo-codes', promoData);
  return response.data;
};

// Update promo code (Admin)
export const updatePromoCode = async (id, promoData) => {
  const response = await api.put(`/promo-codes/${id}`, promoData);
  return response.data;
};

// Delete promo code (Admin)
export const deletePromoCode = async (id) => {
  const response = await api.delete(`/promo-codes/${id}`);
  return response.data;
};

// Get active offers
export const getActiveOffers = async () => {
  const response = await api.get('/offers/active');
  return response.data;
};

// Get all offers (Admin)
export const getAllOffers = async () => {
  const response = await api.get('/offers');
  return response.data;
};

// Create offer (Admin)
export const createOffer = async (offerData) => {
  const response = await api.post('/offers', offerData);
  return response.data;
};

// Update offer (Admin)
export const updateOffer = async (id, offerData) => {
  const response = await api.put(`/offers/${id}`, offerData);
  return response.data;
};

// Delete offer (Admin)
export const deleteOffer = async (id) => {
  const response = await api.delete(`/offers/${id}`);
  return response.data;
};
