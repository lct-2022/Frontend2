import { Job, CommonAction } from "../../types";

export enum StagesActions {
    SET_STAGES = 'SET_STAGES',
};

type SetStages = CommonAction<StagesActions.SET_STAGES, string[] | null>

export type StagesAction = 
    | SetStages;
    