import { Project } from "../../types/common";
import { IBaseStore } from "../types/store";
import { ApplicationsAction, ApplicationsActions } from "../types/applications";

type ApplicationsState = IBaseStore['currentApplications'];

export const initialState: ApplicationsState = [];

export const currentApplicationsReducer = (store: ApplicationsState = initialState, action: ApplicationsAction) => {
    const {type, payload} = action;

    switch (type) {
        case ApplicationsActions.SET_APPLICATIONS:
            return payload;

        default:
            return store;
        }
};