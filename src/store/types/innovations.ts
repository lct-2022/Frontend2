import { Job, CommonAction } from "../../types";

export enum InnovationsActions {
    SET_INNIVATIONS = 'SET_INNIVATIONS',
};

type SetInnovations = CommonAction<InnovationsActions.SET_INNIVATIONS, string[] | null>

export type InnovationsAction = 
    | SetInnovations;
    