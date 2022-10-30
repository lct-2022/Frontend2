import { Dispatch } from "react";
import { getPopularProjects } from '../../api/platform';
import { ProjectsAction, ProjectsActions, SetProjects } from '../types/projects';

export const popularProjectsAction = (token: string, limit?: number) => {
    return async (dispatch: Dispatch<SetProjects>) => {

        const popularProjectsResponse = await getPopularProjects(token, limit);

        dispatch({
            type: ProjectsActions.SET_PROJECTS,
            payload: popularProjectsResponse.result,
        });
    }
}