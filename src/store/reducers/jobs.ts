import { LIMITS } from "../../utils/consts";
import { JobsAction, JobsActions } from "../types/jobs";
import { IBaseStore } from "../types/store";

type JobsState = IBaseStore['jobs'];

export const initialStore: JobsState = {
    amount: 0,
    list: [],
};

export const jobsReducer = (store: JobsState = initialStore, action: JobsAction) => {
    const {type, payload} = action;

    const openJobs = payload
        ?.filter(job => job.open)
        ?.slice(0, LIMITS.JOBS);

    switch (type) {
        case JobsActions.SET_JOBS:
            return {...store, list: openJobs || [], amount: payload?.length || 0};

        default:
            return store;
        }
};