import { Dispatch } from "react";
import { getTeamsAvailableForProject } from "../../api/platform";
import { CommonAction, Team } from "../../types/common";
import { TeamsAction, TeamsActions } from "../types/teams";

export const availableTeamsAction = (projectId: number, token?: string) => {
    return async (dispatch: Dispatch<TeamsAction>) => {

        const availableTeamsResponse = await getTeamsAvailableForProject(projectId, token);

        dispatch({
            type: TeamsActions.SET_TEAMS,
            payload: availableTeamsResponse || [],
        });
    }
}

export const setActiveTeamAction = (team: {title: string, id: number}): CommonAction<TeamsActions.SET_TEAMS, {title: string, id: number}> => {
    return {
        type: TeamsActions.SET_TEAMS,
        payload: team,
    }
}