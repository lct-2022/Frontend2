import { IJob, CommonAction } from "../../types";

export enum JobsActions {
    SET_JOBS = 'SET_JOBS',
};

type SetJobs = CommonAction<JobsActions.SET_JOBS, IJob[]>

export type JobsAction = 
    | SetJobs;
    