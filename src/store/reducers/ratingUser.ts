import { RatingUserAction, RatingUserActions } from "../types/currentUser";
import { IBaseStore } from "../types/store";

type RatingState = IBaseStore['currentUserRating'];

const initialState: RatingState = null;

export const currentIndustriesReducer = (store: RatingState = initialState, action: RatingUserAction) => {
    const {type, payload} = action;

    switch (type) {
        case RatingUserActions.SET_USER_RATING:
            return payload;
    
        default:
            return store;
        }
};