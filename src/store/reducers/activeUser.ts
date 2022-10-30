import { IUser, Nullable } from "../../types";

import { ActiveUserAction, ActiveUserActions } from "../types/activeUser";
import { IBaseStore } from "../types/store";

type UserState = Pick<IBaseStore, 'activeUser'>

const initStore: UserState = {
    activeUser: null,
};

export const activeUserReducer = (store: UserState = initStore, action: ActiveUserAction) => {
    const {type, payload} = action;

    switch (type) {
        case ActiveUserActions.SET_USER:
            return {...store, user: payload}
        case ActiveUserActions.UNSET_USER:
            return {...store, user: null}

        default:
            return store;
        }
};