import { CommonAction, User } from "../../types/common";

export enum UsersActions {
    SET_USERS = 'SET_USERS',
};

type SetUsers = CommonAction<UsersActions.SET_USERS, User[]>

export type UsersAction = 
    | SetUsers;
    