import { Dispatch } from "react";
import { getCurrentProject, getProjects, getProjectTeam, getProjectVacancies } from '../../api/platform';
import { TOKEN } from "../../utils/consts";
import { ActiveProjectActions, SetProject, SetTeam, SetVAcancies } from "../types/activeProject";
import { ProjectsAction, ProjectsActions, SetProjects } from '../types/projects';

export const popularProjectsAction = (limit?: number) => {
    return async (dispatch: Dispatch<SetProjects>) => {

        const popularProjectsResponse = await getProjects(limit);

        dispatch({
            type: ProjectsActions.SET_PROJECTS,
            payload: popularProjectsResponse.result,
        });
    }
}

export const getCurrentProjectAction = (id: number) => {
    return async (dispatch: Dispatch<SetProject>) => {

        const currentProjectResponse = await getCurrentProject(id);
        console.log(currentProjectResponse.result);
        
        dispatch({
            type: ActiveProjectActions.SET_PROJECT,
            payload: currentProjectResponse.result,
        });
    }
}

export const getProjectTeamAction = (id: number) => {
    console.log('SENT =>', id);
    
    return async (dispatch: Dispatch<SetTeam>) => {

        const projectTeamResponse = await getProjectTeam(id);
        
        dispatch({
            type: ActiveProjectActions.SET_TEAM,
            payload: projectTeamResponse.result,
        });
    }
}

export const getProjectVacanciesAction = (id: number) => {
    return async (dispatch: Dispatch<SetVAcancies>) => {

        const projectVacanciesResponse = await getProjectVacancies(id);
        
        dispatch({
            type: ActiveProjectActions.SET_VACANCIES,
            payload: projectVacanciesResponse.result,
        });
    }
}