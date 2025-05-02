import { useQuery, useMutation, UseQueryResult, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { api } from './client';
import { eventMocks } from '../mocks/eventMock';
import { Event } from '../types/Event';

export interface EditEventData {
    name: string;
    description: string;
    price: number;
    startAt: string;
    endAt: string;
}

const getEvents = async () => (await api.get('/event/api/events')).data;
const getEventById = async (id: string) => (await api.get(`/event/api/events/${id}`)).data;
const editEvent = async (id: string, data: EditEventData): Promise<Event> => {
    const response = await api.put(`/event/api/events/${id}`, data);
    return response.data;
};
const deleteEvent = async (id: string) => (await api.delete(`/event/api/events/${id}`)).data;
const createEvent = async (data: Event) => (await api.post('/event/api/events', data)).data;

export function useEvents(): UseQueryResult<Event[]> | { data: Event[]; isPending: false; isError: false } {
    const isMock = import.meta.env.VITE_MOCKS === 'true';

    const query = useQuery<Event[]>({
        queryKey: ['events'],
        queryFn: getEvents,
        enabled: !isMock,
    });

    if (isMock) {
        return {
            data: eventMocks,
            isPending: false,
            isError: false,
        };
    }

    return query;
}

export function useEventById(id: string): UseQueryResult<Event> | { data: Event | null; isPending: false; isError: false } {
    const isMock = import.meta.env.VITE_MOCKS === 'true';

    const query = useQuery<Event>({
        queryKey: ['event', id],
        queryFn: () => getEventById(id),
        enabled: !isMock,
    });

    if (isMock) {
        return {
            data: eventMocks.find(event => event.eventID === id) || null,
            isPending: false,
            isError: false,
        };
    }

    return query;
}

export function useEditEvent(): UseMutationResult<Event, Error, { id: string; data: EditEventData }> {
    const queryClient = useQueryClient();

    const mutation = useMutation<Event, Error, { id: string; data: EditEventData }>({
        mutationFn: ({ id, data }) => editEvent(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
    });

    return mutation;
}

export function useDeleteEvent(): UseMutationResult<void, Error, string> {
    const queryClient = useQueryClient();

    const mutation = useMutation<void, Error, string>({
        mutationFn: (id) => deleteEvent(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
    });

    return mutation;
}

export function useCreateEvent(): UseMutationResult<Event, Error, Event> {
    const queryClient = useQueryClient();

    const mutation = useMutation<Event, Error, Event>({
        mutationFn: createEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
    });

    return mutation;
}
