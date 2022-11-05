import { User, Nullable } from "../../types";
import { CurrentProjectActions, CurrentProjectAction } from "../types/activeProject";

import { AuthUserAction, AuthUserActions } from "../types/activeUser";
import { IBaseStore } from "../types/store";

type ProjectState = IBaseStore['currentProject'];

const initialState: ProjectState = null;

export const currentProjectReducer = (store: ProjectState = initialState, action: CurrentProjectAction) => {
    const {type, payload} = action;

    switch (type) {
        case CurrentProjectActions.SET_PROJECT:
            return {...store, project: payload};
        case CurrentProjectActions.UNSET_PROJECT:
            return null;

        default:
            return store;
        }
};