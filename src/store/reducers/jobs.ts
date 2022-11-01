import { LIMITS } from "../../utils/consts";
import { JobsAction, JobsActions } from "../types/jobs";
import { IBaseStore } from "../types/store";

type JobsState = IBaseStore['jobs'];

export const initialState: JobsState = {
    amount: 0,
    list: [],
};

export const jobsReducer = (store: JobsState = initialState, action: JobsAction) => {
    const {type, payload} = action;

    switch (type) {
        case JobsActions.SET_JOBS:
            return payload

        default:
            return store;
        }
};