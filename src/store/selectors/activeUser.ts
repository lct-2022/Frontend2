import { createSelector } from "reselect";
import { DEFAULT_AVATAR } from "../../utils/consts";
import { IBaseStore } from "../types/store";

export const isUserAuthorizedSelector = createSelector(
    (store: IBaseStore) => store.activeUser,
    user => !!user,
)

export const currentUserSelector = createSelector(
    (store: IBaseStore) => store.activeUser,
    user => !!user,
)

export const usersAvatarSelector = createSelector(
    (store: IBaseStore) => store.activeUser?.["avatar-url"],
    avatarUrl => avatarUrl || DEFAULT_AVATAR,
)