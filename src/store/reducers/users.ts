import { Project } from "../../types";
import { IBaseStore } from "../types/store";
import { UsersAction, UsersActions } from "../types/users";

type UsersState = IBaseStore['users']

export const initialState: UsersState = {
    list: [],
    amount: 0,
};

export const usersReducer = (store: UsersState = initialState, action: UsersAction) => {
    const {type, payload} = action;

    switch (type) {
        case UsersActions.SET_USERS:
            return {...store, list: payload, amount: payload?.length || 0};

        default:
            return store;
        }
};