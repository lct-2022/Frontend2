import {login, signup} from '../../api/passport';
import { Dispatch } from "react";
import { CommonAction } from '../types';
import { ActiveUserAction, ActiveUserActions } from '../types/activeUser';

function prepareDispatchForSetUser(dispatch: Dispatch<ActiveUserAction>, data: any) {
    return dispatch({
        type: ActiveUserActions.SET_USER,
        payload: data.result,
    });
}

export const signupAction = (email: string, password: string, fio: string = '') => {
    return async (dispatch: Dispatch<ActiveUserAction>) => {

        const signupResponse = await signup(email, password, fio);

        return prepareDispatchForSetUser(dispatch, signupResponse.result);
    }
}

export const loginAction = (email: string, password: string) => {
    return async (dispatch: Dispatch<ActiveUserAction>) => {

        const loginResponse = await login(email, password);

        return prepareDispatchForSetUser(dispatch, loginResponse.result);
    }
}

export const logoutAction = (): CommonAction<ActiveUserActions.LOGOUT_USER> => {
    return {
        type: ActiveUserActions.LOGOUT_USER,
    };
}