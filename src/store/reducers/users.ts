import { IProject } from "../../types";
import { IBaseStore } from "../types/store";
import { UsersAction, UsersActions } from "../types/users";

type UsersState = Pick<IBaseStore, 'users'>;

export const initStore: UsersState = {
    users: [],
};

export const usersReducer = (store: UsersState = initStore, action: UsersAction) => {
    const {type, payload} = action;

    switch (type) {
        case UsersActions.SET_USERS:
            return {...store, users: payload}

        default:
            return store;
        }
};