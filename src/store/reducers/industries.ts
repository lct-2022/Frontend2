import { InnovationsAction, InnovationsActions } from "../types/innovations";
import { IBaseStore } from "../types/store";

type InnovationsState = IBaseStore['currentInnovations'];

const initialState: InnovationsState = null;

export const currentInnovationsReducer = (store: InnovationsState = initialState, action: InnovationsAction) => {
    const {type, payload} = action;

    switch (type) {
        case InnovationsActions.SET_INNIVATIONS:
            return payload;
    
        default:
            return store;
        }
};