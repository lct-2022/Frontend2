import { Project } from "../../types";
import { IBaseStore } from "../types/store";
import { ApplicationsAction, ApplicationsActions } from "../types/applications";

type ApplicationsState = IBaseStore['applications']

export const initialState: ApplicationsState = [];

export const ApplicationsReducer = (store: ApplicationsState = initialState, action: ApplicationsAction) => {
    const {type, payload} = action;

    switch (type) {
        case ApplicationsActions.SET_APPLICATIONS:
            return payload;

        default:
            return store;
        }
};