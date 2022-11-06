import { Dispatch } from "react";
import { getCurrentProject, getIndustries, getInnovationTypes, getStages } from '../../api/platform';
import { CurrentProjectAction, CurrentProjectActions } from "../types/currentProject";
import { IndustriesAction, IndustriesActions } from "../types/industries";
import { InnovationsAction, InnovationsActions } from "../types/innovations";
import { StagesAction, StagesActions } from "../types/stages";

export const getCurrentProjectAction = (id: number) => {
    return async (dispatch: Dispatch<CurrentProjectAction>) => {
        const currentProjectResponse = await getCurrentProject(id);
        dispatch({
            type: CurrentProjectActions.SET_PROJECT,
            payload: currentProjectResponse,
        })
    }
}

export const allIndustriesAction = () => {
    return async (dispatch: Dispatch<IndustriesAction>) => {
        const industriesResponse = await getIndustries();
        dispatch({
            type: IndustriesActions.SET_INDUSTRIES,
            payload: industriesResponse,
        })
    }
}

export const allInnovationsAction = () => {
    return async (dispatch: Dispatch<InnovationsAction>) => {
        const innovationsResponse = await getInnovationTypes();
        dispatch({
            type: InnovationsActions.SET_INNIVATIONS,
            payload: innovationsResponse,
        })
    }
}

export const allStagessAction = () => {
    return async (dispatch: Dispatch<StagesAction>) => {
        const stagesResponse = await getStages();
        dispatch({
            type: StagesActions.SET_STAGES,
            payload: stagesResponse,
        })
    }
}