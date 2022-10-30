import { IProject } from "../../types";
import { ProjectsAction, ProjectsActions } from "../types/projects";
import { IBaseStore } from "../types/store";

type ProjectsState = Pick<IBaseStore, 'projects'>

export const initStore: ProjectsState = {
    projects: [],
};

export const projectsReducer = (store: ProjectsState = initStore, action: ProjectsAction) => {
    const {type, payload} = action;

    switch (type) {
        case ProjectsActions.SET_PROJECTS:
            return {...store, projects: payload}
        case ProjectsActions.ADD_PROJECT:
            return {...store, projects: [...store.projects, payload]}

        default:
            return store;
        }
};