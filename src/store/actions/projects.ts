import {login, signup} from '../../api/passport';
import { Dispatch } from "react";
import { CommonAction } from '../types';
import { getPopularProjects } from '../../api/platform';

export const popularProjectsAction = (token: string, limit?: number) => {
    return async (dispatch: Dispatch<any>) => {

        const popularProjectsResponse = await getPopularProjects(token, limit);

        dispatch({
            type: 'SET_PROJECTS',
            payload: popularProjectsResponse.result,
        });
    }
}

// export const popularProjectsAction = (token: string, limit?: number) => {
//     return async (dispatch: Dispatch<any>) => {

//         const popularProjectsResponse = await getPopularProjects(token, limit);

//         dispatch({
//             type: 'SET_PROJECTS',
//             payload: popularProjectsResponse.result,
//         });
//     }
// }