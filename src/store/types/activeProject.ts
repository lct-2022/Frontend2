import { Project, User } from "../../types";
import { CommonAction } from '../../types';

export enum ActiveProjectActions {
    SET_PROJECT = 'SET_PROJECT',
    UNSET_PROJECT = 'UNSET_PROJECT',
};

export type SetProject = CommonAction<ActiveProjectActions.SET_PROJECT, Project>
export type UnsetProject = CommonAction<ActiveProjectActions.UNSET_PROJECT>

export type ActiveProjectAction = 
    | SetProject
    | UnsetProject;