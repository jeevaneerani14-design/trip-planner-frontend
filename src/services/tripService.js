import api from './api';

export const getTrips = () => api.get('/trips');
export const createTrip = (payload) => api.post('/trips', payload);
export const getTrip = (tripId) => api.get(`/trips/${tripId}`);
export const updateTrip = (tripId, payload) => api.put(`/trips/${tripId}`, payload);
export const deleteTrip = (tripId) => api.delete(`/trips/${tripId}`);
export const getMembers = (tripId) => api.get(`/trips/${tripId}/members`);
export const addMember = (tripId, payload) => api.post(`/trips/${tripId}/members`, payload);
export const removeMember = (tripId, memberId) => api.delete(`/trips/${tripId}/members/${memberId}`);
export const getItinerary = (tripId) => api.get(`/trips/${tripId}/itinerary`);
export const createItineraryItem = (tripId, payload) => api.post(`/trips/${tripId}/itinerary`, payload);
export const updateItineraryItem = (tripId, itemId, payload) => api.put(`/trips/${tripId}/itinerary/${itemId}`, payload);
export const deleteItineraryItem = (tripId, itemId) => api.delete(`/trips/${tripId}/itinerary/${itemId}`);
export const getBalances = (tripId) => api.get(`/trips/${tripId}/balances`);
export const getSettlements = (tripId) => api.get(`/trips/${tripId}/settlements`);
export const getSettlementSuggestions = (tripId) => api.get(`/trips/${tripId}/settlements/suggestions`);
export const confirmSettlement = (tripId, settlementId) => api.post(`/trips/${tripId}/settlements/${settlementId}/confirm`);
export const reverseSettlement = (tripId, settlementId) => api.post(`/trips/${tripId}/settlements/${settlementId}/reverse`);
