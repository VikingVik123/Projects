import api from './api';

export const login = async (payload) => {
    const response = await api.post('/api/auth/login', payload);
    return response.data;
};

export const register = async (payload) => {
  const response = await api.post('/api/auth/register', payload);
  return response.data;
};

export const logout = async () => {
  localStorage.removeItem('authToken');
  const response = await api.post('/api/auth/logout');
  return response.data;
};

export default {
  login,
  register,
  logout
};