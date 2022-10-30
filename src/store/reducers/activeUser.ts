import { IUser, Nullable } from "../../types";

import { ActiveUserAction, ActiveUserActions } from "../types/activeUser";

interface IUserState {
    user: Nullable<IUser>;
}

export const initStore: IUserState = {
    user: null,
};

export const activeUserReducer = (store: IUserState = initStore, action: ActiveUserAction) => {
    const {type, payload} = action;

    switch (type) {
        case ActiveUserActions.SET_USER:
            return {...store, user: payload}
        case ActiveUserActions.LOGOUT_USER:
            return {...store, user: null}

        default:
            return store
        }
};