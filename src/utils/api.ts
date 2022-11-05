import { result } from "lodash";

interface IDataRPC<D> {
    result?: D,
    error?: {
        code: number;
        message: string;
    },
    jsonrpc: string,
    id: number,
}

interface IRPCRequestArguments {
    method: string, 
    host: string, 
    params?: Object, 
    settings?: {
        authToken: string | undefined,
    }
}

export interface RequestOptions {
    projects: boolean;
}

export async function request<D>(args: IRPCRequestArguments): Promise<D | undefined> {
    const {method, host, params, settings} = args;
    
    const url = `https://${host}.dev.lct.40ants.com`;
    
    const body = {
        jsonrpc: '2.0',
        method,
        params: params || {},
        id: 0,
    }
    
    const headers = new Headers({
        'Content-Type': 'application/json',
    });
    
    if (settings?.authToken) {
        headers.set('Authorization', settings.authToken);
    }
    
    const options = {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    }
    
    const response = await fetch(url, options);    
    const result: IDataRPC<D> = await response.json();
    
    if (!result.result) {   
        return;
    }
    
    return result.result;
}

function isAuthorizationMissingPassed(data: IDataRPC<any>): boolean {
    if (data.result) {
        return true;
    }

    if (data.error) {
        const {error} = data;
        if (error.code === 3 && error.message === 'Этот метод требует аутентификации.') {
            return true
        }
    }

    return false;
}

export enum RPCHosts {
    Passport = 'passport',
    Platform = 'platform',
    Ratings = 'rating',
    Chat = 'chat',
    Events = 'events',
}

export const RPC_METHODS = {
    PASSPORT: {
        LOGIN: 'login',
        SIGNUP: 'signup',
        MY_PROFILE: 'my_profile',
        POOULAR_PROFILES: 'popular_profiles',
        GET_ROLES: 'get_roles'
    },
    PLATFORM: {
        POPULAR_PROJECTS: 'popular_projects',
        POPULAR_JOBS: 'popular_jobs',
    },
    RATING: {

    },
    CHAT: {

    }
}