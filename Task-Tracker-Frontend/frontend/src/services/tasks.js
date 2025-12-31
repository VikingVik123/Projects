import api from './api';

export const getTasks = async () => {
  const response = await api.get('/api/tasks');
  return response.data;
};

export const createTask = async (payload) => {
  const response = await api.post('/api/tasks/add', payload);
  return response.data;
};

export const updateTask = async (id, payload) => {
  const response = await api.put(`/api/tasks/update/${id}`, payload);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await api.delete(`/api/tasks/delete/${id}`);
  return response.data;
};

export default {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};
