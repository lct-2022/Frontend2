import { Dispatch } from "react";
import { getCurrentProject, getPopularProjects } from '../../api/platform';
import { CurrentProjectAction, CurrentProjectActions } from "../types/currentProject";
import { ProjectsActions, SetProjects } from '../types/projects';

export const getCurrentProjectAction = (id: number) => {
    return async (dispatch: Dispatch<CurrentProjectAction>) => {
        const currentProjectResponse = await getCurrentProject(id);
        dispatch({
            type: CurrentProjectActions.SET_PROJECT,
            payload: currentProjectResponse || null,
        })
    }
}