import { Dispatch } from "react";
import { getCurrentProject, getPopularProjects } from '../../api/platform';
import { CurrentProjectAction, CurrentProjectActions } from "../types/currentProject";
import { ProjectsActions, SetProjects } from '../types/projects';

export const popularProjectsAction = (limit?: number) => {
    return async (dispatch: Dispatch<SetProjects>) => {

        const popularProjectsResponse = await getPopularProjects(limit);

        dispatch({
            type: ProjectsActions.SET_PROJECTS,
            payload: popularProjectsResponse,
        });
    }
}

export const getCurrentProjectAction = (id: number) => {
    return async (dispatch: Dispatch<CurrentProjectAction>) => {

        const currentProjectResponse = await getCurrentProject(id);

        return currentProjectResponse
            ?
                dispatch({
                    type: CurrentProjectActions.SET_PROJECT,
                    payload: currentProjectResponse,
                })
            : 
                dispatch({
                    type: CurrentProjectActions.UNSET_PROJECT,
                })
    }
}