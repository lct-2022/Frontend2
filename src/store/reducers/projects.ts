import { IProject } from "../../types";
import { CommonAction, ProjectActions } from "../types";

interface IProjectsState {
    projects: IProject[];
}

type ProjectsPayloads = 
    | IProject[]
    | IProject
    | string

export const initStore: IProjectsState = {
    projects: [],
};

const projectsActionsMap: Record<ProjectActions, ProjectActions> = {
    SET_PROJECTS: 'SET_PROJECTS',
    ADD_PROJECT: 'ADD_PROJECT',
    DELETE_PROJECT: 'UPDATE_PROJECT',
    UPDATE_PROJECT: 'UPDATE_PROJECT',
}

export const projectsReducer = (store: IProjectsState, action: CommonAction<ProjectsPayloads>) => {
    switch (action.type) {
        case projectsActionsMap.SET_PROJECTS:
            return {...store, projects: action.payload}
        case projectsActionsMap.ADD_PROJECT:
            return {...store, projects: [...store.projects, action.payload]}

        default:
            return store;
        }
};