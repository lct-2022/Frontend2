import { Dispatch } from "react";
import { getAuthorizedUser, getProfiles, getUserProfile } from "../../api/passport";
import { getRating } from "../../api/rating";
import { lsSaveAuthorizedUser, lsSaveCurrentUser } from "../../utils/storage";
import { AuthUserAction, AuthUserActions } from "../types/authUser";
import { CurrentUserAction, CurrentUserActions, RatingUserAction, RatingUserActions } from "../types/currentUser";

export const getAuthorizedUserAction = (token?: string) => {
    return async (dispatch: Dispatch<AuthUserAction | CurrentUserAction>) => {
        const authorizeResponse = await getAuthorizedUser(token);

        if (authorizeResponse) {
            lsSaveAuthorizedUser(authorizeResponse)
        }
        
        authorizeResponse
            ? dispatch({
                type: AuthUserActions.SET_USER,
                payload: authorizeResponse,
            })
            : dispatch({
                type: AuthUserActions.UNSET_USER,
            });
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
        console.log('ratingResponse', ratingResponse);
        
        dispatch({
            type: RatingUserActions.SET_USER_RATING,
            payload: ratingResponse,
        })
    }
}