import { Dispatch } from "react";
import { getTeamsAvailableForProject } from "../../api/platform";
import { TeamsAction, TeamsActions } from "../types/teams";

export const availableTeamsAction = (projectId: number, token: string) => {
    return async (dispatch: Dispatch<TeamsAction>) => {

        const availableTeamsResponse = await getTeamsAvailableForProject(projectId, token);

        dispatch({
            type: TeamsActions.SET_TEAMS,
            payload: availableTeamsResponse?.result || [],
        });
    }
}