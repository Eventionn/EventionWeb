import { api } from './client';

export const getEvents = () => api.get('/event/api/events');
export const getEventById = (id: string) => api.get(`/event/api/events/${id}`);
