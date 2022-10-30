import { IUser } from "../../types";
import { CommonAction } from "./";

export enum ActiveUserActions {
    SET_USER = 'SET_USER',
    LOGOUT_USER = 'LOGOUT_USER',
};

type SetUser = CommonAction <ActiveUserActions.SET_USER, IUser>
type LogoutUser = CommonAction<ActiveUserActions.LOGOUT_USER>

export type ActiveUserAction = 
    | SetUser
    | LogoutUser;