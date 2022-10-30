import { IUser, Nullable } from "../../types";

import { ActiveUserAction, ActiveUserActions } from "../types/activeUser";
import { IBaseStore } from "../types/store";

type UserState = IBaseStore['activeUser']

const initialStore: UserState = null;

export const activeUserReducer = (store: UserState = initialStore, action: ActiveUserAction) => {
    const {type, payload} = action;

    switch (type) {
        case ActiveUserActions.SET_USER:
            return payload
        case ActiveUserActions.UNSET_USER:
            return null

        default:
            return store;
        }
};