import { Application, Job, Project, ProjectData, ProjectTeamMember, User } from "../../types";
import { CommonAction } from '../../types';

export enum CurrentProjectActions {
    SET_PROJECT = 'SET_PROJECT',
    UNSET_PROJECT = 'UNSET_PROJECT',
};

export type SetProject = CommonAction<CurrentProjectActions.SET_PROJECT, ProjectData>;
export type UnsetProject = CommonAction<CurrentProjectActions.UNSET_PROJECT>;

export type CurrentProjectAction = 
    | SetProject
    | UnsetProject