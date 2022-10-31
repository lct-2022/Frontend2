import {checkAuthorization, getRoles} from '../../api/passport';
import { Dispatch } from "react";
import { ActiveUserAction, ActiveUserActions } from '../types/activeUser';

export const isUserAuthorizedAction = (token: string | undefined) => {
    return async (dispatch: Dispatch<ActiveUserAction>) => {

        const signupResponse = await checkAuthorization(token);
        
        return !!signupResponse.result
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

export const getRolesAction = (token: string) => {
    return async (dispatch: Dispatch<ActiveUserAction>) => {

        const getRolesResponse = await getRoles(token);
        
        return dispatch({
                type: ActiveUserActions.SET_ROLES,
                payload: getRolesResponse.result,
            })
        }
}