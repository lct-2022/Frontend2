import { Job, CommonAction } from "../../types/common";

export enum JobsActions {
    SET_JOBS = 'SET_JOBS',
};

type SetJobs = CommonAction<JobsActions.SET_JOBS, Job[]>

export type JobsAction = 
    | SetJobs;
    