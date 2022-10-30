import { IProject } from "../../types";
import { IBaseStore } from "../types/store";
import { UsersAction, UsersActions } from "../types/users";

type UsersState = IBaseStore['users']

export const initialStore: UsersState = [];

export const usersReducer = (store: UsersState = initialStore, action: UsersAction) => {
    const {type, payload} = action;

    switch (type) {
        case UsersActions.SET_USERS:
            return payload;

        default:
            return store;
        }
};