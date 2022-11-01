import { Application, Job, Project, User } from "../types";
import { IDataRPC, request, RPCHosts } from "../utils/api";
import { TOKEN } from "../utils/consts";

export const getPopularJobs = async (limit?: number): Promise<IDataRPC<Job[]>> => {
    return await request({
        method: 'popular-jobs',
        host: RPCHosts.Platform,
        ...(limit && {
            params: {limit}
        })
    });
};

export const getPopularProjects = async (limit?: number): Promise<IDataRPC<Project[]>> => {
    return await request({
        method: 'popular-projects',
        host: RPCHosts.Platform,
        ...(limit && {
            params: {limit}
        })
    });
};

export const getCurrentProject = async (id: number): Promise<IDataRPC<Project>> => {
    return await request({
        method: 'get-project',
        host: RPCHosts.Platform,
        params: {
            id,
        },
    });
};

//apply-to-job

export const applyToJob = async (jobId: number): Promise<IDataRPC<Application>> => {
    return await request({
        method: 'get-project',
        host: RPCHosts.Platform,
        params: {
            'job-id': jobId,
        },
    });
};

//accept-application

//decline-application