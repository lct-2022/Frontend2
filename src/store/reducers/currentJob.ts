import { User, Nullable } from "../../types";
import { currentJobAction, currentJobActions } from "../types/currentJob";

import { AuthUserAction, AuthUserActions } from "../types/authUser";
import { IBaseStore } from "../types/store";

type CurrentJobState = IBaseStore['currentJob'];

const initialState: CurrentJobState = null;

export const currentJobReducer = (store: CurrentJobState = initialState, action: currentJobAction) => {
    const {type, payload} = action;

    switch (type) {
        case currentJobActions.SET_ACTIVE_JOB:
            return payload;
    
        default:
            return store;
        }
};