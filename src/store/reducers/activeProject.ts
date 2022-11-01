import { User, Nullable } from "../../types";
import { ActiveProjectActions, ActiveProjectAction } from "../types/activeProject";

import { ActiveUserAction, ActiveUserActions } from "../types/activeUser";
import { IBaseStore } from "../types/store";

type ProjectState = IBaseStore['activeProject'];

const initialState: ProjectState = {
    project: null,
    team: [],
    vacancies: [],
};

export const activeProjectReducer = (store: ProjectState = initialState, action: ActiveProjectAction) => {
    const {type, payload} = action;

    switch (type) {
        case ActiveProjectActions.SET_PROJECT:
            return {...store, project: payload};
        case ActiveProjectActions.UNSET_PROJECT:
            return null;
        case ActiveProjectActions.SET_TEAM:
            return {...store, team: payload};
        case ActiveProjectActions.SET_VACANCIES:
            return {...store, vacancies: payload};  
            
        default:
            return store;
        }
};