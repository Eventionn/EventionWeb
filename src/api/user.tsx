import { useQuery, useMutation, UseQueryResult, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { User } from '../types/User';
import { api } from './client';
import { userMocks } from '../mocks/userMock';

export interface EditUserData {
    userID: string;
    username: string;
    phone?: number;
    email: string;
    password?: string;
    status: boolean;
    createdAt: string; 
    loginType: string;
    usertype_id: string;
    profilePicture?: string;
    //address?: Address; // 
  }
  

// GETs
const getUsers = async () => (await api.get('/user/api/users')).data;
const getUserById = async (id: string) => (await api.get(`/user/api/users/${id}`)).data;

//Edit
const editUser = async (id: string, data: EditUserData): Promise<User> => {
    const response = await api.put(`/user/api/users/${id}`, data);
    return response.data;
};

//Delete
const deleteUser = async (id: string) => (await api.delete(`/user/api/users/${id}`)).data;

//Create
const createUser = async (data: User) => (await api.post('/user/api/users', data)).data;

//use
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


export function useUserById(id: string): UseQueryResult<User> | { data: User | null; isPending: false; isError: false } {
    const isMock = import.meta.env.VITE_MOCKS === 'true';

    const query = useQuery<User>({
        queryKey: ['user', id],
        queryFn: () => getUserById(id),
        enabled: !isMock,
    });

    if (isMock) {
        return {
            data: userMocks.find(user => user.userID === id) || null,
            isPending: false,
            isError: false,
        };
    }

    return query;
}

export function useEditUser(): UseMutationResult<User, Error, { id: string; data: EditUserData }> {
    const queryClient = useQueryClient();

    const mutation = useMutation<User, Error, { id: string; data: EditUserData }>({
        mutationFn: ({ id, data }) => editUser(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });

    return mutation;
}

export function useDeleteUser(): UseMutationResult<void, Error, string> {
    const queryClient = useQueryClient();

    const mutation = useMutation<void, Error, string>({
        mutationFn: (id) => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });

    return mutation;
}

export function useCreateUser(): UseMutationResult<User, Error, User> {
    const queryClient = useQueryClient();

    const mutation = useMutation<User, Error, User>({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });

    return mutation;
}
