import { AuthUserAction, AuthUserActions } from "../types/authUser";
import { IBaseStore } from "../types/store";

type UserState = IBaseStore['authUser'];

const initialState: UserState = null;

export const authUserReducer = (store: UserState = initialState, action: AuthUserAction) => {
    const {type, payload} = action;

    switch (type) {
        case AuthUserActions.SET_USER:
            return payload;
        case AuthUserActions.UNSET_USER:
            return null;
    
        default:
            return store;
        }
};