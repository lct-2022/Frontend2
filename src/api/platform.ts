import { IJob, IProject, IUser } from "../types";
import { IDataRPC, request, RPCHosts } from "../utils/api";
import { TOKEN } from "../utils/consts";

export const getPopularProfiles = async (token: string, limit?: number): Promise<IDataRPC<IUser[]>> => {
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

export const getPopularJobs = async (token: string): Promise<IDataRPC<IJob[]>> => {
    return await request({
        method: 'popular-jobs',
        host: RPCHosts.Platform,
        settings: {
            authToken: token
        },
    });
};

export const getPopularProjects = async (token: string): Promise<IDataRPC<IProject[]>> => {
    return await request({
        method: 'popular-projects',
        host: RPCHosts.Platform,
        settings: {
            authToken: token
        },
    });
};
