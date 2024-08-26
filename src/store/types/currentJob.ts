import { Job, CommonAction } from "../../types/common";

export enum currentJobActions {
    SET_ACTIVE_JOB = 'SET_ACTIVE_JOB',
};

export type SetcurrentJob = CommonAction<currentJobActions.SET_ACTIVE_JOB, Job | null>

export type currentJobAction = 
    | SetcurrentJob;
    