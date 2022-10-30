import { IProject } from "../../types";
import { ProjectsAction, ProjectsActions } from "../types/projects";
import { IBaseStore } from "../types/store";

type ProjectsState = IBaseStore['projects'];

export const initialStore: ProjectsState = [];

export const projectsReducer = (store: ProjectsState = initialStore, action: ProjectsAction) => {
    const {type, payload} = action;

    switch (type) {
        case ProjectsActions.SET_PROJECTS:
            return payload
        case ProjectsActions.ADD_PROJECT:
            return [...store, payload]

        default:
            return store;
        }
};