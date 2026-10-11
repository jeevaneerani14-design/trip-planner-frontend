import api, { setAuthToken } from './api';

export const register = (payload) => api.post('/auth/register', payload);
export const login = async (payload) => {
  const response = await api.post('/auth/login', payload);
  setAuthToken(response.data.token);
  return response;
};
export const logout = async () => {
  try {
    return await api.post('/auth/logout');
  } finally {
    setAuthToken(null);
  }
};
export const getCurrentUser = () => api.get('/auth/me');
