import { Project } from "../../types/common";
import { IBaseStore } from "../types/store";
import { TeamsAction, TeamsActions } from "../types/teams";

type TeamsState = IBaseStore['teams']

export const initialState: TeamsState = [];

export const TeamsReducer = (store: TeamsState = initialState, action: TeamsAction) => {
    const {type, payload} = action;

    switch (type) {
        case TeamsActions.SET_TEAMS:
            return payload;

        default:
            return store;
        }
};