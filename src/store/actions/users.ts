import { Dispatch } from "react";
import { checkAuthorization, getProfiles } from "../../api/passport";
import { CommonAction, UserData } from "../../types";
import { ActiveUserAction, ActiveUserActions } from "../types/activeUser";
import { ShownUserActions } from "../types/shownUser";
import { UsersAction, UsersActions } from '../types/users';

export const isUserAuthorizedAction = (token: string) => {
    return async (dispatch: Dispatch<ActiveUserAction>) => {

        const signupResponse = await checkAuthorization(token);
        
        return signupResponse.result
            ? 
                dispatch({
                    type: ActiveUserActions.SET_USER,
                    payload: signupResponse.result,
                })
            : 
                dispatch({
                    type: ActiveUserActions.UNSET_USER,
                });
        }
}

export const popularProfilesAction = (limit?: number) => {
    return async (dispatch: Dispatch<UsersAction>) => {

        const popularProfilesResponse = await getProfiles(limit);

        dispatch({
            type: UsersActions.SET_USERS,
            payload: popularProfilesResponse.result,
        });
    }
}

export const getUserProfileAction = (user: UserData): CommonAction<ShownUserActions.SET_USER, UserData> => {
    return {
        type: ShownUserActions.SET_USER,
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