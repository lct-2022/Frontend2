import { User, UserData } from "../types";
import { request, RequestOptions, RPCHosts } from "../utils/api";

export const authorize = async (requestData: RequestOptions, token: string): Promise<UserData> => {
    return await request<UserData>({
        method: 'my_profile',
        host: RPCHosts.Passport,
        ...(requestData.projects && {
            params: {
                additional_fields: ['projects'],
            }
        }),
        settings: {
            authToken: token,
        }
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

// with rate !!!
export const getProfiles = async (limit?: number): Promise<User[]> => {
    return await request<User[]>({
        method: 'popular_profiles',
        host: RPCHosts.Passport,
        ...(limit && {
            params: {limit}
        })
    });
};

export const getUserProfile = async (requestData: RequestOptions, userId: number): Promise<UserData> => {
    return await request({
        method: 'get_profile',
        host: RPCHosts.Passport,
        params: {
            id: userId,
            ...(requestData.projects && {
                additional_fields: ['projects'],
            })
        },
    });
};
