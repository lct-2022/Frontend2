import { Undefinedable, User, UserData, UsersList } from "../types";
import { request, RPCHosts } from "../utils/api";

export const getAuthorizedUser = async (token?: string): Promise<Undefinedable<UserData>> => {
    return await request<UserData>({
        method: 'my_profile',
        host: RPCHosts.Passport,
        params: {
            additional_fields: [
                'projects',
            ],
        },
        ...(token && {
            settings: {
                authToken: token,
            }
        }),
    });
}

export const signup = async (email: string, password: string, fio: string): Promise<Undefinedable<string>> => {
    return await request<string>({
        method: 'signup',
        host: RPCHosts.Passport,
        params: {
            fio,
            email,
            password,
        },
    })
};

export const login = async (email: string, password: string): Promise<Undefinedable<string>> => {
    return await request<string>({
        method: 'login',
        host: RPCHosts.Passport,
        params: {
            email,
            password,
        },
    })
};

// search-users
export const getAllProfiles = async (query: string): Promise<Undefinedable<UsersList>> => {
    return await request<UsersList>({
        method: 'search_users',
        host: RPCHosts.Passport,
        params: {
            query,
            additional_fields: [
                'projects',
            ],
        }
    });
};

export const getProfiles = async (limit?: number): Promise<Undefinedable<User[]>> => {
    return await request<User[]>({
        method: 'popular_profiles',
        host: RPCHosts.Passport,
        ...(limit && {
            params: {
                limit
            },
        })
    });
};

export const getUserProfile = async (userId: number): Promise<Undefinedable<UserData>> => {
    return await request({
        method: 'get_profile',
        host: RPCHosts.Passport,
        params: {
            id: userId,
            additional_fields: [
                'projects',
            ],
        },
    });
};

export const updateUserProfile = async (newData: Partial<UserData>, token?: string): Promise<Undefinedable<UserData>> => {
    return await request({
        method: 'update_profile',
        host: RPCHosts.Passport,
        params: newData,
        ...(token && {
            settings: {
                authToken: token,
            }
        }),
    });
};