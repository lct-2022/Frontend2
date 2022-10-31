import { IProject } from "../../types";
import { CommonAction } from '../../types';

export enum ProjectsActions {
    SET_PROJECTS = 'SET_PROJECTS',
    ADD_PROJECT = 'ADD_PROJECT',
    DELETE_PROJECT = 'DELETE_PROJECT',
    UPDATE_PROJECT = 'UPDATE_PROJECT',
};

interface IUpdateData {
    id: number,
    project: IProject,
}

type SetProjects = CommonAction<ProjectsActions.SET_PROJECTS, IProject[]>
type AddProject = CommonAction<ProjectsActions.ADD_PROJECT, IProject>
type DeleteProject = CommonAction<ProjectsActions.DELETE_PROJECT, string>
type UpdateProjects = CommonAction<ProjectsActions.UPDATE_PROJECT, IUpdateData>

export type ProjectsAction = 
    | SetProjects
    | AddProject
    | DeleteProject
    | UpdateProjects;