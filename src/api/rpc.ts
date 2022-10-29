import { request, RPCHosts } from "../utils/api";
import { TOKEN } from "../utils/consts";

export const getPopularProfiles = async (token: string, limit?: number): Promise<any> => {
    return await request({
        method: 'popular-profiles',
        host: RPCHosts.Passport,
        settings: {
            authToken: token
        },
        ...(limit && {
            params: {limit}
        })
    });
};

export const getPopularJobs = async (token: string): Promise<any> => {
    return await request({
        method: 'popular-jobs',
        host: RPCHosts.Platform,
        settings: {
            authToken: token
        },
    });
};

export const getPopularProjects = async (token: string): Promise<any> => {
    return await request({
        method: 'popular-projects',
        host: RPCHosts.Platform,
        settings: {
            authToken: token
        },
    });
};
