import { CurrentUserAction, CurrentUserActions } from "../types/currentUser";
import { IndustriesAction, IndustriesActions } from "../types/industries";
import { IBaseStore } from "../types/store";

type IndustriesState = IBaseStore['currentIndustries'];

const initialState: IndustriesState = null;

export const currentIndustriesReducer = (store: IndustriesState = initialState, action: IndustriesAction) => {
    const {type, payload} = action;

    switch (type) {
        case IndustriesActions.SET_INDUSTRIES:
            return payload;
    
        default:
            return store;
        }
};