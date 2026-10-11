import api from './api';

export const getExpenses = (tripId) => api.get(`/trips/${tripId}/expenses`);
export const getAllExpenses = () => api.get('/expenses');
export const createExpense = (tripId, payload) => api.post(`/trips/${tripId}/expenses`, payload);
export const getExpense = (tripId, expenseId) => api.get(`/trips/${tripId}/expenses/${expenseId}`);
export const updateExpense = (tripId, expenseId, payload) => api.put(`/trips/${tripId}/expenses/${expenseId}`, payload);
export const deleteExpense = (tripId, expenseId) => api.delete(`/trips/${tripId}/expenses/${expenseId}`);
