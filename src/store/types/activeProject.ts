import { Application, Project, ProjectTeamMember, User } from "../../types";
import { CommonAction } from '../../types';

export enum ActiveProjectActions {
    SET_PROJECT = 'SET_PROJECT',
    UNSET_PROJECT = 'UNSET_PROJECT',
    SET_TEAM = 'SET_TEAM',
    SET_VACANCIES = 'SET_VACANCIES',
};

export type SetProject = CommonAction<ActiveProjectActions.SET_PROJECT, Project>;
export type UnsetProject = CommonAction<ActiveProjectActions.UNSET_PROJECT>;
export type SetTeam = CommonAction<ActiveProjectActions.SET_TEAM, ProjectTeamMember[]>;
export type SetVAcancies = CommonAction<ActiveProjectActions.SET_VACANCIES, Application[]>;

export type ActiveProjectAction = 
    | SetProject
    | UnsetProject
    | SetTeam
    | SetVAcancies;