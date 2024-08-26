import { 
    Application,
    ISearchParams, 
    IStats, 
    Job, 
    JobsList, 
    Profession, 
    Project, 
    ProjectData, 
    ProjectsList, 
    ProjectStage, 
    ProjectTeamMember, 
    Skill, 
    Team, 
    Empty 
} from "../types/common";
import { request, RPCHosts } from "../utils/api";

export const getAllProjects = async (query: string, options?: ISearchParams): Promise<Empty<ProjectsList>> => {
    const {pageKey, limit} = options || {};
    
    return await request<ProjectsList>({
        method: 'search_projects',
        host: RPCHosts.Platform,
        params: {
            query,
            additional_fields: [
                'jobs',
                'team-size',
            ],
            ...(limit !== undefined && {
                limit,
            }),
            ...(pageKey && {
                page_key: pageKey
            }),
        }
    });
};

export const getAllJobs = async (query: string, options?: ISearchParams): Promise<Empty<JobsList>> => {
    const {pageKey, limit} = options || {};

    return await request<JobsList>({
        method: 'search_jobs',
        host: RPCHosts.Platform,
        params: {
            query,
            additional_fields: [
                'job-application',
            ],
            ...(limit !== undefined && {
                limit,
            }),
            ...(pageKey && {
                page_key: pageKey
            }),
        }
    });
};

export const getPopularProjects = async (limit?: number): Promise<Project[]> => {
    return await request<Project[]>({
        method: 'popular_projects',
        host: RPCHosts.Platform,
        params: {
            additional_fields: [
                'jobs',
                'team-size',
            ],
            ...(limit !== undefined && {
                limit,
            })
        }
    }) ?? [];
};

export const getPopularJobs = async (limit?: number): Promise<Empty<Job[]>> => {
    return await request<Job[]>({
        method: 'popular_jobs',
        host: RPCHosts.Platform,
        params: {
            additional_fields: [
                'job-application',
            ],
            ...(limit !== undefined && {
                limit,
            })
        }
    }) ?? [];
};

export const getIndustries = async (): Promise<Empty<string[]>> => {
    return await request<string[]>({
        method: 'get_industries',
        host: RPCHosts.Platform,
    })
};

export const getInnovationTypes = async (): Promise<Empty<string[]>> => {
    return await request<string[]>({
        method: 'get_innovation_types',
        host: RPCHosts.Platform,
    })
};

export const getProjectStages = async (): Promise<Empty<ProjectStage[]>> => {
    return await request<ProjectStage[]>({
        method: 'get_stages',
        host: RPCHosts.Platform,
    })
};

export const getSkills = async (): Promise<Empty<Skill[]>> => {
    return await request<Skill[]>({
        method: 'get_skills',
        host: RPCHosts.Platform,
    })
};

export const getProfessions = async (): Promise<Empty<Profession[]>> => {
    return await request<Profession[]>({
        method: 'get_skills',
        host: RPCHosts.Platform,
    })
};

export const getStats = async (): Promise<Empty<IStats>> => {
    return await request<IStats>({
        method: 'get_stats',
        host: RPCHosts.Platform,
    }) || {
        num_projects: 0,
        supported_projects: 0,
        num_jobs: 0,
    }
};

export const getStages = async (): Promise<Empty<ProjectStage[]>> => {
    return await request<ProjectStage[]>({
        method: 'get_stages',
        host: RPCHosts.Platform,
    })
};

export const getCurrentProject = async (id: number): Promise<Empty<ProjectData>> => {
    return await request<ProjectData>({
        method: 'get_project',
        host: RPCHosts.Platform,
        params: {
            id,
            additional_fields: [
                'jobs',
                'team-size',
            ],
        },
    });
};

// get_project_team
export const getProjectTeam = async (projectId: number): Promise<Empty<ProjectTeamMember[]>> => {
    return await request<ProjectTeamMember[]>({
        method: 'get_team_members',
        host: RPCHosts.Platform,
        params: {
            project_id: projectId,
        },
    });
};

// get_project_vacancies
export const getApplications = async (projectId: number): Promise<Empty<Application[]>> => {
    return await request<Application[]>({
        method: 'get_job_applications',
        host: RPCHosts.Platform,
        params: {
            project_id: projectId,
        },
    })
};

//apply_to_job
export const applyToJob = async (jobId: number, token?: string): Promise<Empty<Application>> => {
    return await request({
        method: 'apply_to_job',
        host: RPCHosts.Platform,
        params: {
            job_id: jobId,
        },
        ...(token && {
            settings: {
                authToken: token,
            }
        }),
    });
};

export const replyApplication = async (type: 'accept' | 'decline', applicationId: number): Promise<Empty<Application>> => {
    return await request({
        method: type === 'accept' ? 'accept_application' : 'decline_application',
        host: RPCHosts.Platform,
        params: {
            id: applicationId,
        },
    });
};

// get_job
export const getVacancy = async (jobId: number): Promise<Empty<Job>> => {
    return await request({
        method: 'get_job',
        host: RPCHosts.Platform,
        params: {
            id: jobId,
            additional_fields: [
                'job-application',
            ],
        },
    });
};

export const getJobApplication = async (jobId: number, token?: string): Promise<Empty<Application>> => {
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

export const createProject = async (projectParams: createProjectArgs, token?: string): Promise<Empty<ProjectData>> => {
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
export const createTeam = async (projectId: number, title: string, token?: string): Promise<Empty<Team>> => {
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
export const getTeamsAvailableForProject = async (projectId: number, token?: string): Promise<Empty<Team[] | null>> => {
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
export const getTeamJobs = async (projectId: number, token?: string): Promise<Empty<Team[] | null>> => {
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
export const cancelApplication = async (applId: number, token?: string): Promise<Empty<Application>> => {
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

// user_projects
export const getUsersProjects = async (userId: number, token?: string): Promise<Empty<Application>> => {
    return await request({
        method: 'user_projects',
        host: RPCHosts.Platform,
        params: {
            user_id: userId,
        },
        ...(token && {
            settings: {
                authToken: token,
            }
        }),
    });
};

// create_job
export const createJob = async (teamId: number, title: string, description: string, token?: string): Promise<Empty<Job>> => {
    return await request<Job>({
        method: 'create_job',
        host: RPCHosts.Platform,
        params: {
            team_id: teamId,
            title,
            description,
        },
        ...(token && {
            settings: {
                authToken: token,
            }
        }),
    });
};