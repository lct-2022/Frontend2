import { User } from "../types";
import { IDataRPC, request, RPCHosts } from "../utils/api";

export const checkAuthorization = async (token: string | undefined): Promise<IDataRPC<User>> => {
    return await request({
        method: 'my-profile',
        host: RPCHosts.Passport,
        settings: {
            authToken: token || '',
        }
    });
}

export const signup = async (email: string, password: string, fio: string = ''): Promise<IDataRPC<string>> => {
    return await request({
        method: 'signup',
        host: RPCHosts.Passport,
        params: {
            fio,
            email,
            password,
        },
    })
};

export const login = async (email: string, password: string): Promise<IDataRPC<string>> => {
    return await request({
        method: 'login',
        host: RPCHosts.Passport,
        params: {
            email,
            password,
        },
    })
};

export const getPopularProfiles = async (limit?: number): Promise<IDataRPC<User[]>> => {
    return await request({
        method: 'popular-profiles',
        host: RPCHosts.Passport,
        ...(limit && {
            params: {limit}
        })
    });
};

export const getCurrentUserProfile = async (token: string): Promise<IDataRPC<User>> => {
    return await request({
        method: 'my-profile',
        host: RPCHosts.Passport,
        settings: {
            authToken: token,
        },
    });
};

export const getRoles = async (token: string): Promise<IDataRPC<string[]>> => {
    return await request({
        method: 'my-roles',
        host: RPCHosts.Passport,
        settings: {
            authToken: token,
        },
    });
};