import { Application, CommonAction, Team } from "../../types/common";

export enum ApplicationsActions {
    SET_APPLICATIONS = 'SET_APPLICATIONS',
};

export type SetApplications = CommonAction<ApplicationsActions.SET_APPLICATIONS, Application[]>

export type ApplicationsAction = 
    | SetApplications;
    