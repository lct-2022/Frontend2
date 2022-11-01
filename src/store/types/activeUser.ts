import { User } from "../../types";
import { CommonAction } from '../../types';

export enum ActiveUserActions {
    SET_USER = 'SET_USER',
    UNSET_USER = 'UNSET_USER',
};

type SetUser = CommonAction<ActiveUserActions.SET_USER, User>
type UnsetUser = CommonAction<ActiveUserActions.UNSET_USER>

export type ActiveUserAction = 
    | SetUser
    | UnsetUser
