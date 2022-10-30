import { IProject } from "../../types";
import { ProjectsAction, ProjectsActions } from "../types/projects";

interface IProjectsState {
    projects: IProject[];
}
export const initStore: IProjectsState = {
    projects: [],
};

export const projectsReducer = (store: IProjectsState = initStore, action: ProjectsAction) => {
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