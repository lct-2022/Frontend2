import { Job, CommonAction, ProjectStage } from "../../types/common";

export enum StagesActions {
    SET_STAGES = 'SET_STAGES',
};

type SetStages = CommonAction<StagesActions.SET_STAGES, ProjectStage[] | null>

export type StagesAction = 
    | SetStages;
    