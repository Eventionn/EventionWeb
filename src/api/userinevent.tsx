import { api } from './client';

export const getUsersInEvent = () => api.get('/userinevent/api/userinevents');
export const getUserInEventById = (id: string) => api.get(`/userinevent/api/userinevents/${id}`);
