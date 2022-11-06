import { Application, Job, Project, ProjectData, ProjectTeamMember, User } from "../../types";
import { CommonAction } from '../../types';

export enum CurrentProjectActions {
    SET_PROJECT = 'SET_PROJECT',
    SET_CHAT_IDS = 'SET_CHAT_IDS',
};

export type SetProject = CommonAction<CurrentProjectActions.SET_PROJECT, ProjectData | null>;

export type CurrentProjectAction = 
    | SetProject

export type SetChatIds = CommonAction<CurrentProjectActions.SET_CHAT_IDS, string[]>;

export type CurrentProjectChatIdsAction = 
    | SetChatIds
