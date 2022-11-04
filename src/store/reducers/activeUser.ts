import { User, Nullable } from "../../types";
import { lsGetAuthorizedUser } from "../../utils/storage";

import { ActiveUserAction, ActiveUserActions } from "../types/activeUser";
import { IBaseStore } from "../types/store";

type UserState = IBaseStore['activeUser']

const initialState: UserState = lsGetAuthorizedUser() || null;

export const activeUserReducer = (store: UserState = initialState, action: ActiveUserAction) => {
    const {type, payload} = action;

    switch (type) {
        case ActiveUserActions.SET_USER:
            return payload;
        case ActiveUserActions.UNSET_USER:
            return null;
    
        default:
            return store;
        }
};