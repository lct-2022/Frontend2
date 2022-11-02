import { createSelector } from "reselect";
import { IBaseStore } from "../types/store";
import { DEFAULT_AVATAR } from "../../utils/consts";

export const isUserAuthorizedSelector = createSelector(
    (store: IBaseStore) => store.activeUser,
    user => !!user,
)

export const currentUserSelector = createSelector(
    (store: IBaseStore) => store.activeUser,
    user => user,
)

export const usersAvatarSelector = createSelector(
    (store: IBaseStore) => store.activeUser?.["avatar-url"],
    avatarUrl => avatarUrl || DEFAULT_AVATAR,
)

export const isAdminSelector = createSelector(
    (store: IBaseStore) => store.activeUser?.admin,
    isAdmin => !!isAdmin,
)

export const popularProfilesSelector = createSelector(
    (store: IBaseStore) => store.users.list,
    users => users || [],
);