import { createSelector } from "reselect";
import { IBaseStore } from "../types/store";
import { DEFAULT_AVATAR } from "../../utils/consts";

export const authUserSelector = createSelector(
    (store: IBaseStore) => store.authUser,
    user => user,
)

export const usersAvatarSelector = createSelector(
    (store: IBaseStore) => store.authUser?.avatar_url,
    avatarUrl => avatarUrl || DEFAULT_AVATAR,
)

export const currentUserSelector = createSelector(
    (store: IBaseStore) => store.currentUser,
    user => user,
);

export const userRatingSelector = createSelector(
    (store: IBaseStore) => store.currentUserRating,
    rating => rating,
);