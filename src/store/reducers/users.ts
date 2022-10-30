import { IProject } from "../../types";
import { UsersAction, UsersActions } from "../types/users";

interface IUsersState {
    users: IProject[];
}
export const initStore: IUsersState = {
    users: [],
};

export const usersReducer = (store: IUsersState = initStore, action: UsersAction) => {
    const {type, payload} = action;

    switch (type) {
        case UsersActions.SET_USERS:
            return {...store, users: payload}

        default:
            return store;
        }
};