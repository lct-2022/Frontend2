import { Job, CommonAction } from "../../types/common";

export enum IndustriesActions {
    SET_INDUSTRIES = 'SET_INDUSTRIES',
};

type SetIndustries = CommonAction<IndustriesActions.SET_INDUSTRIES, string[] | null>

export type IndustriesAction = 
    | SetIndustries;
    