import { User } from "../../types";
import { CommonAction } from '../../types';

export enum ActiveUserActions {
    SET_USER = 'SET_USER',
    UNSET_USER = 'UNSET_USER',
    SET_ROLES = 'SET_ROLES',
};

type SetUser = CommonAction<ActiveUserActions.SET_USER, User>
type UnsetUser = CommonAction<ActiveUserActions.UNSET_USER>
type SetRoles = CommonAction<ActiveUserActions.SET_ROLES, string[]>

export type ActiveUserAction = 
    | SetUser
    | UnsetUser
    | SetRoles;