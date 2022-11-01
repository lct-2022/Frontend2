import { User, Nullable } from "../../types";
import { ActiveJobAction, ActiveJobActions } from "../types/activeJob";

import { ActiveUserAction, ActiveUserActions } from "../types/activeUser";
import { IBaseStore } from "../types/store";

type UserState = IBaseStore['activeJob'];

const initialState: UserState = null;

export const activeJobReducer = (store: UserState = initialState, action: ActiveJobAction) => {
    const {type, payload} = action;

    switch (type) {
        case ActiveJobActions.SET_ACTIVE_JOB:
            return payload;
    
        default:
            return store;
        }
};