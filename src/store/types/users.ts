import { CommonAction, IUser } from "../../types";

export enum UsersActions {
    SET_USERS = 'SET_USERS',
};

type SetUsers = CommonAction<UsersActions.SET_USERS, IUser[]>

export type UsersAction = 
    | SetUsers;
    