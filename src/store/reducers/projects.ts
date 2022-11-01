import { Project } from "../../types";
import { ProjectsAction, ProjectsActions } from "../types/projects";
import { IBaseStore } from "../types/store";

type ProjectsState = IBaseStore['projects'];

export const initialStore: ProjectsState = {
    amount: 0,
    list: [],
};

// TODO - подумать, как исправить типы тут
export const projectsReducer = (store: ProjectsState = initialStore, action: ProjectsAction) => {
    const {type, payload} = action;

    switch (type) {
        case ProjectsActions.SET_PROJECTS:
            return {...store, list: payload, amount: store.list}
        case ProjectsActions.ADD_PROJECT:
            return {...store, list: [...store.list, payload]}

        default:
            return store;
        }
};