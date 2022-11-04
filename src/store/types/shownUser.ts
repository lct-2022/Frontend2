import { CommonAction, UserData } from "../../types";

export enum ShownUserActions {
    SET_USER_SHOWN = 'SET_USER_SHOWN',
};

type SetShowUser = CommonAction<ShownUserActions.SET_USER_SHOWN, UserData>
export type ShownUserAction = SetShowUser;