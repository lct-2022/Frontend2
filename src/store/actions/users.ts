import { Dispatch } from "react";
import { getAuthorizedUser, getProfiles } from "../../api/passport";
import { CommonAction, UserData } from "../../types";
import { lsSaveAuthorizedUser } from "../../utils/storage";
import { AuthUserAction, AuthUserActions } from "../types/authUser";
import { CurrentUserAction, CurrentUserActions } from "../types/currentUser";
import { UsersAction, UsersActions } from '../types/users';

export const getAuthorizedUserAction = (token?: string) => {
    return async (dispatch: Dispatch<AuthUserAction | CurrentUserAction>) => {
        const authorizeResponse = await getAuthorizedUser(token);

        if (authorizeResponse) {
            lsSaveAuthorizedUser(authorizeResponse)
        }
        
        return authorizeResponse
            ? 
                dispatch({
                    type: AuthUserActions.SET_USER,
                    payload: authorizeResponse,
                })
            : 
                dispatch({
                    type: AuthUserActions.UNSET_USER,
                });
        }
}

export const popularProfilesAction = (limit?: number) => {
    return async (dispatch: Dispatch<UsersAction>) => {

        const popularProfilesResponse = await getProfiles(limit);

        dispatch({
            type: UsersActions.SET_USERS,
            payload: popularProfilesResponse,
        });
    }
}

export const getUserProfileAction = (user: UserData): CommonAction<CurrentUserActions.SET_USER_SHOWN, UserData> => {
    return {
        type: CurrentUserActions.SET_USER_SHOWN,
        payload: user,
    }

    // return async (dispatch: Dispatch<UsersAction>) => {

    //     const popularProfilesResponse = await getProfiles(limit);

    //     dispatch({
    //         type: UsersActions.SET_USERS,
    //         payload: popularProfilesResponse.result,
    //     });
    // }
}