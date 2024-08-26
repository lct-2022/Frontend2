import { Dispatch } from "react";
import { getAuthorizedUser, getUserProfile } from "../../api/passport";
import { getRating } from "../../api/rating";
import { lsSaveCurrentUser } from "../../utils/storage";
import { AuthUserAction, AuthUserActions } from "../types/authUser";
import { CurrentUserAction, CurrentUserActions, RatingUserAction, RatingUserActions } from "../types/currentUser";

export const getAuthorizedUserAction = (token?: string) => {
    return async (dispatch: Dispatch<AuthUserAction | CurrentUserAction>) => {
        let user = null;

        const authorizeResponse = await getAuthorizedUser(token);

        if (authorizeResponse) {
            user = authorizeResponse;
        }

        dispatch({
            type: AuthUserActions.SET_USER,
            payload: authorizeResponse,
        })
    }
}

export const getUserProfileAction = (userId: number) => {
    return async (dispatch: Dispatch<CurrentUserAction>) => {
        const currentProfileResponse = await getUserProfile(userId);

        if (currentProfileResponse) {
            lsSaveCurrentUser(currentProfileResponse);
        }

        dispatch({
            type: CurrentUserActions.SET_USER_SHOWN,
            payload: currentProfileResponse,
        })
    }
}

export const getUserRatingAction = (userId: number) => {
    return async (dispatch: Dispatch<RatingUserAction>) => {
        const ratingResponse = await getRating('user', userId);
        
        dispatch({
            type: RatingUserActions.SET_USER_RATING,
            payload: ratingResponse,
        })
    }
}