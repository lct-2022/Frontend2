import { Application, Job, Project, ProjectData, ProjectTeamMember, Team, User } from "../types";
import { IDataRPC, request, RPCHosts } from "../utils/api";

export const getJobs = async (limit?: number) => {
    return await request<Job[]>({
        method: 'popular_jobs',
        host: RPCHosts.Platform,
        ...(limit && {
            params: {limit}
        })
    })
    .then((data) => {
        console.log(data);
        return data
        
    })
};

export const getProjects = async (limit?: number): Promise<IDataRPC<Project[]>> => {
    return await request<Project[]>({
        method: 'popular_projects',
        host: RPCHosts.Platform,
        ...(limit && {
            params: {limit}
        })
    });
};

export const getCurrentProject = async (id: number): Promise<IDataRPC<ProjectData>> => {
    return await request<ProjectData>({
        method: 'get_project',
        host: RPCHosts.Platform,
        params: {
            id,
        },
    });
};

// get_project_team
export const getProjectTeam = async (projectId: number): Promise<IDataRPC<ProjectTeamMember[]>> => {
    return await request<ProjectTeamMember[]>({
        method: 'get_team_members',
        host: RPCHosts.Platform,
        params: {
            'project_id': projectId,
        },
    });
};

// get_project_vacancies
export const getProjectVacancies = async (projectId: number): Promise<IDataRPC<Application[]>> => {
    return await request<Application[]>({
        method: 'get_job_applications',
        host: RPCHosts.Platform,
        params: {
            'project_id': projectId,
        },
    })
};

//apply_to_job
export const applyToJob = async (jobId: number, token: string): Promise<IDataRPC<Application>> => {
    return await request({
        method: 'apply_to_job',
        host: RPCHosts.Platform,
        params: {
            'job_id': jobId,
        },
        settings: {
            authToken: token,
        }
    });
};

//accept_application

//decline_application

// get_job
export const getVacancy = async (jobId: number): Promise<IDataRPC<Job>> => {
    return await request({
        method: 'get_job',
        host: RPCHosts.Platform,
        params: {
            'id': jobId,
        },
    });
};

export const getJobApplication = async (jobId: number, token: string): Promise<IDataRPC<Application>> => {
    return await request({
        method: 'get_job_application',
        host: RPCHosts.Platform,
        params: {
            'job_id': jobId,
        },
        settings: {
            authToken: token,
        }
    });
};

interface createProjectArgs {
    title: string;
    description: string;
    contests?: string;
    url?: string;
}

export const createProject = async (projectParams: createProjectArgs, token: string): Promise<IDataRPC<ProjectData>> => {
    return await request({
        method: 'create_project',
        host: RPCHosts.Platform,
        params: projectParams,
        settings: {
            authToken: token,
        }
    });
};

// create_team
export const createTeam = async (projectId: number, title: string, token: string): Promise<IDataRPC<Team>> => {
    return await request({
        method: 'create_team',
        host: RPCHosts.Platform,
        params: {
            'project_id': projectId,
            title,
        },
        settings: {
            authToken: token,
        }
    });
};

//get_project_teams
export const getTeamsAvailableForProject = async (projectId: number, token: string): Promise<IDataRPC<Team[] | null>> => {
    return await request({
        method: 'get_project_teams',
        host: RPCHosts.Platform,
        params: {
            'project_id': projectId
        },
        settings: {
            authToken: token,
        }
    });
};

//get_project_teams
export const getTeamJobs = async (projectId: number, token: string): Promise<IDataRPC<Team[] | null>> => {
    return await request({
        method: 'get_project_teams',
        host: RPCHosts.Platform,
        params: {
            'project_id': projectId
        },
        settings: {
            authToken: token,
        }
    });
};