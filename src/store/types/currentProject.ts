import { Application, Job, Project, ProjectData, ProjectTeamMember, User } from "../../types/common";
import { CommonAction } from '../../types/common';

export enum CurrentProjectActions {
    SET_PROJECT = 'SET_PROJECT',
};

export type SetProject = CommonAction<CurrentProjectActions.SET_PROJECT, ProjectData | null>;

export type CurrentProjectAction = 
    | SetProject
