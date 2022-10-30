import { Reducer } from "redux";
import { IUser, Nullable } from "../../types";
import { UserActions } from "../types";

interface IUserState {
    user: Nullable<IUser>;
}

interface CommonAction {
    user: Nullable<IUser>;
}

type UserActions = {

}

export const initStore: IUserState = {
    user: null,
};

export const userReducer = (store = initStore, action) => {
    switch (action.type) {
        case UserActions.SET_USER:
            return {...store, user: action.payload}
        case UserActions.LOGOUT_USER:
            return {...store, user: null}

        default:
            return store
        }
};