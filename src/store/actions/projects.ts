import { Dispatch } from "react";
import { getApplications, getCurrentProject, getProjects, getProjectTeam } from '../../api/platform';
import { ActiveProjectActions, SetProject, SetTeam, SetVacancies } from "../types/activeProject";
import { ProjectsActions, SetProjects } from '../types/projects';

export const popularProjectsAction = (limit?: number) => {
    return async (dispatch: Dispatch<SetProjects>) => {

        const popularProjectsResponse = await getProjects(limit);

        dispatch({
            type: ProjectsActions.SET_PROJECTS,
            payload: popularProjectsResponse,
        });
    }
}

export const getCurrentProjectAction = (id: number) => {
    return async (dispatch: Dispatch<SetProject>) => {

        const currentProjectResponse = await getCurrentProject(id);
        
        dispatch({
            type: ActiveProjectActions.SET_PROJECT,
            payload: currentProjectResponse,
        });
    }
}

export const getProjectTeamAction = (id: number) => {
        return async (dispatch: Dispatch<SetTeam>) => {

        const projectTeamResponse = await getProjectTeam(id);
        
        dispatch({
            type: ActiveProjectActions.SET_TEAM,
            payload: projectTeamResponse,
        });
    }
}

export const getProjectVacanciesAction = (id: number) => {
    return async (dispatch: Dispatch<SetVacancies>) => {

        const projectVacanciesResponse = await getApplications(id);
        
        dispatch({
            type: ActiveProjectActions.SET_VACANCIES,
            payload: projectVacanciesResponse?.map(el => el.job) || [],
        });
    }
}