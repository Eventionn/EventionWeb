import { api } from './client';

// GETs
export const getUsers = () => api.get('/user/api/users');
export const getUserById = (id: string) => api.get(`/user/api/users/${id}`);
