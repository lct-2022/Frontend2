import { Dispatch } from "react";
import { getRating } from "../../api/rating";
import { ActiveProjectActions, SetRating } from "../types/activeProject";

export const getProjectRatingAction = (projectId: number) => {
    return async (dispatch: Dispatch<SetRating>) => {

        const ratingResponse = await getRating('project', projectId);
        
        dispatch({
            type: ActiveProjectActions.SET_RATING,
            payload: ratingResponse.result,
        });
    }
}

export const getUserRatingAction = (userId: number) => {
    return async (dispatch: Dispatch<SetRating>) => {

        const ratingResponse = await getRating('user', userId);
        
        dispatch({
            type: ActiveProjectActions.SET_RATING,
            payload: ratingResponse.result,
        });
    }
}