import { IUser, Nullable } from "../../types";
import { CommonAction, ActiveUserActions } from "../types";

interface IUserState {
    user: Nullable<IUser>;
}

type UserPayloads = 
    | IUser
    | null;

export const initStore: IUserState = {
    user: null,
};

const ActiveUserActionsMap: Record<string, ActiveUserActions> = {
    SET_USER: 'SET_USER',
    LOGOUT_USER: 'LOGOUT_USER',
}

export const activeUserReducer = (store: IUserState, action: CommonAction<UserPayloads>) => {
    switch (action.type) {
        case ActiveUserActionsMap.SET_USER:
            return {...store, user: action.payload}
        case ActiveUserActionsMap.LOGOUT_USER:
            return {...store, user: null}

        default:
            return store
        }
};