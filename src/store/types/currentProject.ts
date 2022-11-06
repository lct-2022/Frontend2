import { Application, Job, Project, ProjectData, ProjectTeamMember, User } from "../../types";
import { CommonAction } from '../../types';

export enum CurrentProjectActions {
    SET_PROJECT = 'SET_PROJECT',
};

export type SetProject = CommonAction<CurrentProjectActions.SET_PROJECT, ProjectData | null>;

export type CurrentProjectAction = 
    | SetProject
