import { User, Nullable } from "../../types";
import { getTokenFromCookies } from "../../utils/cookie";
import { ActiveJobAction, ActiveJobActions } from "../types/activeJob";

import { ActiveUserAction, ActiveUserActions } from "../types/activeUser";
import { IBaseStore } from "../types/store";

type isAuthState = IBaseStore['isAuth'];

const initialState: isAuthState = !!getTokenFromCookies();

export const isAuthReducer = (store: isAuthState = initialState, action: {type: string}) => {
    const {type} = action;

    switch (type) {
        case 'SET_AUTH':
            return true;

        case 'UNSET_AUTH':
            return false;
    
        default:
            return store;
        }
};