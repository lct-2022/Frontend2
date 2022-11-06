import { User, Nullable } from "../../types";
import { CurrentProjectActions, CurrentProjectAction } from "../types/currentProject";

import { AuthUserAction, AuthUserActions } from "../types/authUser";
import { IBaseStore } from "../types/store";

type ProjectState = IBaseStore['currentProject'];

const initialState: ProjectState = null;

export const currentProjectReducer = (store: ProjectState = initialState, action: CurrentProjectAction) => {
    const {type, payload} = action;

    switch (type) {
        case CurrentProjectActions.SET_PROJECT:
            return {...store, project: payload};

        default:
            return store;
        }
};