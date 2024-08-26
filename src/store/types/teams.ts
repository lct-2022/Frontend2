import { CommonAction, Team } from "../../types/common";

export enum TeamsActions {
    SET_TEAMS = 'SET_TEAMS',
};

type SetTeams = CommonAction<TeamsActions.SET_TEAMS, Team[]>

export type TeamsAction = 
    | SetTeams;
    