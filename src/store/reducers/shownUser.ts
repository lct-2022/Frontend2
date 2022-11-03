import { ShownUserAction, ShownUserActions } from "../types/shownUser";
import { IBaseStore } from "../types/store";

type ShownUserState = IBaseStore['shownUser'];

const initialState: ShownUserState = null;

export const shownUserReducer = (store: ShownUserState = initialState, action: ShownUserAction) => {
    const {type, payload} = action;

    switch (type) {
        case ShownUserActions.SET_USER:
            return payload;
    
        default:
            return store;
        }
};