import { CommonAction, UserData } from "../../types";

export enum CurrentUserActions {
    SET_USER_SHOWN = 'SET_USER_SHOWN',
};

export enum RatingUserActions {
    SET_USER_RATING = 'SET_USER_RATING',
};

type SetCurrentUser = CommonAction<CurrentUserActions.SET_USER_SHOWN, UserData | null>;
type SetRatingUser = CommonAction<RatingUserActions.SET_USER_RATING, number | null>

export type CurrentUserAction = 
    | SetCurrentUser;

export type RatingUserAction = 
    | SetRatingUser;