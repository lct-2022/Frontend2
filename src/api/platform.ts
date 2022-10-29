import { IJob, IProject, IUser } from "../types";
import { IDataRPC, request, RPCHosts } from "../utils/api";
import { TOKEN } from "../utils/consts";

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
