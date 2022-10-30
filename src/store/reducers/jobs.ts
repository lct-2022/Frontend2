import { IProject } from "../../types";
import { JobsAction, JobsActions } from "../types/jobs";

interface IJobsState {
    jobs: IProject[];
}
export const initStore: IJobsState = {
    jobs: [],
};

export const usersReducer = (store: IJobsState = initStore, action: JobsAction) => {
    const {type, payload} = action;

    switch (type) {
        case JobsActions.SET_JOBS:
            return {...store, users: payload}

        default:
            return store;
        }
};