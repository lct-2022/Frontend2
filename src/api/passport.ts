import { User, UserData } from "../types";
import { request, RPCHosts } from "../utils/api";

export const getAuthorizedUser = async (token?: string): Promise< UserData> => {
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

export const signup = async (email: string, password: string, fio: string = ''): Promise<string> => {
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

export const login = async (email: string, password: string): Promise<string> => {
    return await request<string>({
        method: 'login',
        host: RPCHosts.Passport,
        params: {
            email,
            password,
        },
    })
};

export const getProfiles = async (limit?: number): Promise<User[]> => {
    return await request<User[]>({
        method: 'popular_profiles',
        host: RPCHosts.Passport,
        ...(limit && {
            params: {limit}
        })
    });
};

export const getUserProfile = async (userId: number): Promise<UserData> => {
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

export const updateUserProfile = async (newData: Partial<UserData>, token: string): Promise<UserData> => {
    return await request({
        method: 'update_profile',
        host: RPCHosts.Passport,
        params: newData,
        settings: {
            authToken: token,
        }
    });
};