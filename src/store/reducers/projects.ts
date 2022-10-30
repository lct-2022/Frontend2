import { IProject } from "../../types";
import { ProjectAction, ProjectActions } from "../types/projects";

interface IProjectsState {
    projects: IProject[];
}
export const initStore: IProjectsState = {
    projects: [],
};

export const projectsReducer = (store: IProjectsState = initStore, action: ProjectAction) => {
    switch (action.type) {
        case ProjectActions.SET_PROJECTS:
            return {...store, projects: action.payload}
        case ProjectActions.ADD_PROJECT:
            return {...store, projects: [...store.projects, action.payload]}

        default:
            return store;
        }
};