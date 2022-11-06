import { CurrentUserAction, CurrentUserActions } from "../types/currentUser";
import { StagesAction, StagesActions } from "../types/stages";
import { IBaseStore } from "../types/store";

type StagesState = IBaseStore['currentStages'];

const initialState: StagesState = null;

export const currentStagesReducer = (store: StagesState = initialState, action: StagesAction) => {
    const {type, payload} = action;

    switch (type) {
        case StagesActions.SET_STAGES:
            return payload;
    
        default:
            return store;
        }
};