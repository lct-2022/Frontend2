import { User, Nullable } from "../../types";
import { lsGetAuthorizedUser } from "../../utils/storage";

import { AuthUserAction, AuthUserActions } from "../types/activeUser";
import { IBaseStore } from "../types/store";

type UserState = IBaseStore['authUser'];

const initialState: UserState = lsGetAuthorizedUser() || null;

export const activeUserReducer = (store: UserState = initialState, action: AuthUserAction) => {
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