import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { User } from '../types/User';
import { api } from './client';
import { userMocks } from '../mocks/userMock';

// GETs
const getUsers = async () => (await api.get('/user/api/users')).data;
export const getUserById = (id: string) => api.get(`/user/api/users/${id}`);



export function useUsers(): UseQueryResult<User[]> | { data: User[]; isPending: false; isError: false } {
    const isMock = import.meta.env.VITE_MOCKS === 'true';

    const query = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: getUsers,
        enabled: !isMock,
    });

    if (isMock) {
        return {
            data: userMocks,
            isPending: false,
            isError: false,
        };
    }

    return query;
}