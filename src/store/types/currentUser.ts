import { CommonAction, Nullable, UserData } from "../../types/common";

export enum CurrentUserActions {
    SET_USER_SHOWN = 'SET_USER_SHOWN',
};

export enum RatingUserActions {
    SET_USER_RATING = 'SET_USER_RATING',
};

type SetCurrentUser = CommonAction<CurrentUserActions.SET_USER_SHOWN, Nullable<UserData>>;
type SetRatingUser = CommonAction<RatingUserActions.SET_USER_RATING, Nullable<number>>

export type CurrentUserAction = 
    | SetCurrentUser;

export type RatingUserAction = 
    | SetRatingUser;