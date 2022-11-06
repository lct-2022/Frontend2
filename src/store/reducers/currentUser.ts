import { CurrentUserAction, CurrentUserActions } from "../types/currentUser";
import { IBaseStore } from "../types/store";

type CurrentUserState = IBaseStore['currentUser'];

const initialState: CurrentUserState = null;

export const currentUserReducer = (store: CurrentUserState = initialState, action: CurrentUserAction) => {
    const {type, payload} = action;

    switch (type) {
        case CurrentUserActions.SET_USER_SHOWN:
            return payload;
    
        default:
            return store;
        }
};