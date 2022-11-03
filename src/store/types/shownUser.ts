import { CommonAction, UserData } from "../../types";

export enum ShownUserActions {
    SET_USER = 'SET_USER',
};

type SetShowUser = CommonAction<ShownUserActions.SET_USER, UserData>
export type ShownUserAction = SetShowUser;