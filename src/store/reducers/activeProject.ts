import { User, Nullable } from "../../types";
import { ActiveProjectActions, ActiveProjectAction } from "../types/activeProject";

import { ActiveUserAction, ActiveUserActions } from "../types/activeUser";
import { IBaseStore } from "../types/store";

type ProjectState = IBaseStore['activeProject'];

const initialStore: ProjectState = null;

export const activeProjectReducer = (store: ProjectState = initialStore, action: ActiveProjectAction) => {
    const {type, payload} = action;

    switch (type) {
        case ActiveProjectActions.SET_PROJECT:
            return payload;
        case ActiveProjectActions.UNSET_PROJECT:
            return null
    
        default:
            return store;
        }
};