import { Application, Job, Project, ProjectData, ProjectTeamMember, Team } from "../types";
import { request, RPCHosts } from "../utils/api";

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

export const getProjects = async (limit?: number): Promise<Project[]> => {
    return await request<Project[]>({
        method: 'popular_projects',
        host: RPCHosts.Platform,
        ...(limit && {
            params: {limit}
        })
    });
};

export const getCurrentProject = async (id: number): Promise<ProjectData> => {
    return await request<ProjectData>({
        method: 'get_project',
        host: RPCHosts.Platform,
        params: {
            id,
        },
    });
};

// get_project_team
export const getProjectTeam = async (projectId: number): Promise<ProjectTeamMember[]> => {
    return await request<ProjectTeamMember[]>({
        method: 'get_team_members',
        host: RPCHosts.Platform,
        params: {
            'project_id': projectId,
        },
    });
};

// get_project_vacancies
export const getApplications = async (projectId: number): Promise<Application[]> => {
    return await request<Application[]>({
        method: 'get_job_applications',
        host: RPCHosts.Platform,
        params: {
            'project_id': projectId,
        },
    })
};

//apply_to_job
export const applyToJob = async (jobId: number, token?: string): Promise<Application> => {
    return await request({
        method: 'apply_to_job',
        host: RPCHosts.Platform,
        params: {
            'job_id': jobId,
        },
        ...(token && {
            settings: {
                authToken: token,
            }
        }),
    });
};

//accept_application

//decline_application

// get_job
export const getVacancy = async (jobId: number): Promise<Job> => {
    return await request({
        method: 'get_job',
        host: RPCHosts.Platform,
        params: {
            'id': jobId,
        },
    });
};

export const getJobApplication = async (jobId: number, token?: string): Promise<Application> => {
    return await request({
        method: 'get_job_application',
        host: RPCHosts.Platform,
        params: {
            'job_id': jobId,
        },
        ...(token && {
            settings: {
                authToken: token,
            }
        }),
    });
};

interface createProjectArgs {
    title: string;
    description: string;
    contests?: string;
    url?: string;
}

export const createProject = async (projectParams: createProjectArgs, token?: string): Promise<ProjectData> => {
    return await request({
        method: 'create_project',
        host: RPCHosts.Platform,
        params: projectParams,
        ...(token && {
            settings: {
                authToken: token,
            }
        }),
    });
};

// create_team
export const createTeam = async (projectId: number, title: string, token?: string): Promise<Team> => {
    return await request({
        method: 'create_team',
        host: RPCHosts.Platform,
        params: {
            'project_id': projectId,
            title,
        },
        ...(token && {
            settings: {
                authToken: token,
            }
        }),
    });
};

//get_project_teams
export const getTeamsAvailableForProject = async (projectId: number, token?: string): Promise<Team[] | null> => {
    return await request({
        method: 'get_project_teams',
        host: RPCHosts.Platform,
        params: {
            'project_id': projectId
        },
        ...(token && {
            settings: {
                authToken: token,
            }
        }),
    });
};

//get_project_teams
export const getTeamJobs = async (projectId: number, token?: string): Promise<Team[] | null> => {
    return await request({
        method: 'get_project_teams',
        host: RPCHosts.Platform,
        params: {
            project_id: projectId
        },
        ...(token && {
            settings: {
                authToken: token,
            }
        }),
    });
};

// cancel-application
export const cancelApplication = async (applId: number, token?: string): Promise<Application> => {
    return await request({
        method: 'cancel_application',
        host: RPCHosts.Platform,
        params: {
            id: applId,
        },
        ...(token && {
            settings: {
                authToken: token,
            }
        }),
    });
};
