import { User, Nullable } from "../../types";
import { ActiveJobAction, ActiveJobActions } from "../types/activeJob";

import { AuthUserAction, AuthUserActions } from "../types/activeUser";
import { IBaseStore } from "../types/store";

type CurrentJobState = IBaseStore['currentJob'];

const initialState: CurrentJobState = null;

export const currentJobReducer = (store: CurrentJobState = initialState, action: ActiveJobAction) => {
    const {type, payload} = action;

    switch (type) {
        case ActiveJobActions.SET_ACTIVE_JOB:
            return payload;
    
        default:
            return store;
        }
};