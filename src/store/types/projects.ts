import { IProject } from "../../types";
import { CommonAction } from "./";

export enum ProjectActions {
    SET_PROJECTS = 'SET_PROJECTS',
    ADD_PROJECT = 'ADD_PROJECT',
    DELETE_PROJECT = 'DELETE_PROJECT',
    UPDATE_PROJECT = 'UPDATE_PROJECT',
};

interface IUpdateData {
    id: string,
    project: IProject,
}

type SetProjects = CommonAction<ProjectActions.SET_PROJECTS, IProject[]>
type AddProject = CommonAction<ProjectActions.ADD_PROJECT, IProject>
type DeleteProject = CommonAction<ProjectActions.DELETE_PROJECT, string>
type UpdateProjects = CommonAction<ProjectActions.UPDATE_PROJECT, IUpdateData>

export type ProjectAction = 
    | SetProjects
    | AddProject
    | DeleteProject
    | UpdateProjects;