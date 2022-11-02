import { Application, Project, ProjectTeamMember, User } from "../../types";
import { CommonAction } from '../../types';

export enum ActiveProjectActions {
    SET_PROJECT = 'SET_PROJECT',
    UNSET_PROJECT = 'UNSET_PROJECT',
    SET_TEAM = 'SET_TEAM',
    SET_VACANCIES = 'SET_VACANCIES',
    SET_RATING = 'SET_RATING',
};

export type SetProject = CommonAction<ActiveProjectActions.SET_PROJECT, Project>;
export type UnsetProject = CommonAction<ActiveProjectActions.UNSET_PROJECT>;
export type SetTeam = CommonAction<ActiveProjectActions.SET_TEAM, ProjectTeamMember[]>;
export type SetVacancies = CommonAction<ActiveProjectActions.SET_VACANCIES, Application[]>;
export type SetRating = CommonAction<ActiveProjectActions.SET_RATING, number>;

export type ActiveProjectAction = 
    | SetProject
    | UnsetProject
    | SetTeam
    | SetVacancies
    | SetRating;