import { IJob, IProject, IUser } from "../types";
import { IDataRPC, request, RPCHosts } from "../utils/api";
import { TOKEN } from "../utils/consts";

export const getPopularJobs = async (limit?: number): Promise<IDataRPC<IJob[]>> => {
    return await request({
        method: 'popular-jobs',
        host: RPCHosts.Platform,
        ...(limit && {
            params: {limit}
        })
    });
};

export const getPopularProjects = async (limit?: number): Promise<IDataRPC<IProject[]>> => {
    return await request({
        method: 'popular-projects',
        host: RPCHosts.Platform,
        ...(limit && {
            params: {limit}
        })
    });
};

export const getCurrentProject = async (id: number): Promise<IDataRPC<IProject>> => {
    return await request({
        method: 'get-project',
        host: RPCHosts.Platform,
        params: {
            id,
        },
    });
};
