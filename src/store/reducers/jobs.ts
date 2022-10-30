import { JobsAction, JobsActions } from "../types/jobs";
import { IBaseStore } from "../types/store";

type JobsState = Pick<IBaseStore, 'jobs'>;

export const initStore: JobsState = {
    jobs: [],
};

export const usersReducer = (store: JobsState = initStore, action: JobsAction) => {
    const {type, payload} = action;

    switch (type) {
        case JobsActions.SET_JOBS:
            return {...store, users: payload}

        default:
            return store;
        }
};