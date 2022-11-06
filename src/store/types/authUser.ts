import { UserData } from "../../types";
import { CommonAction } from '../../types';

export enum AuthUserActions {
    SET_USER = 'SET_USER',
    UNSET_USER = 'UNSET_USER',
};

type SetUser = CommonAction<AuthUserActions.SET_USER, UserData>
type UnsetUser = CommonAction<AuthUserActions.UNSET_USER>

export type AuthUserAction = 
    | SetUser
    | UnsetUser;