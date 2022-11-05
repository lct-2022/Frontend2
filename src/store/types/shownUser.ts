import { CommonAction, UserData } from "../../types";

export enum CurrentUserActions {
    SET_USER_SHOWN = 'SET_USER_SHOWN',
};

type SetShowUser = CommonAction<CurrentUserActions.SET_USER_SHOWN, UserData>
export type CurrentUserAction = SetShowUser;