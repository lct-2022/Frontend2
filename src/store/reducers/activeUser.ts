import { IUser, Nullable } from "../../types";

import { ActiveUserAction, ActiveUserActions } from "../types/activeUser";
import { IBaseStore } from "../types/store";

type UserState = IBaseStore['activeUser']

const initialStore: UserState = {
    user: null,
    roles: []
};

export const activeUserReducer = (store: UserState = initialStore, action: ActiveUserAction) => {
    const {type, payload} = action;

    switch (type) {
        case ActiveUserActions.SET_USER:
            return {...store, user: payload};
        case ActiveUserActions.UNSET_USER:
            return {...store, user: null}
        case ActiveUserActions.SET_ROLES:
            return {...store, user: null}
    
        default:
            return store;
        }
};