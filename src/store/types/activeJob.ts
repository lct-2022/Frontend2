import { Job, CommonAction } from "../../types";

export enum ActiveJobActions {
    SET_ACTIVE_JOB = 'SET_ACTIVE_JOB',
};

export type SetActiveJob = CommonAction<ActiveJobActions.SET_ACTIVE_JOB, Job>

export type ActiveJobAction = 
    | SetActiveJob;
    