import { Project } from "../../types/common";
import { CommonAction } from '../../types/common';

export enum ProjectsActions {
    SET_PROJECTS = 'SET_PROJECTS',
    ADD_PROJECT = 'ADD_PROJECT',
    DELETE_PROJECT = 'DELETE_PROJECT',
    UPDATE_PROJECT = 'UPDATE_PROJECT',
};

interface IUpdateData {
    id: number,
    project: Project,
}

export type SetProjects = CommonAction<ProjectsActions.SET_PROJECTS, Project[]>;
type AddProject = CommonAction<ProjectsActions.ADD_PROJECT, Project>
type DeleteProject = CommonAction<ProjectsActions.DELETE_PROJECT, number>
type UpdateProjects = CommonAction<ProjectsActions.UPDATE_PROJECT, IUpdateData>

export type ProjectsAction = 
    | SetProjects
    | AddProject
    | DeleteProject
    | UpdateProjects;